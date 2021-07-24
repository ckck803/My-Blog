import React, { useState } from 'react';



const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <div className="container">

                <a className="navbar-brand" href="#">Victor</a>

                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                <div className="ml-auto d-felx justify-content-around " id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Header;