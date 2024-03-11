"use strict";

import BaseService from "./base.service";

class AuthService extends BaseService {
  constructor(baseUrl) {
    super(baseUrl);
  }

  async signUp(payload) {
    return await this.post("/users/signup", payload);
  }

  async signIn(payload) {
    return await this.post("/users/signin", payload);
  }

  async logOut(uid, tokens) {
    return await this.post(
      "/users/signout",
      {},
      {
        customHeaders: {
          authorization: tokens.accessToken,
          "x-client-id": uid,
        },
      }
    );
  }

  async refreshToken(uid, tokens) {
    return await this.post(
      "/users/refreshToken",
      {},
      {
        customHeaders: {
          authorization: tokens.accessToken,
          "x-client-id": uid,
          refreshToken: tokens.refreshToken,
        },
      }
    );
  }
}

export default AuthService;
