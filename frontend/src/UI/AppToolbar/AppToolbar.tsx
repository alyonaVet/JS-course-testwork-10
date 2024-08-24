import {NavLink} from 'react-router-dom';
import {AppBar, Box, Toolbar, Typography} from '@mui/material';

const AppToolbar = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="fixed" sx={{mb: 2}}>
        <Toolbar>
          <NavLink to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
