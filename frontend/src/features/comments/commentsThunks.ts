import {createAsyncThunk} from '@reduxjs/toolkit';
import {Comment, CommentType} from '../../types';
import axiosApi from '../../axiosApi';


export const fetchComments = createAsyncThunk<Comment[], string | undefined>(
  'comments/fetchAll',
  async (news_id: string | undefined) => {
    if (news_id === undefined) {
      return [];
    }
    const {data: comments} = await axiosApi.get<Comment[]>(`/comments?news_id=${news_id}`);
    return comments;
  });

export const deleteComment = createAsyncThunk<void, string>(
  'comments/deleteOne',
  async (id: string) => {
    await axiosApi.delete(`/comments/${id}`);
  }
);

export const createComment = createAsyncThunk<void, CommentType>(
  'comments/createComment',
  async (oneComment) => {
  await axiosApi.post('/comments', oneComment);
  }
);
