class HttpClient {
  // static baseUrl = BASE_URL
  static baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  static defaultHeaders = {
    "Content-Type": "application/json",
    "Accepted-Language": "az",
  }

  // Helper to safely parse JSON response
  static async _safeJsonParse(response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }
    return response;
  }

  // Helper to determine the final URL
  static _getUrl(path, customBaseUrl = null) {
    const base = customBaseUrl !== null ? customBaseUrl : this.baseUrl;
    // Ensure base doesn't end and path doesn't start with '/' excessively,
    // but handle cases where one or both might be missing.
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    console.log(`Base url ${cleanBase}`);
    return `${cleanBase}/${cleanPath}`;
  }

  static get(path, headers = null, customBaseUrl = null) {
    const customHeaders = headers ?? {}
    const url = this._getUrl(path, customBaseUrl);

    return fetch(url, {
      method: "GET",
      headers: {
        ...this.defaultHeaders,
        ...customHeaders,
      },
    })
  }

  static async post(path, body, headers = null, customBaseUrl = null) {
    const customHeaders = headers ?? {}
    const url = this._getUrl(path, customBaseUrl);

    console.log(`POST Request to: ${url}`);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...this.defaultHeaders,
        ...customHeaders,
      },
    })

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Request failed with status ' + response.status);
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    }
    return response
  }

  static async put(path, body, headers = null, customBaseUrl = null) {
    const customHeaders = headers ?? {}
    const url = this._getUrl(path, customBaseUrl);

    console.log(`PUT Request to: ${url}`);

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...this.defaultHeaders,
        ...customHeaders,
      },
    })

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message || "Request failed with status " + response.status)
      } else {
        throw new Error("Request failed with status " + response.status)
      }
    }

    return this._safeJsonParse(response);
  }

  static async delete(path, headers = null, customBaseUrl = null) {
    const customHeaders = headers ? Object.fromEntries(headers) : {}
    const url = this._getUrl(path, customBaseUrl);

    console.log(`DELETE Request to: ${url}`);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        ...this.defaultHeaders,
        ...customHeaders,
      },
    })

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Request failed with status " + response.status);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    }
    return response
  }
}

export default HttpClient

