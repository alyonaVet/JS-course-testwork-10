import {Box} from '@mui/material';
import OneFullNews from '../news/components/OneFullNews';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectOneNews} from '../news/newsSlice';
import {useEffect} from 'react';
import {fetchOneNews} from '../news/newsThunks';
import {useParams} from 'react-router-dom';
import OneComment from '../comments/OneComment';
import {selectComments} from '../comments/commentsSlice';
import {createComment, deleteComment, fetchComments} from '../comments/commentsThunks';
import AddCommentForm from '../comments/AddCommentForm';
import {CommentType} from '../../types';

const OneNewsPage = () => {
  const oneNews = useAppSelector(selectOneNews);
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  const params = useParams();


  useEffect(() => {
    dispatch(fetchOneNews(params.newsId));
  }, [dispatch, params.newsId]);

  useEffect(() => {
    dispatch(fetchComments(params.newsId));
  }, [dispatch, params.newsId]);


  const handleDelete = async (commentId: string) => {
    await dispatch(deleteComment(commentId));
    await dispatch(fetchComments(params.newsId));
  };

  const onFormSubmit = async (oneComment: CommentType) => {
    await dispatch(createComment(oneComment));
    await dispatch(fetchComments(params.newsId));
  };

  return (
    <Box>
      <OneFullNews title={oneNews.title} description={oneNews.description} image={oneNews.image}
                   created_at={oneNews.created_at}/>
      {comments.map(comment => (
        <OneComment
          key={comment.id}
          author={comment.author}
          description={comment.description}
          onDelete={() => handleDelete(comment.id)}/>
      ))}
      {params.newsId !== undefined && (
        <AddCommentForm onSubmit={onFormSubmit} isLoading={false} oneNews_id={params.newsId}/>
      )}
    </Box>
  );
};

export default OneNewsPage;