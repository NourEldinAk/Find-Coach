export default {
  async addRequest(context, payload) {
    const response = await fetch(
      `https://find-coach-2cffe-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.id}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          message: payload.message,
        }),
      }
    );
    if (!response.ok) {
      //error...
    }
    context.commit("addRequest", payload);
  },
  async loadRequests(context) {
    const requestId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-coach-2cffe-default-rtdb.europe-west1.firebasedatabase.app/requests/${requestId}.json?auth=` +
        token
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch");
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: requestId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    console.log(requests);
    context.commit("setRequests", requests);
  },
};
