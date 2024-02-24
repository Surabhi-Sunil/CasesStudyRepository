import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Chip, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Masonry from '@mui/lab/Masonry';

function CaseCard() {
  const [caseStudyData, setCaseStudyData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getCases').then((response) => {
      setCaseStudyData(response.data);
    });
  }, []);

  const handleCardClick = (caseID) => {
    const selectedCase = caseStudyData.find((data) => data.caseID === caseID);
    navigate(`/details/${caseID}`, { state: { data: selectedCase } });
  };

  // Filtering case studies based on search term
  const filteredCaseStudies = caseStudyData.filter((caseStudy) =>
    caseStudy.CaseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseStudy.Complaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '10px' }}
      />
      <Masonry columns={4} spacing={2}>
        {filteredCaseStudies.map((caseStudy) => (
          <div key={caseStudy.caseID}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(caseStudy.caseID)}>
                {caseStudy.Image && (
                  <img
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "500px",
                      maxHeight: "400px"
                    }}
                    src={require(`${caseStudy.Image}`)}
                    alt="logo"
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {caseStudy.CaseTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {caseStudy.Complaint}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {caseStudy.tags && caseStudy.tags.map((tag, index) => (
                  <Chip key={index} label={tag} />
                ))}
              </CardActions>
            </Card>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default CaseCard;
