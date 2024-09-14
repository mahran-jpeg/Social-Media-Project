import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
  logInModalOpen: false,
  openCommentModal: false,
  commenPostDetails:{
    name:'',
    username:'',
    id:'',
    text:'',
  }
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },
    openLogInModal: (state) => {
      state.logInModalOpen = true;
    },
    closeLogInModal: (state) => {
      state.logInModalOpen = false;
    },
    openCommentModal: (state) => {
      state.openCommentModal = true;
    },
    closeCommentModal: (state) => {
      state.openCommentModal = false;
    },
    setCommentDetails:(state,action)=>{
      state.commenPostDetails.name=action.payload.name
      state.commenPostDetails.username=action.payload.username
      state.commenPostDetails.id=action.payload.id
      state.commenPostDetails.text=action.payload.text
    }
  },
});

export const {
  openSignUpModal,
  closeSignUpModal,
  openLogInModal,
  closeLogInModal,
  openCommentModal,
  closeCommentModal,
  setCommentDetails,
} = modalSlice.actions;

export default modalSlice.reducer;