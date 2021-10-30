export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.area,
      description: data.desc,
      hourlyRate: data.rate
    };
    const response = await fetch(
      `https://find-coach-d2bd7-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachDetails)
      }
    );
    const resposneData = await response.json();

    if (!response.ok) {
      const error = new Error(resposneData.message || 'Failed to load');
      throw error;
    }
    context.commit('registerCoach', {
      ...coachDetails,
      id: userId
    });
  },
  async fetchCoach(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `https://find-coach-d2bd7-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`,
      {
        method: 'GET'
      }
    );
    const resposneData = await response.json();

    if (!response.ok) {
      const error = new Error(resposneData.message || 'Failed to fetch');
      throw error;
    }
    const coaches = [];
    for (const key in resposneData) {
      coaches.push({
        id: key,
        firstName: resposneData[key].firstName,
        lastName: resposneData[key].lastName,
        areas: resposneData[key].areas,
        description: resposneData[key].description,
        hourlyRate: resposneData[key].hourlyRate
      });
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  }
};
