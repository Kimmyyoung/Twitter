import {  addDoc, collection, serverTimestamp, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Kweet from "components/Kweet";

const Home = ({ userObj }) => {
   const [kweet, setKweet] = useState("");
   const [kweets, setKweets] = useState([]);

   // const getkweets = async ()=>{
   //    const dbKweets = await getDocs(collection(dbService, "kweets"));

   //    dbKweets.forEach((document) => {
   //       const kweetObject = {...document.data(), id: document.id };
   //       setKweets((prev) => [kweetObject, ...prev]);
   //    });
   // };

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

      await addDoc(collection(dbService, "kweets"), {
         text: kweet,
         createdAt: serverTimestamp(),
         creatorId: userObj.uid,
       });
      setKweet("");
   };

   const onChange = (event) => {
      event.preventDefault();
      const {
         target: {value},
      } = event;
      setKweet(value);
   };

   console.log(kweets);

   return (
      <>
         <form onSubmit={onSubmit}>
            <input value={kweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Kweet" />
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
