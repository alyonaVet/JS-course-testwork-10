import {Box, Typography} from '@mui/material';
import AddPostForm from '../news/components/AddNewNews';
import {useAppDispatch} from '../../app/hooks';
import {OneNewsType} from '../../types';
import {createOneNews, fetchNews} from '../news/newsThunks';
import {useNavigate} from 'react-router-dom';

const AddPostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (oneNewsData: OneNewsType) => {
    await dispatch(createOneNews(oneNewsData));
    await dispatch(fetchNews());
    navigate('/');
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>Add new post</Typography>
      <AddPostForm onSubmit={onFormSubmit} isLoading={false} />
    </Box>
  );
};

export default AddPostPage;