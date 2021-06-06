import { axiosGraphQL } from '../../util/common';
import * as actionTypes from './actionTypes';
import * as querySchemas from './querySchemas';


export const getSchedule = (start, end) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_SCHEDULE,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getSchedule(start, end) })
    .then(response => {
      dispatch({
        type: actionTypes.SCHEDULE_LOADED,
        payload: response.data.data.schedule
      });
    });
};

export const getStandings = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_STANDINGS,
  });
  axiosGraphQL
  .post('', { query: querySchemas.getStandings('20202021') })
  .then(response => {
    dispatch({
      type: actionTypes.STANDINGS_LOADED,
      payload: response.data.data.standings
    });
  });
};

export const getTeamSchedule = (id, start, end) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_TEAM_SCHEDULE,
  });
  axiosGraphQL
    .post('', { query: querySchemas.getTeamSchedule(id, start, end) })
    .then(response => {
      dispatch({
        type: actionTypes.TEAM_SCHEDULE_LOADED,
        payload: response.data.data.scheduleByTeam
      });
    });
};