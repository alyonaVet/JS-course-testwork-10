import {createSlice} from '@reduxjs/toolkit';
import {OneNews} from '../../types';
import {createOneNews, deleteOneNews, fetchNews, fetchOneNews} from './newsThunks';

export interface NewsState {
  news: OneNews[];
  newsFetching: boolean;
  isCreating: boolean;
  oneNews: OneNews;
  oneFetching: boolean;
  isDeleting: false | string;
}

const initialState: NewsState = {
  news: [],
  newsFetching: false,
  isCreating: false,
  oneNews: {
    id: '',
    title: '',
    description: '',
    image: '',
    created_at: ''
  },
  oneFetching: false,
  isDeleting: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsFetching = true;
      })
      .addCase(fetchNews.fulfilled, (state, {payload: news}) => {
        state.newsFetching = false;
        state.news = news;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsFetching = false;
      });
    builder
      .addCase(createOneNews.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createOneNews.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createOneNews.rejected, (state) => {
        state.isCreating = false;
      });
    builder
      .addCase(fetchOneNews.pending, (state) => {
        state.oneNews = {
          id: '',
          title: '',
          description: '',
          image: '',
          created_at: ''
        };
        state.oneFetching = true;
      })
      .addCase(fetchOneNews.fulfilled, (state, { payload: oneNews }) => {
        state.oneNews = oneNews;
        state.oneFetching = false;
      })
      .addCase(fetchOneNews.rejected, (state) => {
        state.oneFetching = false;
      });
    builder
      .addCase(deleteOneNews.pending, (state, { meta: { arg: oneNews } }) => {
        state.isDeleting = oneNews;
      })
      .addCase(deleteOneNews.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteOneNews.rejected, (state) => {
        state.isDeleting = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
    selectNewsFetching: (state) => state.newsFetching,
    selectNewsCreating: (state) => state.isCreating,
    selectOneNews: (state) => state.oneNews,
    selectNewsDeleting: (state) => state.isDeleting,
  }
});

export const newsReducer = newsSlice.reducer;

export const {
  selectNews,
  selectNewsFetching,
  selectNewsCreating,
  selectOneNews,
  selectNewsDeleting,
} = newsSlice.selectors;

