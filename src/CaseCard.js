// CaseCard.js
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Axios from 'axios';



function CaseCard() {
  const [caseStudyData, setCaseStudyData] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/getCases').then((response) => {
      console.log(response.data)
      setCaseStudyData(response.data)
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 'auto', overflowY: 'auto' }}>
      {caseStudyData.map((caseStudy) => (
        <Card key={caseStudy.caseID} sx={{ minWidth: 450, minHeight: 150, maxWidth: 345, margin: '10px' }}>
          <CardActionArea>
            {caseStudy.Image && (
              <img style={{width:"inherit", height:"inherit"}} src={require(`${caseStudy.Image}`)} alt="logo" />
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
      ))}
    </div>
  );
};

export default CaseCard;
