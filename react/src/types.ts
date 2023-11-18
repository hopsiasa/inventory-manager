import React from "react";

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string[];
  permissions: string[];
  created_at: string;
};
