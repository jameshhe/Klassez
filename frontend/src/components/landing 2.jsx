import React from "react";
import {Link} from "react-router-dom";

const Landing = () => {

    return (
        <div className="container-fluid landing-container">
            <div className="d-flex justify-content-center flex-column">
                <h1 className="mx-auto">
                    <b>Welcome</b> to Klassez
                </h1>
                <p className="mx-auto text-secondary">
                    Slogan
                </p>
                <div className="mx-auto d-flex justify-content-center">
                    <Link
                        to="/login"
                        className="btn btn-primary m-2"
                    >Log In</Link>
                    {/*<Link*/}
                    {/*    to="/register"*/}
                    {/*    style={{*/}
                    {/*        width: "140px",*/}
                    {/*        borderRadius: "3px",*/}
                    {/*        letterSpacing: "1.5px",*/}
                    {/*        */}
                    {/*    }}*/}
                    {/*    className="btn btn-large btn-flat waves-effect blue black-text m-2"*/}
                    {/*>Register</Link>*/}
                    <Link
                        to="/register"
                        className="btn btn-primary m-2"
                    >Register</Link>
                    
                </div>
            </div>
        </div>
    );


}

export default Landing;
