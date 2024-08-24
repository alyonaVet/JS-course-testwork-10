import {createSlice} from '@reduxjs/toolkit';
import {OneNews} from '../../types';

export interface NewsState {
  news: OneNews[];
}

const initialState: NewsState = {
  news: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
});
