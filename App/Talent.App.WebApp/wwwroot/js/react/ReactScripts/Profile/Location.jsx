import React from 'react';
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

const formValid = function (formErrors, ...rest) {
    let valid = true;

    if (formErrors.number.length > 0 || formErrors.street.length > 0
        || formErrors.suburb.length > 0 || formErrors.postCode.length > 0
        || formErrors.country.length > 0 || formErrors.city.length > 0) {
        valid = false;
    }
    return valid;
}; 
const numberRegex = RegExp(
    /([1-999])[A-Z|a-z]/
);
const postcodeRegex = RegExp(
    /^[1-9][0-9]{5}$/
); 
export class Address extends React.Component {
    constructor(props) {
        super(props);
 
        const addressData = [];
       
        for (var key in Countries) {
            addressData.push({ country: key, cities: Countries[key]});
        }

        this.state = {
            data: addressData,
            address: {
                number: "",
                street: "",
                suburb: "",
                postCode: "",
                country: addressData[0].country,
                city: addressData[0].cities[0]
            },
            formErrors: {
                number: "number cannot be null",
                street: "street cannot be null",
                suburb: "suburb cannot be null",
                postCode: "postCode cannot be null",
                country: "country cannot be null",
                city: "city cannot be null"
            },
            countries: addressData[0].country,
            cities: addressData[0].cities,
            showEditSection: false,
            newAddress: {
                address: {
                    number: "",
                    street: "",
                    suburb: "",
                    postCode: "",
                    country: "",
                    city: ""
                }
            }
        };

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);


    };

    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        var number = this.state.address.number;
        var formnumber = this.state.formErrors.number;
        var city = this.state.address.city;
        var formcity = this.state.formErrors.city;
        var country = this.state.address.country;
        var formcountry = this.state.formErrors.country;
        var postCode = this.state.address.postCode;
        var formpostCode = this.state.formErrors.postCode;
        var street = this.state.address.street;
        var formstreet = this.state.formErrors.street;
        var suburb = this.state.address.suburb;
        var formsuburb = this.state.formErrors.suburb;
        addressData.number == "" ? number = number : number = addressData.number;
        addressData.city == "" ? city = city : city = addressData.city;
        addressData.country == "" ? country = country : country = addressData.country;
        addressData.postCode == "" ? postCode = postCode : postCode = addressData.postCode;
        addressData.street == "" ? street = street : street = addressData.street;
        addressData.suburb == "" ? suburb = suburb : suburb = addressData.suburb;

        addressData.number == "" ? formnumber = formnumber : formnumber = "";
        addressData.city == "" ? formcity = formcity : formcity = "";
        addressData.country == "" ? formcountry = formcountry : formcountry = "";

        addressData.postCode == "" ? formpostCode = formpostCode : formpostCode = "";
        addressData.street == "" ? formstreet = formstreet : formstreet = "";
        addressData.suburb == "" ? formsuburb = formsuburb : formsuburb = "";
     

        this.setState({
            showEditSection: true,
            address: {
                number: number,
                street: street,
                suburb: suburb,
                postCode: postCode,
                country: country,
                city: city
            },
            formErrors: {
                number: formnumber,
                street: formstreet,
                suburb: formsuburb,
                postCode: formpostCode,
                country: formcountry,
                city: formcity
            },
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
            case "number":
                if (value.length == 0) {
                    formErrors.number = "number cannot be null";
                } else if (numberRegex.test(value) == false) {
                    formErrors.number = "Invalid Number Format"
                }else {
                    formErrors.number = "";
                }
                break;
            case "street":
                if (value.length == 0) {
                    formErrors.street = "street cannot be null";
                } else if (value.length < 10 && value.length > 0) {
                    formErrors.street = "minimum 5 characaters required";
                } else if (value.length > 100) {
                    formErrors.street = "maxmum 100 characaters required";
                } else {
                    formErrors.street = "";
                }
                break;
            case "suburb":
                if (value.length == 0) {
                    formErrors.suburb = "suburb cannot be null";
                } else if (value.length < 2 && value.length > 0) {
                    formErrors.street = "minimum 2 characaters required";
                } else if (value.length > 30) {
                    formErrors.street = "maxmum 30 characaters required";
                } else {
                    formErrors.suburb = "";
                }
                break;
            case "postCode":
                if (value.length == 0) {
                    formErrors.postCode = "postCode cannot be null";
                } else if (postcodeRegex.test(value)==false) {
                    formErrors.postCode = "Invalid Number Format";
                } else {
                    formErrors.postCode = "";
                }
                break;
            case "Country":
                if (value.length == 0) {
                    formErrors.country = "Country cannot be null";
                } else {
                    formErrors.country = "";
                }

                break;
            case "City":
                if (value.length == 0) {
                    formErrors.city = "City cannot be null";
                } else {
                    formErrors.city = "";
                }
                break;
        }
        if (name == "number") {
            this.setState({
                formErrors,
                address: {
                    number: value,
                    street: this.state.address.street,
                    suburb: this.state.address.suburb,
                    postCode: this.state.address.postCode,
                    country: this.state.address.country,
                    city: this.state.address.city
                }
            } 
            );
            const newAddress = Object.assign({}, this.state.address);

            this.setState({
                newAddress: {
                    address: newAddress
                }
            });
        } else if (name == "street") {
            this.setState({
                formErrors,
                address: {
                    number: this.state.address.number,
                    street: value,
                    suburb: this.state.address.suburb,
                    postCode: this.state.address.postCode,
                    country: this.state.address.country,
                    city: this.state.address.city
                },
                newAddress: {
                    address: {
                        number: this.state.address.number,
                        street: value,
                        suburb: this.state.address.suburb,
                        postCode: this.state.address.postCode,
                        country: this.state.address.country,
                        city: this.state.address.city
                    }
                }
            });
            
        } else if (name == "suburb") {
            this.setState({
                formErrors,
                address: {
                    number: this.state.address.number,
                    street: this.state.address.street,
                    suburb: value,
                    postCode: this.state.address.postCode,
                    country: this.state.address.country,
                    city: this.state.address.city
                },
                newAddress: {
                    address: {
                        number: this.state.address.number,
                        street: this.state.address.street,
                        suburb: value,
                        postCode: this.state.address.postCode,
                        country: this.state.address.country,
                        city: this.state.address.city
                    }
                }
            });
             
        } else if (name == "postCode") {
            this.setState({
                formErrors,
                address: {
                    number: this.state.address.number,
                    street: this.state.address.street,
                    suburb: this.state.address.suburb,
                    postCode: value,
                    country: this.state.address.country,
                    city: this.state.address.city
                },
                newAddress: {
                    address: {
                        number: this.state.address.number,
                        street: this.state.address.street,
                        suburb: this.state.address.suburb,
                        postCode: value,
                        country: this.state.address.country,
                        city: this.state.address.city
                    }
                }
            });
            
        } else if (name == "Country") {
            const data = this.state.data;

            for (var i in data) {
                if (data[i].country == e.target.value) {
                    this.setState({
                        formErrors,
                        address: {
                            number: this.state.address.number,
                            street: this.state.address.street,
                            suburb: this.state.address.suburb,
                            postCode: this.state.address.postCode,
                            country: value,
                            city: this.state.address.city
                        },
                        counties: data[i].country,
                        cities: data[i].cities,
                        newAddress: {
                            address: {
                                number: this.state.address.number,
                                street: this.state.address.street,
                                suburb: this.state.address.suburb,
                                postCode: this.state.address.postCode,
                                country: value,
                                city: this.state.address.city
                            }
                        }
                    });
                }
            }
            
        } else if (name == "City") {

            const cities = this.state.cities;
            const country = this.state.address.country;
            for (var i in cities) {
                if (cities[i] == value) {
                    this.setState({
                        formErrors,
                        address: {
                            number: this.state.address.number,
                            street: this.state.address.street,
                            suburb: this.state.address.suburb,
                            postCode: this.state.address.postCode,
                            country: this.state.address.country,
                            city: value
                        },
                        //counties: data[i].country,
                        //cities: data[i].cities,
                        newAddress: {
                            address: {
                                number: this.state.address.number,
                                street: this.state.address.street,
                                suburb: this.state.address.suburb,
                                postCode: this.state.address.postCode,
                                country: this.state.address.country,
                                city: value
                            }
                        }
                    })
                }
            }
             
        }

    }

    saveContact() {

        var formErrors = this.state.formErrors;
        var validate = formValid(formErrors);
        if (validate) {
            const data = Object.assign({}, this.state.newAddress);
           
            this.props.controlFunc(this.props.componentId, data);

            this.closeEdit();
        } else {
            alert("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        const { formErrors } = this.state;

        const number = this.state.address.number;
        const street = this.state.address.street;
        const suburb = this.state.address.suburb;
        const postCode = this.state.address.postCode;
        const country = this.state.address.country;
        const city = this.state.address.city;
     
        const countrylist = this.state.data.map((item, index) => (
            <option key={index}>{item.country}</option>
        ));

        const citylist = this.state.cities.map((city, index) => (
            <option value={city} key={index}>{city}</option>
        ));
        return (
            <div>
                <form className="ui form">
                    <div className="form-group row three fields">
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="number"
                                name="number"
                                value={number}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={10}
                                placeholder="Enter an Number"
                                errorMessage="Please enter a valid Number"
                            />
                            {formErrors.number.length > 0 && (
                                <span className="errorMessage">{formErrors.number}</span>
                            )}
                        </div>
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={street}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={100}
                                placeholder="Enter a Street"
                                errorMessage="Please enter a valid Street"
                            />
                            {formErrors.street.length > 0 && (
                                <span className="errorMessage">{formErrors.street}</span>
                            )}
                        </div>
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={suburb}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={30}
                                placeholder="Enter a Suburb"
                                errorMessage="Please enter a valid Suburb"
                            />
                            {formErrors.suburb.length > 0 && (
                                <span className="errorMessage">{formErrors.suburb}</span>
                            )}
                        </div>
                    </div>
                    <div className="form-group row three fields">
                        <div className="field">
                            <ChildSingleInput
                                inputType="text"
                                label="postCode"
                                name="postCode"
                                value={postCode}
                                controlFunc={this.handleChange.bind(this)}
                                maxLength={10}
                                placeholder="Enter a postCode"
                                errorMessage="Please enter a valid postCode"
                            />
                            {formErrors.postCode.length > 0 && (
                                <span className="errorMessage">{formErrors.postCode}</span>
                            )}
                        </div>
                        <div className="field">
                            <label>Country</label>
                            <select
                                name="Country"
                                value={country}
                                onChange={this.handleChange.bind(this)}
                                required
                            >
                                 
                                {countrylist}
                            </select>
                            {formErrors.country.length > 0 && (
                                <span className="errorMessage">{formErrors.country}</span>
                            )}
                        </div>
                        <div className="field">
                            <label>City</label>
                            <select
                                name="City"
                                value={city}
                                onChange={this.handleChange.bind(this)}
                                required

                            >

                                {citylist}
                            </select>
                            {formErrors.city.length > 0 && (
                                <span className="errorMessage">{formErrors.city}</span>
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
        let country = this.props.addressData ? this.props.addressData.country : "";
        let number = this.props.addressData ? this.props.addressData.number : "";
        let city = this.props.addressData ? this.props.addressData.city : "";
        let street = this.props.addressData ? this.props.addressData.street : "";
        let suburb = this.props.addressData ? this.props.addressData.suburb : "";
        let postCode = this.props.addressData ? this.props.addressData.postCode : "";
       
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>number: {number}</p>
                        <p>street: {street}</p>
                        <p>suburb: {suburb}</p>
                        <p>postCode: {postCode}</p>
                        <p>country: {country}</p>
                        <p>city: {city}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        );
    }




}

export class Nationality extends React.Component {
    constructor(props) {
        super(props);

        const nationalityData = [];

        //Object.assign(locations).map(item => {
        //    nationalityData.push(item);
        //});

        for (var key in Countries) {
            nationalityData.push({ country: key, cities: Countries[key] });
        }

        this.state = {
            data: nationalityData,
            nationalityData: {
                nationality: nationalityData[0].country

            },
            formErrors: {
                country: "country cannot be null",

            },
            countries: nationalityData[0].country,

            showEditSection: false
        }

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);

    }
    openEdit() {
        const nationalityData = Object.assign({}, this.props.nationalityData)
     
        var formNationality = this.state.formErrors.country;
        this.props.nationalityData == "" ? formNationality = formNationality : formNationality = "";
        this.setState({
            showEditSection: true,
            nationalityData: {
                nationality: this.props.nationalityData
            },
            formErrors: {
                country: formNationality,

            },
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        });
    }
    handleChange(e) {
        e.preventDefault();
        let formErrors = this.state.formErrors;
        const data = this.state.data;

        if (e.target.value.length == 0) {
            formErrors.country = "country cannot be null";
        } else {
            formErrors.country = "";
        }

        for (var i in data) {
            if (data[i].country == e.target.value) {
                this.setState({
                    formErrors,
                    nationalityData: {
                        nationality: e.target.value

                    },
                    counties: data[i].country

                });
            }
        }
    }

    saveContact() {

        const data = Object.assign({}, this.state.nationalityData);

        this.props.controlFunc(this.props.componentId, data);

        this.closeEdit();
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        const { formErrors } = this.state;
        const country = this.state.data.map((item, index) => (
            <option key={index}>{item.country}</option>
        ));


        return (
                
                <div>
                    <form className="ui form">
                        <div className="form-group row fields">
                            <div className="field">
                                <select
                                    name="Country"
                                    value={this.state.nationalityData.nationality}
                                    onChange={this.handleChange.bind(this)}
                                    required
                                >
                                    <option value="">Country</option>
                                    {country}   
                                </select>
                                {formErrors.country.length > 0 && (
                                    <span className="errorMessage">{formErrors.country}</span>
                                )}
                            </div>

                            <div className="field">
                                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>

                            </div>   
                        </div>
                    </form>
                </div>            
        );

    }
    renderDisplay() {

        let Nationality = this.props.nationalityData ? this.props.nationalityData : "";

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>

                        <p>Nationality: {Nationality}</p>

                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        );
    }


}






