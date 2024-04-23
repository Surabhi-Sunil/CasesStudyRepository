import React, { useEffect, useState } from "react";
import AddNewCase from "./AddNewCase";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const multiStepContext = React.createContext();

const StepContext = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [caseData, setCaseData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedWithID, setSelectedWithID] = useState([]);

    const navigate = useNavigate();

    const sendDataToDatabase = async (formData) => {
        try {
            const response = await fetch('http://localhost:3001/api/sendData', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                setOpen(false)
                throw new Error('Network response was not ok');
            }
            setOpen(true)
        } catch (error) {
            setOpen(false)
            console.error('Error sending data:', error);
        }
    };

    useEffect(() => {
        if (finalData.length > 0) {
            const formData = new FormData();
            finalData.forEach((data, index) => {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        formData.append(`${key}`, data[key]);
                    }
                }
            });
            if (selectedWithID.length > 0) {
                selectedWithID.forEach((data, index) => {
                    for (const key in data) {
                        formData.append(`${key}`, data[key]);
                    }
                })
            }
            sendDataToDatabase(formData);
        }
    }, [finalData]);

    function submitData(selectedWithID) {
        setFinalData([...finalData, caseData]);
        setCaseData('');
        setSelectedWithID(selectedWithID);
    }

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };

    return (
        <div>
            <multiStepContext.Provider value={{ currentStep, setCurrentStep, caseData, setCaseData, finalData, setFinalData, submitData }}>
                <AddNewCase />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Case Study Add Success</DialogTitle>
                    <DialogContent>
                        <Alert severity="success">
                            You have successfully inserted the case study.
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </multiStepContext.Provider>
        </div>
    );
};

export default StepContext;
