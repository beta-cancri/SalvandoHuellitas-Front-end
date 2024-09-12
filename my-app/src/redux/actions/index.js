import axios from 'axios';

export const FETCH_PETS_SUCCESS = 'FETCH_PETS_SUCCESS';
export const FETCH_PET_DETAIL_SUCCESS = 'FETCH_PET_DETAIL_SUCCESS';
export const CREATE_PET_SUCCESS = 'CREATE_PET_SUCCESS';
export const CHANGE_PET_STATUS = 'CHANGE_PET_STATUS';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';
export const CHANGE_USER_STATUS = 'CHANGE_USER_STATUS';
export const FETCH_USER_DETAIL_SUCCESS = 'FETCH_USER_DETAIL_SUCCESS';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';

// Fetch all pets with optional filters and pagination
export const fetchPets = (filters = {}, page = 1, isHome = false) => async (dispatch) => {
  try {
    // If we're on the Home page, add status: "available" to the filters
    if (isHome) {
      filters.status = "available";
    }

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
    const response = await axios.post('/pets', pet,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })//agregado
    console.log('Created Pet:', response.data);
    dispatch({ type: CREATE_PET_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating pet:', error.message);
  }
};

// Delete a pet (mark as inactive)
// Change the status of a pet (mark as inactive or available)
export const changePetStatus = (id, status) => async (dispatch) => {
  try {
    // Log the pet ID and status to confirm inputs
    console.log(`Changing status of Pet with ID: ${id} to ${status}`);
    
    // Retrieve token from localStorage
    let token = localStorage.getItem("jwt");

    // Log the token to ensure it's being retrieved correctly
    console.log('Token retrieved from localStorage:', token);

    // Make the PATCH request to update the pet status
    const response = await axios.patch(`/pets/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    // Log the response from the server
    console.log('Change Pet Status response:', response.data);

    // Dispatch the action with the ID of the updated pet
    dispatch({ type: CHANGE_PET_STATUS, payload: id });

    // Return a resolved promise to allow chaining of actions
    return Promise.resolve(response.data);
  } catch (error) {
    // Log any errors encountered
    console.error('Error changing pet status:', error.message);
    return Promise.reject(error);
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
export const fetchUsers = (page = 1, status = '') => async (dispatch) => {
  try {
    let token = localStorage.getItem("jwt");

    // Map the status value to true or false for isActive
    let isActiveStatus;
    if (status === 'active') {
      isActiveStatus = true;
    } else if (status === 'inactive') {
      isActiveStatus = false;
    } else {
      isActiveStatus = ''; // No filter for status
    }

    const params = {
      page,
    };

    if (isActiveStatus !== '') {  // Only include status if it's defined
      params.status = status;
    }

    console.log('Dispatching fetchUsers with params:', params); // Log params
    console.log('Mapped isActiveStatus:', isActiveStatus); // Debug log for status mapping

    const response = await axios.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    console.log('Response from fetchUsers:', response.data); // Log the backend response

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: {
        results: response.data.results,
        page: response.data.page,
        totalPages: response.data.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
};








// Change user status
export const changeUserStatus = (userId, isActive) => async (dispatch) => {
  try {
    console.log(`Changing status of user with ID: ${userId} to ${isActive}`);

    // Retrieve token from localStorage
    let token = localStorage.getItem("jwt");

    // Make the PATCH request with the token included in the headers
    const response = await axios.patch(`/users/${userId}`, { isActive }, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    console.log('Change User Status response:', response.data);

    dispatch({ type: CHANGE_USER_STATUS, payload: userId });

    return Promise.resolve(response.data);
  } catch (error) {
    console.error('Error changing user status:', error.message);
    return Promise.reject(error);
  }
};



// Create a new user
export const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/users', user,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }) //para saber que sube otros archivos
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


//Create a new request
export const createRequest = (request, headers) => async (dispatch) => {
  try {
    const response = await axios.post('/requests', request, { headers });
    console.log('Created Request:', response.data);
    dispatch({ type: CREATE_REQUEST_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error creating request:', error.message);
  }
};

// Fetch user by ID
export const fetchUserDetail = (userId) => async (dispatch) => {
  try {
    console.log(`Fetching User detail for ID: ${userId}`);
    
    const token = localStorage.getItem('jwt');
    const response = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token for authorization
      },
    });
    
    console.log('Fetched User detail:', response.data);
    dispatch({ type: FETCH_USER_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching user detail:', error.message);
  }
};


// Update profile
export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    // Get the token from local storage
    const token = localStorage.getItem('jwt');

    // Ensure the token exists
    if (!token) {
      throw new Error("Token not found. User is not authenticated.");
    }

    // Log the token to check if it's correct
    console.log('Token:', token);

    // Log form data (for debugging purposes, check structure)
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    // Make the PATCH request with the token in the headers
    const response = await axios.patch('http://localhost:3001/users/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Updated User profile:', response.data);
    dispatch({ type: 'UPDATE_USER_PROFILE_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    alert("Error updating profile: " + error.message);
  }
};





