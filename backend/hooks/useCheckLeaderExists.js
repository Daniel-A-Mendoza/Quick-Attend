import { collection, query, where } from "../../frontend/node_modules/firebase/firestore";
import {useState, useEffect} from "react";
import { db } from "../config/firebase-config.js"; 
import {useGetUserInfo} from "./useGetUserInfo.js";

export const useCheckLeaderExists = () => {
    const [leaderExists, setStatus] = useState([]);
    const {userID} = useGetUserInfo();
    const leaderCollectionRef = collection(db, "leader");
    const getLeader = async () => {
        try{
            const queryLeader = query(leaderCollectionRef, where("leaderID", "==", userID));
            onSnapshot(queryLeader, (snapshot) => {
               snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    
               })
            });
        } catch (err){
            console.error("Error checking leader existence: ", err);
        }
    };

    useEffect(() => {
        getLeader();
    }, []);
};
