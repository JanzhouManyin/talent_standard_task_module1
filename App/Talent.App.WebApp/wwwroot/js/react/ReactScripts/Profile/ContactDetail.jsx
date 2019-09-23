import React, { Component } from "react";
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Location } from '../Employer/CreateJob/Location.jsx';
const emailRegex = RegExp(
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
); 
const phoneRegex = RegExp(
    /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
); 

export class IndividualDetailSection extends Component {
    constructor(props) {
        super(props);
        const details = props.details ?
            Object.assign({}, props.details)
            : {
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details,
            formErrors: {
                firstName: "firstName cannot be null",
                lastName: "lastName cannot be null",
                email: "email cannot be null",
                phone: "phone cannot be null"
            }
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)

        var formfirstName = this.state.formErrors.firstName;
        var formlastName = this.state.formErrors.lastName;
        var formemail = this.state.formErrors.email;
        var formphone = this.state.formErrors.phone;     

        details.firstName == "" ? formfirstName = formfirstName : formfirstName = "";
        details.lastName == "" ? formlastName = formlastName : formlastName = "";
        details.email == "" ? formemail = formemail : formemail = "";
        details.phone == "" ? formphone = formphone : formphone = "";
        
        this.setState({
            showEditSection: true,
            newContact: details,
            formErrors: {
                firstName: formfirstName,
                lastName: formlastName,
                email: formemail,
                phone: formphone,             
            },
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "firstName":
                if (value.length == 0) {
                    formErrors.firstName = "firstName cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.firstName = "minimum 2 characaters required";
                } else if (value.length > 20) {
                    formErrors.firstName = "maxmum 20 characaters required";
                } else {
                    formErrors.firstName = "";
                }
                break;
            case "lastName":
                if (value.length == 0) {
                    formErrors.lastName = "lastName cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.lastName = "minimum 2 characaters required";
                } else if (value.length > 20) {
                    formErrors.lastName = "maxmum 20 characaters required";
                } else {
                    formErrors.lastName = "";
                }
                break;
            case "email":
                if (value.length == 0) {
                    formErrors.email = "email cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.email = "minimum 2 characaters required";
                } else if (value.length > 50) {
                    formErrors.email = "maxmum 50 characaters required";
                } else if (emailRegex.test(value) == false) {
                    formErrors.email = "invalid email format";
                } else {
                    formErrors.email = "";
                }
                break;
            case "phone":
                if (value.length == 0) {
                    formErrors.phone = "phone cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.phone = "minimum 2 characaters required";
                } else if (value.length > 50) {
                    formErrors.phone = "maxmum 10 characaters required";
                } else if (phoneRegex.test(value) == false) {
                    formErrors.phone = "invalid phone format";
                } else {
                    formErrors.phone = "";
                }
                break;
        }
        const data = Object.assign({}, this.state.newContact);
        data[event.target.name] = event.target.value;
        this.setState({
            formErrors,
            newContact: data
        });
        
    }

    saveContact() {
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        const { formErrors } = this.state;
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="First Name"
                    name="firstName"
                    value={this.state.newContact.firstName}
                    controlFunc={this.handleChange}
                    maxLength={20}
                    placeholder="Enter your first name"
                    errorMessage="Please enter a valid first name"
                />
                {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                )}
                <ChildSingleInput
                    inputType="text"
                    label="Last Name"
                    name="lastName"
                    value={this.state.newContact.lastName}
                    controlFunc={this.handleChange}
                    maxLength={20}
                    placeholder="Enter your last name"
                    errorMessage="Please enter a valid last name"
                />
                {formErrors.lastName.length > 0 && (
                    <span className="errorMessage">{formErrors.lastName}</span>
                )}
                <ChildSingleInput
                    inputType="text"
                    label="Email address"
                    name="email"
                    value={this.state.newContact.email}
                    controlFunc={this.handleChange}
                    maxLength={50}
                    placeholder="Enter an email"
                    errorMessage="Please enter a valid email"
                />
                {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                )}
                <ChildSingleInput
                    inputType="text"
                    label="Phone number"
                    name="phone"
                    value={this.state.newContact.phone}
                    controlFunc={this.handleChange}
                    maxLength={12}
                    placeholder="Enter a phone number"
                    errorMessage="Please enter a valid phone number"
                />
                {formErrors.phone.length > 0 && (
                    <span className="errorMessage">{formErrors.phone}</span>
                )}

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let fullName = this.props.details ? `${this.props.details.firstName} ${this.props.details.lastName}` : ""
        let email = this.props.details ? this.props.details.email : ""
        let phone = this.props.details ? this.props.details.phone : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Name: {fullName}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}


export class CompanyDetailSection extends Component {
    constructor(props) {
        super(props)

        const details = props.details ?
            Object.assign({}, props.details)
            : {
                name: "",
                email: "",
                phone: ""
            }

        this.state = {
            showEditSection: false,
            newContact: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact() {
        const data = Object.assign({}, this.state.newContact)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let location = { city: '', country: '' }
        if (this.state.newContact && this.state.newContact.location) {
            location = this.state.newContact.location
        }

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Name"
                    name="name"
                    value={this.state.newContact.name}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your last name"
                    errorMessage="Please enter a valid name"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Email address"
                    name="email"
                    value={this.state.newContact.email}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter an email"
                    errorMessage="Please enter a valid email"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Phone number"
                    name="phone"
                    value={this.state.newContact.phone}
                    controlFunc={this.handleChange}
                    maxLength={12}
                    placeholder="Enter a phone number"
                    errorMessage="Please enter a valid phone number"
                />
                Location:
                <Location location={location} handleChange={this.handleChange} />
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let companyName = this.props.details ? this.props.details.name : ""
        let email = this.props.details ? this.props.details.email : ""
        let phone = this.props.details ? this.props.details.phone : ""
        let location = {city:'',country:''}
        if (this.props.details && this.props.details.location) {
            location = this.props.details.location
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Name: {companyName}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone}</p>
                        <p> Location: {location.city}, {location.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

