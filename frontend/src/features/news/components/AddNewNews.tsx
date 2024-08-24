import React, {ChangeEvent, useState} from 'react';
import {Grid,TextField} from '@mui/material';
import {OneNewsType} from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';

interface Props {
  onSubmit: (oneNews: OneNewsType) => void;
  isLoading: boolean;
}

const AddPostForm: React.FC<Props> = ({onSubmit, isLoading}) => {

  const [postData, setPostData] = useState<OneNewsType>({
    title: '',
    description: '',
    image: null,
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setPostData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...postData});

    setPostData({
      title: '',
      description: '',
      image: null,
    });
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={onFormSubmit}>
      <Grid item>
        <TextField
          label="Enter your title"
          id="title"
          name="title"
          value={postData.title}
          onChange={onFieldChange}
          required
          fullWidth
        />
      </Grid>
      <Grid item>
        <TextField
          id="description"
          name="description"
          label="Enter your content"
          value={postData.description}
          onChange={onFieldChange}
          required
          fullWidth
        />
      </Grid>
      <Grid item>
        <FileInput
          label="Image"
          name="image"
          onChange={onFileInputChange}
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
  );
};

export default AddPostForm;