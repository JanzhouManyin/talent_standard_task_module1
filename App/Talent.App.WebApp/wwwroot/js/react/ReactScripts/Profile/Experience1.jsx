/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datePicker';
import Moment from 'Moment';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.upData = this.upData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showEditSection: false,
            company: this.props.company,
            position: this.props.position,
            startdate: this.props.startdate,
            enddate: this.props.enddate,
            responsability: this.props.responsability
        };
    }
    handleChange(e) {
        console.log("handleChange");
        e.preventDefault();
        const { name, value } = e.target;
        if (e.target.name == "company") {

            this.setState({
                company: e.target.value
            });
        } else if (e.target.name == "position") {

            this.setState({
                position: e.target.value
            });
        } else if (e.target.name == "startdate") {

            this.setState({
                startdate: e.target.value
            });
        } else if (e.target.name == "enddate") {

            this.setState({
                enddate: e.target.value
            });
        } else if (e.target.name == "responsability") {

            this.setState({
                responsability: e.target.value
            });
        }


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
        this.props.upData(this.props.index, this.state.company, this.state.position, this.state.startdate, this.state.enddate, this.state.responsability);
        this.setState({
            showEditSection: false
        });
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        );

    }

    renderEdit() {
        return (
            <tr id={this.props.index} className="alt">

                <td>
                    <ChildSingleInput
                        inputType="text"
                        defaultValue={this.props.company}

                        name="company"
                        value={this.state.company}
                        controlFunc={this.handleChange.bind(this)}
                        maxLength={10}
                        placeholder="Enter an company"
                        errorMessage="Please enter a valid company"
                    />
                </td>

                <td>
                    <ChildSingleInput
                        inputType="text"
                        defaultValue={this.props.position}

                        name="position"
                        value={this.state.position}
                        controlFunc={this.handleChange.bind(this)}
                        maxLength={10}
                        placeholder="Enter an position"
                        errorMessage="Please enter a valid position"
                    />
                </td>
                <td>
                    <ChildSingleInput
                        inputType="text"
                        defaultValue={this.props.startdate}

                        name="startdate"
                        value={this.state.startdate}
                        controlFunc={this.handleChange.bind(this)}
                        maxLength={10}
                        placeholder="Enter an startdate"
                        errorMessage="Please enter a valid startdate"
                    />
                </td>
                <td>
                    <ChildSingleInput
                        inputType="text"
                        defaultValue={this.props.enddate}

                        name="enddate"
                        value={this.state.enddate}
                        controlFunc={this.handleChange.bind(this)}
                        maxLength={10}
                        placeholder="Enter an enddate"
                        errorMessage="Please enter a valid enddate"
                    />
                </td>
                <td>
                    <ChildSingleInput
                        inputType="text"
                        defaultValue={this.props.responsability}

                        name="responsability"
                        value={this.state.responsability}
                        controlFunc={this.handleChange.bind(this)}
                        maxLength={10}
                        placeholder="Enter an responsability"
                        errorMessage="Please enter a valid responsability"
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
                    {this.props.company}
                </td>
                <td>

                    {this.props.position}
                </td>
                <td>

                    {this.props.startdate}
                </td>
                <td>

                    {this.props.enddate}
                </td>
                <td>

                    {this.props.responsability}
                </td>
                <td>
                    <button type="button" className="ui  button" onClick={this.openEdit}><i className="pencil icon"></i></button>
                    <button onClick={this.props.delete} className="ui  button" data-index={this.props.index}><i className="x icon"></i></button>
                </td>

            </tr>);
    }
}
export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.upData = this.upData.bind(this);

        this.state = {
            lists: [],
            showEditSection: false,

            companyData: {
                company: "",
                position: "",
                startdate: new Date(),
                enddate: new Date(),
                responsability: ""

            },
            formErrors: {
                company: "company cannot be null",
                position: "position cannot be null",
                startdate: "",
                enddate: "",
                responsability: "responsability cannot be null",

            },

        };
    }
    openEdit() {
        const companyData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            companyData: companyData
        });
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }
    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        switch (name) {
            case "company":
                if (value.length == 0) {
                    formErrors.company = "company cannot be null";
                } else {
                    formErrors.company = "";
                }
                break;
            case "position":
                if (value.length == 0) {
                    formErrors.position = "position cannot be null";
                } else {
                    formErrors.position = "";
                }
                break;
            case "responsability":
                if (value.length == 0) {
                    formErrors.responsability = "responsability cannot be null";
                } else {
                    formErrors.responsability = "";
                }
                break;
        }
        if (name == "company") {
            this.setState({
                formErrors,
                companyData: {
                    company: value,
                    position: this.state.companyData.position,
                    responsability: this.state.companyData.responsability
                }
            }, () => console.log(this.state)
            );
        } else if (name == "position") {
            this.setState({
                formErrors,
                companyData: {
                    company: this.state.companyData.company,
                    position: value,
                    responsability: this.state.companyData.responsability
                }
            },
                () => console.log(this.state)
            );
        } else if (name == "responsability") {
            this.setState({
                formErrors,
                companyData: {
                    company: this.state.companyData.company,
                    position: this.state.companyData.position,
                    responsability: value
                }
            },
                () => console.log(this.state)
            );
        }
    }
    add() {

        const lists = this.state.lists;
        const company = this.state.companyData.company;
        const position = this.state.companyData.position;
        const startdate = this.state.companyData.startdate;
        const enddate = this.state.companyData.enddate;
        const responsability = this.state.companyData.responsability;

        //const company = document.getElementById("company").value;
        //const position = document.getElementById("position").value;
        //const startdate = document.getElementById("startdate").value;
        //const enddate = document.getElementById("enddate").value;
        //const responsability = document.getElementById("responsability").value;
        // lists.push({ "id": ++i, "value": company, "position": position });
        lists.push(
            <List key={this.state.lists.length} index={this.state.lists.length} company={company}

                position={position} startdate={startdate} enddate={enddate} responsability={responsability} update={this.update} delete={this.delete} 
            />);
        this.setState({
            lists: lists,
            companyData: {
                company: company,
                position: position,
                startdate: startdate,
                enddate: enddate,
                responsability: responsability
            }
        });
        const data = Object.assign({}, this.state.companyData);
        this.props.controlFunc(this.props.componentId, data);
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
    upData(i, x, position, startdate, enddate, responsability) {
        console.log("lists");
        console.log(this.state.lists[0]);
        console.log(i);
        console.log(x);
        console.log(position);
        var lists = this.state.lists;
        var list = <List key={i} index={i} company={x}

            position={position} startdate={startdate} enddate={enddate} responsability={responsability} update={this.update} delete={this.delete} upData={this.upData}
        />;
        lists[i] = list;




        this.setState({
            lists: lists
        });
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
                    <div className="form-group row two fields">
                        <div className="field">

                            <ChildSingleInput
                                inputType="text"
                                label="company"
                                name="company"
                                value={this.state.companyData.company}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={100}
                                placeholder="Enter an company"
                                errorMessage="Please enter a valid company"
                            />
                            {formErrors.company.length > 0 && (
                                <span className="errorMessage">{formErrors.company}</span>
                            )}
                        </div>

                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="position"
                                name="position"
                                value={this.state.companyData.position}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={100}
                                placeholder="Enter an position"
                                errorMessage="Please enter a valid position"
                            />
                            {formErrors.position.length > 0 && (
                                <span className="errorMessage">{formErrors.position}</span>
                            )}
                        </div>
                    </div>
                    <div className="form-group row two fields">
                        <div className="field">
                            <label>startdate</label>
                            <input type="text" placeholder="Add startdate" id="startdate" />
                        </div>
                        <DatePicker
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeStart}
                        />

                        <div className="field">
                            <label>enddate</label>
                            <input type="text" placeholder="Add enddate" id="enddate" />
                        </div>
                        <DatePicker
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEnd}
                        />
                    </div>

                    <div className="field">
                        <ChildSingleInput
                            inputType="text"
                            label="responsability"
                            name="responsability"
                            value={this.state.companyData.responsability}
                            controlFunc={this.handleChange.bind(this)}
                            maxLength={100}
                            placeholder="Enter an responsability"
                            errorMessage="Please enter a valid position"
                        />
                        {formErrors.responsability.length > 0 && (
                            <span className="errorMessage">{formErrors.responsability}</span>
                        )}

                    </div>

                    <div className="field">
                        <button type="button" className="ui teal button" onClick={this.add}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                    </div>

                </form>

                <table className="ui table">
                    <thead>
                        <tr>
                            <th>company</th>
                            <th>position</th>
                            <th>startdate</th>
                            <th>enddate</th>
                            <th>responsability</th>
                            <th>
                                <button type="button" className="ui black button" onClick={this.openEdit}><i className="plus icon"></i>Add New</button>
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
                            <th>company</th>
                            <th>position</th>
                            <th>startdate</th>
                            <th>enddate</th>
                            <th>responsability</th>
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
