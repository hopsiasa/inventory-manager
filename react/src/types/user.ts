// export interface User {
//   id: string;
//   email: string;
//   name: string;

//   [key: string]: any;
// }

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  data: UserResponse[];
}
