import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import "./CreateComment.css"
import { baseURL } from "../../Config/constants";

function CreateComment(){
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const {id} = useParams();
    const [comment, setComment] = useState(null);
    const history = useHistory();

    const doneHandler = async()=>{
        debugger
        if (id && comment) {
            // const url = `/core/comment/${id}/`;
            let formData = new FormData();
            formData.append('comment',comment)
            const response = await fetch(`${baseURL}core/comment/${id}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData
            });
            if (response.status === 201) {
                history.goBack();
            } 
            else {
                console.error(response.statusText);
            }
        } 
        else {
            if (!comment) {
                alert("Comment cannot be empty.");
            }
            else{
                history.push('/profile');
            }
        }
    }
    return(
        <div className="container">
            <NavBar/>
            <div className="position__div">
                <TextField  className="comment__box" variant="standard" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <div className='comment__btn__done'><button  onClick={doneHandler}>Done</button></div>
            </div>
        </div>
    )

}

export default CreateComment;

