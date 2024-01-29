import TopBar from './TopBar';
import CaseCard from './CaseCard';
import { Typography } from '@mui/material';
import * as React from 'react';

function App() {
  return (
    <div>
      <TopBar />
      <div>
        <Typography style={{ margin: '5px', textAlign: 'center', fontSize: '30px' }}>
          Case Study Repository
        </Typography>
      </div>
      <div style={{ margin: '20px' }}>
        <CaseCard style={{ margin: '10px' }} />
      </div>
    </div>
  );
}

export default App;
