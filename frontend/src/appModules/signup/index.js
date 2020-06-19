import React from 'react';
import { TextField } from '@material-ui/core';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { putSignupDetails } from '../../actions/index';
import { setAccessToken,getAccessToken} from '../../utils';
import axios from 'axios';
import '../../scss/loginStyles.scss';

class Signup extends React.Component {

    state = {
        username:'',
        email: '',
        password: '',
        usernameerrMsg:'',
        emailerrMsg: '',
        passworderrMsg: '',
        catchErrMsg:''
    }

    navigateToSignup = () => {
        this.props.history.push('/');
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, emailerrMsg: '', passworderrMsg: '' });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.username === '' || this.state.email === '' || this.state.password === '') {
             if (this.state.username === '') {
                this.setState({ usernameerrMsg: 'Please enter your username' });  
                }         
            if (this.state.email === '') {
                this.setState({ emailerrMsg: 'Please enter your email' });
            } else if (this.state.password === '') {
                this.setState({ passworderrMsg: 'Please enter your password' });
            }
        } else {
            const newUser = {
                username:this.state.username,
                email: this.state.email,
                password: this.state.password
            };
            axios.post(`http://localhost:8000/register/`, newUser)
                .then((resp) => {
                    console.log("Registration data",resp)
                    if (resp.data.email){
                        console.log(resp)
                        this.props.history.push('/')
                    }
                    else
                    {
                        this.setState({
                        catchErrMsg: resp.data.message
                        });
                    }

                }, (err) => {
                }).catch((error) => {
                    console.log("signup error", error)
                })
        }
    }
    componentDidMount(){
                {
                    if(getAccessToken())
                    {
                        this.props.history.push('/me');
                    }

                }

        }
    render() {
        return (
            <div className="login-maindiv">
                <div className="login-subdiv">
                    
                    <form method="post" className="login-formtag" onSubmit={this.handleSubmit}>
                        <span className="logo-title">Qure.Ai</span>
                        <span className="errormsg">{this.state.catchErrMsg}</span>
                        <TextField
                            id="outlined-name"
                            name="username"
                            placeholder="Username"
                            type="username"
                            className="textfield"
                            InputProps={{
                                className: "input-textfield"
                            }}
                            value={this.state.username}
                            onChange={(e) => this.handleOnChange(e)}
                            margin="normal"
                        />
                        <span className="errormsg">{this.state.usernameerrMsg}</span>                       
                        <TextField
                            id="outlined-name"
                            name="email"
                            placeholder="Email"
                            type="email"
                            className="textfield"
                            InputProps={{
                                className: "input-textfield"
                            }}
                            value={this.state.email}
                            onChange={(e) => this.handleOnChange(e)}
                            margin="normal"
                        />
                        <span className="errormsg">{this.state.emailerrMsg}</span>
                        <TextField
                            id="outlined-name"
                            name="password"
                            placeholder="Password"
                            type="password"
                            className="textfield"
                            InputProps={{
                                className: "input-textfield"
                            }}
                            value={this.state.password}
                            onChange={(e) => this.handleOnChange(e)}
                            margin="normal"
                        />
                        <span className="errormsg">{this.state.passworderrMsg}</span>
                        <span className="login-button" onClick={this.handleSubmit}>Signup</span>
                        <div className="login-flex-row-text">
                        <span className="dummy-text">Already have an account ?</span>
                        <span className="text-link" onClick={() => this.navigateToSignup()}>&nbsp;Login</span>
                    </div>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ userReducer }) {
    return {
        signupDetailsRes: userReducer.userSignupData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            userSignupData: putSignupDetails,
        },
        dispatch
    );
}
export default (Signup);