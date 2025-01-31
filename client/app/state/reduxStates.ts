import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface initialStateTypes {
  isSideBarCollapsed: boolean;
  isDarkMode: boolean;
  projectId: number;
}
const initialState: initialStateTypes = {
  isSideBarCollapsed: true,
  isDarkMode: false,
  projectId: 0,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSideBarCollapsed = action.payload;
    },
    setProjectId: (state, action: PayloadAction<number>) => {
      state.projectId = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});
export const { setIsDarkMode, setIsSideBarCollapsed, setProjectId } =
  globalSlice.actions;
export default globalSlice.reducer;
