import React, { Component } from 'react'
import Login from './Components/Login'
import axios from 'axios'
import DashBoard from './Components/DashBoard';
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'https://localhost:44339';
  }

  render() {

    if (typeof this.props.user === 'object' && Object.keys(this.props.user).length === 0) {
      return <Login></Login>
    }

    const retrievedObject = localStorage.getItem('user');
    if (typeof retrievedObject === 'string' && retrievedObject !== null) {
      const user = JSON.parse(retrievedObject);
      if (Object.keys(user).length === 0) {
        return <Login />
      }
      else {
        return <div>
          <DashBoard />
        </div>
      }
    }
    return <Login />
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  null
)(App)
