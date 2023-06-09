import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import './Post.css'
import {Avatar}  from "@material-ui/core";
import love from "../../images/love.svg"; 
import comment from "../../images/comment.svg"; 
import share from "../../images/share.svg"; 
import dp from "../../images/dp6.png"
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import MessageIcon from '@mui/icons-material/Message';
import { baseURL } from "../../Config/constants";

function Post(props){
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const history = useHistory();
    const [like, setLike] = useState("")

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
            const data = await response.json();
            setLike(data)
        }
        else if(response.status===401){
            history.push('/');
            return;
        }
        else{
            setLike("")
        }
    }      
    return(
        <div>

            {props.data && props.data.map(item => (
                <div className="post__container" key={item.id}>
                    <div className="post__header">
                        {item.user_profile_picture?(
                            <Avatar className='post__image' src={item.user_profile_picture}/>
                        ):<Avatar className='post__image' src={dp}/>}
                        <div className="post__username">{item.username}</div>
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
                            <img src={love} className="post_reactimage" onClick={() => handleLoveClick(item.id)}/>
                            <Link to={`/createcomment/${item.id}`}><img src={comment} className="post_reactimage"/></Link>
                            <img src={share} className="post_reactimage"/>
                            <TurnedInNotIcon style={{marginLeft:"450px", height:"50px"}}/>
                        </div>
                        
                    </div>
                        {item.likes_count?(
                            <div className="like__div">{item.likes_count } likes </div>
                            ):null}
                            
                        {item.comments_count?(
                            <div>
                                <div className="comment__div">{item.comments_count } comments </div>
                                <Link to={`/viewcomment/${item.id}`}><MessageIcon/></Link>view comments
                            </div>):null}

                        {item.description ?(
                            <div style={{position:"relative","bottom":"70px", "left":"150px", "fontWeight":"bold"}}>{item.description}</div>
                        ):null}
                </div>

                
            ))}
        </div>
    )
}


export default Post;