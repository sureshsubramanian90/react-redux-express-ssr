import { GET_HOME_PAGE_DATA_REQUEST } from '../actionTypes/HomeActionTypes';

export const getHomePageData = (payload) => ({
  type: GET_HOME_PAGE_DATA_REQUEST,
  payload,
});

export default getHomePageData;
