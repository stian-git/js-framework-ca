import React from "react";
import PropTypes from "prop-types";

function Header({ size = "1", text, children }) {
    const HeaderSize = `h${size}`;
    return (
        <HeaderSize>
            {text}
            {children}
        </HeaderSize>
    );
}

export default Header;

Header.propTypes = {
    size: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.object,
};
