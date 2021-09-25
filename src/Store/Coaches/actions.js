export default {
  async addCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://find-coach-2cffe-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      //error...
    }
    context.commit("addCoach", {
      ...payload,
      id: userId,
    });
  },
  async loadCoaches(context, forceRefresh) {
    if (!context.getters.shouldUpdate && !forceRefresh) {
      return;
    }
    const response = await fetch(
      `https://find-coach-2cffe-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch");
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        areas: responseData[key].areas,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
      console.log(coaches);
    }
    context.commit("setCoaches", coaches);
    context.commit("lastFetching");
  },
};
