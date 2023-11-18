import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.ts";
import { useStateContext } from "../contexts/ContextProvider.tsx";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const initialState = {
  id: null,
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext();
  const [user, setUser] = useState(initialState);

  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    if (id) {
      setLoading(true);

      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data.data);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const onSubmit: SubmitHandler<FormValues> = (user: FormValues) => {
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((error) => {
          const response = error.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((error) => {
          const response = error.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      <h1>{user.id ? `Update user: ${user.name}` : "New User"}</h1>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading ...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name")}
              // onChange={(e) => setUser({ ...user, name: e.target.value })}
              // value={user.name}
              type="text"
              placeholder="Name"
            />
            <input
              {...register("email")}
              // onChange={(e) => setUser({ ...user, email: e.target.value })}
              // value={user.email}
              type="email"
              placeholder="Email"
            />
            <input
              {...register("password")}
              // onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Password"
            />
            <input
              {...register("password_confirmation")}
              // onChange={(e) =>
              // //   setUser({
              // //     ...user,
              // //     password_confirmation: e.target.value,
              // //   })
              // }
              type="password"
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
