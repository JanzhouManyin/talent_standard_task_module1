import React from 'react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
 
import Moment from 'Moment';
import { DatePicker } from 'antd';
const dateFormat = 'YYYY/MM/DD';
 
 
export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.Save = this.Save.bind(this);
        this.state = {
            showEditSection: false,
            visaData: {
                visaStatus: "",
                visaExpiryDate:new Date()
            },
            formErrors: {
                visaStatus: "sss",
               

            }
        }
      
    }
    openEdit() {
        const visaData = Object.assign({}, this.props.visaData);
        this.setState({
            showEditSection: true,
            visaData: visaData
        });
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }
    handleChange(e) {
        let formErrors = this.state.formErrors;
        if (e.target.value.length == 0) {
            formErrors.visaStatus = "status cannot be null";
        } else {
            formErrors.visaExpiryDate = "";
        }
        this.setState({
            visaData: {
                visaStatus: e.target.value,
                visaExpiryDate: this.state.visaData.visaExpiryDate
            }
        });
    }
    onChange(date, dateString) {
        this.setState({
            visaData: {
                visaStatus: this.state.visaData.visaStatus,
                visaExpiryDate: dateString
            }
        });
    }

    Save() {
        const data = Object.assign({}, this.state.visaData);
        this.props.controlFunc(this.props.componentId, data);
    }
    render() {
       
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        return (
            <div>
                <form className="ui form">
                    <div className="form-group row fields">
                        <div className="field">
                            <select
                                className="ui dropdown"
                                name="type"
                                value={this.state.visaData.visaStatus}
                                onChange={this.handleChange}
                                required
                            >
                                <option value="">visa type</option>
                                <option value="Citizen">Citizen</option>
                                <option value="Permanent Resident">Permanent Resident</option>
                                <option value="Work Visa">Work Visa</option>
                                <option value="Student Visa">Student Visa</option>
                            </select>
                        </div>

                        <div className="field">
                            <DatePicker
                                name="type"
                                value={Moment(this.state.visaData.visaExpiryDate)}
                                onChange={this.onChange}
                                required
                            />
                        </div>

                        <div className="field">
                            <button type="button" className="ui right floated teal button" onClick={this.Save}>Save</button>                      
                        </div>

                        <div className="field">
                            <button type="button" className="ui right floated teal button" onClick={this.closeEdit}>Cancel</button>                     
                        </div>
                    </div>
                </form>
                
            </div>
        );

    }
    renderDisplay() {
        let visaStatus = this.props.visaData ? this.props.visaData.visaStatus : ""
        let visaExpiryDate = this.props.visaData ? this.props.visaData.visaExpiryDate : ""
      
        return (
            <div className='row'>
              

                <form className="ui form">
                    <div className="form-group row fields">
                        <div className="field">
                            <input type="text" defaultValue={visaStatus} readOnly="readOnly" />
                        </div>

                        <div className="field">
                            <input type="text" defaultValue={Moment(this.state.visaData.visaExpiryDate).format('YYYY/MM/DD')} readOnly="readOnly" />
                        </div>

                        <div className="field">
                            <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>                                                 
                        </div>
                    </div>
                </form>
            </div>
            )
    }
}

 