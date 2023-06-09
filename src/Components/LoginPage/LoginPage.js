import React, { useState} from "react"
import Grid from '@material-ui/core/Grid'
import instagramImage from '../../images/9364675fb26a.svg'
import instagramLogo from '../../images/logoinsta.png'
import fb from '../../images/fb.png'
import appStore from '../../images/app.png'
import playStore from '../../images/play.png'
import './LoginPage.css';
import { Link, useHistory } from "react-router-dom";
import { baseURL } from "../../Config/constants"

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const history = useHistory();

    const passwordHandler = (e)=>{
        setPassword(e.target.value)  
        e.preventDefault();
    }

    const emailHandler = (e)=>{
        setEmail(e.target.value)
        e.preventDefault();

    }
    const loginHandler = async (e)=>{
        e.preventDefault();
        const requestBody = {email, password};
        try{
            const response = await fetch(`${baseURL}user/login/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        if(response.ok){
            const data = await response.json();
            setLoginError('');
            sessionStorage.setItem('access_token', data.access);
            sessionStorage.setItem('refresh_token', data.refresh);
            history.push('/newfeeds')
            
        }
        else if(response.status===400){
            const error = await response.json();
            if (error.non_field_errors && error.non_field_errors.length>0)
            {
                setLoginError(error.non_field_errors[0]);
                console.warn(error.non_field_errors[0]);
            }

        }
        else{
            console.error('Login failed:', response.statusText);
        }
    }
    catch(error){
        console.error('Error:', error);
    }};
    const isSubmitDisabled = !email || password.length<6;
    return (
            <div>
                <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                        <div className="loginpage__main">
                            <div>
                                <img src={instagramImage} width='456' />
                            </div>
                            <div>
                                <div className="loginpage_rightcomponent">
                                    <img className="loginpage__logo" src={instagramLogo} />

                                    <div className="loginpage__sigin">
                                        <form onSubmit={loginHandler}>
                                            <input className="loginpage__text" type="email" placeholder="Phone number, username, or email" onChange={emailHandler} value={email}/>
                                            <input className="loginpage__text" type="password" placeholder="Password" autoComplete="current-password" onChange={passwordHandler} value={password}/>
                                            <button type="submit" className="login__button"  disabled={isSubmitDisabled} style={{ backgroundColor: isSubmitDisabled ? "#4bb4f8" : "#1877f2" } }>Log in</button>
                                        </form>
                                    </div>


                                    <div className="login__ordiv">
                                        <div className="login__dividor"></div>
                                        <div className="login__or">OR</div>
                                        <div className="login__dividor"></div>
                                    </div>
                                    <div className="login__fb">
                                        <img src={fb} width="15px" style={{ "marginRight": "5px" }} />Log in with facebook
                                    </div>
                                    <div className="login__forget">Forgot Password?</div>
                                    <div className="loginpage__error">{loginError}</div>

                                </div>


                                <div className="loginpage__signupoption">
                                    <div className="loginPage__signin">
                                        <div className="classAccount">Don't have an account?
                                            <span style={{"color":"#addcfb"}}> <Link to="/signup">Sign up</Link></span>
                                        </div> 
                                    </div>
                                    <div className="loginPage__downloadSection">
                                        <div className=""> Get the app.</div>


                                        <div className="loginPage_option">
                                            <img className="loginPage_dwimg" src={appStore} width="136" />
                                            <img className="loginPage_dwimg" src={playStore} width="136px" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Grid>
                    <Grid item xs={3}></Grid>

                </Grid>

            </div>
        )
    }

export default LoginPage; 