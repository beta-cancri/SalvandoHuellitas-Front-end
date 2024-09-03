import {
  FETCH_PETS_SUCCESS, FETCH_PET_DETAIL_SUCCESS, CREATE_PET_SUCCESS, DELETE_PET_SUCCESS,
  UPDATE_PET_STATUS_SUCCESS, // Added this line
  FETCH_REVIEWS_SUCCESS, CREATE_REVIEW_SUCCESS,
  FETCH_USERS_SUCCESS, CREATE_USER_SUCCESS,
  FETCH_REQUESTS_SUCCESS, CREATE_REQUEST_SUCCESS
} from '../actions';

const initialState = {
  pets: [],
  petDetail: {},
  reviews: [],
  users: [],
  requests: [],
  currentPage: 1,
  totalPages: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PETS_SUCCESS:
      console.log('Reducer updating pets state with payload:', action.payload);
      return {
        ...state,
        pets: action.payload.results,
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case FETCH_PET_DETAIL_SUCCESS:
      console.log('Reducer updating petDetail state with payload:', action.payload);
      return {
        ...state,
        petDetail: action.payload,
      };
    case CREATE_PET_SUCCESS:
      return {
        ...state,
        pets: [...state.pets, action.payload],
      };
    case DELETE_PET_SUCCESS:
      return {
        ...state,
        pets: state.pets.filter(pet => pet.id !== action.payload),
      };
    case UPDATE_PET_STATUS_SUCCESS: // Added this case
      return {
        ...state,
        pets: state.pets.map(pet =>
          pet.id === action.payload.id ? action.payload : pet
        ),
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case FETCH_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload,
      };
    case CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
