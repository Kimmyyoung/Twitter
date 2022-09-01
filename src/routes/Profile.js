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
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" value={newDisplayName} placeholder="Display Name" />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )
};

export default Profile;
