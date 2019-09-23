import React from 'react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datePicker';
import Moment from 'Moment';

const formValid = function (formErrors, ...rest) {
    let valid = true;

    if (formErrors.expirydate.length > 0 || formErrors.type.length > 0) {
        valid = false;
    }
    return valid;
};
class List extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.upData = this.upData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log("props");
        console.log(this.props.expirydate);
        this.state = {
            showEditSection: false,
            expirydate: this.props.expirydate,
            type: this.props.type,
            formErrors: {
                type: "",
                expirydate: ""

            }
        };
    }
    handleChange(e) {
        console.log("handleChange");
        //e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "type":
                if (value.length == 0) {
                    formErrors.type = "language cannot be null";
                } else {
                    formErrors.type = "";
                }
                break;
            case "expirydate":
                if (value.length == 0) {
                    formErrors.expirydate = "level cannot be null";
                } else {
                    formErrors.expirydate = "";
                }
                break;
        }

        if (name == "expirydate") {

            this.setState({
                expirydate: value
            });
        } else if (name == "type") {

            this.setState({
                type: value
            });
        }
    }
    handleDateChange(date) {

        this.setState({
            expirydate: date
        });
        console.log(this.state.expirydateData.expirydate);
    }
    openEdit() {

        this.setState({
            showEditSection: true

        });
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }
    upData(e) {

        var formErrors = this.state.formErrors;
        var validate = formValid(formErrors);
        if (validate) {
            this.props.upData(this.props.index, this.state.expirydate, this.state.type);
            this.setState({
                showEditSection: false
            });
        } else {
            alert("FORM INVALID - DISPLAY ERROR MESSAGE");
        }

    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        );

    }

    renderEdit() {
        const { formErrors } = this.state;
        return (
            <tr id={this.props.index} className="alt">

                <td>
                    <select
                        className="ui dropdown"
                        defaultValue={this.props.type}
                        name="type"
                        value={this.state.type}
                        onChange={this.handleChange.bind(this)}
                        required
                    >
                        <option value="">visa type</option>
                        <option value="Citizen">Citizen</option>
                        <option value="Permanent Resident">Permanent Resident</option>
                        <option value="Work Visa">Work Visa</option>
                        <option value="Student Visa">Student Visa</option>

                    </select>
                    {formErrors.type.length > 0 && (
                        <span className="errorMessage">{formErrors.type}</span>
                    )}
                </td>
                <td>

                    <DatePicker
                        defaultValue={this.props.expirydate}
                        name="expirydate"
                        value={this.state.expirydate}
                        selected={this.state.expirydate}
                        onChange={this.handleDateChange.bind(this)}
                        dateFormat="MMMM dd DD, YYYY"
                    />
                </td>
                <td>
                    <button type="button" className="ui blue basic button" onClick={this.upData}>update</button>
                </td>
                <td>
                    <button type="button" className="ui pink basic button" onClick={this.closeEdit}>cancle</button>
                </td>

            </tr>);
    }
    renderDisplay() {

        return (
            <tr id={this.props.index} className="alt">
                <td>

                    {this.props.type}
                </td>
                <td>

                    {Moment(this.props.expirydate).format('DD/MM/YYYY')}
                </td>



                <td>
                    <button type="button" className="ui  button" onClick={this.openEdit}><i className="pencil icon"></i></button>
                    <button onClick={this.props.delete} className="ui  button" data-index={this.props.index}><i className="x icon"></i></button>
                </td>

            </tr>);
    }
}
export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.upData = this.upData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            lists: [],
            showEditSection: false,

            expirydateData: {
                type: "",
                expirydate: new Date(),


            },
            formErrors: {
                type: "type cannot be null",
                expirydate: ""

            }
        };
    }
    openEdit() {
        const expirydateData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            expirydateData: expirydateData
        });
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }
    handleChange(e) {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "type":
                if (value.length == 0) {
                    formErrors.type = "type cannot be null";
                } else {
                    formErrors.type = "";
                }
                break;
        }
        console.log("handlechange");
        console.log(name);
        console.log(value);
        this.setState({
            formErrors,
            expirydateData: {
                type: value,
            }
        }, () => console.log(this.state));
    }
    add() {

        var formErrors = this.state.formErrors;
        var validate = formValid(formErrors);
        if (validate) {
            const lists = this.state.lists;
            const expirydate = this.state.expirydateData.expirydate;
            const type = this.state.expirydateData.type;

            // lists.push({ "id": ++i, "value": expirydate, "type": type });
            lists.push(
                <List key={this.state.lists.length} index={this.state.lists.length} expirydate={expirydate}

                    type={type} update={this.update} delete={this.delete} upData={this.upData}
                />);
            this.setState({
                lists: lists,
                expirydateData: {

                    type: type
                }
            });
            const data = Object.assign({}, this.state.expirydateData);
            this.props.controlFunc(this.props.componentId, data);
        } else {
            alert("FORM INVALID - DISPLAY ERROR MESSAGE");
        }

    }
    delete(e) {
        var index = e.target.getAttribute("data-index");
        var lists = this.state.lists;

        console.log(index);
        lists.splice(index, 1);

        this.setState({
            lists: lists
        });
    }
    upData(i, x, type) {

        var lists = this.state.lists;
        var list = <List key={i} index={i} expirydate={x}

            type={type} update={this.update} delete={this.delete} upData={this.upData}
        />;
        lists[i] = list;

        this.setState({
            lists: lists
        });
    }
    handleDateChange(date) {
        var expirydate = Moment(date).format('YYYY-MM-DD')

        this.setState({
            expirydateData: {
                expirydate: date,
                type: this.state.expirydateData.type
            }

        });
        console.log(this.state.expirydateData.expirydate)
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        );

    }

    renderEdit() {
        const { formErrors } = this.state;
        return (
            <div>
                <form className="ui form">
                    <div className="form-group row fields">
                        <div className="field">
                            <select
                                className="ui dropdown"
                                name="type"
                                value={this.state.expirydateData.type}
                                onChange={this.handleChange.bind(this)}
                                required

                            >
                                <option value="">visa type</option>
                                <option value="Citizen">Citizen</option>
                                <option value="Permanent Resident">Permanent Resident</option>
                                <option value="Work Visa">Work Visa</option>
                                <option value="Student Visa">Student Visa</option>

                            </select>
                            {formErrors.type.length > 0 && (
                                <span className="errorMessage">{formErrors.type}</span>
                            )}
                        </div>

                        <div className="field">

                            <DatePicker
                                placeholder="Add expirydate"
                                id="expirydate"
                                selected={this.state.expirydateData.expirydate}
                                onChange={this.handleDateChange}
                                dateFormat="DD dd MMMM, YYYY"
                            />

                        </div>
                        <div className="field">
                            <button type="button" className="ui teal button" onClick={this.add}>Add</button>
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </div>
                    </div>
                </form>

                <table className="ui table">
                    <thead>
                        <tr>
                            <th>type</th>
                            <th>expirydate</th>

                            <th>
                                <button type="button" className="ui black button" onClick={this.openEdit}><i className="plus icon"></i>Add</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lists}
                    </tbody>

                </table>
            </div>);
    }

    renderDisplay() {
        return (
            <div>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>type</th>
                            <th>expirydate</th>

                            <th>
                                <button type="button" className="ui black button" onClick={this.openEdit}><i className="plus icon"></i>Add</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lists}
                    </tbody>
                </table>
            </div>
        );
    }
}