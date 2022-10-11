import { takeLatest, call, put } from 'redux-saga/effects';
import jwt_decode from "jwt-decode";


import axiosInstance from './axios';

function* fetchReports() {
  try {
    const getReports = async () => axiosInstance.get('/reports');
    const response = yield call(getReports);
    const responseData = response.data;
    yield put({ type: 'FETCH_TEAM_REPORTS_SUCCESS', payload: responseData });
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchUserReports(action) {
  try {
    const response = yield call(axiosInstance.get, `/api/User/reports?UserId=${action.payload.userId}`);
    const responseData = response.data;
    yield put({ type: 'FETCH_USER_REPORTS_SUCCESS', payload: { data: responseData, userId: action.payload.userId } });
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchUserData(action) {
  try {
    const response = yield call(axiosInstance.get, `/users/${action.payload.id}`);
    const responseData = response.data;
    yield put({ type: 'FETCH_USER_DATA_SUCCESS', payload: { data: responseData } });
  } catch (error) {
    console.log('error', error);
  }
}

function* signin(action) {
  try {
    const { navigate } = action.payload;
    const signIn = async () => axiosInstance.post('api/Authentication/login', { ...action.payload });
    const response = yield call(signIn);
    const responseData = response.data;
    const decodedToken = jwt_decode(responseData);
    console.log({ decodedToken })
    const {
      firstName,
      lastName,
      email,
      title,
      id,
      command,
      userId,
    } = decodedToken;
    localStorage.setItem('userToken', responseData);
    yield put({ type: 'SIGNIN_USER_SUCCESS' });
    yield put({
      type: 'SET_CURRENT_USER',
      payload: {
        userId,
        firstName,
        lastName,
        email,
        title,
        id,
        command,
      },
    });
    navigate("/");
  } catch (error) {
    console.log('error', error);
  }
}
function* signupUser(action) {
  try {
    const { email, password, navigate } = action.payload;
    const signUp = async () => axiosInstance.post('api/Authentication/registration', { ...action.payload });
    yield call(signUp);
    yield put({ type: 'SIGNIN_USER', payload: { password, email } });
    navigate("/");
  } catch (error) {
    console.log('error', error);
  }
}

function* signupCompany(action) {
  try {
    const { email, password } = action.payload;
    const signUp = async () => axiosInstance.post('/auth/signupcompany', { ...action.payload });
    yield call(signUp);
    yield put({ type: 'SIGNIN_USER', payload: { email, password } });
  } catch (error) {
    console.log('error', error);
  }
}

function* addReport(action) {
  try {
    const { navigate } = action.payload;
    console.log({ ...action.payload })
    const addReportRequest = async () => axiosInstance.post('api/Reports/add', { ...action.payload });
    yield call(addReportRequest);
    navigate("/reports")
  } catch (error) {
    console.log('error', error);
  }
}

function* editUser(action) {
  try {
    const addNewsRequest = async () => axiosInstance.put(`/users/edit/${action.payload.id}`, { ...action.payload });
    yield call(addNewsRequest);
    yield put({ type: 'SIGNIN_USER', payload: { ...action.payload } });
  } catch (error) {
    console.log('error', error);
  }
}

function* mySaga() {
  yield takeLatest('FETCH_TEAM_MEMBERS_START', fetchReports);
  yield takeLatest('FETCH_USER_REPORTS_START', fetchUserReports);
  yield takeLatest('FETCH_USER_DATA', fetchUserData);
  yield takeLatest('SIGNIN_USER', signin);
  yield takeLatest('SIGNUP_USER', signupUser);
  yield takeLatest('SIGNUP_COMPANY', signupCompany);
  yield takeLatest('ADD_REPORT', addReport);
  yield takeLatest('EDIT_USER', editUser);
}

export default mySaga;