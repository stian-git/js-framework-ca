import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginContext from "../context/LoginContext";

function Navigation() {
    const [login, setLogin] = useContext(LoginContext);
    function doLogout() {
        setLogin(null);
    }
    return (
        <Navbar collapseOnSelect expand="md" className="">
            <Navbar.Brand href="/" className="navbar__brand">
                <img className="navbar__brand-logo" src="/images/gamez-logo-b7b51e.png" alt="GameZ Logo" title="Gamez Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="navbar__link" to="/">
                        Home
                    </NavLink>
                    <NavLink className="navbar__link" to="/favourites">
                        Favourites
                    </NavLink>
                    <NavLink className="navbar__link" to="/contact">
                        Contact
                    </NavLink>
                    {login ? (
                        <NavLink to="/admin" className="navbar__link">
                            Admin
                        </NavLink>
                    ) : (
                        ""
                    )}
                </Nav>
                <Nav>
                    {login ? (
                        <NavLink onClick={doLogout} className="navbar__link navbar__link-login">
                            Logout ({login.user_display_name})
                        </NavLink>
                    ) : (
                        <NavLink to="/login" className="navbar__link">
                            Login
                        </NavLink>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
