import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { instance, baseURL } from "../../core/apiConfig.js";
import { api } from "../../core/api";

//초기값 선언
const initialState = {
  username: "",
  profileImage: "",
  carrot: 0,
  todayColorStage: 0,
  colorStages: [
    {
      colorStage1: [],
      colorStage2: [],
      colorStage3: [],
      colorStage4: [],
    },
  ],
};

// 캘린더 조회
export const __getCalendar = createAsyncThunk(
  "__getCalendar",
  async (payload, thunkAPI) => {
    const { todayMonth, todayYear, username } = payload;
    try {
      const { data } = await api.getCalendarApi(
        todayMonth,
        todayYear,
        username
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //console.log(error.response.status);
      return thunkAPI.rejectWithValue();
    }
  }
);

// reducer
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getCalendar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.username = action.payload.username;
      state.profileImage = action.payload.profileImage;
      state.carrot = action.payload.carrot;
      state.colorStages = action.payload.colorStages;
      state.todayColorStage = action.payload.todayColorStage;
    });
    builder.addCase(__getCalendar.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = calendarSlice.actions;
export default calendarSlice.reducer;
