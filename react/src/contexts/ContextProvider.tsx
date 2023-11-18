import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { UserType } from "../types.ts";

type StateContextProps = {
  can: (permission: string, user?: UserType | undefined) => boolean;
  user: UserType | null;
  currentUser?: null;
  token: string;
  notification: string;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  setToken: (token: string) => void;
  setNotification: (message: string) => void;
};

const StateContext = createContext<StateContextProps>({
  can: () => true,
  user: null,
  currentUser: null,
  token: "",
  notification: "",
  setUser: () => {},
  setToken: () => {},
  setNotification: () => undefined,
});

/** Below is for the Chrome React dev Tools extension
 * to display the name of the context instead
 * of "Context.provider"
 **/
StateContext.displayName = "StateContext";

/** Custom Hook for importing the
 *  state in other areas of the app.
 **/
// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => {
  const context = useContext(StateContext);

  /** This check is optional if you are wrapping provider around a sub part
   *  of the component tree and not the entire app, to limit is availability
   *  to a certain section of the app.
   **/
  if (context === undefined) {
    throw new Error("useStateValue must be used within a ContextProvider");
  }
  return context;
};

const usePassedDownValues = () => {
  // In this case we want this value variable and it's setter function to be available globally.
  const [user, setUser] = useState<UserType | null>({
    id: 0,
    name: "",
    email: "",
    role: [],
    permissions: [],
    created_at: "",
  });
  const [notification, _setNotification] = useState("");
  const [token, _setToken] = useState(
    localStorage.getItem("ACCESS_TOKEN") as string,
  );

  // The state should be memoized to maintain the referential equality/ same location in memory. If not
  // every time this context is called a new location in memory will be created for the values.
  return useMemo(() => {
    const setNotification = (message: string) => {
      _setNotification(message);
      setTimeout(() => {
        setNotification(message);
      }, 5000);
    };

    const setToken = (token: string) => {
      _setToken(token);
      if (token) {
        localStorage.setItem("ACCESS_TOKEN", token);
      } else {
        localStorage.removeItem("ACCESS_TOKEN");
      }
    };

    const can = (permission: string): boolean => {
      const userPermissions: string[] = user?.permissions || [];
      return userPermissions.includes(permission);
    };

    return {
      can,
      user,
      token,
      setUser,
      setToken,
      notification,
      setNotification,
    };
  }, [user, token, setUser, _setToken, notification, _setNotification]);
};

type Props = {
  children?: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  return (
    <StateContext.Provider value={usePassedDownValues()}>
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
