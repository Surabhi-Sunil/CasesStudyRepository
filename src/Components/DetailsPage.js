import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../TopBar';
import DetailsContent from './DetailsContent';

export default function DetailsPage() {

    const location = useLocation();
    const { data } = location.state || {};
    console.log(data);
    return (
        <div>
            <TopBar />
            <DetailsContent
                age={data.PatientAge}
                sex={data.PatientSex}
                complaint={data.Complaint}
                history={data.Background}
                findings ={data.Findings}
                image={data.Image}/>
        </div>
    );
}
