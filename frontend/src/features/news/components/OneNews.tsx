import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

interface Props {
  id: string;
  title: string;
  image: string | null;
  created_at: string;
  onDelete: (id: string) => void;
}

const OneNews: React.FC<Props> = ({id, title, image, created_at, onDelete}) => {
  const ImageCardMedia = styled(CardMedia)({
    height: 80,
    width: 80,
    marginRight: 16,
  });

  let cardImage = '';

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Card sx={{maxWidth: 400, height: 300, margin: 'auto', display: 'flex', flexDirection: 'column'}}>
      {image && <ImageCardMedia image={cardImage}/>}
      <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(created_at).format('DD.MM.YYYY HH:mm:ss')}
          </Typography>
        </Box>
        <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between'}}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/news/${id}`}
          >
            View Full Post
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>);
};

export default OneNews;