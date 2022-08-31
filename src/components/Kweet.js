import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storageService } from "fbase";

const Kweet = ({ kweetObj, isOwner }) => {
    
    const [editing, setEditing] = useState();
    const [newKweet, setNewKweet] = useState(kweetObj.text);



    const onDeleteClick = async () => {
        const ok = window.confirm("Delete Tweet? Deleted messages cannot be recovered.");
        console.log(ok);

        if(ok) {
            console.log(kweetObj.id);
            const data = deleteDoc(doc(dbService, "kweets", kweetObj.id));
            console.log(data);

            if(kweetObj.attachmentUrl !== "") {
                await deleteObject(ref(storageService, kweetObj.attachmentUrl)); 
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target : { value },
        } = event;
        setNewKweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(kweetObj.id, newKweet);
        updateDoc(doc(dbService, "kweets", kweetObj.id), { text: newKweet });
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newKweet} required />
                        <input type="submit" value="Update Kweet" />
                    </form>
                    <button onClick={toggleEditing}> Cancel </button>
                </>
            ) : (
                <>
                        <h4>{kweetObj.text}</h4>

                            {kweetObj.attachmentUrl && (
                                <>
                                <img src={kweetObj.attachmentUrl} width="50px" height="50px" alt="tweets"/>
                                </>
                            )}

                          {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Kweet</button>
                            <button onClick={toggleEditing}>Edit Kweet</button>
                         </>
                    )}      
                </>
            )}

        </div>
    );
};


export default Kweet;
