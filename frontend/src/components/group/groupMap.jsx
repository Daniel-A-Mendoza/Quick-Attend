import React from 'react';
import GroupCard from './groupCard.jsx';
const GroupMap = ({ groups }) => {
    console.log("The length is: " + groups.length);
    return (
        <div className="group-map">
            {groups.map((group) => (
                <GroupCard key={group.groupCode} location = {group.groupLocation} groupTerm = {2024} />
            ))}
        </div>    

       
    );
};

export default GroupMap;