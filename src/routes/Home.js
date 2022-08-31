import {  addDoc, collection, serverTimestamp, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react";
import { dbService, storageRef, storageService } from "fbase";
import Kweet from "components/Kweet";
import { v4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";



const Home = ({ userObj }) => {
   const [kweet, setKweet] = useState("");
   const [kweets, setKweets] = useState([]);
   const [attachment, setAttachment ] = useState();

   useEffect(()=>{

      onSnapshot(collection(dbService, "kweets"), (snapshot) => {

         const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
         }));

         setKweets(newArray);

      })
   },[]);

   
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
      <>
         <form onSubmit={onSubmit}>
            <input value={kweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Kweet" />
            {attachment && (
               <div>
                  <img src={attachment} width="50px" height="50px" /> 
                  <button onClick={onClearAttachment}>Clear</button>
               </div>   
               )}
         </form>

         <div>
            {
               kweets.map((kweet) => (
                  <Kweet key={kweet.id} kweetObj={kweet} isOwner={kweet.creatorId === userObj.uid} />
               ))
            }
         </div>  

      </>
   );
};

export default Home;
