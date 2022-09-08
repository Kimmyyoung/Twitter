import { dbService, storageRef, storageService} from 'fbase';
import { useState } from 'react';
import { v4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import {  collection, addDoc, serverTimestamp } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const KweetFactory = ({userObj}) => {
  
       const [kweet, setKweet] = useState("");
       const [attachment, setAttachment ] = useState();

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        
        if(attachment !== "") {
           const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
           const response = await uploadString(attachmentRef, attachment, "data_url");
           attachmentUrl = await getDownloadURL(response.ref);   
        }
  
        await addDoc(collection(dbService, "kweets"), {
           text: kweet,
           createdAt: serverTimestamp(),
           creatorId: userObj.uid,
           attachmentUrl,
         });
  
        setKweet("");
        setAttachment("");
     };

     const onChange = (event) => {
        event.preventDefault();
        const {
           target: {value},
        } = event;
        setKweet(value);
     };
  
   const onFileChange = (event) => {
    const {
       target : { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
       const {
          currentTarget: { result },
       } = finishedEvent;
       setAttachment(result);
    }
    reader.readAsDataURL(theFile);
 };

   const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
            <input className="factoryInput__input" value={kweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>     

      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
    )
}

export default KweetFactory;
