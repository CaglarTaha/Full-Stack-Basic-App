import { createSlice } from "@reduxjs/toolkit";


type InitialStateType = {
  user: any | null;
  token: string | null;
  selectedRowData: null,
};

const initialState: InitialStateType = {
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
  selectedRowData: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      window.location.reload();
    },
    setSelectedRowData: (state, action) => {
      state.selectedRowData = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      // TODO: Remove only session data.
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logoutSuccess,setSelectedRowData } = userSlice.actions;

export default userSlice.reducer;