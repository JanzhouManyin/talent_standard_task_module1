/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import Moment from 'Moment';
import { DatePicker } from 'antd';

const dateFormat = 'YYYY/MM/DD';
const formValid = function (formErrors, ...rest) {
    let valid = true;

    if (formErrors.company.length > 0 || formErrors.position.length > 0
        || formErrors.responsibilities.length > 0) {
        valid = false;
    }
    return valid;
};
class List extends React.Component {
    constructor(props) {
        super(props);
       
        this.openUpdate = this.openUpdate.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.disabledend = this.disabledend.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
        this.state = {
            showEditSection: "show",
            company: this.props.company,
            position: this.props.position,
            end: this.props.end,
            start: this.props.start,
            responsibilities: this.props.responsibilities,
            formErrors: {
                company: "",
                position: "",
                responsibilities: ""
            }
        }

    }
    handleChange(e) { 
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "company":
                if (value.length == 0) {
                    formErrors.company = "company cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.company = "minimum 2 characaters required";
                } else if (value.length > 20) {
                    formErrors.company = "maxmum 20 characaters required";
                } else {
                    formErrors.company = "";
                }
                break;
            case "position":
                if (value.length == 0) {
                    formErrors.position = "position cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.position = "minimum 2 characaters required";
                } else if (value.length > 20) {
                    formErrors.position = "maxmum 20 characaters required";
                } else {
                    formErrors.position = "";
                }
                break;
            case "responsibilities":
                if (value.length == 0) {
                    formErrors.responsibilities = "responsibilities cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.responsibilities = "minimum 5 characaters required";
                } else if (value.length > 200) {
                    formErrors.responsibilities = "maxmum 200 characaters required";
                } else {
                    formErrors.responsibilities = "";
                }
                break;
        }

        if (name == "company") {
            this.setState({          
                    company: value,           
            });
        } else if (name == "position") {
            this.setState({           
                    position: value,                        
            });
        } else if (name == "responsibilities") {
            this.setState({   
                    responsibilities: value, 
            });
        }
    }
    Update(e) {
        var formErrors = this.state.formErrors;
        var validate = formValid(formErrors);
        if (validate) {
            this.props.Update(this.props.index, this.state.company, this.state.position, this.state.start, this.state.end, this.state.responsibilities);
            this.setState({
                showEditSection: "show"
            });
        } else {
            alert("Please check your input");
        }
        
    }

    Delete(e) {
        let index = e.target.getAttribute("data-index");
        this.props.Delete(index);
        this.setState({
            showEditSection: "show"
        });
    }

    onStartChange(date, dateString) {
       
        this.setState({
            start: dateString,
            end: dateString
        });
    }
    onEndChange(date, dateString) {       
        this.setState({ 
                end: dateString,            
        });
    }
     
    disabledend(endValue) {
        const startValue = this.state.start; 
        if (!endValue || !startValue) {
            ////如果没有选择开始日期，则结束日期时大于今天
            //return endValue.valueOf() < new Date().getTime();//大于今天的日期一律返回true，禁止选择
            return false;
        }
        ////结束日期这里稍微复杂了一些，如果选择了开始日期，则结束日期和开始日期除了不能超过30个自然日之外，还需要结束日期不能小于开始日期，还需要不能超过今天，返回true为不能选择，所以用或链接，式子之间的符号正好与咱们分析的相反
        return endValue.valueOf() < Moment(startValue).valueOf();
    }
    openUpdate() {
        this.setState({
            showEditSection: "update"
        });
    }
    openDelete() {
        this.setState({
            showEditSection: "delete"
        });
    }
    closeEdit() {
        this.setState({
            showEditSection: "show"
        });
    }
    render() {
        if (this.state.showEditSection == "show") {
            return (this.renderDisplay());
        } else if (this.state.showEditSection == "update") {
            return (this.renderEdit())
        } else if (this.state.showEditSection == "delete") {
            return (this.renderDelete())
        }
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
                        controlFunc={this.handleChange}
                        maxLength={100}
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
                        controlFunc={this.handleChange}
                        maxLength={100}
                        placeholder="Enter an position"
                        errorMessage="Please enter a valid position"
                    />
                </td>
                <td>
                    <DatePicker
                        
                        placeholder="Select start"
                        value={Moment(this.state.start)}
                        onChange={this.onStartChange}
                    />       
                </td>
                <td>
                    <DatePicker
                        disabledDate={this.disabledend}
                        placeholder="Select end"
                        value={Moment(this.state.end)}
                        onChange={this.onEndChange}
                    />
                </td>
                <td>
                    <ChildSingleInput
                        inputType="text"
                        defaultValue={this.props.responsibilities}
                        name="responsibilities"
                        value={this.state.responsibilities}
                        controlFunc={this.handleChange}
                        maxLength={100}
                        placeholder="Enter an responsibilities"
                        errorMessage="Please enter a valid position"
                    />
                </td>

                <td>
                    <button type="button" className="ui blue basic button" onClick={this.Update}>Update</button>
                    <button type="button" className="ui pink basic button" onClick={this.closeEdit}>cancle</button>
                </td>
            </tr>);
    }
    renderDelete() {
        return (
            <tr id={this.props.index} className="alt">
                <td>
                    <input type="text" defaultValue={this.props.company} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.position} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={Moment(this.props.start).format('YYYY-MM-DD')} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={Moment(this.props.end).format('YYYY-MM-DD')} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.responsibilities} readOnly="readOnly" />
                </td>

                <td>
                    <button type="button" className="ui blue basic button" onClick={this.Delete} data-index={this.props.index}>Delete</button>
                    <button type="button" className="ui pink basic button" onClick={this.closeEdit}>Cancle</button>
                </td>
            </tr>);
    }
    renderDisplay() {

        return (
            <tr id={this.props.index} className="alt" >
                <td>
                    <input type="text" defaultValue={this.props.company} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.position} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={Moment(this.props.start).format('YYYY-MM-DD')} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={Moment(this.props.end).format('YYYY-MM-DD')} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.responsibilities} readOnly="readOnly" />

                </td>
               
                <td>
                    <button type="button" className="ui  button" onClick={this.openUpdate}><i className="pencil icon"></i></button>
                    <button type="button" className="ui  button" onClick={this.openDelete}><i className="x icon" data-index={this.props.index}></i></button>
                </td>
            </tr>
            );
    }
}
export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.disabledend = this.disabledend.bind(this);
        this.disabledstart = this.disabledstart.bind(this);
        this.add = this.add.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
        this.state = {
            lists: [],
            newExperience: {
                experience: []
            },
            experienceData: {
                company: "",
                position: "",
                start: new Date(),
                end: new Date(),
                responsibilities: ""
               
            },
            formErrors: {
                company: "",
                position: "",
                
                responsibilities: ""
            },
            showEditSection: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        var experienceData = nextProps.experienceData;
         
        var lists = [];

        if (experienceData != null) {
            experienceData.map((item, index) => {
                lists.push(
                    <List key={index} index={index} company={item.company}

                        position={item.position} start={item.start} end={item.end} responsibilities={item.responsibilities} Update={this.Update} Delete={this.Delete}
                    />);
            });         

            this.setState({
                lists: lists,
                newExperience: {
                    experience: experienceData
                }
            })
        }

        
    }
    openEdit() {
        const experienceData = Object.assign({}, this.props.experienceData);
        this.setState({
            experienceData: experienceData,
            showEditSection: true,
            formErrors: {
                company: "company cannot be null",
                position: "position cannot be null",              
                responsibilities: "responsibilities cannot be null",
            }
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
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.company = "minimum 2 characaters required";
                } else if (value.length > 20) {
                    formErrors.company = "maxmum 20 characaters required";
                } else {
                    formErrors.company = "";
                }
                break;
            case "position":
                if (value.length == 0) {
                    formErrors.position = "position cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.position = "minimum 2 characaters required";
                } else if (value.length > 20) {
                    formErrors.position = "maxmum 20 characaters required";
                } else {
                    formErrors.position = "";
                }
                break;
            case "responsibilities":
                if (value.length == 0) {
                    formErrors.responsibilities = "responsibilities cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.responsibilities = "minimum 5 characaters required";
                } else if (value.length > 200) {
                    formErrors.responsibilities = "maxmum 200 characaters required";
                } else {
                    formErrors.responsibilities = "";
                }
                break;
        }

        if (name == "company") {
            this.setState({
                formErrors,
                experienceData: {
                    company: value,
                    position: this.state.experienceData.position,
                    start: this.state.experienceData.start,
                    end: this.state.experienceData.end,
                    responsibilities: this.state.experienceData.responsibilities,
                }
            });
        } else if (name == "position") {
            this.setState({
                formErrors,
                experienceData: {
                    company: this.state.experienceData.company,
                    position: value,
                    start: this.state.experienceData.start,
                    end: this.state.experienceData.end,
                    responsibilities: this.state.experienceData.responsibilities,
                }
            });
        } else if (name == "responsibilities") {
            this.setState({
                formErrors,
                experienceData: {
                    company: this.state.experienceData.company,
                    position: this.state.experienceData.position,
                    start: this.state.experienceData.start,
                    end: this.state.experienceData.end,
                    responsibilities: value,
                }
            });
        }
    }
    onStartChange(date, dateString) {       
        this.setState({     
            experienceData: {
                company: this.state.experienceData.company,
                position: this.state.experienceData.position,
                start: dateString,
                end: dateString,
                responsibilities: this.state.experienceData.responsibilities
                },
     
        });
    }
    onEndChange(date, dateString) {
        this.setState({
            experienceData: {
                company: this.state.experienceData.company,
                position: this.state.experienceData.position,
                start: this.state.experienceData.start,
                end: dateString,
                responsibilities: this.state.experienceData.responsibilities
                },
     
        });
    } 
    disabledstart(startValue) {
        const endValue = this.state.experienceData.end;
     
        if (!startValue || !endValue) {
            return false;
        }
        return  Moment(endValue).valueOf() > startValue.valueOf();
    }
    disabledend(endValue) {
        const startValue = this.state.experienceData.start;
     
        if (!endValue || !startValue) { 
            return false;
        }
         
        return endValue.valueOf() < Moment(startValue).valueOf() ;
    }
    add() {
        
        const newExperience = this.state.newExperience.experience;
        const company = this.state.experienceData.company;
        const position = this.state.experienceData.position;
        const start = this.state.experienceData.start;
        const end = this.state.experienceData.end;
        const responsibilities = this.state.experienceData.responsibilities;
        const formErrors = this.state.formErrors;
        const validate = formValid(formErrors);

        newExperience.push({ id: null, company: company, position: position, start: start, end: end, responsibilities: responsibilities})
      
        this.setState({
            newExperience: {
                experience: newExperience
            },
            showEditSection: false
        });
        if (validate) {
            const data = Object.assign({}, this.state.newExperience);
            this.props.controlFunc(this.props.componentId, "add", 0, data);
        } else {
            alert("Please check your input");
        }
        
    }
    
    Update(index, company, position, start, end, responsibilities) {
        const newExperience = this.state.newExperience.experience;     
        const list_id = newExperience[index].id;
        const newlist = {
            id: list_id, company: company, position: position, start: start, end: end, responsibilities: responsibilities
        }
       
        newExperience[index] = newlist;
     
        this.setState({
            newExperience: {
                experience: newExperience
            }
        });

        const data = Object.assign({}, newExperience);
        this.props.controlFunc(this.props.componentId, "Update", 0, data);
        // this.props.controlFunc(this.props.componentId, data);
    }
    Delete(index) {
        const newExperience = this.state.newExperience.experience;
        const lists = this.state.lists;
        lists.splice(index, 1);
      
        this.setState({
            lists: lists,
            newExperience: {
                experience: newExperience
            }
        });

        const Delete_Data = Object.assign({}, newExperience[index]);
        const data = Object.assign({}, this.state.newExperience);
        this.props.controlFunc(this.props.componentId, "delete", Delete_Data, data);
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
                                value={this.state.experienceData.company}
                                controlFunc={this.handleChange}
                                maxLength={20}
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
                                value={this.state.experienceData.position}
                                controlFunc={this.handleChange}
                                maxLength={20}
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
                            <label>start</label>
                            <DatePicker
                                //disabledDate={this.disabledstart}
                                placeholder="Select start"
                                value={Moment(this.state.experienceData.start)}
                               
                                onChange={this.onStartChange}
                            />
                         
                        </div>
                        

                        <div className="field">
                            <label>end</label>
                            <DatePicker 
                                disabledDate={this.disabledend}
                                placeholder="Select end"
                                value={Moment(this.state.experienceData.end)}
                                
                                onChange={this.onEndChange}
                            />
                          
                        </div>
                         
                        
                        
                    </div>

                    <div className="field">
                        <ChildSingleInput
                            inputType="text"
                            label="responsibilities"
                            name="responsibilities"
                            value={this.state.experienceData.responsibilities}
                            controlFunc={this.handleChange}
                            maxLength={200}
                            placeholder="Enter an responsibilities"
                            errorMessage="Please enter a valid position"
                        />
                        {formErrors.responsibilities.length > 0 && (
                            <span className="errorMessage">{formErrors.responsibilities}</span>
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
                            <th>start</th>
                            <th>end</th>
                            <th>responsibilities</th>
                            <th>
                                <button type="button" className="ui black button" onClick={this.openEdit}><i className="plus icon"></i>Add New</button>
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

    renderDisplay() {
        return (
            <div>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>company</th>
                            <th>position</th>
                            <th>start</th>
                            <th>end</th>
                            <th>responsibilities</th>
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
