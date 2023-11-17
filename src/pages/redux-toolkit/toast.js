import { createSlice } from "@reduxjs/toolkit";

export const toastsSlice = createSlice({
  name: "toasts",
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      return [
        { id: Math.random(), title: `${action.payload} ${state.length + 1}` },
        ...state
      ];
    },
    removeToast: (state, action) => {
      const targetId = action.payload;
      return state.filter((item) => item.id !== targetId);
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToast, removeToast } = toastsSlice.actions;

export default toastsSlice.reducer;
