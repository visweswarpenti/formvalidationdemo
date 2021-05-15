import React, { Component } from 'react'
import axios from 'axios'

class UserForm extends Component {
    constructor(props) {
        super(props);
        axios.defaults.baseURL = 'https://localhost:44339';
        this.state = {
            fields: {
                name: {
                    key: 'name',
                    field: 'textbox',
                    label: 'Name',
                    required: true,
                    errorMessage: '',
                    value: ''
                },
                username: {
                    key: 'username',
                    field: 'textbox',
                    label: 'User Name',
                    required: true,
                    errorMessage: '',
                    value: ''
                },
                password: {
                    key: 'password',
                    field: 'password',
                    label: 'Password',
                    required: true,
                    errorMessage: '',
                    value: ''
                },
                confirmpassword: {
                    key: 'confirmpassword',
                    field: 'password',
                    label: 'Confirm Password',
                    required: true,
                    errorMessage: '',
                    compare: 'password',
                    compareErrorMessage: 'Confirm password and password is not same',
                    value: ''
                },
                contact: {
                    key: 'contact',
                    field: 'textbox',
                    label: 'Contact',
                    required: true,
                    errorMessage: '',
                    regex: '^[0-9]{10}$',
                    value: ''
                },
                country: {
                    key: 'country',
                    field: 'dropdown',
                    label: 'Country',
                    required: true,
                    errorMessage: '',
                    value: '',
                    data: []
                },
                city: {
                    key: 'city',
                    field: 'dropdown',
                    label: 'City',
                    required: true,
                    errorMessage: '',
                    value: '',
                    data: []
                },
                acceptterms: {
                    key: 'acceptterms',
                    field: 'checkbox',
                    label: 'acceptterms',
                    required: true,
                    errorMessage: '',
                    value: ''
                }
            }
        }
    }


    componentDidMount() {
        this.getCountries();
    }

    getCountries = () => {
        var scope = this;
        axios.get('/DataProvider/GetCountries')
            .then(function (response) {
                response.data.unshift({
                    name: '--select country--',
                    description: '--select country--'
                });
                scope.state.fields["country"].data = response.data;
                scope.updateState();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    updateCities = (value) => {
        var scope = this;
        axios.get('/DataProvider/GetCities?countryName=' + value)
            .then(function (response) {
                response.data.unshift({
                    name: '--select city--',
                    description: '--select city--'
                });
                scope.state.fields["city"].data = response.data;
                scope.updateState();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    validateForm = () => {
        for (var fieldObj in this.state.fields) {
            const data = this.state.fields[fieldObj];
            data.errorMessage = '';
            if ((data.field === "textbox" || data.field === "password") && data.value === '') {
                data.errorMessage = "Please enter " + data.label;
            }
            else if (data.field === "dropdown" && (data.value === '' || data.value.startsWith('--'))) {
                data.errorMessage = "Please select " + data.label;
            }
            else if (data.field === "checkbox" && (data.value === '' || data.value === false)) {
                data.errorMessage = "Please accept terms and conditions ";
            }
            else if (data.value.length > 0 && data.field === "textbox" && data.key === "contact") {
                let regEmail = new RegExp(data.regex);
                if (!regEmail.test(data.value)) {
                    data.errorMessage = "Phone number is not correct";
                }
            }

            if (data.value.length > 0 && data.key === "confirmpassword") {
                if (data.value !== this.state.fields["password"].value) {
                    data.errorMessage = "password and confirm password is not same";
                }
            }
        }
    }

    updateState = () => {
        this.setState({ fields: this.state.fields });
    }

    handleChange = (e) => {
        e.preventDefault();
        var name = e.target.name;
        const value = e.target.value;
        this.state.fields[name].value = value;

        if (name === "country") {
            if (!value.startsWith('--')) {
                this.updateCities(value);
            }
            else {
                this.state.fields["city"].data = [];
            }
        }

        this.validateForm();
        this.updateState();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateForm();
        this.updateState();
        const errorMessage = (element) => {
            return element.errorMessage.length > 0;
        }
        if (Object.values(this.state.fields).some(errorMessage)) {
            console.log('still there are error messages');
        }
        else {
            console.log('no error message');
            var formData = {};
            for (var fieldObj in this.state.fields) {
                const data = this.state.fields[fieldObj];
                formData[data.key] = data.value;
            }
            this.SendDataToApi(formData);
        }
    }

    SendDataToApi = (formData) => {
        var scope = this;
        axios.post('DataSaver/Signup', formData)
            .then(function (response) {
                window.alert('data saved successfully');
                Object.values(scope.state.fields).map(obj => obj.value = '');
                scope.updateState();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleCheck = (e) => {
        var name = e.target.name;
        this.state.fields[name].value = this.state.fields[name].value === '' || this.state.fields[name].value === false ? true : false;
        this.validateForm();
        this.updateState();
    }

    render() {
        let fields = [];
        let control;
        for (var fieldObj in this.state.fields) {
            const currentField = this.state.fields[fieldObj];

            if (currentField.field === "textbox") {
                control = <div className="col-md-4">
                    <label className="form-label">{currentField.label}</label>
                    <input name={currentField.key} value={currentField.value} type="text" className="form-control" onChange={this.handleChange} />
                    <label style={{ color: 'red' }}> {currentField.errorMessage.length > 0 ? currentField.errorMessage : ''} </label>
                </div>
            }
            else if (currentField.field === "password") {
                control = <div className="col-md-4">
                    <label className="form-label">{currentField.label}</label>
                    <input name={currentField.key} type="password" value={currentField.value} className="form-control" onChange={this.handleChange} />
                    <label style={{ color: 'red' }}> {currentField.errorMessage.length > 0 ? currentField.errorMessage : ''} </label>
                </div>
            }
            else if (currentField.field === "dropdown") {
                control = <div className="col-md-4">
                    <label className="form-label">{currentField.label}</label>
                    <select name={currentField.key} value={currentField.value} className="form-select" onChange={this.handleChange}>
                        {currentField.data.map(obj => (<option> {obj.name} </option>))}
                    </select>
                    <label style={{ color: 'red' }}> {currentField.errorMessage.length > 0 ? currentField.errorMessage : ''} </label>
                </div>
            }
            else if (currentField.field === "checkbox") {
                control = <div className="col-12">
                    <div className="form-check">
                        <input name={currentField.key} checked={currentField.value} className="form-check-input" type="checkbox" onChange={this.handleCheck} defaultChecked={currentField.value} />
                        <label className="form-check-label" for="invalidCheck">
                            Agree to terms and conditions
                        </label>
                        <label style={{ color: 'red' }}> {currentField.errorMessage.length > 0 ? currentField.errorMessage : ''} </label>
                    </div>
                </div>
            }
            fields.push(control);
        }

        return (
            <div>
                <form className="row g-3" onSubmit={this.handleSubmit}>
                    {fields.map(field => field)}
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserForm;
