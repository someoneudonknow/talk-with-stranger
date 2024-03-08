"use strict";

class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getHeaders({ withAuth = false, customHeaders = {} }) {
    let headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    if (withAuth) {
      headers = {
        ...headers,
        Authorization: `${localStorage.getItem("accessToken") || ""}`,
        "x-client-id": `${localStorage.getItem("uid") || ""}`,
      };
    }

    return headers;
  }

  async handleReponseError(response) {
    const data = await response.json();

    if (data?.status === "error") {
      throw new Error(data.message);
    }

    return data;
  }

  async get(url, customHeaders = {}, options = {}) {
    return await this.handleReponseError(
      await fetch(`${this.baseUrl}${url}`, {
        headers: this.getHeaders({ customHeaders, withAuth: options.withAuth }),
      })
    );
  }

  async post(url, data = {}, options = {}) {
    return await this.handleReponseError(
      await fetch(`${this.baseUrl}${url}`, {
        method: "POST",
        headers: this.getHeaders({
          customHeaders: options?.customHeaders,
          withAuth: options.withAuth,
        }),
        body: JSON.stringify(data),
      })
    );
  }

  async patch(url, data = {}, options = {}) {
    return await this.handleReponseError(
      await fetch(`${this.baseUrl}${url}`, {
        method: "PATCH",
        headers: this.getHeaders({
          customHeaders: options?.customHeaders,
          withAuth: options.withAuth,
        }),
        body: JSON.stringify(data),
      })
    );
  }

  async delete(url, data = {}, options = {}) {
    return await this.handleReponseError(
      await fetch(`${this.baseUrl}${url}`, {
        method: "DELETE",
        headers: this.getHeaders({
          customHeaders: options?.customHeaders,
          withAuth: options.withAuth,
        }),
        body: JSON.stringify(data),
      })
    );
  }
}

export default BaseService;
