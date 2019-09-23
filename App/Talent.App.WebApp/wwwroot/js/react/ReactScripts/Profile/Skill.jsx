/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

const formValid = function (formErrors, ...rest) {
    let valid = true;

    if (formErrors.skill.length > 0 || formErrors.level.length > 0) {
        valid = false;
    }
    return valid;
};
class List extends React.Component {
    constructor(props) {
        super(props);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
        this.openUpdate = this.openUpdate.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showEditSection: "show",
            skill: this.props.name,
            level: this.props.level,
            formErrors: {
                skill: "",
                level: ""
            }
        }
    }
    openUpdate() {
        this.setState({
            showEditSection: "update"
        });
    }

    closeEdit() {
        this.setState({
            showEditSection: "show"
        });
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "skill":
                if (value.length == 0) {
                    formErrors.skill = "skill cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.skill = "minimum 1 characaters required";
                } else if (value.length > 10) {
                    formErrors.skill = "maxmum 10 characaters required";
                } else {
                    formErrors.skill = "";
                }
                break;
            case "level":
                if (value.length == 0) {
                    formErrors.level = "level cannot be null";
                } else {
                    formErrors.level = "";
                }
                break;
        }

        if (name == "skill") {
            this.setState({
                skill: value
            });
        } else if (e.target.name == "level") {
            this.setState({
                level: value
            });
        }
    }

    Update(e) {
        var formErrors = this.state.formErrors;
        var validate = formValid(formErrors);

        if (validate) {
        this.props.Update(this.props.index, this.state.skill, this.state.level);
        this.setState({
            showEditSection: "show"
        });
        } else {
            alert("Please check your input");
        }
    }

    openDelete() {
        this.setState({
            showEditSection: "delete"
        });
    }

    Delete(e) {
        let index = e.target.getAttribute("data-index");
        this.props.Delete(index);
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
        const { formErrors } = this.state;
        return (
            <tr id={this.props.index} className="alt">
                <td>
                    <ChildSingleInput
                        inputType="text"
                        defaultValue={this.props.name}
                        name="skill"
                        value={this.state.skill}
                        controlFunc={this.handleChange.bind(this)}
                        maxLength={10}
                        placeholder="Enter an skill"
                        errorMessage="Please enter a valid skill"
                    />
                    {formErrors.skill.length > 0 && (
                        <span className="errorMessage">{formErrors.skill}</span>
                    )}
                </td>

                <td>
                    <select
                        className="ui dropdown"
                        defaultValue={this.props.level}
                        name="level"
                        value={this.state.level}
                        onChange={this.handleChange.bind(this)}
                        required
                    >
                        <option value="">skill level</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                    {formErrors.level.length > 0 && (
                        <span className="errorMessage">{formErrors.level}</span>
                    )}
                </td>
                <td>
                    <button type="button" className="ui blue basic button" onClick={this.Update}>update</button>             
                    <button type="button" className="ui pink basic button" onClick={this.closeEdit}>cancle</button>
                </td>
            </tr>);
    }

    renderDelete() {
        return (
            <tr id={this.props.index} className="alt">
                <td>
                    <input type="text" defaultValue={this.props.name} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.level} readOnly="readOnly" />
                </td>
                <td>
                    <button type="button" className="ui blue basic button" onClick={this.Delete} data-index={this.props.index}>Delete</button>      
                    <button type="button" className="ui pink basic button" onClick={this.closeEdit}>Cancle</button>
                </td>
            </tr>);
    }
    renderDisplay() {
        return (
            <tr id={this.props.index} className="alt">
                <td>
                    <input type="text" defaultValue={this.props.name} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.level} readOnly="readOnly" />
                </td>
                <td>
                    <button type="button" className="ui  button" onClick={this.openUpdate}><i className="pencil icon"></i></button>
                    <button type="button" className="ui  button" onClick={this.openDelete}><i className="x icon" data-index={this.props.index}></i></button>
                </td>
            </tr>

        );
    }
}


export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);

        this.state = {
            lists: [],
            newSkills: {
                skills: []
            },
            showEditSection: false,
            skillData: {
                skill: "",
                level: ""
            },
            formErrors: {
                skill: "skill cannot be null",
                level: "level cannot be null"
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        var skillData = nextProps.skillData;
        
        var lists = [];
        skillData.map((item, index) => {
            lists.push(
                <List key={index} index={index} name={item.name}

                    level={item.level} Update={this.Update} Delete={this.Delete}
                />);
        });

        this.setState({
            lists: lists,
            newSkills: {
                skills: skillData
            }
             
        })
    }
 
    handleChange(e) {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "skill":
                if (value.length == 0) {
                    formErrors.skill = "skill cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.skill = "minimum 1 characaters required";
                } else if (value.length > 10) {
                    formErrors.skill = "maxmum 10 characaters required";
                } else {
                    formErrors.skill = "";
                }
                break;
            case "level":
                if (value.length == 0) {
                    formErrors.level = "level cannot be null";
                } else {
                    formErrors.level = "";
                }
                break;
        }

        if (name == "skill") {
            this.setState({
                formErrors,
                skillData: {
                    id: this.state.skillData.id,
                    skill: value,
                    level: this.state.skillData.level,

                }
            });
        } else if (name == "level") {
            this.setState({
                formErrors,
                skillData: {
                    id: this.state.skillData.id,
                    skill: this.state.skillData.skill,
                    level: value,
                }
            });
        }
    }

    openEdit() {
        const skillData = Object.assign({}, this.props.skillData)
        this.setState({
            skillData: skillData,
            showEditSection: true,
            formErrors: {
                skill: "skill cannot be null",
                level: "level cannot be null"
            }
        });
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }

    add() {
        const newSkill = this.state.newSkills.skills;
        const name = this.state.skillData.skill;
        const level = this.state.skillData.level;
        const formErrors = this.state.formErrors;
        const validate = formValid(formErrors);

        newSkill.push({ id: null, name: name, level: level });
     
        this.setState({
            newSkills: {
                skills: newSkill
            }
        });

        if (validate) {
            const data = Object.assign({}, this.state.newSkills);
            //this.props.controlFunc(this.props.componentId, data);
            this.props.controlFunc(this.props.componentId, "add", 0, data);
        } else {
            alert("Please check your input");
        }
        
    }
    Update(index, name, level) {  
        const newSkill = this.state.newSkills.skills;
        const list_id = newSkill[index].id;
        const newlist = { id: list_id, name: name, level: level }
        newSkill[index] = newlist;
         
        this.setState({           
            newSkills: {
                skills: newSkill
            }
        });

        const data = Object.assign({}, this.state.newSkills);
        this.props.controlFunc(this.props.componentId,"update", 0, data);
       // this.props.controlFunc(this.props.componentId, data);
    }

    Delete(index) {
        const newSkill = this.props.skillData;
        const lists = this.state.lists;
        lists.splice(index, 1);
        
        this.setState({
            lists: lists,
            newSkills: {
                skills: newSkill
            }
        });

        const Delete_Data = Object.assign({}, newSkill[index]);
        const data = Object.assign({}, this.state.newSkills);
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
                    <div className="form-group row fields">
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                name="skill"
                                value={this.state.skillData.skill}
                                controlFunc={this.handleChange}
                                maxLength={10}
                                placeholder="Enter an skill"
                                errorMessage="Please enter a valid skill"
                            />
                            {formErrors.skill.length > 0 && (
                                <span className="errorMessage">{formErrors.skill}</span>
                            )}

                        </div>

                        <div className="field">
                            <select
                                className="ui dropdown"
                                name="level"
                                value={this.state.skillData.level}
                                onChange={this.handleChange}
                                required
                            >
                                <option value="">skill level</option>
                                <option value="Basic">Basic</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                            {formErrors.level.length > 0 && (
                                <span className="errorMessage">{formErrors.level}</span>
                            )}
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
                            <th>skill</th>
                            <th>level</th>
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
        )
    }

    renderDisplay() {       
        return (
            <div>
                <table className="ui table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Level</th>
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

