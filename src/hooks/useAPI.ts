import axios, { type AxiosError, type AxiosRequestHeaders } from "axios";

const http = axios.create();

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as { message: string })?.message ??
      ", if it repeats please contact the dev team";
    return Promise.reject(errorMessage);
  },
);

export const useAPI = () => {
  const get = async <TResponse>(
    url: string,
    headers?: AxiosRequestHeaders,
  ): Promise<TResponse> => {
    const response = await http.request<TResponse>({
      url,
      method: "GET",
      headers,
    });
    return response.data;
  };

  const post = async <TResponse, TPayload extends object>(
    url: string,
    payload: TPayload,
    headers?: AxiosRequestHeaders,
  ): Promise<TResponse> => {
    const response = await http.request<TResponse>({
      url,
      method: "POST",
      data: payload,
      headers,
    });
    return response.data;
  };

  const put = async <TResponse, TPayload extends object>(
    url: string,
    payload: TPayload,
    headers?: AxiosRequestHeaders,
  ): Promise<TResponse> => {
    const response = await http.request<TResponse>({
      url,
      method: "PUT",
      data: payload,
      headers,
    });
    return response.data;
  };

  const patch = async <TResponse, TPayload extends object>(
    url: string,
    payload: TPayload,
    headers?: AxiosRequestHeaders,
  ): Promise<TResponse> => {
    const response = await http.request<TResponse>({
      url,
      method: "PATCH",
      data: payload,
      headers,
    });
    return response.data;
  };

  const del = async <TResponse, TPayload extends object>(
    url: string,
    payload: TPayload,
    headers?: AxiosRequestHeaders,
  ): Promise<TResponse> => {
    const response = await http.request<TResponse>({
      url,
      method: "DELETE",
      data: payload,
      headers,
    });
    return response.data;
  };

  return { get, post, put, patch, del };
};
