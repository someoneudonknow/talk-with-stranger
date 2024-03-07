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
}

export default AuthService;
