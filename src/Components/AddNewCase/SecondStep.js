import React, { useContext, useState } from "react";
import { multiStepContext } from "./StepContext";
import { Button, TextField, Typography, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


export default function SecondStep() {

    const { setCurrentStep, caseData, setCaseData } = useContext(multiStepContext);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [open, setOpen] = useState(false)

    const handleChange = (event) => {
        setError(false)
        setCaseData({ ...caseData, "PatientSex": event.target.value })
    };

    const nextButtonClick = () => {
        const age = caseData['PatientAge']
        const isValidAge = !isNaN(age) && age >= 0 && age <= 120;
        if (!caseData['PatientAge'] || !caseData['PatientSex'] || !caseData['Complaint'] || !caseData['Background'] || !caseData['Findings']) {
            setErrorMessage('Please fill in all fields.');
            setError(true);
            setOpen(true);
            return;
        }
        if (isValidAge) {
            setError(false)
            setOpen(false)
            setCurrentStep(3)

        } else {
            setErrorMessage('Age cannot be empty and should be a number.')
            setError(true);
            setOpen(true)
        }
    }

    const handleAgeChange = (e) => {
        setError(false)
        setOpen(false)
        setCaseData({ ...caseData, "PatientAge": e.target.value })
    }

    return (
        <div>
            <div style={{ margin: "20px", textAlign: "-webkit-center" }}>
                <Typography variant="h6" style={{ textAlign: "center", color: "white" }}>Patient Details</Typography>
                <div style={{ alignContent: "center", width: "70%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
                        <div style={{ display: "flex", width: "100%", flexDirection: "row", alignItems: "center" }}>
                            <label style={{ marginRight: "10px", color: "white", width: "40%" }}>Patient Age: </label>
                            <TextField
                                value={caseData['PatientAge']}
                                onChange={handleAgeChange}
                                margin="normal"
                                color="secondary"
                                inputProps={{ style: { fontSize: '0.8rem', boxSizing: "inherit", borderRadius: '5px', backgroundColor: '#ffcccc' } }}
                                style={{ width: "10%", flexGrow: 1, height: "10%" }}></TextField>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
                            <label style={{ width: "40%", marginLeft: "10px", color: "white" }}>Patient Gender: </label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={caseData['PatientSex']}
                                onChange={handleChange}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            bgcolor: '#ffcccc',
                                            '& .MuiMenuItem-root': {
                                                fontSize: '0.8rem',
                                                boxSizing: "inherit",
                                                borderRadius: '5px',
                                            },
                                        },
                                    },
                                }}
                                style={{ marginTop: "10px", fontSize: '0.8rem', boxSizing: "inherit", backgroundColor: "#ffcccc", borderRadius: '5px', width: "40%", flexGrow: 1, height: "2rem" }}
                            >
                                <MenuItem value={'M'} >Male</MenuItem>
                                <MenuItem value={'F'} >Female</MenuItem>
                                <MenuItem value={'NB'} >Non-Binary</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
                        <label style={{ marginRight: "10px", color: "white", width: "20%" }}>Patient's complaint: </label>
                        <TextField
                            margin="normal"
                            color="secondary"
                            value={caseData['Complaint']}
                            onChange={(e) => {
                                setCaseData({ ...caseData, "Complaint": e.target.value });
                                setError(false);
                            }}
                            multiline
                            InputProps={{ style: { padding: 0 } }}
                            inputProps={{ style: { overflow: "auto", padding: "10px", height: "100px", fontSize: '0.8rem', borderRadius: '5px', backgroundColor: '#ffcccc' } }}
                            style={{ width: "80%", flexGrow: 1 }}>
                        </TextField>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
                        <label style={{ marginRight: "10px", color: "white", width: "20%", alignItems: 'center' }}>
                            Background:
                            <Tooltip title="Every new line will be considered as a bullet point">
                                <IconButton size="small" style={{ marginLeft: '5px' }}>
                                    < InfoIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Tooltip>
                        </label>
                        <TextField
                            margin="normal"
                            color="secondary"
                            value={caseData['Background']}
                            onChange={(e) => {
                                setError(false);
                                setCaseData({ ...caseData, "Background": e.target.value })
                            }}
                            multiline
                            InputProps={{ style: { padding: 0 } }}
                            inputProps={{ style: { overflow: "auto", padding: "10px", height: "100px", fontSize: '0.8rem', borderRadius: '5px', backgroundColor: '#ffcccc' } }}
                            style={{ width: "80%", flexGrow: 1 }}></TextField>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center" }}>
                        <label style={{ marginRight: "10px", color: "white", width: "20%" }}>Findings: </label>
                        <TextField
                            margin="normal"
                            color="secondary"
                            value={caseData['Findings']}
                            onChange={(e) => {
                                setError(false); 
                                setCaseData({ ...caseData, "Findings": e.target.value })
                            }}
                            multiline
                            InputProps={{ style: { padding: 0 } }}
                            inputProps={{ style: { overflow: "auto", padding: "10px", height: "100px", fontSize: '0.8rem', borderRadius: '5px', backgroundColor: '#ffcccc' } }}
                            style={{ width: "80%", flexGrow: 1 }}></TextField>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button style={{ marginTop: "30px", backgroundColor: "#FFCC33", color: "black", marginRight: "20px" }} onClick={() => setCurrentStep(1)}>Back</Button>
                    <Button disabled={error} style={{ cursor: error ? 'not-allowed' : 'pointer', marginTop: "30px", backgroundColor: error ? '#B3B3B3' : "#FFCC33", color: "black" }} onClick={() => nextButtonClick()}>Next</Button>
                </div>
                <div>
                    <Dialog open={open}>
                        <DialogTitle>Error</DialogTitle>
                        <DialogContent>
                            <Alert severity="error">{errorMessage}</Alert>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        </div >
    );
}