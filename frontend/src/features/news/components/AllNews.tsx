import {Box, Grid} from '@mui/material';
import OneNews from './OneNews';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectNews} from '../newsSlice';
import {useEffect} from 'react';
import {deleteOneNews, fetchNews} from '../newsThunks';

const AllNews = () => {
  const news = useAppSelector(selectNews);
  const dispatch = useAppDispatch();
  // const newsLoading = useAppSelector(selectNewsFetching);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleDelete = (newsId: string) => {
    dispatch(deleteOneNews(newsId));
    dispatch(fetchNews());
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {news.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <OneNews
              id={item.id}
              title={item.title}
              image={item.image}
              created_at={item.created_at}
              onDelete={() => handleDelete(item.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllNews;