import {  collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react";
import { dbService } from "fbase";
import Kweet from "components/Kweet";
import KweetFactory from "components/KweetFactory";


const Home = ({ userObj }) => {
   const [kweets, setKweets] = useState([]);

   useEffect(()=>{
      onSnapshot(collection(dbService, "kweets"), (snapshot) => {
         const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
         }));

         setKweets(newArray);
      })
   },[]);
   return (
      <>
       <KweetFactory userObj={userObj}/>

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
