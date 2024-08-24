import React from 'react';
import {Button, Paper, Stack, Typography} from '@mui/material';

export interface Comment {
  author: string | null;
  description: string;
  onDelete: () => void;
}

const OneComment: React.FC<Comment> = ({author, description, onDelete}) => {
  return (
    <Paper sx={{ p:1, mt:2 }} elevation={3}>
      <Stack direction={'row'} gap={2}>
        <Typography>{author || "Anonymous"}:</Typography>
        <Typography sx={{flexGrow: 1}}>{description}</Typography>
        <Button onClick={onDelete}>Delete</Button>
      </Stack>
    </Paper>
  );
};

export default OneComment;