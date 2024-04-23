import React, { useContext } from "react";
import { multiStepContext } from "./StepContext";
import { Button, Alert, MenuItem, Typography, Select, Chip } from '@mui/material';
import { useState, useEffect } from "react";
import Axios from 'axios';

export default function ThirdStep() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { setCurrentStep, caseData, setCaseData, submitData } = useContext(multiStepContext);
    const [error, setError] = useState(false)
    const [items, setItems] = useState([])
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedWithID, setSelectedWithID] = useState([]);
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 5) {
            setError(true)
        }
        else {
            setError(false)
            const selectedImages = Array.from(files).slice(0, 5);
            setCaseData({ ...caseData, "Image": selectedImages[0], "Image2": selectedImages[1], "Image3": selectedImages[2], "Image5": selectedImages[4] })
            setSelectedFiles(selectedImages);
        }
    };
    const handleTagsChange = (event) => {
        setSelectedTags(event.target.value || []);
        const selected = event.target.value;
        const selectedTagsWithData = selected.map((tagName) => {
            const selectedTag = items.find((item) => item.value === tagName);
            return selectedTag ? { id: selectedTag.id, value: selectedTag.value } : null;
        }).filter(Boolean);
        setSelectedWithID(selectedTagsWithData)
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/api/getTags').then((response) => {
            setItems(response.data.map(item => ({
                id: item.TagID.toString(), // Convert TagID to string if needed
                value: item.tags
            })));
        });
    }, []);

    const sendData = () => {
        submitData(selectedWithID);
    }

    return (
        <div>
            <div>
                <Typography variant="h6" style={{ textAlign: "center", color: "white" }}>Add Tags</Typography>
                <Select
                    multiple
                    value={selectedTags}
                    onChange={handleTagsChange}
                    style={{ backgroundColor: '#ffcccc', overflow: 'auto', minWidth: "90%", marginTop: "10px", marginLeft: "40px", maxWidth: "90%" }}
                    renderValue={(selected) => (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    style={{ margin: '2px' }}
                                />
                            ))}
                        </div>
                    )}

                    MenuProps={{
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        },
                        transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        },
                        PaperProps: {
                            style: {
                                maxHeight: '200px',
                                width: '250px',
                                disableAutoFocusItem: true,
                            },
                        },
                    }}

                >
                    {items.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div style={{ margin: "20px", textAlign: "-webkit-center", display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" style={{ textAlign: "center", color: "white" }}>Upload Images</Typography>
                <input
                    type="file"
                    accept="image/*"
                    style={{ marginTop: "10px", alignSelf: "center" }}
                    multiple
                    onChange={handleFileChange}
                />
                {selectedFiles.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selectedFiles.map((file, index) => (
                                <div key={index} style={{ margin: '5px' }}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Selected ${index + 1}`}
                                        style={{ marginTop: "10px", maxWidth: '150px', maxHeight: '150px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div>
                    <Button style={{ marginTop: "30px", backgroundColor: "#FFCC33", color: "black", marginRight: "20px" }} onClick={() => setCurrentStep(2)}>Back</Button>
                    <Button disabled={error} style={{ cursor: error ? 'not-allowed' : 'pointer', marginTop: "30px", backgroundColor: error ? '#B3B3B3' : "#FFCC33", color: "black" }} onClick={sendData}>Finish</Button>
                </div>
                {
                    error &&
                    <Alert style={{ marginTop: "25px", paddingTop: "0px", paddingBottom: "0px" }} severity="error">You can only upload 5 images</Alert>
                }
            </div >
        </div>

    );
}