import React, { Component } from 'react'
import axios from 'axios'
import UserForm from './UserForm';
import Home from './Home'
import About from './About'
import Contact from './Contact'
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from './Login'
import AppRedux from '../AppRedux';
import { connect } from 'react-redux'

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signOut: false
        }
    }

    handleButton = () => {
        localStorage.setItem('token', '')
        //this.setState({ signOut: true })
        this.props.dispatch({
            type: 'ADD_USER',
            payload: {}
        })
    }

    render() {
        if (this.state.signOut === true) {
            // return <Login />
        }

        return (
            <div>
                <div>
                    <Link to="/">Home | </Link>
                    <Link to="/about">About | </Link>
                    <Link to="/contact">Contact | </Link>
                    <Link to="/userform">UserForm | </Link>
                    <Link onClick={this.handleButton}>Sign Out | </Link>
                    <Link to="/appredux">App Redux | </Link>
                </div>

                <br />
                <br />

                <main>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/about" component={About} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/userform" component={UserForm} />
                        <Route path="/appredux" component={AppRedux} />
                    </Switch>
                </main>

                <br />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(
    null,
    mapDispatchToProps
)(DashBoard)
