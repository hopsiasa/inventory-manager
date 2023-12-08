import { parseCookies, setCookie } from "nookies";
import type { User } from "../types/user";
import api from "../utils/axios";
import { JWT_EXPIRES_IN, JWT_SECRET, decode, sign } from "../utils/jwt";
import { wait } from "../utils/wait";

class AuthApi {
  async login({ email, password }: { email: string; password: string }): Promise<string> {
    await wait(500);

    console.log("accessToken");
    try {
      const response = await api.post("/login", { email, password });
      const accessToken = response.data.access_token;
      setCookie(null, "accessToken", accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      const parsedCookies = parseCookies();
      // console.log("cookies token", parsedCookies["accessToken"]);
      return accessToken;
    } catch (err) {
      console.error("[Auth Api]: ", err);
      throw new Error("Internal server error");
    }
  }

  async register({ email, name, password }: { email: string; name: string; password: string }): Promise<string> {
    await wait(1000);

    return new Promise(async (resolve, reject) => {
      try {
        // Make a Fetch API call to register the user on the server
        const response = await fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, password }),
        });

        if (!response.ok) {
          const { error } = await response.json();
          reject(new Error(error));
          return;
        }

        // Assuming the server responds with the access token
        const { accessToken } = await response.json();

        resolve(accessToken);
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  async me(accessToken: string): Promise<User> {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is undefined");
    }

    try {
      const decodedToken = decode(accessToken, JWT_SECRET);

      const user = {
        id: decodedToken.userId,
        email: decodedToken.email,
        name: decodedToken.name,
      };

      return user;
    } catch (err) {
      console.error("[Auth Api]: ", err);
      throw new Error("Internal server error");
    }
  }
}

export const authApi = new AuthApi();
