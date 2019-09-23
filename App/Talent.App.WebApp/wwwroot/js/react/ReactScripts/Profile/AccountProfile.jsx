import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileData: {
                address: {},
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [],
                certifications: [],
                visaStatus: '',
                visaExpiryDate: '',
                profilePhoto: '',
                profilePhotoUrl: '',
                linkedAccounts: {
                    linkedIn: "",
                    github: ""
                },
                jobSeekingStatus: {
                    status: "",
                    availableDate: null
                },
                summary: "",
                description:""
              
            },
            loaderData: loaderData,

        };

        this.updateWithoutSave = this.updateWithoutSave.bind(this);
        this.updateAndSaveData = this.updateAndSaveData.bind(this);
        this.updateForComponentId = this.updateForComponentId.bind(this);
        this.updateAddressForComponentId = this.updateAddressForComponentId.bind(this);
        this.operationForComponentId = this.operationForComponentId.bind(this);
        this.updateAddressAndSaveData = this.updateAddressAndSaveData.bind(this);
        this.deleteAndSaveData = this.deleteAndSaveData.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.deleteSkillProfile = this.deleteSkillProfile.bind(this);
        this.deleteLanguageProfile = this.deleteLanguageProfile.bind(this);
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }
    
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.updateWithoutSave(res.data);
            }.bind(this),
            error: function (res) {

            }
        });
        this.init();
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        });
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
      
        let newProfile = Object.assign({}, this.state.profileData, newValues);
         
        this.setState({
            profileData: newProfile
        }, this.saveProfile);
         
    }
    
    updateAddressAndSaveData(componentId,newValues) {
      
        if (componentId == "Address") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);

            this.setState({
                profileData: newProfile
            }, this.saveProfile);
 
        } else if (componentId == "Nationality") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);
             
            this.setState({
                profileData: newProfile
            }, this.saveProfile);
           
        } else if (componentId == "language") {
            let newProfile = Object.assign({}, this.state.profileData.languages, newValues);
            
            this.setState({
                profileData: {
                    languages: newProfile
                }

            }, this.saveProfile);
             
        } else if (componentId == "linkedAccounts") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);
           
            this.setState({
                profileData: newProfile
            }, this.saveProfile);
 
            
        } else if (componentId == "savePhotoUrl") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);
          
            this.setState({
                profileData: newProfile
            }, this.saveProfile);

        } else if (componentId == "SelfIntroduction") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);
          
            this.setState({
                profileData: newProfile
            }, this.saveProfile); 

        } else if (componentId == "SkillsData") { 
            let newProfile = Object.assign({}, this.state.profileData, newValues);

            this.setState({
                profileData: newProfile
            }, this.saveProfile);

        } else if (componentId == "languageData") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);
             
            this.setState({
                profileData: newProfile
            }, this.saveProfile);

        } else if (componentId == "VisaStatus") {
       
            let newProfile = Object.assign({}, this.state.profileData, newValues);
             
            this.setState({
                profileData: newProfile
            }, this.saveProfile);

        } else if (componentId == "experienceData") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);
           
            this.setState({
                profileData: newProfile
            }, this.saveProfile);
             
        } else if (componentId == "TalentStatus") {
            let newProfile = Object.assign({}, this.state.profileData, newValues);

            this.setState({
                profileData: newProfile
            }, this.saveProfile);
            
        }
        
    }

    updateAddressForComponentId(componentId, newValues) {
        this.updateAndSaveData(componentId,newValues);
    }

    operationForComponentId(componentId, operationtype, delete_data, newValues) {
        switch (componentId) {
            case "SkillsData":
                if (operationtype == "delete") {
                    this.deleteAndSaveData(componentId, delete_data, newValues);
                } else {
                    this.updateAddressAndSaveData(componentId, newValues);
                }
                break;
            case "languageData":
                if (operationtype == "delete") {
                    this.deleteAndSaveData(componentId, delete_data, newValues);
                } else {
                    this.updateAddressAndSaveData(componentId, newValues);
                }
                break;
            case "experienceData":
                if (operationtype == "delete") {
                    this.deleteAndSaveData(componentId, delete_data, newValues);
                } else {
                    this.updateAddressAndSaveData(componentId, newValues);
                }  
                break;
        }
        
        
    }
  
    updateForComponentId(componentId, newValues) {
        this.updateAndSaveData(newValues);
    }
   
    deleteAndSaveData(componentId, delete_data, newValues) {
        switch (componentId) {
            case "SkillsData":
                this.deleteSkillProfile(delete_data);
                break;
            case "languageData":
                this.deleteLanguageProfile(delete_data);
                break;
            case "experienceData":
                this.deleteExperienceProfile(delete_data);
                break;
        }     
    }

    deleteSkillProfile(delete_data) {
         
        var cookies = Cookies.get('talentAuthToken'); 
        $.ajax({
            url: 'http://localhost:60290/profile/profile/DeleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(delete_data),
            success: function (res) { 
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
    }
    deleteLanguageProfile(delete_data) {
         
        var cookies = Cookies.get('talentAuthToken'); 
        $.ajax({
            url: 'http://localhost:60290/profile/profile/DeleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(delete_data),
            success: function (res) { 
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
    }

    deleteExperienceProfile(delete_data) {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/DeleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(delete_data),
            success: function (res) {
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
    }
    saveProfile() { 
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.profileData),
            success: function (res) { 
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
    }

    render() {
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone,
        };
        
        const address = this.state.profileData.address;
        
        const visaData = {
            visaStatus: this.state.profileData.visaStatus,
            visaExpiryDate: this.state.profileData.visaExpiryDate,
        }
        const photoData = {
            profilePhoto: this.state.profileData.profilePhoto,
            profilePhotoUrl: this.state.profileData.profilePhotoUrl,
        }
        const descriptionData = {
            summary: this.state.profileData.summary,
            description: this.state.profileData.description,
        }

        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                                linkedAccounts={this.state.profileData.linkedAccounts}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                                controlFunc={this.updateForComponentId}
                                                componentId='linkedAccounts'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={profile}
                                                componentId='contactDetails'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Address'
                                            tooltip='Enter your current address'>
                                            <Address
                                                //addressData={this.state.profileData.address}
                                                addressData={this.state.profileData.address}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateForComponentId}

                                                controlFunc={this.updateForComponentId}

                                                componentId='Address'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Nationality'
                                            tooltip='Select your nationality'
                                        >
                                            <Nationality
                                                nationalityData={this.state.profileData.nationality}
                                                saveProfileData={this.updateAndSaveData}
                                                controlFunc={this.updateForComponentId}
                                                componentId='Nationality'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Languages'
                                            tooltip='Select languages that you speak'
                                        >
                                            <Language
                                                languageData={this.state.profileData.languages}
                                                updateProfileData={this.updateAndSaveData}
                                                //controlFunc={this.updateForComponentId}
                                                controlFunc={this.operationForComponentId}
                                                componentId='languageData'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skills'
                                            tooltip='List your skills'
                                        >
                                            <Skill
                                                skillData={this.state.profileData.skills}
                                                updateProfileData={this.updateAndSaveData}
                                                controlFunc={this.operationForComponentId}
                                                //controlFunc={this.updateForComponentId}
                                                componentId='SkillsData'
                                                
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work experience'
                                            tooltip='Add your work experience'
                                        >
                                            <Experience
                                                experienceData={this.state.profileData.experience}
                                                updateProfileData={this.updateAndSaveData}
                                                controlFunc={this.operationForComponentId}
                                                componentId='experienceData'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Education'
                                            tooltip='Add your educational background'
                                        >
                                            <Education
                                                educationData={this.state.profileData.education}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Certification'
                                            tooltip='List your certificates, honors and awards'
                                        >
                                            <Certificate
                                                certificateData={this.state.profileData.certifications}
                                                updateProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                            <VisaStatus
                                                visaStatus={this.state.profileData.visaStatus}
                                                visaExpiryDate={this.state.profileData.visaExpiryDate}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                                visaData={visaData}
                                                controlFunc={this.updateForComponentId}
                                                componentId='VisaStatus'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Status'
                                            tooltip='What is your current status in jobseeking?'
                                        >
                                            <TalentStatus
                                                status={this.state.profileData.jobSeekingStatus}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                                controlFunc={this.updateForComponentId}
                                                componentId='TalentStatus'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Photo'
                                            tooltip='Please upload your profile photo'
                                            hideSegment={true}
                                        >
                                            <PhotoUpload
                                                imageId={this.state.profileData.profilePhotoUrl}
                                                //updateProfileData={this.updateWithoutSave}
                                                updateProfileData={this.state.profileData.profilePhoto}
                                                photoData={photoData}
                                                savePhotoUrl='http://localhost:60290/profile/profile/updateProfilePhoto'
                                                controlFunc={this.updateForComponentId}                        
                                                componentId='savePhotoUrl'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Profile Video'
                                            tooltip='Upload a brief self-introduction video'
                                            hideSegment={true}
                                        >
                                            <VideoUpload
                                                videoName={this.state.profileData.videoName}
                                                updateProfileData={this.updateWithoutSave}
                                                saveVideoUrl={'http://localhost:60290/profile/profile/updateTalentVideo'}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='CV'
                                            tooltip='Upload your CV. Accepted files are pdf, doc & docx)'
                                            hideSegment={true}
                                        >
                                            <CVUpload
                                                cvName={this.state.profileData.cvName}
                                                cvUrl={this.state.profileData.cvUrl}
                                                updateProfileData={this.updateWithoutSave}
                                                saveCVUrl={'http://localhost:60290/profile/profile/updateTalentCV'}
                                            />
                                        </FormItemWrapper>
                                        <SelfIntroduction
                                           // summary={this.state.profileData.descriptionData.summary}
                                            //description={this.state.profileData.descriptionData.description}                             
                                            updateProfileData={this.updateAndSaveData}
                                            updateWithoutSave={this.updateWithoutSave}
                                            descriptionData={descriptionData}
                                            //controlFunc={this.operationForComponentId}
                                            controlFunc={this.updateForComponentId}
                                            componentId='SelfIntroduction'
                                        />
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
