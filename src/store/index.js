import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  mchj: sessionStorage.getItem("mchj") ? Number(sessionStorage.getItem("mchj")) : 0,
  isLoggedIn: !!localStorage.getItem("loginTimestamp"),
  typeId: "",
  regions:[],
  xabarlarSoni: null,
  query: "",
  role: sessionStorage.getItem("role") ? Number(sessionStorage.getItem("role")) : 0,
  userId: sessionStorage.getItem("userId") ? Number(sessionStorage.getItem("userId")) : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialLoginState,
  reducers: {
    addItem(state, action) { // `action` argumenti qo‘shildi
      state.mchj = action.payload; 
      sessionStorage.setItem("mchj", action.payload);
    },
    setIsLoggedIn(state, action) { 
      state.isLoggedIn = action.payload;
      if (action.payload) {
        localStorage.setItem("loginTimestamp", Date.now().toString());
      } else {
        localStorage.removeItem("loginTimestamp");
      }
    },
    addTypeId(state, action) {
      state.typeId = action.payload;
    },
    addRegions(state, action) {
      state.regions = action.payload;
    },
    addQuery(state, action) {
      state.query = action.payload;
    },
    addRole(state, action) { 
      state.role = action.payload;
      sessionStorage.setItem("role", action.payload);
    },
    setXabarlarSoni(state, action) {
      state.xabarlarSoni = action.payload;
    },
    addUserId(state, action) {
      state.userId = action.payload;
      sessionStorage.setItem("userId", action.payload);
    },
  },
});


export const cartActions = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
