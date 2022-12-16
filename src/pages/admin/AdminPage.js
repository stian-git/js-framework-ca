import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import LoginContext from "../../context/LoginContext";
import ErrorPage from "../error/ErrorPage";

export default function AdminPage() {
    const [login] = useContext(LoginContext);
    const history = useNavigate();
    // if user is on the Admin page while logging out, we move the user Home
    useEffect(() => {
        if (!login) {
            history("/");
        }
    });
    return (
        <>
            {login ? (
                <>
                    <Header text="Admin" />
                    <p>This text and the corresponding navbar-link is only visible when you are logged in.</p>
                </>
            ) : (
                <ErrorPage />
            )}
        </>
    );
}
