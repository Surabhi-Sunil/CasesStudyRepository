import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CaseCard() {
  const [caseStudyData, setCaseStudyData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getCases').then((response) => {
      setCaseStudyData(response.data)
    })
  }, [])

  const handleCardClick = (caseID) => {
    const selectedCase = caseStudyData.find(data => data.caseID === caseID);
    navigate(`/details/${caseID}`, { state: { data: selectedCase } })
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 'auto', overflowY: 'auto' }}>
      {caseStudyData.map((caseStudy) => (
        <div key={caseStudy.caseID} style={{ margin: '10px' }}>
          <Card sx={{ minWidth: 500, minHeight: 180, maxWidth: 345 }}>
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
    </div>
  );
};

export default CaseCard;
