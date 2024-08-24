import {createSlice} from '@reduxjs/toolkit';
import {createComment, fetchComments} from './commentsThunks';
import {Comment} from '../../types';

export interface CommentsState {
  comments: Comment[];
  commentsFetching: boolean;
  isDeleting: boolean;
  isCreating: boolean;
}

const initialState: CommentsState = {
  comments: [],
  commentsFetching: false,
  isDeleting: false,
  isCreating: false,
}

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.commentsFetching = true;
      })
      .addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
        state.commentsFetching = false;
        state.comments = comments;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsFetching = false;
      });
    builder
      .addCase(createComment.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectCommentsFetching: (state) => state.commentsFetching,
    selectCommentsCreating: (state) => state.isCreating,
  }
});

export const commentsReducer = commentsSlice.reducer;

export const {
  selectComments,
  selectCommentsFetching,
  selectCommentsCreating
} = commentsSlice.selectors;

