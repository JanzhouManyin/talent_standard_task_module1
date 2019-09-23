/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';


const UrlRegex = RegExp(
    "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
    + "[a-z]{2,6})" // first level domain- .com or .museum 
    + "(:[0-9]{1,4})?" // 端口- :80 
    + "((/?)|" // a slash isn't required if there is no file name 
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"); 
const formValid = function (formErrors, ...rest) {
    let valid = true;

    if (formErrors.linkedIn.length > 0 || formErrors.github.length > 0) {
        valid = false;
    }
    return valid;
};

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.state = {
            showEditSection: false,
            linkedAccounts: {
                linkedIn: "",
                github: ""
            },
            formErrors: {
                linkedIn: "Name cannot be null",
                github: "Address cannot be null"
            },
            newLinked: {
                linkedAccounts:""
            }
        }

    }

    componentDidMount() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts);
        this.setState({
          
            linkedAccounts: linkedAccounts,
            newLinked: {
                linkedAccounts: linkedAccounts,
            }
        })
    }
    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            linkedAccounts: linkedAccounts,
            newLinked: {
                linkedAccounts: linkedAccounts,
            }
        })
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
            case "linkedIn":
                if (value.length == 0) {
                    formErrors.linkedIn = "Url cannot be null";
                } else if (UrlRegex.test(value) == false) {
                    formErrors.linkedIn = "Invalid Url Format";
                } else {
                    formErrors.linkedIn = "";
                    this.setState({
                        linkedAccounts: {
                            linkedIn: value,
                            github: this.state.linkedAccounts.github,  
                        },
                        newLinked: {
                            linkedAccounts: {
                                linkedIn: value,
                                github: this.state.linkedAccounts.github,
                            }
                        }
                    });
                }
                break;
            case "github":
                if (value.length == 0) {
                    formErrors.github = "Url cannot be null";
                } else if (UrlRegex.test(value) == false) {
                    formErrors.github = "Invalid Url Format"
                } else {
                    formErrors.github = "";
                    this.setState({
                        linkedAccounts: {
                            linkedIn: this.state.linkedAccounts.linkedIn,
                            github: value,
                        },
                        newLinked: {
                            linkedAccounts: {
                                linkedIn: value,
                                github: this.state.linkedAccounts.github,
                            }
                        }
                    });
                }
                break;
             
        }


        if (name == "linkedIn") {
            this.setState({
                formErrors,
                linkedAccounts: {
                    linkedIn: value,
                    github: this.state.linkedAccounts.github
                },
                newLinked: {
                    linkedAccounts: {
                        linkedIn: value,
                        github: this.state.linkedAccounts.github,
                    }
                }
            });
        } else if (name == "github") {
            this.setState({
                formErrors,
                linkedAccounts: {
                    linkedIn: this.state.linkedAccounts.linkedIn,
                    github: value
                },
                newLinked: {
                    linkedAccounts: {
                        linkedIn: value,
                        github: this.state.linkedAccounts.github,
                    }
                }
            });
        }         
    }
    saveContact() {
        var formErrors = this.state.formErrors;
        var validate = formValid(formErrors);
        if (validate) {
            const data = Object.assign({}, this.state.newLinked);
            this.props.controlFunc(this.props.componentId, data);

            this.closeEdit();
        } else {
            alert("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
        
    }
    handle() {
        const w = window.open('about:blank');
        w.location.href = "www.baidu.com"
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        );
    }
    renderEdit() {
        //console.log(this.state.showEditSection);
        const { formErrors } = this.state;


        return (
            <div>
                <form className="ui form">
                    <div className="form-group row three fields">
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="linkedIn"
                                name="linkedIn"
                                value={this.state.linkedAccounts.linkedIn}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={100}
                                placeholder="Enter an linkedIn"
                                errorMessage="Please enter a valid url"
                            />
                            {formErrors.linkedIn.length > 0 && (
                                <span className="errorMessage">{formErrors.linkedIn}</span>
                            )}

                            
                        </div>
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="github"
                                name="github"
                                value={this.state.linkedAccounts.github}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={100}
                                placeholder="Enter a github"
                                errorMessage="Please enter a valid github"
                            />
                            {formErrors.github.length > 0 && (
                                <span className="errorMessage">{formErrors.github}</span>
                            )}
                        </div>
                    </div>

                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </form>

            </div>
        );

    }

    renderDisplay() {
        let linkedIn = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : "";
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : "";

        return (
                <div className="column">
                    <div className="ui pointing menu">
                       <p><button className="ui blue button">
                            <i className="linkedin icon"></i>
                            LinkedIn
                       </button>
                        {linkedIn}</p>
                       <p><button className="ui black button">
                            <i className="github icon"></i>
                            github
                        </button>
                        {github}</p>
                       <div className="right item">
                           <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                       </div>
                    </div>           
                </div>
            ) 
        //return (
        //    <div className='row'>
        //        <div className="ui sixteen wide column">
        //            <React.Fragment>
        //                <p><button className="ui blue button">
        //                    <i className="linkedin icon"></i>
        //                    LinkedIn</button>
        //                    {linkedIn}
        //                </p>
                       
        //                <p><button className="ui black button">
        //                    <i className="github icon"></i>
        //                    github</button>
        //                    {github}
        //                </p>
        //            </React.Fragment>
        //            <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
        //        </div>
        //    </div>
        //);
    }
}