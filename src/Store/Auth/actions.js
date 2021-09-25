let timer;
export default {
  async signup(context, payload) {
    const mode = "signup";
    return context.dispatch("auth", {
      ...payload,
      mode,
    });
  },
  async login(context, payload) {
    const mode = "login";

    return context.dispatch("auth", {
      ...payload,
      mode,
    });
  },
  async auth(context, payload) {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7mDLeQ398e_cVIQIfJKZXAfOjYF92lAg";
    if (payload.mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7mDLeQ398e_cVIQIfJKZXAfOjYF92lAg";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData.error.message);
      let error = new Error(responseData.error.message);
      if (responseData.error.message === "EMAIL_EXISTS") {
        error = new Error("This e-mail Already Exists, Try different e-mail..");
      } else if (responseData.error.message === "INVALID_PASSWORD") {
        error = new Error("Incorrect password, try again!");
      }
      throw error;
    }
    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);
    context.commit("setUser", {
      idToken: responseData.idToken,
      expiresIn: responseData.expiresIn,
      localId: responseData.localId,
    });
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    clearTimeout(timer);
    context.commit("setUser", {
      idToken: null,
      localId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirationDate = localStorage.getItem("expirationDate");
    const expiresIn = +expirationDate - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);
    context.commit("setUser", {
      idToken: token,
      localId: userId,
    });
  },
};
