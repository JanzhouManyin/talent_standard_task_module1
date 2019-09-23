import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobSeekingStatus: {
                status: "",
                availableDate: null
            },
            value: {
                jobSeekingStatus: {
                    status: "",
                    availableDate: null
                }
            },
            radioValue: "LookingFor"
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveContact = this.saveContact.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        var radioValue = nextProps.status.status;
        this.setState({
            radioValue: radioValue
        });
    } 
    handleChange(event) {
        this.setState({
            value: {
                jobSeekingStatus: {
                    status: event.target.value,
                    availableDate: null
                }              
            },
            radioValue: event.target.value
        });
         
    }
    
    saveContact() {        
        const data = Object.assign({}, this.state.value);
        this.props.controlFunc(this.props.componentId, data);
       // this.closeEdit();
    }
    render() {
        const radioValue = this.state.radioValue;
     
        return (
            <div>
                <div className="ui form">
                    <div className="grouped fields">
                        <label>Please select you current status!</label>
                        <div className="field">
                            <label>
                                <input checked={radioValue == "LookingFor"} type="radio" name='jobhunting' value="LookingFor" onChange={this.handleChange} />
                                Actively looking for a job
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <input checked={radioValue == "NotLookingFor"} type="radio" name='jobhunting' value="NotLookingFor" onChange={this.handleChange} />
                                Not looking for a job at the moment
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <input checked={radioValue == "EmployedOpentoOffers"} type="radio" name='jobhunting' value="EmployedOpentoOffers" onChange={this.handleChange} />
                                Currenttly employed but open to offers
                            </label>
                        </div>
                        <div className="field">
                            <label>
                                <input checked={radioValue == "AvailableLater"} type="radio" name='jobhunting' value="AvailableLater" onChange={this.handleChange} />
                                will be available on later date
                            </label>
                        </div>

                        <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    </div>
                </div>

            </div>
        );
    }

 
}