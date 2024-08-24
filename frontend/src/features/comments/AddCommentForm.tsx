import React, {ChangeEvent, useState} from 'react';
import {CommentType} from '../../types';
import {Grid, Paper, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';

interface Props {
  oneNews_id: string;
  onSubmit: (comment: CommentType) => void;
  isLoading: boolean;
}

const AddCommentForm: React.FC<Props> = ({onSubmit, isLoading, oneNews_id}) => {
  const [commentData, setCommentData] = useState<CommentType>({
    author: null,
    description: '',
    oneNews_id: oneNews_id,
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setCommentData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...commentData
    });

    setCommentData({
      author: '',
      description: '',
      oneNews_id: oneNews_id,
    });
  };

  return (

    <Paper sx={{p: 2, mt: 2}} elevation={3}>
      <Typography variant={'h4'} mb={1}>Add comment</Typography>
      <Grid container direction="column" spacing={2} component="form" onSubmit={onFormSubmit}>
        <Grid item>
          <TextField
            label="Enter your name"
            id="author"
            name="author"
            value={commentData.author}
            onChange={onFieldChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="description"
            name="description"
            label="Enter your content"
            value={commentData.description}
            onChange={onFieldChange}
            required
          />
        </Grid>
        <Grid item>
          <LoadingButton
            type="submit"
            loading={isLoading}
            loadingPosition="center"
            variant="contained"
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>

  );
};

export default AddCommentForm;