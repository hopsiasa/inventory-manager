export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string;
  password: string;
  password_confirmation: string;
  created_at: string;
  updated_at: string;

  [key: string]: any;
}

export interface Users extends User {
  data: User[];
}

// export interface UserRequest {
//   name: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
//   role: string;
// }

// export interface UserResponse {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   permissions: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface UsersResponse {
//   data: UserResponse[];
// }
