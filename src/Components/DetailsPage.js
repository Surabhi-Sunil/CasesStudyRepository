import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import DetailsContent from './DetailsContent';
export default function DetailsPage() {

    const location = useLocation();
    const { data } = location.state || {};
    
    return (
        <div>
            <TopBar />
            <DetailsContent
                age={data.PatientAge}
                sex={data.PatientSex}
                complaint={data.Complaint}
                history={data.Background}
                findings={data.Findings}
                image={data.Image}
                image2={data.Image2}
                image3={data.Image3}
                image4={data.Image4}
                image5={data.Image5}
                Reference={data.reference}
            />
        </div>
    );
}
