import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http  from "../../app/axiosConfig";

const initialState = {
  profileId: null,
  postList: null,
  profileInfo: null,
};

export const getProfilePosts = createAsyncThunk(
  "api/v1/users/getProfilePosts",
  async (userId, thunkAPI) => {
    const response = await http({
      method: "post",
      url: "/api/v1/myposts",

      data: {
        id: userId,
      },
    });
    return response.data.payload;
  }
);

export const getProfileInfo = createAsyncThunk(
  "/api/v1/users/profile",
  async (userId, thunkAPI) => {
    const response = await http({
      method: "post",
      url: "/api/v1/users/profile",

      data: {
        id: userId,
      },
    });
    return response.data.payload;
  }
);

export const checkProfileSlice = createSlice({
  name: "checkProfileSlice",
  initialState,
  reducers: {
    getProfileId: (state, action) => {
      state.profileId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfilePosts.fulfilled, (state, action) => {
      state.postList = action.payload;
    });
    builder.addCase(getProfileInfo.fulfilled, (state, action) => {
      state.profileInfo = action.payload;
    });
  },
});

export const { getProfileId } = checkProfileSlice.actions;
export default checkProfileSlice.reducer;
