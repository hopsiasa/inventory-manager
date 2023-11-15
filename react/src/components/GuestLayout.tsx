import { Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.tsx";

export default function GuestLayout() {
  const { token } = useStateContext();
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }

  return (
    <>
      <Outlet />
    </>
  );
}
