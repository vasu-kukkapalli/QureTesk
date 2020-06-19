import React from 'react';
import { TextField } from '@material-ui/core';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { putSigninDetails } from '../../actions/index';
import axios from 'axios';
import { setAccessToken,getAccessToken} from '../../utils';
import '../../scss/loginStyles.scss';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        emailerrMsg: '',
        passworderrMsg: '',
        catchErrMsg:'',
    }

    navigateToSignup = () => {
        this.props.history.push('/signup');
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, emailerrMsg: '', passworderrMsg: '' });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '') {
            if (this.state.email === '') {
                this.setState({ emailerrMsg: 'Please enter your email' });
            } else if (this.state.password === '') {
                this.setState({ passworderrMsg: 'Please enter your password' });
            }
        } else {
            const newUser = {
                email: this.state.email,
                password: this.state.password
            };
            axios.post(`http://localhost:8000/login`, newUser)
                .then((resp) => {
                    console.log(resp)
                    if (resp.data.token) {
                        // console.log(resp)
                        // console.log(resp.data.email)
                        // console.log(resp.data.token)
                        setAccessToken(resp.data.token);
                        this.props.history.push({
                        pathname: '/me',
                        state: { detail: resp.data.username }
                            });
                        // this.state
                        //this.props.history.push('/me',)
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
                        <span className="login-button" onClick={this.handleSubmit}>Login</span>
                        <div className="login-flex-row-text">
                        <span className="dummy-text">Don't have an account ?</span>
                        <span className="text-link" onClick={() => this.navigateToSignup()}>&nbsp;Signup</span>
                        </div>
                    </form>
                    
                        
                        
                   
                </div>
            </div>
        )
    }
}

function mapStateToProps({ userReducer }) {
    return {
        signinDetailsRes: userReducer.userLoginData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            userLoginData: putSigninDetails,
        },
        dispatch
    );
}
export default (Login);