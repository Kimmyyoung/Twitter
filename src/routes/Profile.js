import authService, { dbService } from "fbase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "firebase/auth";



const Profile = ({ userObj, refreshUser }) => {
    
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    // const getMyKweets = async () => {
       
    //     const q = query (
    //         collection(dbService, "kweets"),
    //         where("creatorId", "==", `${userObj.uid}`)
    //     );

    //     const querySnapshot = await getDocs(q);

    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, "=>", doc.data());
    //     });  
    // };

    // useEffect(() => {
    //     getMyKweets();
    // },[]);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(await authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput" />
              
                <input type="submit" value="Update Profile" className="formBtn" style={{
                    marginTop: 10,
                }}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                <button onClick={onLogOutClick}>Logout</button>
            </span>
        </div>
    )
};

export default Profile;
