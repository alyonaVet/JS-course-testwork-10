import {createAsyncThunk} from '@reduxjs/toolkit';
import {OneNews, OneNewsType} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchNews = createAsyncThunk<OneNews[]>(
  'news/fetchAll',
  async () => {
    const {data: news} = await axiosApi.get<OneNews[]>('/news');
    return news;
  });

export const createOneNews = createAsyncThunk<void, OneNewsType>(
  'news/create',
  async (oneNewsData) => {
    const formData = new FormData();
    formData.append('title', oneNewsData.title);

    formData.append('description', oneNewsData.description);

    if (oneNewsData.image) {
      formData.append('image', oneNewsData.image);
    }

    await axiosApi.post('/news', formData);
  });

export const fetchOneNews = createAsyncThunk<OneNews, string | undefined>(
  'news/fetchOneNews',
  async (id: string | undefined) => {

    const placeholder: OneNews = {
      created_at: '',
      id: '',
      image: '',
      title: 'Not found!',
      description: 'Unfortunately news with current ID not found'
    };

    if (id === undefined) {
      return placeholder;
    }

    const {data: oneNews} = await axiosApi.get<OneNews | null>(`/news/${id}`);

    if (!oneNews) {
      return placeholder;
    }
    return oneNews;
  }
);

export const deleteOneNews = createAsyncThunk<void, string>(
  'news/deleteOneNews',
  async (id: string) => {
    await axiosApi.delete(`/news/${id}`);
  }
);