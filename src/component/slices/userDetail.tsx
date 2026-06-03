
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type UserState = {
  userId: string | null;
  email: string | null;
  name: string | null;
  roles: string;
  token: string;
};

// Initial state for the slice
const initialState: UserState = {
  userId: null,
  email: null,
  name: null,
  roles: '',
  token: '',
 
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the entire user data
    setUser(state, action: PayloadAction<UserState>) {
      const { userId, email, name, roles, token } = action.payload;
      state.userId = userId;
      state.email = email;
      state.name = name;
      state.roles = roles;
      state.token = token;
    },
    // Action to reset user data to initial state
    resetUser() {
      return initialState;
    }
  }
});

// Export actions and reducer
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;