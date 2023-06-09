import './EditProfile.css'
import NavBar from '../NavBar/NavBar';
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import dp from "../../images/dp6.png"
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Tooltip from '@mui/material/Tooltip';
import {Avatar}  from "@material-ui/core";
import { baseURL } from '../../Config/constants';

function EditProfile() {
    
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const history = useHistory();
    
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [usernameError, setUsernameError] = useState('')
    const [websiteError, setWebsiteError] = useState('')
    const [profilePicture, setProfilePicture] = useState(null);

    const doneHandler = async (e)=> {
        try {
            debugger
            if (!accessToken || !refreshToken) {
                history.push('/');
                return;
            }
            const requestBody = {username, full_name:fullName, bio, website}
            const response = await fetch(`${baseURL}user/update_details/`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestBody)
            });
            if(response.ok){
                history.push('/profile')
            }
            else if(response.status===400){
                const error = await response.json();
                if (error.username && error.username.length>0)
                {
                    setUsernameError(error.username[0]);
                }
                else{
                    setUsernameError("")
                }
                if (error.website && error.website.length>0)
                {
                    setWebsiteError(error.website[0])
                }
                else{
                    setWebsiteError("")
                }
        }
    } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        async function fetchData() {
            try {
                if (!accessToken || !refreshToken) {
                    history.push('/');
                    return;
                }
                const response = await fetch(`${baseURL}user/update_details/`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if(response.ok){
                    const data = await response.json();
                    setFullName(data.full_name)
                    setUsername(data.username)
                    setBio(data.bio)
                    setWebsite(data.website)
                    setProfilePicture(data.profile_picture)
                    setUser(data)

                }
                else if(response.status===401){
                    history.push('/');
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [accessToken, refreshToken, history]);
    if (!user) {
        return <div>Loading...</div>;
    }
    return (

        <div>
            <NavBar/>
    <div className="editprofile-header">
        {profilePicture?(
            <Avatar className='edit__profile__post__image' src={profilePicture}/>
                        ):<Avatar className='edit__profile__post__image' src={dp}/>}
        <div className="username"> Name <TextField style={{"marginLeft":"70px"}}  variant="standard"  value={fullName} onChange={(e) => setFullName(e.target.value)}/></div>
        <div className="username"> Username 
            <TextField style={{"marginLeft":"40px"}}  variant="standard"  value={username} onChange={(e) => setUsername(e.target.value)}/>
            {usernameError && (
                <Tooltip className="icons_style" title={usernameError}><CancelOutlinedIcon /></Tooltip>)}
        </div>
        <div className="username"> Bio <TextField style={{"marginLeft":"92px"}}  variant="standard"  value={bio} onChange={(e) => setBio(e.target.value)}/></div>
        {/* {user.website && ( */}
            <div className="username">
                Website <TextField style={{"marginLeft":"55px"}}  variant="standard"  value={website} onChange={(e) => setWebsite(e.target.value)}/>
                {websiteError && (
                <span className="icons_style" title={websiteError}><CancelOutlinedIcon /></span>)}
            </div>
    </div>
    <div className='btn__done'><button  onClick={doneHandler}>Done</button></div>
    </div>
    );
}


export default EditProfile;