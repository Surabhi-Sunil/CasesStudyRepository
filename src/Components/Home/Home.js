import TopBar from '../TopBar';
import CaseCard from '../CaseCard';
import { Typography } from '@mui/material';
import * as React from 'react';
import { HomeStyles } from './HomeStyles';

function App() {
  return (
    <div style={HomeStyles.headerDiv}>
      <TopBar />
      <div >
        <div style={HomeStyles.typographyDiv}>
          <Typography style={HomeStyles.typography}>Case Study Repository</Typography>
        </div>
      </div>
      <div style={HomeStyles.cardDiv}>
        <CaseCard style={HomeStyles.caseCard} />
      </div>
    </div>
  );
}

export default App;
