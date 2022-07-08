import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

function Footer() {
    const footerStyle = {
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        padding: '2vw 10vw',
        background: 'LightCyan'
    }
    const footerContent = {
        margin: '1vw',
        verticalAlign: 'center'
    }
    return (
        <>
            <div style={footerStyle}>
                <div style={footerContent}>
                    <img
                        alt="bookworm-logo"
                        src="https://v5.bootcss.com/docs/5.1/assets/brand/bootstrap-logo.svg"
                        width="65"
                        height="65"
                        className="d-inline-block align-top"
                    />
                </div>
                <div style={footerContent}>
                    <b>BOOKWORM</b><br/>
                    Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                    Phone Number: +XX XXXXXXXX
                </div>
            </div>
        </>
    );
} export default Footer;
