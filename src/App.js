import TopBar from './TopBar';
import CaseCard from './CaseCard';
import { Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import * as React from 'react';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <TopBar />
      <div style={{ overflowY: 'inherit', display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: '5px', textAlign: "center" }}>
          <Typography style={{ fontSize: '30px' }}>Case Study Repository</Typography>
        </div>
        <div style={{maxWidth: 700, alignSelf:"end", margin:10}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
