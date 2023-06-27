import { createStore } from "vuex";

import companiesModule from "./modules/companies/index.js";
import departmentsModule from "./modules/departments/index.js";
import employeesModule from "./modules/employees/index.js";
import workingTimesModule from "./modules/workingtimes/index.js";
import authModule from "./modules/auth/index.js";
import statisticsModule from "./modules/statistics/index.js";

const store = createStore({
  modules: {
    companies: companiesModule,
    departments: departmentsModule,
    employees: employeesModule,
    workingTimes: workingTimesModule,
    auth: authModule,
    statistics: statisticsModule,
  },
  state() {
    return {
      userId: "123",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
