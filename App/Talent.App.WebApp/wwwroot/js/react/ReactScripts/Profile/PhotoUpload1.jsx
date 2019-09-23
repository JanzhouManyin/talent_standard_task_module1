/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Upload, Icon, message } from 'antd';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import request from 'superagent';


 
export default class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        this.doUpload = this.doUpload.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.state = {
            selectedFile: null
        }
    }
    fileSelectedHandler(e) {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
    doUpload() {
        var file = this.state.selectedFile;
        var formData = new FormData();
        formData.append('file', file);
        //this.props.controlFunc(this.props.componentId, formData);
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
                console.log("res.data");
                console.log(res);
                if (res.success == true) {
                    console.log(res.data);
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    console.log(res);
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log("res2");
                console.log(res);
                console.log(a);
                console.log(b);
            }
        });
    }


    render() {
        return (
            <div>

                <form id="uploadForm">

                    AJAX上传多文件：
                    <input type="file" name="file" multiple onChange={this.fileSelectedHandler} />

                    <input type="button" value="上传" onClick={this.doUpload} />

                </form>

            </div>
        )

    }
}
//export default class PhotoUpload extends Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            name: '',
//            path: '',
//            preview: null,
//            data: null
//        }
//        this.changeName = this.changeName.bind(this);
//        this.changePath = this.changePath.bind(this);
//        this.upload = this.upload.bind(this);
//        this.cancel = this.cancel.bind(this);
//    }


//    changeName(e){
//        this.setState({ name: e.target.value })
//    }

//    //选择文件
//    changePath(e){
//        const file = e.target.files[0];
//        if (!file) {
//            return;
//        }

//        let src, preview, type = file.type;

//        // 匹配类型为image/开头的字符串
//        if (/^image\/\S+$/.test(type)) {
//            src = URL.createObjectURL(file)
//            preview = <img src={src} alt='' />
//        }
//        // 匹配类型为video/开头的字符串
//        else if (/^video\/\S+$/.test(type)) {
//            src = URL.createObjectURL(file)
//            preview = <video src={src} autoPlay loop controls />
//        }
//        // 匹配类型为text/开头的字符串
//        else if (/^text\/\S+$/.test(type)) {
//            const self = this;
//            const reader = new FileReader();
//            reader.readAsText(file);
//            //注：onload是异步函数，此处需独立处理
//            reader.onload = function (e) {
//                preview = <textarea value={this.result} readOnly></textarea>
//                self.setState({ path: file.name, data: file, preview: preview })
//            }
//            return;
//        }

//        this.setState({ path: file.name, data: file, preview: preview })
//    }

//    // 上传文件
//    upload(){
//        console.log("update");
//        //const data = this.state.data;
//        //if (!data) {
//        //    console.log('未选择文件');
//        //    return;
//        //}

//        ////此处的url应该是服务端提供的上传文件api 
//        //const url = 'http://localhost:3000/api/upload';
//        //const form = new FormData();

//        ////此处的file字段由上传的api决定，可以是其它值
//        //form.append('file', data);

//        //fetch(url, {
//        //    method: 'POST',
//        //    body: form
//        //}).then(res => {
//        //    console.log(res)
//        //})
//    }

//    //关闭模态框
//    cancel(){
//        this.props.closeOverlay();
//    }

//    render() {
//        const { name, path, preview } = this.state;
//        return (
//            <div>
//                <h4>上传文件</h4>
//                <div className='ui media'  >
//                    {preview}
//                </div>
//                <div className='ui row'>

//                    <div className='row-input'>
//                        <span>{path ? path : '请选择文件路径'}</span>
//                        <input type='file' accept='video/*,image/*,text/plain' width={100} height={100} onChange={this.changePath} />
//                    </div>
//                </div>

//                <button type="button" className='primary upload' onClick={this.upload}>上传</button>
//                <button className='primary cancel' onClick={this.cancel}>取消</button>
//            </div>
//        )
//    }
//}
//export default class PhotoUpload extends Component {

//    constructor(props) {
//        super(props);

//        super(props)
//        this.state = {
//            file: null
//        }
//        this.handleChange = this.handleChange.bind(this)
//        this.submit = this.submit.bind(this)
//    }

//    handleChange(event) {
//        this.setState({
//            file: URL.createObjectURL(event.target.files[0])
//        })

//    }
//    submit() {
//        console.log(this.state.file);
//    }

//    render() {

//        return (
//            <div>
//                <input type="file" onChange={this.handleChange} />
//                <div width={500} height={500} >
//                    <img className="profileimage1" src={this.state.file} />
//                </div>
//                <button type="button" onClick={this.submit}>submit</button>

//            </div>
//        );



//    }
//}
