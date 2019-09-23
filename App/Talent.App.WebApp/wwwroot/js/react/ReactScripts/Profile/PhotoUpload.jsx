/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Upload, Icon, message } from 'antd';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import request from 'superagent';
 
import FileUpload  from '../Form/FileUpload.jsx';
import FileUploader from '../Form/FileUpload.jsx';

import ww from '../Form/ww.png';
import reddit from '../../../../images/reddit.jpg';
 
import axios from 'axios';

const URL = 'http://localhost:60290/profile/profile/updateProfilePhoto';
//export default class PhotoUpload extends Component {
//    render() {
//        return (
//            <div>
//                <img src="/images/ww.png" alt="Loading…" />
//            </div>
//            )
//    }
//}
//export default class PhotoUpload extends Component {
//    render() {
//        return (
//            <img className="ui left floated image" src="/images/0f7985ad-6c4f-45f5-8788-c2573fce7541.png" />
//            )
//    }
//}
export default class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        this.changePath = this.changePath.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            selectedFile:null,
            name: '',
            path: '',
            url: '',
            updateProfileData: {
                profilePhoto: "",
                profilePhotoUrl: "",
            },
            preview: null,
            data: null,
            default_img: <div className="demo">
                <input type="file" className="fileInput" accept='jpg/*,png/*,jpeg/*,image' onChange={this.changePath} />
                <div className="demo1"><i type="file" className="camera retro icon" ></i></div>
            </div>,
            upload_button: <button type="button" className='ui purple button show_button' onClick={this.upload}><i className="arrow up icon"></i>Upload</button>,
            show_file: false,
            show_button: false
        }
    }
    componentWillReceiveProps(nextProps) {
        let profilePhoto = nextProps.photoData.profilePhoto;
        let newPath = "/images/" + profilePhoto;
        let new_default_img = <div>
            <input type="file" className="fileInput" accept='jpg/*,png/*,jpeg/*,image' onChange={this.changePath} />
            <img src={newPath} alt='' className="demo" />
        </div>;
        
        let default_img = this.state.default_img;
        nextProps.photoData.profilePhoto == "" ? default_img = default_img : default_img = new_default_img;
        this.setState({
            default_img: default_img
        })
    }
    changePath(e) {

        const fileTypes = [".jpg", ".png", ".image", ".jpeg"];
        const file = e.target.files[0];
        let fileSize = (file.size / 1024).toFixed(0);

        var reg = /\.[^\.]+$/;
        var matches = reg.exec(file.name); 
        let src, preview, type = file.type;
        let show_file = this.state.show_file;
        let show_button = this.state.show_button;

        if (file) {
            if (fileTypes.indexOf(matches[0]) == -1) {
                alert("please check the file type");
                show_file = false;
                show_button = false;

            } else {
                if (fileSize > 2048) {
                    alert("the file size cannot over 2M！");
                    show_file = false;
                    show_button = false;
                } else {
                    src = window.URL.createObjectURL(file);
                   
                    preview = <div>
                        <input type="file" className="fileInput" accept='jpg/*,png/*,jpeg/*,image' onChange={this.changePath} />
                        <img src={src} alt='' className="demo" />

                    </div> ,

                        show_file = true;
                    show_button = true;
                }
            }
        }
        var photoUrl = this.state.updateProfileData.profilePhotoUrl;
        var photoName = this.state.updateProfileData.profilePhoto;
        var formData = new FormData();
        
        formData.append('file', file);

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies,

            },
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                photoUrl = res.photoUrl;
                photoName = res.photoName;
                this.setState({
                    updateProfileData: {
                        profilePhoto: photoName,
                        profilePhotoUrl: photoUrl,
                    }
                })
                if (res.success == true) {
                    
                    
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {           
                console.log(res);
                console.log(a);
                console.log(b);
            }
        });
        this.setState({
            selectedFile:file,
            path: file.name,
            data: file,
            url: src,            
            preview: preview,
            show_file: show_file,
            show_button: show_button
        });
    }
    closeButton() {
        this.setState({
            show_button: false
        })
    }
    upload() {
        this.props.controlFunc(this.props.componentId, this.state.updateProfileData);
        this.closeButton();
        //console.log(this.state.show_button);
    }
    render() {
        const { name, path, preview, default_img, show_file, upload_button, show_button } = this.state;
        return (
            <div>
                <div className="ui padded grid">
                    <div className="two column row">
                        <div className="white column">
                            <h2 className="ui header">Profile Photo</h2>

                        </div>
                        <div className="white column">



                            {show_file ? preview : default_img}


                        </div>

                    </div>



                    <div className="eight wide white column">
                        <h2 className="ui inverted header"></h2>

                    </div>
                    <div className="eight wide white column">

                        {show_button ? upload_button : ""}
                    </div>
                </div>


            </div>
        );
    }
}