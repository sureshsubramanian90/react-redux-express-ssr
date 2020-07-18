import { GET_HOME_PAGE_DATA_REQUEST_SUCCESS } from '../actionTypes/HomeActionTypes';


export default function HomeReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_HOME_PAGE_DATA_REQUEST_SUCCESS:
      return {
        ...action.data
      };
    default:
      return state;
  }
}
