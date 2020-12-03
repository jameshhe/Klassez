import React from "react";
import {Link} from "react-router-dom";

const Landing = () => {

    return (
        <div className="landing-container h-100">
            <div className="h-100 row text-center justify-content-center align-items-center">
                <div>
                    <h1 className="mx-auto display-1 text-white">
                        <b>Introducing</b> Klassez
                    </h1>
                    <p className="text-white text-lg-center lead">
                        Planning classes made easy
                    </p>
                    <div className="mx-auto justify-content-center">
                        <div className="row">
                            <div className="col-md-12">
                                <Link
                                    to="/login"
                                    className="btn btn-primary m-2"
                                >Log In</Link>
                                <Link
                                    to="/register"
                                    className="btn btn-primary m-2"
                                >Register</Link>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Link
                                    to="/classList"
                                    className="btn btn-info m-2"
                                >View Classes</Link>
                            </div>

                        </div>


                    </div>
                </div>

            </div>

        </div>
    );


}

export default Landing;
