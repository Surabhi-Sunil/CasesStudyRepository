// CaseCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CaseCard  () {
  const dataFromDatabase = [
    { id: 1, title: 'Lizard', content: ' ABCCC' },
    { id: 2, title: 'Another Card', content: 'Some content for another card' },
    // ... more data
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {dataFromDatabase.map((caseStudy) => (
        <Card key={caseStudy.id} sx={{ minWidth: 345, minHeight: 150, maxWidth: 345, margin: '10px' }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {caseStudy.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {caseStudy.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CaseCard;
