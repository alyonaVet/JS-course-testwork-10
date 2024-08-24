import {Box, Button, Stack, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import AllNews from '../news/components/AllNews';

const MainPage = () => {
  return (
    <Box sx={{padding: 2,}}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" component="div">
          Posts
        </Typography>
        <NavLink to="/new-post" style={{textDecoration: 'none'}}>
          <Button variant="outlined" color="primary">
            Add new post
          </Button>
        </NavLink>
      </Stack>
      <Box mt={2}>
        <AllNews />
      </Box>
    </Box>
  );
};

export default MainPage;