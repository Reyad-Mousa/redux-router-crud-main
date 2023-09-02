import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null, record: null };
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await fetch("http://localhost:8000/posts");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//create a new post

export const createPost = createAsyncThunk(
  "post/createPost",
  async (post, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { auth } = getState();
    post.userId = auth.id;
    try {
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// get to details
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await fetch(`http://localhost:8000/posts/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// edit post

export const editPost = createAsyncThunk(
  "post/editPost",
  async (post, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { auth } = getState();
    post.userId = auth.id;
    try {
      const response = await fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.records = [];
    },
  },
  extraReducers: {
    // fetch posts
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // create post
    [createPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records.unshift(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get to details
    [getPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.record = null;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete post
    [deletePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.filter(
        (post) => post.id !== action.payload
      );
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // edit post
    [editPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
