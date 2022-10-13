import jwt_decode from "jwt-decode";


const localStorageToken = localStorage.getItem('userToken');

const parsedToken = localStorageToken !== null ? jwt_decode(localStorageToken) : {};

const {
  userId: tokenId,
  firstName: tokenFirstName,
  lastName: tokenLastName,
  title: tokenTitle,
  email: tokenEmail,
  company: tokenCompany,
} = parsedToken;

const initialState = {
  currentUserId: tokenId || '',
  currentUserFirstName: tokenFirstName || '',
  currentUserLastName: tokenLastName || '',
  currentUserEmail: tokenEmail || '',
  currentUserTitle: tokenTitle || '',
  currentUserCommand: tokenCompany || '',
  isLoggedIn: Boolean(localStorageToken),
  token: Boolean(localStorageToken) ? parsedToken : null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_USER_SUCCESS': {
      return {
        ...state,
        isLoggedIn: true
      }
    }

    case 'SET_CURRENT_USER': {
      const {
        firstName, lastName, userId, email, title, company,
      } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        currentUserFirstName: firstName,
        currentUserLastName: lastName,
        currentUserEmail: email,
        currentUserId: userId,
        currentUserTitle: title,
        currentUserCompany: company
      };
    }

    case 'SET_CURRENT_COMPANY': {
      const { company } = action.payload;
      return {
        ...state,
        currentUserCommand: company
      }
    }

    case 'LOGOUT_USER': {
      return {
        ...initialState,
      }
    }

    default:
      return state;
  }
}

export default usersReducer
