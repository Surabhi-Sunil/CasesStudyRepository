import React from 'react';
import { Button, Typography } from '@mui/material';
import { detailsStyles } from './DetailsStyles';
import pptxgen from 'pptxgenjs';

export default function DetailsPage(props) {
    const historyPoints = props.history ? props.history.split('\n') : null;
    const findingPoints = props.findings ? props.findings.split('\n') : null;

    const handleDownloadPPT = () => {
        const pptx = new pptxgen();

        // Create a new slide
        const slide = pptx.addSlide();

        // Define vertical position for text elements
        let yPos = 0.2;

        // Add content to the slide
        slide.addText('Patient', { x: 0.5, y: yPos, fontSize: 20, bold: true, color: '0088CC' });
        yPos += 0.3;
        slide.addText(`${props.age} year old ${props.sex === 'F' ? 'Female' : 'Male'}`, { x: 0.5, y: yPos, fontSize: 14, color: '333333' });
        yPos += 0.5;
        slide.addText('Chief Complaint', { x: 0.5, y: yPos, fontSize: 20, bold: true, color: '0088CC' });
        yPos += 0.4;
        slide.addText(props.complaint, { x: 0.5, y: yPos, fontSize: 14, color: '333333' });

        // Add patient history points
        if (historyPoints) {
            yPos += 0.5;
            slide.addText('Background and/or Patient history', { x: 0.5, y: yPos, fontSize: 20, bold: true, color: '0088CC' });
            yPos += 0.3;
            historyPoints.forEach(point => {
                slide.addText(point.trim(), { x: 0.5, y: yPos, fontSize: 14, color: '333333' });
                yPos += 0.3;
            });
        }

        // Add findings points
        if (findingPoints) {
            yPos += 0.5;
            slide.addText('Findings', { x: 0.5, y: yPos, fontSize: 20, bold: true, color: '0088CC' });
            yPos += 0.3;
            findingPoints.forEach(point => {
                slide.addText(point.trim(), { x: 0.5, y: yPos, fontSize: 14, color: '333333' });
                yPos += 0.3;
            });
        }

        // Download the PowerPoint presentation
        pptx.writeFile('PatientDetails.pptx');
    };

    return (
        <div style={detailsStyles.maindiv}>
            <div style={detailsStyles.contentDiv}>
                <div style={detailsStyles.textDiv}>
                    <div style = {{height: "97%"}}>
                    <div style={detailsStyles.sectionDiv}>
                        <div style={detailsStyles.headingDiv}>
                            <Typography variant="h6" style={detailsStyles.typography}>Patient</Typography>
                        </div>
                        <Typography style={detailsStyles.contentTypography}>{props.age} year old {props.sex === 'F' ? 'Female' : props.sex === 'M' ? 'Male' : 'Non-binary'}</Typography>
                    </div>
                    <div style={detailsStyles.sectionDiv}>
                        <div style={detailsStyles.headingDiv}>
                            <Typography variant="h6" style={detailsStyles.typography}>Chief Complaint</Typography>
                        </div>
                        <Typography style={detailsStyles.contentTypography}>{props.complaint}</Typography>
                    </div>
                    {historyPoints &&
                        <div style={detailsStyles.sectionDiv}>
                            <div style={detailsStyles.headingDiv}>
                                <Typography variant="h6" style={detailsStyles.typography}>Background and/or Patient history</Typography>
                            </div>
                            <Typography component="ul" style={detailsStyles.contentTypography}>
                                {historyPoints.map((point, index) => (
                                    <li key={index}>{point.trim()}</li>
                                ))}
                            </Typography>
                        </div>
                    }
                    {findingPoints &&
                        <div style={detailsStyles.sectionDiv}>
                            <div style={detailsStyles.headingDiv}>
                                <Typography variant="h6" style={detailsStyles.typography}>Findings</Typography>
                            </div>
                            <Typography component="ul" style={detailsStyles.contentTypography}>
                                {findingPoints.map((point, index) => (
                                    <li key={index}>{point.trim()}</li>
                                ))}
                            </Typography>
                        </div>
                    }
                    </div>
                    
                    <div style={{height:"3%", textAlign:'right'}}>
                        <Button style={{ backgroundColor: "#FFCC33", color: "black"}} onClick={handleDownloadPPT}>Download</Button>
                    </div>
                </div>
                <div style={detailsStyles.imageDiv}>
                    {props.image && (
                        <img style={detailsStyles.image} src={require(`${props.image}`)} alt="Patient" />
                    )}
                    {props.image2 && (
                        <img style={detailsStyles.image} src={require(`${props.image2}`)} alt="Patient" />
                    )}
                    {props.image3 && (
                        <img style={detailsStyles.image} src={require(`${props.image3}`)} alt="Patient" />
                    )}
                    {props.image4 && (
                        <img style={detailsStyles.image} src={require(`${props.image4}`)} alt="Patient" />
                    )}
                    {props.image5 && (
                        <img style={detailsStyles.image} src={require(`${props.image5}`)} alt="Patient" />
                    )}
                </div>

            </div>
            <div style={detailsStyles.referenceDiv}>
                <Typography style={{fontSize:"11px"}} >{props.Reference}</Typography>
            </div>
        </div>
    );
}
