import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const headerStyles = {
  mainDiv: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000
  },
  topBar: {
    background: 'white',
    margin: 0
  },
  menuIcon: {
    fontSize: '1.5rem'
  },
  image: {
    width: "350px",
    marginTop: "5px",
    marginBottom: "5px"
  },
  icon: {
    width: "5%"
  },
  imageDiv: {
    width: "95%",
    alignContent: 'flex-start'
  },
  headerDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  }
}

export default function TopBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddNewCaseOpen = () => {
    setAnchorEl(null);
    navigate(`/addCase`);
  };

  const handleUpdateExistingCaseOpen = () =>{
    setAnchorEl(null);
    navigate(`/updateCase`);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    navigate(`/`);
  };

  return (
    <div style={headerStyles.mainDiv}>
      <AppBar position="static" style={headerStyles.topBar}>
        <Toolbar>
          <div style={headerStyles.headerDiv}>
            <div style={headerStyles.imageDiv}>
              <img style={headerStyles.image}
                src={require("../dentistry_H-M-maroon-blk.png")} alt="logo" />
            </div>
            <div style={headerStyles.icon}>
              <IconButton
                size="large"
                color='black'
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon style={headerStyles.menuIcon} />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleAddNewCaseOpen}>Add New Case</MenuItem>
                  <MenuItem onClick={handleUpdateExistingCaseOpen}>Update Existing Case</MenuItem>
                </Menu>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
