export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      userMessage: payload.message
    };

    const response = await fetch(
      `https://find-coach-d2bd7-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );
    const resposneData = await response.json();

    if (!response.ok) {
      const error = new Error(resposneData.message || 'Failed to load');
      throw error;
    }

    context.commit('addRequest', {
      ...newRequest,
      id: resposneData.name,
      coachId: payload.coachId
    });
  },

  async fetchRequest(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-coach-d2bd7-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`,
      {
        method: 'GET'
      }
    );
    const resposneData = await response.json();

    if (!response.ok) {
      const error = new Error(resposneData.message || 'Failed to fetch');
      throw error;
    }
    const requests = [];
    for (const key in resposneData) {
      requests.push({
        id: key,
        coachId: coachId,
        userEmail: resposneData[key].userEmail,
        userMessage: resposneData[key].userMessage
      });
    }
    console.log('requests', requests);
    context.commit('setRequest', requests);
  }
};
