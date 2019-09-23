/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';


const formValid = function (formErrors, ...rest) {
    let valid = true;

    if (formErrors.language.length > 0 || formErrors.LanguageLevel.length > 0) {
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
            Language: this.props.Language,
            LanguageLevel: this.props.LanguageLevel,
            formErrors: {
                Language: "",
                LanguageLevel: ""
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
            case "Language":
                if (value.length == 0) {
                    formErrors.Language = "Language cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.Language = "minimum 2 characaters required";
                } else if (value.length > 10) {
                    formErrors.Language = "maxmum 10 characaters required";
                }else {
                    formErrors.Language = "";
                }
                break;
            case "LanguageLevel":
                if (value.length == 0) {
                    formErrors.LanguageLevel = "LanguageLevel cannot be null";
                } else {
                    formErrors.LanguageLevel = "";
                }
                break;
        }

        if (name == "Language") {
            this.setState({
                Language: value
            });
        } else if (e.target.name == "LanguageLevel") {
            this.setState({
                LanguageLevel: value
            });
        }
    }

    Update(e) {
        var formErrors = this.state.formErrors;
        var validate = formValid(formErrors);

        if (validate) {
            this.props.Update(this.props.index, this.state.Language, this.state.LanguageLevel);
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
                        defaultValue={this.props.Language}
                        name="Language"
                        value={this.state.Language}
                        controlFunc={this.handleChange.bind(this)}
                        maxLength={10}
                        placeholder="Enter an Language"
                        errorMessage="Please enter a valid Language"
                    />
                    {formErrors.Language.length > 0 && (
                        <span className="errorMessage">{formErrors.Language}</span>
                    )}
                </td>

                <td>
                    <select
                        className="ui dropdown"
                        defaultValue={this.props.LanguageLevel}
                        name="LanguageLevel"
                        value={this.state.LanguageLevel}
                        onChange={this.handleChange.bind(this)}
                        required
                    >
                        <option value="">Language Level</option>
                        <option value="Basic">Basic</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                    {formErrors.LanguageLevel.length > 0 && (
                        <span className="errorMessage">{formErrors.LanguageLevel}</span>
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
                    <input type="text" defaultValue={this.props.Language} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.LanguageLevel} readOnly="readOnly" />
                </td>
                <td>
                    <button type="button" className="ui blue basic button" onClick={this.Delete} data-index={this.props.index}>Delete</button>
                    <button type="button" className="ui pink basic button" onClick={this.closeEdit}>cancle</button>
                </td>
            </tr>);
    }
    renderDisplay() {
        return (
            <tr id={this.props.index} className="alt">
                <td>
                    <input type="text" defaultValue={this.props.Language} readOnly="readOnly" />
                </td>
                <td>
                    <input type="text" defaultValue={this.props.LanguageLevel} readOnly="readOnly" />

                </td>
                <td>
                    <button type="button" className="ui  button" onClick={this.openUpdate}><i className="pencil icon"></i></button>
                    <button type="button" className="ui  button" onClick={this.openDelete}><i className="x icon" data-index={this.props.index}></i></button>
                </td>
            </tr>

        );
    }
}


 
export default class Language extends React.Component {
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
            newLanguages: {
                languages: []
            },
            showEditSection: false,
            languageData: {
                Language: "",
                LanguageLevel: ""
            },
            formErrors: {
                Language: "Language cannot be null",
                LanguageLevel: "LanguageLevel cannot be null"
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        var languageData = nextProps.languageData;
        var lists = [];
        if (languageData != null) {
            languageData.map((item, index) => {
                lists.push(
                    <List key={index} index={index} Language={item.name}

                        LanguageLevel={item.level} Update={this.Update} Delete={this.Delete}
                    />);
            });
        } else {
            languageData = [];
        }
        

        this.setState({
            lists: lists,
            newLanguages: {
                languages: languageData
            }

        })
    }

    handleChange(e) {
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "Language":
                if (value.length == 0) {
                    formErrors.Language = "Language cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.Language = "minimum 2 characaters required";
                } else if (value.length > 10) {
                    formErrors.Language = "maxmum 10 characaters required";
                }else {
                    formErrors.Language = "";
                }
                break;
            case "LanguageLevel":
                if (value.length == 0) {
                    formErrors.LanguageLevel = "LanguageLevel cannot be null";
                } else {
                    formErrors.LanguageLevel = "";
                }
                break;
        }

        if (name == "Language") {
            this.setState({
                formErrors,
                languageData: {
                    id: this.state.languageData.id,
                    Language: value,
                    LanguageLevel: this.state.languageData.LanguageLevel,

                }
            });
        } else if (name == "LanguageLevel") {
            this.setState({
                formErrors,
                languageData: {
                    id: this.state.languageData.id,
                    Language: this.state.languageData.Language,
                    LanguageLevel: value,
                }
            });
        }
    }

    openEdit() {
        const languageData = Object.assign({}, this.props.languageData)
        this.setState({
            languageData: languageData,
            showEditSection: true,
            formErrors: {
                Language: "Language cannot be null",
                LanguageLevel: "LanguageLevel cannot be null"
            }
        });
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }

    add() {
        const newLanguage = this.state.newLanguages.languages;
        const Language = this.state.languageData.Language;
        const LanguageLevel = this.state.languageData.LanguageLevel;
        
        newLanguage.push({ id: null,name: Language, level: LanguageLevel });
       
        this.setState({
            newLanguages: {
                languages: newLanguage
            }
        }); 
        if (validate) {
            const data = Object.assign({}, this.state.newLanguages);
            //this.props.controlFunc(this.props.componentId, data);
            this.props.controlFunc(this.props.componentId, "add", 0, data);
        } else {
            alert("Please check your input");
        }

    }
    Update(index, Language, LanguageLevel) {
        const newLanguage = this.state.newLanguages.languages;
        const list_id = newLanguage[index].id;
        const newlist = { id: list_id, name: Language, level: LanguageLevel }
        
        newLanguage[index] = newlist;

        this.setState({
            newLanguages: {
                languages: newLanguage
            }
        });

        const data = Object.assign({}, this.state.newLanguages);
        this.props.controlFunc(this.props.componentId, "update", 0, data);
        // this.props.controlFunc(this.props.componentId, data);
    }

    Delete(index) {
        const newLanguage = this.props.languageData;
        const lists = this.state.lists;
        lists.splice(index, 1);
        //newLanguage.splice(index, 1);
        this.setState({
            lists: lists,
            newLanguages: {
                languages: newLanguage
            }
        });

        const Delete_Data = Object.assign({}, newLanguage[index]);
        const data = Object.assign({}, this.state.newLanguages);
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
                                name="Language"
                                value={this.state.languageData.Language}
                                controlFunc={this.handleChange}
                                maxLength={10}
                                placeholder="Enter an Language"
                                errorMessage="Please enter a valid Language"
                            />
                            {formErrors.Language.length > 0 && (
                                <span className="errorMessage">{formErrors.Language}</span>
                            )}

                        </div>

                        <div className="field">
                            <select
                                className="ui dropdown"
                                name="LanguageLevel"
                                value={this.state.languageData.LanguageLevel}
                                onChange={this.handleChange}
                                required
                            >
                                <option value="">Language Level</option>
                                <option value="Basic">Basic</option>
                                <option value="Conversational">Conversational</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Native/Bilingual">Native/Bilingual</option>
                            </select>
                            {formErrors.LanguageLevel.length > 0 && (
                                <span className="errorMessage">{formErrors.LanguageLevel}</span>
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
                            <th>Language</th>
                            <th>LanguageLevel</th>
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
                            <th>Language</th>
                            <th>LanguageLevel</th>
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

