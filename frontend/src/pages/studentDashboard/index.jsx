import {Header} from "../../components/header/index.jsx";
import {Popup} from "../../components/popup/popup.jsx";
import GroupCard from "../../components/group/groupCard.jsx";
import {useState} from "react";
import {db} from "../../../../backend/config/firebase-config.js"
import { doc, setDoc, getDoc, getDocs, collection, query, where} from "../../../node_modules/firebase/firestore";
import { useEffect } from "react";
import { useGetUserInfo } from "../../../../backend/hooks/useGetUserInfo.js";
import { useNavigate } from "react-router-dom";
import StudentGroup from "../../components/studentGroups/studentGroup.jsx";

export const StudentDashboard = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [state, setState] = useState(false);
    const [groupCode, setGroupCode] = useState('');
    const handleOpenPopup = () =>{
        setIsPopupOpen(true);
    };

    const handleClosePopup = () =>{
        setIsPopupOpen(false);
    };

    // Finished verifying that a group code exists
    const handleNavigation = (group) => {
        navigate(`/student/group/${group.groupName}`, { state: group });
    };
    const checkGroupCode = async () => {
        const groupCode = document.getElementById("groupCode").value;
        console.log(groupCode);
        const groupRef = collection(db, "group");
        const q = query(groupRef, where("groupCode", "==", groupCode));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

    const groupExists = groups.some(group => group.groupCode === groupCode);
    if (groupExists) {
        setIsPopupOpen(false);
        alert("You are already in this group.");

        return;
    }

        if (!querySnapshot.empty) {
            const groupStudentRef = collection(db, "group_student");
            await setDoc(doc(groupStudentRef),
                 { 
                    groupCode: groupCode,
                    studentID: useGetUserInfo().userID
                 });
           
        } else {
            alert("Group code does not exist.");

        }

        setIsPopupOpen(false);
       setState(!state);

    };

    const getGroups = async () => {
        const groupRef = collection(db, "group_student");
        const q = query(groupRef, where("studentID", "==", useGetUserInfo().userID));
        const querySnapshot = await getDocs(q);
        let temp = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            temp.push(doc.data());
        });
        setGroups(temp)
        const groupDetails = await Promise.all(temp.map(async (group) => {
            const groupDoc = await getDoc(doc(db, "group", group.groupCode));
            return { ...group, ...groupDoc.data() };
        }));
        setGroups(groupDetails);
    };

    const getGroupLeader = async (group) => {
        const tempGroupCode = group.groupCode;
        const groupRef = doc(db, "group", tempGroupCode);
        const groupDoc = await getDoc(groupRef);
        if (groupDoc.exists()) {
            const leaderID = groupDoc.data().leaderID;
            const leaderRef = doc(db, "users", leaderID);
            const leaderDoc = await getDoc(leaderRef);
            if (leaderDoc.exists()) {
                return leaderDoc.data();
            } else {
                console.error("Leader not found");
                return null;
            }
        } else {
            console.error("Group not found");
            return null;
        }
    };

    useEffect( () => {
         getGroups();
    },[state]);
      
    return (
        <div>
            <h1>Student Dashboard</h1>
            <p>View Attendnace</p>
            <p> Join Group </p>
            <button onClick = {handleOpenPopup}>Join a Group</button>
            <Popup isOpen = {isPopupOpen} onClose = {handleClosePopup}>
                <h2>Enter a Group Code to Join: </h2>
                <input type="text" id="groupCode"/>
                <button onClick = {checkGroupCode} onClose = {handleOpenPopup}>Join Group</button>
            </Popup>
            <p> Select Group</p>
            <ul>
                {groups.map((group) => {
                    return (
                        <li key={group.groupCode}>
                           <StudentGroup group = {group} />
                        </li>
                    );
                })}
            </ul>
            <Header />
        </div>
    );
};