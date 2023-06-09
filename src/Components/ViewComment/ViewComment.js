import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import {Avatar}  from "@material-ui/core";
import dp from "../../images/dp6.png"
import './ViewComment.css'
import { baseURL } from "../../Config/constants";

function ViewComment(){
    const accessToken = sessionStorage.getItem('access_token');
    const {id} = useParams();
    const [data, setData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            if (id !== "") {
                const response = await fetch(`${baseURL}core/view_comment/${id}/`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status===200){
                    const resp = await response.json();
                    console.log(resp)
                    setData(resp);
                }
            }
        }
        fetchData();
    }, [accessToken, history, id]);

    if (data === null) {
        return <div>Loading...</div>;
    }


    return(
        <div className='container'>
            <NavBar/>
            <div>
            {data && data.map((result) => (
                <div key={result.id}  className='view__mycard'>
                    {result.profile_picture ?(
                        <Avatar src={result.profile_picture}/>
                    ):<Avatar src={dp}/>
                }
                    <div className='view__vert__item'>{result.username}</div>
                    <div  className="view__comment__box" variant="standard">{result.text}</div>
                </div>
                
            ))}
            </div>
        </div>
    )

}

export default ViewComment;

