import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar() {

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <AppBar position="static" style={{ background: 'white', margin: 0 }}>
        <Toolbar>
          <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
            <div style={{ alignContent: 'flex-start' }}>
              <img style={{ width: "350px", marginTop: "5px", marginBottom: "5px" }}
                src={require("./dentistry_H-M-maroon-blk.png")} alt="logo" />
            </div>
            <div style={{ alignContent: 'flex-end' }}>
              <IconButton
                size="large"
                color='black'
                aria-label="menu"
              >
                <MenuIcon style={{ fontSize: '1.5rem' }} />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
