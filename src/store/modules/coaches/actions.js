export default {
  registerCoach(context, data) {
    const coachDetails = {
      id: context.rootGetters.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      areas: data.area,
      description: data.desc,
      hourlyRate: data.rate
    };
    context.commit('registerCoach', coachDetails);
  }
};
