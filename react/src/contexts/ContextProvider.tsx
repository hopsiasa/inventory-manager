import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface Props {
  children?: ReactNode;
}

type StateContextProps = {
  user?: object;
  currentUser?: null;
  token: string;
  notification: string;
  setUser: object;
  setToken: object;
  setNotification: object;
};

const StateContext = createContext<StateContextProps>({
  currentUser: null,
  token: "",
  notification: "",
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

/** Below is for the Chrome React dev Tools extension
 * to display the name of the context instead
 * of "Context.provider"
 **/
StateContext.displayName = "StateContext";

/** Custom Hook for importing the
 *  state in other areas of the app.
 **/
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
  const [user, setUser] = useState({});
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
    return { user, token, setUser, setToken, notification, setNotification };
  }, [user, token, setUser, _setToken, notification, _setNotification]);
};

const ContextProvider = ({ children }: Props) => {
  return (
    <StateContext.Provider value={usePassedDownValues()}>
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;
