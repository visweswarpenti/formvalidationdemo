import React, { Component } from 'react'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Contact'
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

export default Contact;