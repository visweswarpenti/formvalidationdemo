import axios from 'axios';
import React, { Component } from 'react'
import DashBoard from './DashBoard';
import { connect } from 'react-redux'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Login form',
            userName: '',
            password: '',
            user: {}
        }

        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                config.headers.authorization = `Bearer ${token}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        if (name === "username") {
            this.setState({ userName: value });
        }
        else if (name === "password") {
            this.setState({ password: value })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const scope = this;
        if (this.state.userName.length > 0 && this.state.password.length > 0) {
            const logininfo = {
                userName: this.state.userName,
                password: this.state.password
            }
            axios.post('/authentication/login', logininfo).then(function (response) {
                scope.setState({ user: response.data })
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log(localStorage.getItem('user'));

                scope.props.dispatch({
                    type: 'ADD_USER',
                    payload: response.data
                })
            }
            ).catch(function (error) {
                window.alert('issue with server or user is not found')
                console.log(error);
            })
        }
    }

    render() {

        if (Object.keys(this.state.user).length !== 0) {
            return <DashBoard />
        }

        return (
            <div class="container h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-10 col</div>-md-8 col-lg-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="justify-content-center align-items-center">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">UserName</label>
                                    <input name="username" type="text" className="form-control" onChange={this.handleChange} />
                                    <div id="emailHelp" className="form-text">We'll never share your user name with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChange} />
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)