import axios from "axios";
import {
  HIDE_MESSAGE,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  GET_COMPANY,
  COMPANY_ERROR,
  GET_FOLLOWINGS,
  GET_FOLLOWERS,
  CREATE_COMPANY_PROFILE_FAIL,
  CREATE_COMPANY_PROFILE_SUCCESS,
  UPDATE_COMPANY_PROFILE_SUCCESS,
  UPD_COMP,
  GET_COMPANIES,
  CLEAR_COMPANY,
  GET_REPOS,
  NO_REPOS,
  ADD_COMPANY_JOB_FAIL,
  EDIT_COMPANY_JOB_FAIL,
  GET_ALL_JOBS


} from "../../constants/ActionTypes";
import setAuthToken from "../../util/setAuthToken";

//Get all Profiles
export const getAllJobs = () => async dispatch => {
  dispatch({ type: CLEAR_COMPANY });
  try {
    const res = await axios.get(
      "/api/company/get-all-jobs"
    );
    dispatch({
      type: GET_ALL_JOBS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all Profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_COMPANY });
  try {
    const res = await axios.get(
      "/api/company/profiles"
    );
    dispatch({
      type: GET_COMPANIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get company profile by ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(
      `/api/company/user/${userId}`
    );
    dispatch({
      type: GET_COMPANY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
//Get current users profile
export const getCurrentcompany = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      "/api/company/user"
    );
    //push fl store mtee el redux
    dispatch({
      type: GET_COMPANY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Create or update profile
export const createCompany = (
  formData,   

  edit = false
) => async dispatch => {
  try {
    console.log(formData);
    const res = await axios.post(
      "/api/company/create",
      formData
    );
      
    dispatch({
      type: GET_COMPANY,
      payload: res.data
    });

    //dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
    if (edit) {
      dispatch({
        type: UPDATE_COMPANY_PROFILE_SUCCESS,
        payload: res.data
      });
    }
    if (!edit) {
      dispatch({
        type: CREATE_COMPANY_PROFILE_SUCCESS,
        payload: res.data
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch({
          type: CREATE_COMPANY_PROFILE_FAIL,
          payload: error.msg
        })
      );
    }
  }
};

//DELETE PROFILE
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure ? This can NOT be undone!")) {
    try {
      const res = await axios.delete(
        "/api/company/delete"
      );
      dispatch({
        type: CLEAR_COMPANY
      });
      
    } catch (err) {
      dispatch({
        type: COMPANY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(
      `/api/company/github/${username}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS
    });
  }
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER
  };
};
//GET FOLLOWINGS
 export const getFollowings = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      "/api/users/getfollowing"
    );

    dispatch({
      type: GET_FOLLOWINGS,
      payload: res.data
    });
  } catch (err) {}
};
  export const getFollowers = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      "/api/users/getfollowers"
    );

    dispatch({
      type: GET_FOLLOWERS,
      payload: res.data
    });
  } catch (err) {}
};


//ADD JOB
export const addJob = formData => async dispatch => {
  try {
    console.log(formData);
    const res = await axios.put(
      "/api/company/job",
      formData
    );

    dispatch({
      type: UPD_COMP,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch({
          type: ADD_COMPANY_JOB_FAIL,
          payload: error.msg
        })
      );
    }
  }
};



//EDIT JOB
export const editJob = id => async dispatch => {
  try {
   console.log("id",id);
    const res = await axios.post(
      `/api/company/job_edit/${id}`
      
    );
    

    dispatch({
      type: UPD_COMP,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error =>
        dispatch({
          type: EDIT_COMPANY_JOB_FAIL,
          payload: { msg: err.response.statusText, status: err.response.status }
        })
      );
    }
  }
};

//DELETE JOB
export const deleteJob = id => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/company/job/${id}`
    );
    dispatch({
      type: UPD_COMP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
