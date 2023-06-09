import React, { useState} from "react"
import Grid from '@material-ui/core/Grid'
import instagramLogo from '../../images/logoinsta.png'
import fb from '../../images/fb.png'
import appStore from '../../images/app.png'
import playStore from '../../images/play.png'
import './SignupPage.css';
import { Link, useHistory } from "react-router-dom";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Tooltip from '@mui/material/Tooltip';
import { baseURL } from "../../Config/constants"


function SignupPage() {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const emailHandler = (e)=>{
        setEmail(e.target.value)
        e.preventDefault();
    }

    const usernameHandler = (e)=>{
        setUsername(e.target.value)
        e.preventDefault();
    }

    const fullNameHandler = (e)=>{
        setFullName(e.target.value)
        e.preventDefault();
    }

    const passwordHandler = (e)=>{
        setPassword(e.target.value)  
        e.preventDefault();
    }
    
    const signupHandler = async (e)=>{  
        e.preventDefault();
        const requestBody = {email, username, "full_name":fullName, password};
        try{
            const response = await fetch(`${baseURL}user/signup/`,{
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if(response.status===201){
                const data = await response.json();
                history.push('/')
            }
            else if(response.status===400){
                const error = await response.json()
                if(error.email && error.email.length>0){
                    console.log(error.email[0])
                    setEmailError(error.email[0])
                }
                else{
                    setEmailError("")
                }
                if(error.username && error.username.length>0){
                    console.log(error.username[0])
                    setUsernameError(error.username[0])
                }
                else{
                    setUsernameError("")
                }   
            }
            else{
                console.log(response)
                console.error('Signup failed:', response.statusText);
            }

        }
        catch(error){
            console.error('Error:', error); 
        }
    }

    const isSubmitDisabled = !email || !username || !fullName || password.length<6;

    return (
            <div>
                <Grid container className="container">
                    <Grid item className="col-sm-3" xs={3}></Grid>
                    <Grid item className="col-sm-6" xs={6}>
                        <div className="signuppage__main">
                            <div>
                                <div className="signuppage_rightcomponent">
                                    <img className="signuppage__logo" src={instagramLogo} />

                                    <div className="signuppage__sigin">
                                        <div className="signupinfo">
                                            <p>Sign up to see photos and videos from your friends.</p>
                                        </div>
                                        <div className="signup__fb">
                                            <a href={`${baseURL}accounts/google/login/`}> <img src={fb} width="15px" style={{ "marginRight": "5px" }} />Log in with facebook</a>
                                        </div>
                                        <div className="signup__ordiv">
                                            <div className="signup__dividor"></div>
                                            <div className="signup__or">OR</div>
                                            <div className="signup__dividor"></div>
                                        </div>
                                        <form onSubmit={signupHandler}>
                                            <input className="signuppage__text" type="email" placeholder="Mobile Number or Email" onChange={emailHandler} value={email} required/>
                                            {emailError && (
                                                <Tooltip className="icons_style" title={emailError} >
                                                    <CancelOutlinedIcon />
                                                </Tooltip>
                                                )}
                                            <input className="signuppage__text" type="text" placeholder="Full Name" onChange={fullNameHandler} value={fullName} required/>
                                            <input className="signuppage__text" type="text" placeholder="Username" onChange={usernameHandler} value={username} required/>
                                            {usernameError && (
                                                <Tooltip className="icons_style" title={usernameError}>
                                                    <CancelOutlinedIcon />
                                                </Tooltip>
                                                )}
                                            <input className="signuppage__text" type="password" placeholder="Password" autoComplete="current-password" onChange={passwordHandler} value={password} required/>
                                            <button type="submit" className="signup__button" disabled={isSubmitDisabled} style={{ backgroundColor: isSubmitDisabled ? "#4bb4f8" : "#1877f2" } }>Sign up</button>
                                        </form>
                                    </div>
                                    
                                    <div className="signup__forget">Forgot Password?</div>
                                </div>


                                <div className="signuppage__signupoption">
                                    <div className="signupPage__signin">
                                        <div className="classAccount">Have an account?
                                            <span style={{"color":"#addcfb"}}> <Link to='/'>Login</Link ></span>
                                        </div> 
                                    </div>
                                    <div className="signupPage__downloadSection">
                                        <div className=""> Get the app.</div>


                                        <div className="signupPage_option">
                                            <img className="signupPage_dwimg" src={appStore} width="136" />
                                            <img className="signupPage_dwimg" src={playStore} width="136px" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Grid>
                    <Grid item className="col-sm-3" xs={3}></Grid>

                </Grid>

            </div>
        )
    }

export default SignupPage; 