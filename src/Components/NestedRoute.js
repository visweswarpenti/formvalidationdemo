import React, { Component } from 'react'

class NestedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'nested route'
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
export default NestedRoute;