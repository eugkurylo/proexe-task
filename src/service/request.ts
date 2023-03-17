import { ApiError } from "./ApiError";
import { ApiMethod, API_BASE_URL } from "./constants";

const request = async (
  path: string,
  method: string = ApiMethod.GET,
  data: any = null,
  signal?: AbortSignal
): Promise<any> => {
  return fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
    method,
    body: data ? JSON.stringify(data) : null,
    signal: signal,
  })
    .then(async (res) => {
      if (!res.ok && res.status !== 210) {
        const error = await parseErrorResponse(res);
        return Promise.reject(error);
      }

      return res;
    })
    .then((res) => {
      const contentType = res.headers.get("content-type")!;
      if (contentType === null) return Promise.resolve(null);
      else if (contentType.startsWith("application/json")) return res.json();
      else if (contentType.startsWith("text/plain")) return res.text();

      return res;
    })
    .catch((error: Error) => {
      return Promise.reject(error);
    });
};

const getError = (
  response: Response,
  title: string,
  message: string
): ApiError => {
  return {
    title,
    message,
    status: response.status,
    statusText: response.statusText,
  } as ApiError;
};

const parseErrorResponse = async (response: Response): Promise<ApiError> => {
  try {
    const respBody = await response.text();
    const respData = JSON.parse(respBody);

    if (Array.isArray(respData.detail)) {
      respData.detail = respData.detail
        .map((a: any) => `(${Object.values(a)})`)
        .join(", ");
    }

    return {
      title: respData.title,
      message: respData.detail,
      status: response.status,
      statusText: response.statusText,
    } as ApiError;
  } catch (err) {
    switch (response.status) {
      case 400:
        return getError(response, "Bad Request", "The request was invalid");
      case 401:
        return getError(
          response,
          "Unauthorized",
          "You are not authorized to access this resource"
        );
      case 403:
        return getError(
          response,
          "Forbidden",
          "You do not have permission to access this resource"
        );
      case 404:
        return getError(
          response,
          "Not Found",
          "The requested resource was not found"
        );
      case 500:
        return getError(
          response,
          "Internal Server Error",
          "Something went wrong"
        );
      case 502:
        return getError(response, "Bad Gateway", "Something went wrong");
      case 503:
        return getError(
          response,
          "Service Unavailable",
          "Something went wrong"
        );
      case 504:
        return getError(response, "Gateway Timeout", "Something went wrong");
    }

    return {
      title: "Unknown Error",
      message: "Please check the logs",
      status: response?.status,
      statusText: response?.statusText,
    } as ApiError;
  }
};

export { request };
