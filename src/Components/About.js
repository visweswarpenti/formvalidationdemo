import React, { Component } from 'react'
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import UserForm from './UserForm';
import Home from './Home'
import Contact from './Contact'
import NestedRoute from './NestedRoute';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'About'
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <div>
                    <div>
                        <Link to="/about/nestedroute1">nested route1 | </Link>
                        <Link to="/about/nestedroute2">nested route2 | </Link>
                        <Link to="/about/nestedroute3">nested route3 | </Link>
                        <Link to="/about/nestedroute4">nested route4 | </Link>
                    </div>
                    <div>
                        <Switch>
                            <Route path="/about/nestedroute1" component={NestedRoute} />
                            <Route path="/about/nestedroute2" component={NestedRoute} />
                            <Route path="/about/nestedroute3" component={NestedRoute} />
                            <Route path="/about/nestedroute4" component={NestedRoute} />
                        </Switch>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}
export default About;