export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this.headers },
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => console.error("Error:", error));
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  setUserInfo({ name, about }) {
    return this._makeRequest("/users/me", "PATCH", { name, about });
  }

  addNewCard({ name, link }) {
    return this._makeRequest("/cards", "POST", { name, link });
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this._makeRequest(`/cards/likes/${cardId}`, "PUT");
  }

  removeLike(cardId) {
    return this._makeRequest(`/cards/likes/${cardId}`, "DELETE");
  }

  setUserAvatar({ avatar }) {
    return this._makeRequest(`/users/me/avatar`, "PATCH", { avatar });
  }
}
