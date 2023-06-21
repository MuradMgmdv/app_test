import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('./posts');
  return data;
});

export const fetchAddNewPost = createAsyncThunk(
  'posts/fetchAddNewPost',
  async ({ title, text, subject, author }) => {
    const newPost = {
      title,
      text,
      subject,
      author,
      atCreated: Date.now(),
    };
    const { data } = await axios.post('./posts', newPost);
    return data;
  },
);

export const fetchEditPost = createAsyncThunk('posts/fetchEditPost', async (newPost) => {
  await axios.put(`/posts/${newPost.id}`, newPost);
  return newPost;
});

export const fetchAddComment = createAsyncThunk('posts/fetchAddComment', async (comment) => {
  await axios.post(`/posts/comment/${comment.id}`, comment);
  return comment;
});

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost', async (id) => {
  await axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: [],
  filteredPosts: [],
  status: 'loading',
  filters: {
    title: '',
    subject: '',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    searchByName: (state, action) => {
      state.filteredPosts = state.posts.filter((post) =>
        post.subject?.toLowerCase()?.includes(state.filters.subject?.toLowerCase()),
      );
      state.filteredPosts = state.filteredPosts.filter((post) =>
        post.title?.toLowerCase()?.includes(action.payload?.toLowerCase()),
      );
    },
    searchBySubject: (state, action) => {
      state.filteredPosts = state.posts.filter((post) =>
        post.title?.toLowerCase()?.includes(state.filters.title?.toLowerCase()),
      );
      state.filteredPosts = state.filteredPosts.filter((post) =>
        post.subject?.toLowerCase()?.includes(action.payload?.toLowerCase()),
      );
    },
  },
  extraReducers: {
    // получение
    [fetchPosts.pending]: (state) => {
      state.posts = [];
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.filteredPosts = action.payload;

      state.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts = [];
      state.status = 'error';
    },

    // добавление
    [fetchAddNewPost.pending]: (state) => {
      state.posts = [];
      state.status = 'loading';
    },
    [fetchAddNewPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.filteredPosts.push(action.payload);

      state.status = 'loaded';
    },
    [fetchAddNewPost.rejected]: (state) => {
      state.posts = [];
      state.status = 'error';
    },

    // Редактирование статей
    [fetchEditPost.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [fetchEditPost.fulfilled]: (state, action) => {
      state.loading = 'loaded';
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, ...action.payload };
        }
        return post;
      });
      state.filteredPosts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return { ...post, ...action.payload };
        }
        return post;
      });
    },
    [fetchEditPost.rejected]: (state, action) => {
      state.loading = 'error';
      state.error = action.payload;
    },

    // Добавление комментарий
    [fetchAddComment.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [fetchAddComment.fulfilled]: (state, action) => {
      state.loading = 'loaded';
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.comments.push(action.payload.comment);
        }
        return post;
      });
    },
    [fetchAddComment.rejected]: (state, action) => {
      state.loading = 'error';
      state.error = action.payload;
    },

    // Удаление статей
    [fetchDeletePost.pending]: (state, action) => {
      state.posts = state.posts.filter((obj) => obj.id !== action.meta.arg);
      state.filteredPosts = state.posts.filter((obj) => obj.id !== action.meta.arg);
    },
  },
});

export const { searchByName, searchBySubject, searchByDate } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
