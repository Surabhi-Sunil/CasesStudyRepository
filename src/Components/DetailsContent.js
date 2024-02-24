import React from 'react';
import { Typography } from '@mui/material';

export default function DetailsPage(props) {
    const historyPoints = props.history.split('\n');
    const findingPoints = props.findings.split('\n');

    return (
        <div style={{ marginTop: "100px", display: "flex", justifyContent: "center", height: "800px" }}>
            <div style={{ width: "60%", height: "95%", marginRight: "20px", marginLeft: "50px", backgroundColor: "#800000", padding: "20px", borderRadius: "10px" }}>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ backgroundColor: "#FF7373", borderRadius: "10px" }}>
                        <Typography variant="h6" style={{ marginLeft: "20px", color: "black", marginBottom: "10px" }}>Patient</Typography>
                    </div>
                    <Typography style={{ marginLeft: "20px", color: "#FFFFFF" }}>{props.age} year old {props.sex === 'F' ? 'Female' : 'Male'}</Typography>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ backgroundColor: "#FF7373", borderRadius: "10px" }}>
                        <Typography variant="h6" style={{ marginLeft: "20px", color: "black", marginBottom: "10px" }}>Chief Complaint</Typography>
                    </div>
                    <Typography style={{ marginLeft: "20px", color: "#FFFFFF" }}>{props.complaint}</Typography>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ backgroundColor: "#FF7373", borderRadius: "10px" }}>
                        <Typography variant="h6" style={{ marginLeft: "20px", color: "black", marginBottom: "10px" }}>Background and/or Patient history</Typography>
                    </div>
                    <Typography component="ul" style={{ marginLeft: "20px", color: "#FFFFFF" }}>
                        {historyPoints.map((point, index) => (
                            <li key={index}>{point.trim()}</li>
                        ))}
                    </Typography>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ backgroundColor: "#FF7373", borderRadius: "10px" }}>
                        <Typography variant="h6" style={{ marginLeft: "20px", color: "black", marginBottom: "10px" }}>Findings</Typography>
                    </div>
                    <Typography component="ul" style={{ marginLeft: "20px", color: "#FFFFFF" }}>
                        {findingPoints.map((point, index) => (
                            <li key={index}>{point.trim()}</li>
                        ))}
                    </Typography>
                </div>
            </div>
            <div style={{ width: "40%", overflow: "auto", display: "flex", flexDirection: "column", marginRight: "15px" }}>
                {props.image && (
                    <img style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }} src={require(`${props.image}`)} alt="Patient" />
                )}
                {props.image2 && (
                    <img style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }} src={require(`${props.image2}`)} alt="Patient" />
                )}
                {props.image3 && (
                    <img style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }} src={require(`${props.image3}`)} alt="Patient" />
                )}
                {props.image4 && (
                    <img style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }} src={require(`${props.image4}`)} alt="Patient" />
                )}
                {props.image5 && (
                    <img style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px" }} src={require(`${props.image5}`)} alt="Patient" />
                )}
            </div>
        </div>
    );
}
