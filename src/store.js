import { createStore } from "redux";

const initialState = {
  keyword: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_KEYWORD":
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
