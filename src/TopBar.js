import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar() {

  return (
    <AppBar position="static" style={{ background: 'white', margin: 0 }}>
      <Toolbar>
        <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
          <div style={{ alignContent: 'flex-start' }}>
            <img style={{ width: "35%", marginTop: "5px", marginBottom: "5px" }}
              src={require("./dentistry_H-M-maroon-blk.png")} alt="logo" />
          </div>
          <div style={{ alignContent: 'flex-end' }}>
            <IconButton
              size="large"
              color='black'
              aria-label="menu"
            >
              <MenuIcon style={{ fontSize: '2.5rem' }} />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}