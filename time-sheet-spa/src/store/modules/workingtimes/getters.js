export default {
  workingTimes(state) {
    return state.workingTimes;
  },
  hasWorkingTimes(state) {
    return !!state.workingTimes && state.workingTimes.length > 0;
  },
};
