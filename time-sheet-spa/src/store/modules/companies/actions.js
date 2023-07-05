export default {
  async loadCompanies({ commit, dispatch, rootGetters }) {
    await dispatch("auth/checkTokens", null, { root: true });
    try {
      const res = await fetch("https://localhost:7059/api/company", {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + rootGetters["auth/token"].token,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        const error = new Error(data.message || "Failed to load companies!");
        throw error;
      }

      const companies = [];
      for (const key in data) {
        const com = {
          ID: data[key].id,
          Name: data[key].name,
          Address: data[key].address,
          City: data[key].city,
          Country: data[key].country,
          Email: data[key].email,
          CompanyManagerId: data[key].companyManagerId,
          StartTime: data[key].startTime,
          EndTime: data[key].endTime
        };
        companies.push(com);
      }
      commit("setCompanies", companies);
    } catch (error) {
      console.log(error);
    }
  },

  async loadCompany({ commit, dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    const res = await fetch(
      "https://localhost:7059/api/company/" + payload.id,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.message || "Failed to load company data!");
      throw error;
    }
    var company = {
      ID: data.id,
      Name: data.name,
      Address: data.address,
      City: data.city,
      Country: data.country,
      Email: data.email,
      CompanyManagerId: data.companyManagerId,
      StartTime: data.startTime,
      EndTime: data.endTime
    };
    commit("setCompany", company);
  },

  async addCompany({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    const com = {
      Name: payload.comName,
      Address: payload.comAddress,
      City: payload.comCity,
      Country: payload.comCountry,
      Email: payload.comEmail,
      StartTime: payload.comStartTime,
      EndTime: payload.comEndTime
    };
    
    const res = await fetch("https://localhost:7059/api/company", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(com),
    });

    if (!res.ok) {
      const error = new Error(res.message || "Failed to add company!");
      throw error;
    }
  },

  async editCompany({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    const com = {
      ID: payload.comId,
      Name: payload.comName,
      Address: payload.comAddress,
      City: payload.comCity,
      Country: payload.comCountry,
      Email: payload.comEmail,
      CompanyManagerId: localStorage.getItem("userId"),
      StartTime: payload.comStartTime,
      EndTime: payload.comEndTime
    };

    const res = await fetch("https://localhost:7059/api/company", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${rootGetters["auth/token"].token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(com),
    });

    if (!res.ok) {
      const error = new Error(res.message || "Failed to edit company!");
      throw error;
    }
  },

  async deleteCompany({ dispatch, rootGetters }, payload) {
    await dispatch("auth/checkTokens", null, { root: true });
    const res = await fetch(
      `https://localhost:7059/api/company/${payload.id}?targetDepartmentId=${payload.targetDepartmentId}&&deleteEmployees=${payload.deleteEmployees}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${rootGetters["auth/token"].token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const error = new Error(res.message || "Failed to delete company!");
      throw error;
    }
  },
};
