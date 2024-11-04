import { getToken, getBaseUrl, getGlobalHeaders } from "./config";

interface ApiOptions {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  withAuth?: boolean;
  body?: BodyInit | null;
  customHeaders?: HeadersInit;
  isBodyFormData?: boolean;
}

interface JsonType {
  [key: string]: any;
}

interface ReturnMessage<R = JsonType> {
  error?: string;
  success?: string;
  data?: R;
  response?: Response;
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

async function fetchWrapper<T = JsonType, R = JsonType>(
  options: ApiOptions
): Promise<ReturnMessage<R>> {
  const {
    endpoint,
    method,
    withAuth = false,
    body,
    customHeaders,
    isBodyFormData,
  } = options;
  const baseurl = getBaseUrl();
  if (!baseurl || baseurl.length === 0) {
    throw new Error(
      "baseurl error: Base URL is missing or empty, ensure it is correctly configured."
    );
  }

  const headers = (await createHeaders(withAuth, customHeaders)) as Record<
    string,
    string
  >;

  if (isBodyFormData) {
    delete headers["Content-Type"];
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && !isBodyFormData) {
    config.body = JSON.stringify(body);
  } else if (body && isBodyFormData) {
    config.body = body;
  }

  try {
    const response = await fetch(`${baseurl}${endpoint}`, config);
    const data = (await response.json()) as R;

    if (!response.ok) {
      return { error: `Failed with status ${response.status}`, data, response };
    }

    return { success: "Request Successful!", data, response };
  } catch (error) {
    let errorMessage = "An unknown error occurred!";
    if (error instanceof Error) errorMessage = error.message;

    console.error("API call failed:", error);
    return { error: errorMessage };
  }
}

export default fetchWrapper;
