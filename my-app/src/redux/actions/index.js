import axios from 'axios';

export const FETCH_PETS_SUCCESS = 'FETCH_PETS_SUCCESS';
export const FETCH_PET_DETAIL_SUCCESS = 'FETCH_PET_DETAIL_SUCCESS';
export const CREATE_PET_SUCCESS = 'CREATE_PET_SUCCESS';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS';

// Fetch all pets
export const fetchPets = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/pets');
    console.log('Fetched Pets:', response.data);
    dispatch({ type: FETCH_PETS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pets:', error.message);
  }
};

// Fetch pet by ID
export const fetchPetDetail = (id) => async (dispatch) => {
  try {
    console.log(`Fetching Pet detail for ID: ${id}`);
    const response = await axios.get(`http://localhost:3001/pets/${id}`);
    console.log('Fetched Pet detail:', response.data);
    dispatch({ type: FETCH_PET_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pet detail:', error.message);
  }
};

// Create a new pet
export const createPet = (pet) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/pets', pet);
    console.log('Created Pet:', response.data);
    dispatch({ type: CREATE_PET_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating pet:', error.message);
  }
};

// Fetch all reviews
export const fetchReviews = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/reviews');
    console.log('Fetched Reviews:', response.data);
    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
  }
};

// Create a new review
export const createReview = (review) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/reviews', review);
    console.log('Created Review:', response.data);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating review:', error.message);
  }
};

// Fetch all users
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    console.log('Fetched Users:', response.data);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
};

// Create a new user
export const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/users', user);
    console.log('Created User:', response.data);
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

// Fetch all requests
export const fetchRequests = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/requests');
    console.log('Fetched Requests:', response.data);
    dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching requests:', error.message);
  }
};
