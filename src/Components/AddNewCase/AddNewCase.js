import React, { useContext } from 'react';
import TopBar from '../TopBar';
import { AddNewCaseStyles } from './AddNewCaseStyles';
import FirstStep from './FirstStep';
import { Button, Typography } from '@mui/material';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { multiStepContext } from './StepContext';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AddNewCase() {
    const { currentStep } = useContext(multiStepContext);
    const navigate = useNavigate();
    function showStep(step) {
        switch (step) {
            case 1:
                return <FirstStep />
            case 2:
                return <SecondStep />
            case 3:
                return <ThirdStep />
            default:
                return <FirstStep />

        }
    }
    const handleNavigation = () => {
        navigate('/');
    }

    return (
        <div>
            <TopBar />
            <div style={AddNewCaseStyles.content}>
                <Button onClick={handleNavigation}>
                    <ArrowBackIcon style={{ textAlign: "center", color: "white" }}/>
                    <Typography variant="h7" style={{ marginLeft:"5px",textAlign: "center", color: "white" }}>Back</Typography></Button>
                <div style={{ backgroundColor: "#FFCC33", padding: "10px" }}>
                    <Typography variant="h6" style={{ textAlign: "center", color: "black" }}>Add a New Case Study</Typography>
                </div>
                <div style={{ marginLeft: "620px", marginTop: "10px", width: "20%", }}>
                    <Stepper activeStep={currentStep - 1} orientation="horizontal">
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                    </Stepper>
                </div>
                {showStep(currentStep)}
            </div>
        </div>

    );
}