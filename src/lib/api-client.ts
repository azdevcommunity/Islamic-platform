/**
 * API Client
 * Centralized API client with error handling and type safety
 */

import { apiConfig } from "@/config/api";

interface FetchOptions extends RequestInit {
  customBaseUrl?: string;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "Accepted-Language": "az",
    };
  }

  private getUrl(path: string, customBaseUrl?: string): string {
    const base = customBaseUrl || this.baseUrl;
    const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${cleanBase}/${cleanPath}`;
  }

  async get<T>(path: string, options: FetchOptions = {}): Promise<Response> {
    const { customBaseUrl, headers, ...restOptions } = options;
    const url = this.getUrl(path, customBaseUrl);

    return fetch(url, {
      method: "GET",
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      ...restOptions,
    });
  }

  async post<T>(
    path: string,
    body: unknown,
    options: FetchOptions = {}
  ): Promise<Response> {
    const { customBaseUrl, headers, ...restOptions } = options;
    const url = this.getUrl(path, customBaseUrl);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      ...restOptions,
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || `Request failed with status ${response.status}`
        );
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }

  async put<T>(
    path: string,
    body: unknown,
    options: FetchOptions = {}
  ): Promise<Response> {
    const { customBaseUrl, headers, ...restOptions } = options;
    const url = this.getUrl(path, customBaseUrl);

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      ...restOptions,
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || `Request failed with status ${response.status}`
        );
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }

  async delete(path: string, options: FetchOptions = {}): Promise<Response> {
    const { customBaseUrl, headers, ...restOptions } = options;
    const url = this.getUrl(path, customBaseUrl);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      ...restOptions,
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || `Request failed with status ${response.status}`
        );
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }
}

export const apiClient = new ApiClient();
