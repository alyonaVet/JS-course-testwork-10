import React from 'react';
import {Box, Typography} from '@mui/material';
import dayjs from 'dayjs';

export interface OneFullNews {
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}

const OneFullNews: React.FC<OneFullNews> = ({title, description, image, created_at}) => {

  return (
    <Box>
      {image && (
        <img
          src={"http://localhost:8000/" + image}
          alt={title}
        />
      )}
      <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {dayjs(created_at).format('DD.MM.YYYY HH:mm:ss')}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {description}
      </Typography>
    </Box>
  );
};

export default OneFullNews;