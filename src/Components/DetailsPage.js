import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TopBar from '../TopBar';

export default function DetailsPage() {
    let { caseID } = useParams(); // Destructure caseID from useParams result
    console.log(caseID);

    const location = useLocation();
    const { data } = location.state || {};
    

    return (
        <TopBar/>
    );
}
