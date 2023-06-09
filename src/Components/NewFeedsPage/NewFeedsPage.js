import './NewFeedsPage.css'
import NavBar from "../NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Post from '../Post/Post'
import { baseURL } from '../../Config/constants';


function NewFeedsPage() {
    const history = useHistory();
    const [data, setData] = useState("")
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');

    useEffect(() => {
        async function fetchData() {
            try {
                if (!accessToken || !refreshToken) {
                    history.push('/');
                    return;
                }
                const response = await fetch(`${baseURL}core/newsfeed/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if(response.ok){
                    const data = await response.json();
                    setData(data)
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

    return (
        <div>
            <NavBar />
            <Post data={data}/>
        </div>
    );
}

export default NewFeedsPage;
