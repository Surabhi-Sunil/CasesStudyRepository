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
import Container from '@mui/material/Container';

const caseCardStyles = {
  container: {
    paddingRight: "0px"
  },
  textFeild: {
    margin: '10px 0'
  },
  card: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
  },
  chipStyle: {
    backgroundColor: "#7A0019",
    color: "#FFCC33",
    margin: '2px' // Add margin to chips for spacing
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap', // Allow chips to wrap onto the next line
    gap: '4px', // Adjust the gap between chips
    margin: '0 8px' // Add margin for better spacing
  }
}

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

  const getColumns = () => {
    if (filteredCaseStudies.length === 1) {
      return 2;
    } else {
      return 4; // Otherwise, display in multiple columns
    }
  };

  // Filtering case studies based on search term
  const filteredCaseStudies = caseStudyData.filter((caseStudy) =>
    caseStudy.CaseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseStudy.Complaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (caseStudy.tags && caseStudy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <Container style={caseCardStyles.container} maxWidth="xl">
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={caseCardStyles.textFeild}
      />
      <Masonry columns={getColumns()} spacing={2}>
        {filteredCaseStudies.map((caseStudy) => (
          <Card key={caseStudy.caseID} style={caseCardStyles.card}>
            <CardActionArea onClick={() => handleCardClick(caseStudy.caseID)}>
              {caseStudy.Image && (
                <img
                  style={caseCardStyles.image}
                  src={require(`${caseStudy.Image}`)}
                  alt="Case study"
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
              <div style={caseCardStyles.chipContainer}>
                {caseStudy.tags && caseStudy.tags.map((tag, index) => (
                  <Chip style={caseCardStyles.chipStyle} key={index} label={tag} />
                ))}
              </div>
            </CardActions>
          </Card>
        ))}
      </Masonry>
    </Container>
  );
}

export default CaseCard;
