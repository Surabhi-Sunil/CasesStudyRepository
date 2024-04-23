import React, { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from './StepContext';
import { Alert } from '@mui/material';
import { AddNewCaseStyles } from './AddNewCaseStyles';


export default function FirstStep() {
    const { setCurrentStep, caseData, setCaseData } = useContext(multiStepContext);
    const [error, setError] = useState(false);

    const nextButtonClick = () => {
        if (!caseData['CaseTitle']) {
            setError(true)
        }
        else {
            setError(false)
            setCurrentStep(2);
        }
    }

    const handleTitleChange = (e) => {
        setCaseData({ ...caseData, "CaseTitle": e.target.value });
        setError(false);
    }
    
    const ButtonStyle = {
        cursor: error ? 'not-allowed' : 'pointer',
        marginTop: "30px",
        backgroundColor: error ? '#B3B3B3' : "#FFCC33",
        color: "black"
    }

    return (
        <div style={AddNewCaseStyles.root}>
            <div style={AddNewCaseStyles.formContainer}>
                <div style={AddNewCaseStyles.TextFieldDiv}>
                    <label style={AddNewCaseStyles.headerStyle}>Case Study Title: </label>
                    <TextField
                        value={caseData['CaseTitle']}
                        onChange={handleTitleChange}
                        margin="normal"
                        color="secondary"
                        inputProps={{ style: { fontSize: '0.8rem', boxSizing: "inherit", borderRadius: '5px', backgroundColor: '#ffcccc' } }}
                        style={AddNewCaseStyles.textStyle}></TextField>
                </div>
                <div style={AddNewCaseStyles.TextFieldDiv}>
                    <label style={AddNewCaseStyles.headerStyle}>Case Study Reference: </label>
                    <TextField
                        value={caseData['Reference']}
                        onChange={(e) => setCaseData({ ...caseData, "Reference": e.target.value })}
                        margin="normal"
                        color="secondary"
                        inputProps={{ style: { fontSize: '0.8rem', boxSizing: "inherit", borderRadius: '5px', backgroundColor: '#ffcccc' } }}
                        style={AddNewCaseStyles.textStyle}></TextField>
                </div>
            </div>
            <div style={AddNewCaseStyles.ButtonDiv}>
                <Button disabled={error} style={ButtonStyle} onClick={() => nextButtonClick()}>Next</Button>
            </div>
            <div>
                {
                    error &&
                    <Alert style={AddNewCaseStyles.AlertStyle} severity="error">Case Title cannot be empty.</Alert>
                }
            </div>
        </div>
    );
}
