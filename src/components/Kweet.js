import { dbService } from "fbase";
import { deleteDoc, doc } from "@firebase/firestore";

const Kweet = ({ kweetObj, isOwner }) => {
    
    const onDeleteClick = async () => {
        const ok = window.confirm("Delete Tweet? Deleted messages cannot be recovered.");
        console.log(ok);

        if(ok) {
            console.log(kweetObj.id);
            const data = deleteDoc(doc(dbService, "kweets", kweetObj.id));
            console.log(data);
        }
    };


    return (
        <div>
            <h4>{kweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Kweet</button>
                    <button>Edit Kweet</button>
                </>
            )}      
        </div>
    );
};


export default Kweet;
