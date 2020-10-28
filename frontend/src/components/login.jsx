import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../actions/authActions";
import classnames from "classnames";
import "./register/register.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/"); // push user to dashboard when they login
        }
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    render() {
        const error = this.state.error;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-5 col-5 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-body">
                                <div>
                                    <p className="grey-text text-darken-1">
                                        Don't have an account yet? <Link to="/register">Register</Link> Now!
                                    </p>
                                </div>
                                <h5 className="card-title text-center">Login</h5>
                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            id="email"
                                            type="email"
                                            className={classnames("form-control", {
                                                invalid: error.email || error.emailnotfound
                                            })}
                                        />
                                        <label htmlFor="email">Email</label>
                                        <span className="red-text">
                                    {error.email}
                                            {error.emailnotfound}</span>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            id="password"
                                            type="password"
                                            className={classnames("form-control", {
                                                invalid: error.password || error.passwordincorrect
                                            })}
                                        />
                                        <label htmlFor="password">Password</label>
                                        <span className="red-text">
                                    {error.password}
                                            {error.passwordincorrect}</span>
                                    </div>

                                    <hr/>

                                        <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                                type="submit">Login
                                        </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
export default connect(
    mapStateToProps,
    {login}
)(Login);