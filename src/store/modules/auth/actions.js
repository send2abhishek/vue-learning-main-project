export default {
  async login(context, payload) {
    const resposne = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDva3GPIRacenpsauAr_cxxAW7dUgtblcU',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );

    const responseData = await resposne.json();
    if (!resposne.ok) {
      const error = new Error(responseData.message || 'Failed to auhtenticate');
      throw error;
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  async signUp(context, payload) {
    const resposne = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDva3GPIRacenpsauAr_cxxAW7dUgtblcU',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );

    const responseData = await resposne.json();
    if (!resposne.ok) {
      const error = new Error(responseData.message || 'Failed to auhtenticate');
      throw error;
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  },
  logout(context) {
    context.commit('userLogout');
  }
};
