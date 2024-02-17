import React from 'react';
import { Typography } from '@mui/material';

export default function DetailsPage(props) {
    const historyPoints = props.history.split(',');

    return (
        <div style={{ marginTop: "100px", display: "flex" }}>
            <div style={{ width: "65%", marginRight: "20px", marginLeft: "50px" }}>
                <div style={{ marginBottom: "20px" }}>
                    <Typography variant="h6">Patient</Typography>
                    <Typography>{props.age} year old {props.sex === 'F' ? 'Female' : 'Male'}</Typography>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <Typography variant="h6">Chief Complaint</Typography>
                    <Typography>{props.complaint}</Typography>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <Typography variant="h6">Background and/or Patient history</Typography>
                    <Typography component="ul">
                        {historyPoints.map((point, index) => (
                            <li key={index}>{point.trim()}</li>
                        ))}
                    </Typography>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <Typography variant="h6">Findings</Typography>
                    <Typography>{props.findings}</Typography>
                </div>
            </div>
            {props.image &&(
                <div style={{ width: "35%" }}>

                    <img style={{ maxWidth: "450px", maxHeight: "450px" }} src={require(`${props.image}`)} alt="Patient" />

                </div>
            )}
        </div>
    );
}
