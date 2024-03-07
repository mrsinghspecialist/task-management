import { createSelector, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/User";
import { RootState } from "../store";

interface ProfileState {
  actingProfile: User;
  users?: User[];
}

const initialState: ProfileState = {
  actingProfile: {
    name: "",
    email: "",
    password: "",
    userType: "Regular",
  },
  users: [
    {
      name: "Admin",
      email: "admin@task.com",
      password: "Ripazha",
      userType: "Admin",
    },
  ],
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setActiveProfile: (state, action: { payload: User }) => {
      const { payload } = action;
      const { email, name, password, userType } = payload;
      state.actingProfile.email = email;
      state.actingProfile.password = password;
      state.actingProfile.name = name;
      state.actingProfile.userType = userType;
    },
    logout: (state) => {
      state.actingProfile = initialState.actingProfile;
    },
    registerProfile: (state, action: { payload: User }) => {
      state.users = [...(state.users ?? []), action.payload];
    },
  },
});

const selectProfileState = (state: RootState): RootState["profile"] =>
  state.profile;

export const selectActingProfile = createSelector(
  selectProfileState,
  (profileState) => profileState.actingProfile
);

export const selectAllUsers = createSelector(
  selectProfileState,
  (profileState) => profileState.users ?? []
);

export const { setActiveProfile, logout, registerProfile } = profile.actions;

export default profile.reducer;
