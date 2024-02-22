import TopBar from '../TopBar';
import CaseCard from './CaseCard';
import { Typography } from '@mui/material';
import * as React from 'react';


function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <TopBar />
      <div style={{ overflowY: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: '70px', textAlign: "center" }}>
          <Typography style={{ fontSize: '30px' }}>Case Study Repository</Typography>
        </div>
        
      </div>
      <div style={{ margin: "10px", display: "flex" }}>
        <div style={{ margin: '20px' }}>
          <CaseCard style={{ margin: '10px' }} />
        </div>
      </div>
    </div>
  );
}

export default App;
