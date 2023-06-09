import './ProfileHeader.css'
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { baseURL } from '../../Config/constants';

function ProfileHeader() {

    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const history = useHistory();
    const [user, setUser] = useState(null);

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
    <div className="profile-header">
        <img src={user.profile_picture} alt="Profile picture" />
        <div className="username">{user.username}</div>
        <div className="follower-count">
            <span>{user.follower_count}</span> followers
        </div>
        <div className="following-count">
            <span>{user.following_count}</span> following
        </div>
        <div> <Link to={"/editprofile"}><button style={{ backgroundColor: "white", color: "black" }}>Edit Profile</button></Link></div>
        <div><Link to={"/createpost/"}><AddIcon className="addicon"/></Link></div>
    </div>
    );
}


export default ProfileHeader;