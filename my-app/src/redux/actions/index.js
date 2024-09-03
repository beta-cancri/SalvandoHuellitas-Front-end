import axios from 'axios';

export const FETCH_PETS_SUCCESS = 'FETCH_PETS_SUCCESS';
export const FETCH_PET_DETAIL_SUCCESS = 'FETCH_PET_DETAIL_SUCCESS';
export const CREATE_PET_SUCCESS = 'CREATE_PET_SUCCESS';
export const DELETE_PET_SUCCESS = 'DELETE_PET_SUCCESS';
export const UPDATE_PET_STATUS_SUCCESS = 'UPDATE_PET_STATUS_SUCCESS'; // Added this line
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';

// Fetch all pets with optional filters and pagination
export const fetchPets = (filters = {}, page = 1) => async (dispatch) => {
  try {
    const params = { ...filters, page }; 
    const response = await axios.get('/pets', { params });
    
    console.log('Fetched Pets:', response.data);
    dispatch({
      type: FETCH_PETS_SUCCESS,
      payload: response.data, 
    });
  } catch (error) {
    console.error('Error fetching pets:', error.message);
  }
};

// Fetch pet by ID
export const fetchPetDetail = (id) => async (dispatch) => {
  try {
    console.log(`Fetching Pet detail for ID: ${id}`);
    const response = await axios.get(`/pets/${id}`);
    console.log('Fetched Pet detail:', response.data);
    dispatch({ type: FETCH_PET_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching pet detail:', error.message);
  }
};

// Create a new pet
export const createPet = (pet) => async (dispatch) => {
  try {
    const response = await axios.post('/pets', pet);
    console.log('Created Pet:', response.data);
    dispatch({ type: CREATE_PET_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating pet:', error.message);
  }
};

// Delete a pet (mark as inactive)
export const deletePet = (id) => async (dispatch) => {
  try {
    console.log(`Deleting Pet with ID: ${id}`);
    const response = await axios.delete(`/pets/${id}`);
    console.log('Deleted Pet:', response.data);
    dispatch({ type: DELETE_PET_SUCCESS, payload: id });
  } catch (error) {
    console.error('Error deleting pet:', error.message);
  }
};

// Update pet status (activate/deactivate)
export const updatePetStatus = (id, status) => async (dispatch) => { // Added this function
  try {
    const response = await axios.patch(`/pets/${id}`, { status });
    console.log('Updated Pet Status:', response.data);
    dispatch({ type: UPDATE_PET_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error updating pet status:', error.message);
  }
};

// Fetch all reviews
export const fetchReviews = () => async (dispatch) => {
  try {
    const response = await axios.get('/reviews');
    console.log('Fetched Reviews:', response.data);
    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
  }
};

// Create a new review
export const createReview = (review) => async (dispatch) => {
  try {
    const response = await axios.post('/reviews', review);
    console.log('Created Review:', response.data);
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating review:', error.message);
  }
};

// Fetch all users
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('/users');
    console.log('Fetched Users:', response.data);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
};

// Create a new user
export const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/users', user);
    console.log('Created User:', response.data);
    dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

// Fetch all requests
export const fetchRequests = () => async (dispatch) => {
  try {
    const response = await axios.get('/requests');
    console.log('Fetched Requests:', response.data);
    dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching requests:', error.message);
  }
};

export const createRequest = (request) => async (dispatch) => {
  try {
    const response = await axios.post('/requests', request);
    console.log('Created Request:', response.data);
    dispatch({ type: CREATE_REQUEST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating request:', error.message);
  }
};
