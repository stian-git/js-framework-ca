import axios from "axios";
import React, { useContext, useState } from "react";
import LoginContext from "../context/LoginContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const url = process.env.REACT_APP_WP_BASE_URL + "jwt-auth/v1/token";

const schema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password"),
});

function LoginForm() {
    const [authenticating, setAuthenticating] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [login, setLogin] = useContext(LoginContext);
    const history = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function doLogin(data) {
        setAuthenticating(true);
        setLoginError(null);
        try {
            const response = await axios.post(url, data);
            setLogin(response.data);
            history("/admin");
        } catch (e) {
            setLoginError("Login failed. Please try again.");
        } finally {
            setAuthenticating(false);
        }
    }

    return (
        <>
            {loginError ? <p className="statusbox statusbox-error">{loginError.toString()}</p> : ""}
            <Form onSubmit={handleSubmit(doLogin)}>
                <fieldset hidden={login}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Control type="text" placeholder="Username" {...register("username")} />
                        <Form.Text className="text-muted">{errors.username && <span className="form-requirement">{errors.username.message}</span>}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control type="password" placeholder="Password" {...register("password")} />
                        <Form.Text className="text-muted">{errors.password && <span className="form-requirement">{errors.password.message}</span>}</Form.Text>
                    </Form.Group>
                    <Button type="submit">{authenticating ? "Logging in" : "Login"}</Button>
                </fieldset>
            </Form>
        </>
    );
}

export default LoginForm;
