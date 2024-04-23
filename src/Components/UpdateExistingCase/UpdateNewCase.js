import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar';
import Alert from '@mui/material/Alert';
import { AddNewCaseStyles } from '../AddNewCase/AddNewCaseStyles';
import { Button, Typography, Select, MenuItem, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Axios from 'axios';

export default function UpdateNewCase() {
    const navigate = useNavigate();
    const [caseTitle, setCaseTitle] = useState([]);
    const [selectedCase, setSelectedCase] = useState('');
    const [items, setItems] = useState([])
    const [selectedTags, setSelectedTags] = useState([]);
    const [caseStudyData, setCaseStudyData] = useState([]);
    const [caseId, setCaseId] = useState(0);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const selectedCaseData = caseStudyData.find(caseStudy => caseStudy.CaseTitle === selectedCase);
    let selectedCaseTags = selectedCaseData ? selectedCaseData.tags : [];

    const handleNavigation = () => {
        navigate('/');
    }

    const sendDataToDatabase = async (tags) => {
        console.log(tags)
        const data = { caseId: caseId, tags: tags };
        try {
            const response = await Axios.post('http://localhost:3001/api/updateTags', data);
            setOpen(true)
            if (response.status !== 200) {
                setOpen(false)
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            setOpen(false)
            console.error('Error sending data:', error);
        }
    };

    const handleTagsChange = (event) => {
        setSelectedTags(event.target.value || []);
        const selected = event.target.value;
        const selectedTagsWithData = selected.map((tagName) => {
            const selectedTag = items.find((item) => item.value === tagName);
            return selectedTag ? selectedTag.value : null;
        }).filter(Boolean);
        selectedTagsWithData.forEach(tag => {
            if (!selectedCaseTags.includes(tag)) {
                selectedCaseTags.push(tag);
            }
        });
        console.log(selectedTagsWithData)

        
        console.log("--->", selectedCaseTags)
    };

    const handleUpdateClick = () => {
        sendDataToDatabase(selectedCaseTags);
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/api/getCases')
            .then((response) => {
                const titles = response.data.map(caseStudy => caseStudy.CaseTitle);
                setCaseTitle(titles);
                setCaseStudyData(response.data);
            })
            .catch(error => {
                console.error('Error fetching cases:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedCaseTags.length > 0) {
            Axios.get('http://localhost:3001/api/getTags')
                .then((response) => {
                    const newItems = response.data.map(item => ({
                        id: item.TagID.toString(),
                        value: item.tags
                    }));
                    const filteredItems = newItems.filter(item => !selectedCaseTags.includes(item.value));
                    setItems(filteredItems);
                })
                .catch(error => {
                    console.error('Error fetching tags:', error);
                });
        }
    }, [selectedCaseTags]);

    const handleChange = (event) => {
        const selectedCaseData = caseStudyData.find(caseStudy => caseStudy.CaseTitle === event.target.value);
        if (selectedCaseData) {
            setCaseId(selectedCaseData.caseID);
        }
        setSelectedCase(event.target.value);
    };

    const handleDeleteChip = (chipToDelete) => () => {
        const updatedSelectedTags = selectedTags.filter(tag => tag !== chipToDelete);
        setSelectedTags(updatedSelectedTags);

        setCaseStudyData(prevData => {
            const newData = prevData.map(caseStudy => {
                if (caseStudy.CaseTitle === selectedCase) {
                    const updatedTags = caseStudy.tags.filter(tag => tag !== chipToDelete);
                    return { ...caseStudy, tags: updatedTags };
                }
                return caseStudy;
            });
            
            return newData;
        });
    };

    return (
        <div>
            <TopBar />
            <div style={AddNewCaseStyles.content}>
                <Button onClick={handleNavigation}>
                    <ArrowBackIcon style={{ textAlign: "center", color: "white" }} />
                    <Typography variant="h7" style={{ marginLeft: "5px", textAlign: "center", color: "white" }}>Back</Typography></Button>
                <div style={{ backgroundColor: "#FFCC33", padding: "10px" }}>
                    <Typography variant="h6" style={{ textAlign: "center", color: "black" }}>Update Existing Case</Typography>
                </div>
                <div>
                    <Select
                        value={selectedCase}
                        onChange={handleChange}
                        displayEmpty
                        style={{ backgroundColor: '#ffcccc', overflow: 'auto', minWidth: "90%", marginTop: "10px", marginLeft: "40px", maxWidth: "90%" }}
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
                        <MenuItem value="" disabled>
                            Select a case study title
                        </MenuItem>
                        {caseTitle.map((title, index) => (
                            <MenuItem key={index} value={title}>{title}</MenuItem>
                        ))}
                    </Select>

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
                    {selectedCaseData && (
                        <div style={{ marginLeft: "10px", marginTop: '10px', maxHeight: "300px", overflow: 'auto' }}>
                            {selectedCaseTags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={String(tag)}
                                    onDelete={handleDeleteChip(tag)}
                                    style={{ background: "#FFCC33", marginRight: '5px', marginBottom: '5px' }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ "textAlign": "-webkit-center" }}>
                    <Button style={{ marginTop: "30px", backgroundColor: "#FFCC33", color: "black" }} onClick={handleUpdateClick}>Update</Button>
                </div>
            </div>
            <div>
                <Dialog open={open} onClose={handleNavigation}>
                    <DialogTitle>Case Study Update Success</DialogTitle>
                    <DialogContent>
                        <Alert severity="success">
                            You have successfully updated the case study.
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNavigation} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            {
                error &&
                <Alert style={{ marginTop: "25px", paddingTop: "0px", paddingBottom: "0px" }} severity="error">You can only upload 5 images</Alert>
            }
        </div>
    );
}
