import './EditPost.css'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import {Avatar}  from "@material-ui/core";
import dp from "../../images/dp6.png"
import { Link, useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import PlaceIcon from '@mui/icons-material/Place';
import { baseURL } from '../../Config/constants';

function EditPost(){
    
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState(null)
    const [description, setDescription] = useState(null)
    const [location, setLocation] = useState(null)

    const doneHandler = async (e)=> {
        try {
            debugger
            if (!accessToken || !refreshToken) {
                history.push('/');
                return;
            }
            const requestBody = {description, location}
            const response = await fetch(`${baseURL}core/update_post/${id}/`, {
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
                
                }
                else{
                }
        
    } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        async function fetchPost() {
            const response = await fetch(`${baseURL}core/update_post/${id}/`,{
            method:"PATCH",
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
            });
            if (response.ok) {
                const postData = await response.json();
                setData(postData);
                setLocation(postData.location)
                setDescription(postData.description)
            }
        }
        fetchPost();
    }, [id]);
    
    if (!data) {
        return <div>Loading...</div>;
    }
    
    return(
        <div>
            <NavBar/>

            
                <div className="edit__profile__post__container" key={data.id}>
                    <div className="edit__profile__post__header">
                        {data.user_profile_picture?(
                            <Avatar className='edit__profile__post__image' src={data.user_profile_picture}/>
                        ):<Avatar className='edit__profile__post__image' src={dp}/>}
                        <div className="edit__profile__post__username">{data.username}</div>
                        <div><PlaceIcon className='edit__profile__post__location__icon'/><TextField  className='edit__profile__post__location'  variant="standard" value={location} onChange={(e)=>{setLocation(e.target.value)}}/></div>
                        <div><TextField  className='edit__profile__post__description'  variant="standard" placeholder='Enter description' value={description} onChange={(e)=>{setDescription(e.target.value)}}/></div>
                    </div>

                    {data.picture?(
                    <div>
                        <img src={data.picture} width="615px;" style={{marginTop:"100px"}}/>
                    </div>    
                    
                    ):
                    <div>
                        <video src={data.video} width="615px;" style={{marginTop:"100px"}} controls/>
                    </div>
                    
                    }
                    
                </div>

                <div className='edit__btn__done'><button  onClick={doneHandler}>Save</button></div>
        </div>               

    )



}
export default EditPost;