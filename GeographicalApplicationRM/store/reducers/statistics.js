import {LOAD_STATISTICS, SAVE_STATISTICS} from '../actions/statistics';

const initialState = {
  statisticsRedux: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STATISTICS:
      return {
        statisticsRedux: action.statistics,
      };
    case SAVE_STATISTICS:
      return {
        statisticsRedux: action.statistics,
      };
    default:
      return state;
  }
};
