/*
    This will be the hook that will be used to create a new leader
    in the Firestore database. This hook will be used to create
    a new leader whenenver the user is new
*/
import { collection, addDoc, serverTimestamp } from "../../frontend/node_modules/firebase/firestore";
import { db } from "../config/firebase-config.js"; 

export const useCreateLeader = () => {
    const leaderCollectionRef = collection(db, "leader");
    const createLeader = async () => {
        await addDoc(leaderCollectionRef, {
            leaderID: "0001",
            leaderName: "Daniel Mendoza",
            leaderEmail: "dmendoza98@gmail.com",
            leaderPhone: "2389r2389",
            leaderGroup: "CSUDH",
            leaderRole: "SI Leader",
            leaderStatus: "True",
            timeStamp: serverTimestamp()
        });
    };
    return { createLeader };
}