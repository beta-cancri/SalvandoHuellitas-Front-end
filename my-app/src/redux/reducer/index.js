import {
  FETCH_PETS_SUCCESS, FETCH_PET_DETAIL_SUCCESS, CREATE_PET_SUCCESS, CHANGE_PET_STATUS,
  FETCH_REVIEWS_SUCCESS, CREATE_REVIEW_SUCCESS,
  FETCH_USERS_SUCCESS, CREATE_USER_SUCCESS, CHANGE_USER_STATUS,
  FETCH_REQUESTS_SUCCESS, CREATE_REQUEST_SUCCESS,
  FETCH_USER_DETAIL_SUCCESS, UPDATE_USER_PROFILE_SUCCESS,
} from '../actions';

const initialState = {
  pets: [],
  petDetail: {},
  reviews: [],
  users: [],
  requests: [],
  userDetail: {}, // Keep user detail in the state
  petsCurrentPage: 1,  // Separate currentPage for pets
  petsTotalPages: 1,   // Separate totalPages for pets
  usersCurrentPage: 1,  // Separate currentPage for users
  usersTotalPages: 1,   // Separate totalPages for users
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Pets-related actions
    case FETCH_PETS_SUCCESS:
      console.log('Reducer updating pets state with payload:', action.payload);
      return {
        ...state,
        pets: action.payload.results,
        petsCurrentPage: action.payload.page,
        petsTotalPages: action.payload.totalPages,
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
    case CHANGE_PET_STATUS:
      return {
        ...state,
        pets: state.pets.filter(pet => pet.id !== action.payload),
      };

    // Reviews-related actions
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

    // Users-related actions
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.results,
        usersCurrentPage: action.payload.page,
        usersTotalPages: action.payload.totalPages,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case CHANGE_USER_STATUS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case FETCH_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userDetail: action.payload, // Update user details after successful profile update
      };

    // Requests-related actions
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
