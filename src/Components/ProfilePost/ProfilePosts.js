import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './ProfilePosts.css'
import {Avatar}  from "@material-ui/core";
import love from "../../images/love.svg"; 
import comment from "../../images/comment.svg"; 
import share from "../../images/share.svg"; 
import dp from "../../images/dp6.png"
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import { baseURL } from "../../Config/constants";

function ProfilePost(){
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const history = useHistory();
    const [like, setLike] = useState(false)
    const [updateFlag, setUpdateFlag] = useState(false);
    const [data, setData] = useState("")
    

    async function handleLoveClick(id) {
        if (!accessToken || !refreshToken) {
            history.push('/');
            return;
        }
        debugger
        const response = await fetch(`${baseURL}core/like/${id}/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if(response.ok){
            setLike(true)

        }
        else{
            setLike(false)
        }
    }
    
    async function handleDeleteClick(id) {
        if (!accessToken || !refreshToken) {
            history.push('/');
            return;
        }
        const requestBody = {is_active:false}
        const response = await fetch(`${baseURL}core/update_post/${id}/`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body:JSON.stringify(requestBody)
        });
        if(response.ok){
            setUpdateFlag(!updateFlag);
            
        }
        else{
            // setLike("")
        }
    }
    
    useEffect(() => {
        async function fetchData() {
            try {
                if (!accessToken || !refreshToken) {
                    history.push('/');
                    return;
                }
                const response = await fetch(`${baseURL}core/posts/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if(response.ok){
                    const data = await response.json();
                    console.log(data)
                    setData(data)
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [accessToken, refreshToken, history, updateFlag]);   
    return(
        <div>

            {data && data.map(item => (
                
                <div className="profile__post__container" key={item.id}>
                    <div className="profile__post__header">
                        {item.user_profile_picture?(
                            <Avatar className='profile__post__image' src={item.user_profile_picture}/>
                        ):<Avatar className='profile__post__image' src={dp}/>}
                        <div className="profile__post__username">{item.username}</div>
                        {item.location !==null ?(
                            <div className="profile__post__location">{item.location}</div>
                        ):null}
                        <Link to={`/editpost/${item.id}`}><MoreVertIcon className={`profile__post__edit ${item.location ? 'profile__post__edit_location' : 'profile__post__edit'}`}/></Link>
                    </div>

                    {item.picture?(
                    <div>
                        <img src={item.picture} width="615px;"/>
                    </div>    
                    
                    ):
                    <div>
                        <video src={item.video} width="615px;" controls/>
                    </div>
                    
                    }
                    
                    <div>
                        <div className="post__footer">
                            <img src={love} className={`post_reactimage ${like ? "liked":""}`} onClick={() => handleLoveClick(item.id)}/>
                            <Link to={`/createcomment/${item.id}`}><img src={comment} className="post_reactimage"/></Link>
                            <img src={share} className="post_reactimage"/>
                            <Button className="post_reactimage" id={item.id} onClick={()=> handleDeleteClick(item.id)} startIcon={<Box sx={{ color: 'black' }}><DeleteIcon /></Box>}/>
                        </div>
                        {item.likes_count?(
                                <div className="profile__like__div">{item.likes_count } likes </div>
                            ):null}

                            {item.comments_count?(
                            <div>
                                <div className="profile__comment__div">{item.comments_count } comments </div>
                                <Link to={`/viewcomment/${item.id}`}><MessageIcon/></Link>view comments
                            </div>):null}

                            {item.description ?(
                                <div style={{position:"relative","bottom":"70px", "left":"150px", "fontWeight":"bold"}}>{item.description}</div>
                            ):null}
                    </div>
                </div>

                
            ))}
        </div>
    )
}


export default ProfilePost;