import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: null,
  useName: null,
  useID: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const {email, useName, useID} = action.payload
      state.isLoggedIn = true
      state.email = email
      state.useName = useName
      state.useID = useID
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false
      state.email = null
      state.useName = null
      state.useID = null
    }
  }
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectIsEmail = (state) => state.auth.email
export const selectIsUseName = (state) => state.auth.useName
export const selectIsUseID = (state) => state.auth.useID

export default authSlice.reducer