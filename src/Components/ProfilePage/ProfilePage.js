import './ProfilePage.css'
import NavBar from "../NavBar/NavBar";
import ProfilePosts from "../ProfilePost/ProfilePosts";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
function ProfilePage(){
    return(
        <div>
            <NavBar />
            <ProfileHeader/>
            <ProfilePosts/>
        </div>
    )
}


export default ProfilePage;