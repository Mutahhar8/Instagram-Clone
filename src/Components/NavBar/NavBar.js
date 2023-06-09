import React, {useState, useEffect, useRef} from "react"
import './NavBar.css'
import Grid from '@material-ui/core/Grid'
import instagramLogo from '../../images/logoinsta.png'
import home from '../../images/home.svg'
import message from '../../images/message.svg'
import find from '../../images/find.svg'
import love from '../../images/love.svg'
import Avatar from '@material-ui/core/Avatar';
import dp from "../../images/dp6.png"
import { IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Link, useHistory, useLocation } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { baseURL } from "../../Config/constants"

function NavBar() {
    const accessToken = useRef(null);
    const refreshToken = useRef(null);
    // const accessToken = sessionStorage.getItem('access_token');
    // const refreshToken = sessionStorage.getItem('refresh_token');
    const [searchWord, setSearchWord] = useState("")
    const [showLogout, setShowLogout] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const handleMoreVertClick = () => {
        setShowLogout(!showLogout);
    };
    
    useEffect(() => {
        async function fetchData() {
        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            accessToken.current = await searchParams.get('access_token');
            refreshToken.current = await searchParams.get('refresh_token');
            if (accessToken.current) {
                sessionStorage.setItem('access_token', accessToken.current);
                sessionStorage.setItem('refresh_token', refreshToken.current);
                        
            } 
        }
        accessToken.current = sessionStorage.getItem('access_token');
        refreshToken.current = sessionStorage.getItem('refresh_token');
        if(!accessToken.current || !refreshToken.current) {
            history.push('/');
            return;
        }
        
    }
    fetchData();})
    
    const searchHandler = (e)=>{
        setSearchWord(e.target.value)  
        e.preventDefault();
    }

    const buttonHandler = async(e)=>{
        e.preventDefault();
        if (searchWord !== "") {
            history.push(`/searchword/${searchWord}`)
    }    
    
}
const buttonLogoutHandler = async(e)=>{
    debugger
    e.preventDefault();
    debugger
    const requestBody = {refresh_token:refreshToken};
    const response = await fetch(`${baseURL}user/logout/`,{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody)
    });
        if (response.status===205){
            sessionStorage.clear();
        }
        sessionStorage.clear();
        history.push('/')
    }    

    return(
        <div>
            <div className="navbar_barContent container0.">
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3}>
                        <img src={instagramLogo} className="navbar_logo" width="105px"/>
                    </Grid>
                    <Grid item xs={3}>
                        <input type="text" className="navbar__searchBar" placeholder="search" onChange={searchHandler} value={searchWord}/>
                        <IconButton aria-label="search" onClick={buttonHandler}><SearchIcon /></IconButton>
                        <div >
                        </div>
                    </Grid>
                    <Grid item xs={3} style={{"display":"flex"}}>
                            <Link to='/newfeeds'> <img className="navbar__img" src={home} width="25px"/></Link>
                            <img className="navbar__img" src={message} width="25px" />
                            <img className="navbar__img" src={find} width="25px" />
                            <img className="navbar__img" src={love} width="25px" />
                            <Link to='/profile'><Avatar src={dp} className="navbar__img" style={{"maxWidth":"25px","maxHeight":"25px"}} /></Link>
                            <MoreVertIcon className="navbar__img" onClick={handleMoreVertClick} />
                            {showLogout && (
                                <LogoutIcon style={{marginTop:"15px"}} onClick={buttonLogoutHandler}/>
                            )}

                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </div>
        </div>
    )
}



















































































































export default NavBar;