import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Home'
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
            </div>
        )
    }
}

export default Home;