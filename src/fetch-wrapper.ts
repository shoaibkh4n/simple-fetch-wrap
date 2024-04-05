import { getToken, getBaseUrl, getGlobalHeaders } from "./config";

interface ApiOptions<T> {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  withAuth?: boolean;
  body?: T;
  customHeaders?: HeadersInit;
}

interface JsonType {
  [key: string]: any;
}

interface ReturnMessage<R> {
  error?: string;
  success?: string;
  data?: R;
}

// Helper function to generate headers

async function createHeaders(
  withAuth: boolean = false,
  customHeaders: HeadersInit = {}
): Promise<HeadersInit> {
  const globalHeaders = getGlobalHeaders();

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (withAuth) {
    const token = getToken();

    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  return { ...defaultHeaders, ...globalHeaders, ...customHeaders };
}

async function fetchWrapper<T, R = JsonType>(
  options: ApiOptions<T>
): Promise<R | ReturnMessage<R>> {
  const { endpoint, method, withAuth = false, body, customHeaders } = options;
  const baseurl = getBaseUrl();
  if (!baseurl || baseurl.length === 0)
    throw new Error(
      "baseurl error: Base URL is missing or empty, ensure it is correctly configured."
    );
  const headers = await createHeaders(withAuth, customHeaders);

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseurl}${endpoint}`, config);
    // Assuming all responses are JSON. Adjust if necessary.

    const data = (await response.json()) as R;
    if (!response.ok) {
      return { error: `Failed with status ${response.status}`, data };
    }

    return { success: "Request Successful!!", data };
  } catch (error) {
    let errorMessage = "An unknown error occurred!!";

    console.error("API call failed:", error);

    if (error instanceof Error) errorMessage = error.message;
    return { error: `Failed ${errorMessage}` };
  }
}

export default fetchWrapper;
