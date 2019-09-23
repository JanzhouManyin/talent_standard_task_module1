/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'


export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            description_characters: 0,
            summary_characters: 0,
            descriptionData: {
                description: '',
                summary: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
    };

    update(event) {
        let data = {};
        data[event.target.name] = event.target.value;
        this.props.updateStateData(data);
        let description = event.target.value;
        this.setState({
            description_characters: description.length
        })
    }
    handleChange(e) {
        const data = Object.assign({}, this.state.descriptionData);
        let description_length = this.state.description_characters;
        let summary_length = this.state.summary_characters;
        data[e.target.name] = e.target.value;
        if (e.target.name == "description") {
            description_length = e.target.value.length;
        } else if (e.target.name == "summary") {
            summary_length = e.target.value.length;
        }

        this.setState({
            descriptionData: data,
            description_characters: description_length,
            summary_characters: summary_length,

        });
    }
    openEdit() {

        const description = this.props.description;
        const summary = this.props.summary;
        this.setState({
            showEditSection: true,
            descriptionData: {
                description: description,
                summary: summary
            }
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }
    saveContact() {
        const data = Object.assign({}, this.state.descriptionData);
        this.props.controlFunc(this.props.componentId, data);
        this.closeEdit();
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
            //<div>dddddddddddd</div>
        );
    }
    renderEdit() {
        const description_characterLimit = 600;
        let description_characters = this.state.descriptionData.description ? this.state.description_characters : 0;
        const summary_characterLimit = 150;
        let summary_characters = this.state.descriptionData.summary ? this.state.summary_characters : 0;

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>


                <div className="ten wide column">
                    <div className="field" >
                        <textarea
                            maxLength={summary_characterLimit}
                            rows="2"
                            name="summary"
                            placeholder="Please provide a short summary about yourself."
                            value={this.state.descriptionData.summary}
                            onChange={this.handleChange}
                        ></textarea>
                        <p>Summary must be no more than 150 characters</p>
                        <p>Characters remaining : {summary_characters} / {summary_characterLimit}</p>
                    </div>
                    <div className="field" >
                        <textarea
                            maxLength={description_characterLimit}
                            name="description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            value={this.state.descriptionData.description}
                            onChange={this.handleChange}
                        ></textarea>
                        <div>
                            <p>Introduction must be between 150-600 characters</p>
                            <p>Characters remaining : {description_characters} / {description_characterLimit}</p>
                        </div>
                    </div>
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </React.Fragment>
        )
    }
    renderDisplay() {

        let description = this.props.description ? this.props.description : ""
        let summary = this.props.summary ? this.props.summary : "";
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>


                <div className="ten wide column">
                    <div className="field" >
                        <label>Summary</label>
                        <textarea

                            rows="2"
                            readOnly="readOnly"

                            value={description}

                        ></textarea>

                    </div>
                    <div className="field" >
                        <label>Self Description</label>
                        <textarea

                            readOnly="readOnly"

                            value={summary}

                        ></textarea>
                        <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}



