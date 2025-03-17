import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "./api";
export interface initialStateTypes {
  isSideBarCollapsed: boolean;
  isDarkMode: boolean;
  projectId: number;
  currentStatus: Status;
}
const initialState: initialStateTypes = {
  isSideBarCollapsed: true,
  isDarkMode: false,
  projectId: 0,
  currentStatus: Status.ToDo,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSideBarCollapsed = action.payload;
    },
    setCurrentStatus: (state, action: PayloadAction<Status>) => {
      state.currentStatus = action.payload;
    },
    setProjectId: (state, action: PayloadAction<number>) => {
      state.projectId = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});
export const {
  setIsDarkMode,
  setIsSideBarCollapsed,
  setProjectId,
  setCurrentStatus,
} = globalSlice.actions;
export default globalSlice.reducer;
