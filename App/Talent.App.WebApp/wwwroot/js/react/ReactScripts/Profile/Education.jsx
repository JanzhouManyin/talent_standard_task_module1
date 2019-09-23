/* Education section */
import React from 'react';
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../../wwwroot/util/jsonFiles/countries.json'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import Moment from 'Moment';
import { DatePicker } from 'antd';
import DateRangePicker from 'react-bootstrap-daterangepicker'
 

export default class Education extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            linkedAccounts: {
                linkedIn: "",
                github: ""
            },
            linkedIn: "",
            formErrors: {
                linkedIn: "linkedIn cannot be null"               
            }
        }
    }

    handleChange(e) {
        e.preventDefault();
        console.log(this.state);
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "linkedIn":
                if (value.length < 3 && value.length > 0) {
                    formErrors.linkedIn = "minimum 3 characaters required";
                } else if (value.length == 0) {
                    formErrors.linkedIn = "linkedIn cannot be null";
                } else {
                    formErrors.linkedIn = ""
                }
                break;
        }
        this.setState({
            formErrors,
            linkedAccounts: {
                [name]: value
            }
            
        },
            () => console.log(this.state));
        console.log(this.state);
    }
    
    render() {        
        const { formErrors } = this.state;
        return (
            <div>
                <div className="linkedIn field">
                    <label htmlFor="linkedIn">linkedIn:</label>
                  
                    <ChildSingleInput
                        inputType="text"
                        label="linkedIn"
                        name="linkedIn"
                        value={this.state.linkedAccounts.linkedIn}
                        controlFunc={this.handleChange}
                        maxLength={100}
                        placeholder="Enter an linkedIn"
                        errorMessage="Please enter a valid url"
                    />
                    {formErrors.linkedIn.length > 0 && (
                        <span className="errorMessage">{formErrors.linkedIn}</span>
                    )}
                </div>
            </div>
        );
    }
   
}
