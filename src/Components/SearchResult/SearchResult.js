import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import {Avatar}  from "@material-ui/core";
import dp from "../../images/dp6.png"
import './SearchResult.css'
import { baseURL } from '../../Config/constants';

function SearchResult() {    
    const { word } = useParams();
    const accessToken = sessionStorage.getItem('access_token');
    const history = useHistory();
    const [data, setData] = useState(null);

    const handleFollow = async(id)=>{
        debugger
        let formData = new FormData();
        if(id){
            formData.append('followed_user_id',id);
            const response = await fetch(`${baseURL}core/follow/done/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body:formData
        });
        if (response.status === 200) {
            history.push('/profile')
        } 
        else if(response.status === 400) {
            alert('Already Following')
        }

        }
        


    }

    useEffect(() => {
        const fetchData = async () => {
            if (word !== "") {
                const response = await fetch(`${baseURL}user/search_profile/${word}`,{
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status===302){
                    const resp = await response.json();
                    console.log(resp)
                    setData(resp.search_profiles);
                }
                else if(response.status===401){
                    history.push('/');
                    return;
                }
            }
        }
        fetchData();
    }, [accessToken, history, word]);

    if (data === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <NavBar/>
            <div>
            {data && data.map((result) => (
                <div key={result.id}  className='mycard'>
                    {result.profile_picture ?(
                        <Avatar src={result.profile_picture}/>

                    ):<Avatar src={dp}/>
                }
                    <div className='vert__item'>{result.username}</div>
                    <div><button type="submit" className='btn btn-primary btn-sm' style={{position:"relative", left:"200px", top:"4px"}} id={result.id} onClick={()=>handleFollow(result.id)}>Follow</button></div>
                </div>
                
            ))}
            </div>
        </div>
    );
}

export default SearchResult;
