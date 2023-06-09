import React from "react";
import NavBar from "../NavBar/NavBar";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { baseURL } from "../../Config/constants";

function CreatePostPage(){
    
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    const [file, setFile] = useState([]);
    const [description, setDescription] = useState(null);
    const [location, setLocation] = useState(null);
    const history = useHistory();

    const handleFileChange = (event) => {
        event.preventDefault();
        setFile(event.target.files);
        console.log(file)
    };
    
    const getFileExtension = (filename) => {
        if (!filename) {
            return null;
        }
        return filename.split('.').pop();
    };
    

    const handleSubmit = async (event) => {
        debugger;
        event.preventDefault();
        if (!file.length>0) {
            alert("Please Upload Image")
            return;
        }
        console.log(file.name)
        const extension = getFileExtension(file[0].name);
        
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase())) {
            let formData = new FormData();
            
            for(let key in file){
                formData.append("picture", file[key]);
            }
            
            if (location){
                formData.append("location", location);
            }
            if (description){
                formData.append("description", description);
            }
            

            const response = await fetch(`${baseURL}core/create_post/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body:formData
            });

            if(response.status===201){
                history.push('/profile')
            }
            else{
                console.log("ERRORasdsadsadasdsad")
            }
        } 
        else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension.toLowerCase())) {
            console.log('Selected file is a video');
            let formData = new FormData();
            for(let key in file){
                formData.append("video", file[key]);
            }

            if (location){
                formData.append("location", location);
            }
            if (description){
                formData.append("description", description);
            }
            
            const response = await fetch(`${baseURL}core/create_post/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body:formData
            });

            if(response.status===201){
                history.push('/profile')
            }
            else{
                console.log("ERRORasdsadsadasdsad")
            }
            
        } 
        else {
            console.log('Selected file is not an image or video');
        }
    };
    return(
        <div>
            <NavBar/>
            <div className="container">
                <div>Description
                <TextField style={{"marginLeft":"55px"}} variant="standard" onChange={(e)=>{setDescription(e.target.value)}} value={description}
                />
                </div>
                <div>Location
                <TextField style={{"marginLeft":"75px"}}  variant="standard" onChange = {(e)=>{setLocation(e.target.value)}} value={location}/>
                </div>
            </div>

            <form className="form form-control" onSubmit={handleSubmit}>
                <div>
                    <input className="form-control form-control-sm" type="file" id="picture" onChange={handleFileChange} />
                </div>
                <button className="form-control" type="submit">Upload</button>
            </form>
        </div>
    )

}



export default CreatePostPage;