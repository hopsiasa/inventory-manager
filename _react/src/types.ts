import React from "react";

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface IUserRequest {
  name: string;
  email: string;
  role?: string[];
  permissions?: string[];
  password: string;
  password_confirmation: string;
}

export interface IUserResponse {
  id?: null | never;
  name: string;
  email: string;
  role: string[];
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface IUsersResponse {
  pagination: {
    total: number;
  };
  data: {
    data: IUserResponse[];
  };
}

export interface IRoleResponse {
  roles: {
    id: number;
    name: string;
  }[];
}
