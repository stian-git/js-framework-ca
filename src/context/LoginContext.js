import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const LoginContext = React.createContext([null, () => {}]);

export const LoginProvider = (props) => {
    const [login, setLogin] = useLocalStorage("auth", null);
    return <LoginContext.Provider value={[login, setLogin]}>{props.children}</LoginContext.Provider>;
};

export default LoginContext;
