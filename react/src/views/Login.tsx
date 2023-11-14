import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client.ts";
import { useStateContext } from "../contexts/ContextProvider.tsx";
import { FormEvent } from "../types.ts";
import { AxiosError } from "axios";

interface ErrorResponse {
  errors: Record<string, string[]>;
  message?: string;
}

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ErrorResponse | null>(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };

    setErrors(null);

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const response = error.response;

        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors({ errors: response.data.errors });
          } else {
            setErrors({
              errors: { email: [response.data.message || "An error occurred"] },
            });
          }
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          {errors && (
            <div className="alert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{(errors as never)[key][0]}</p>
              ))}
            </div>
          )}
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button type="submit" className="btn btn-block">
            Login
          </button>
          <p className="message">
            Not Registered? <Link to="/signup">Create and account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
