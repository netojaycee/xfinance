// lib/api/client.ts

// Define the standardized success and error response structures
interface ApiResponse<T> {
  statusCode: number;
  success: true;
  data: T;
}

// Updated error response structure to match the backend
interface ApiErrorResponse {
  statusCode: number;
  success: false;
  timestamp: string;
  path: string;
  error: {
    name: string;
    message: string | string[]; // Error message can be a single string or an array
  };
}

// Get the backend URL from environment variables
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// if (!API_BASE_URL) {
//   throw new Error('NEXT_PUBLIC_API_URL is not defined in your environment variables');
// }

/**
 * A generic API client for making requests to the backend.
 * It handles standardized success and error responses.
 *
 * @param endpoint The API endpoint to call (e.g., 'auth/login').
 * @param options The standard `fetch` options (method, body, etc.).
 * @returns The data from the successful API response.
 * @throws An error with the message from the API if the request fails.
 */
export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  // Clean the endpoint to prevent double slashes
  const cleanedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  // const url = `${API_BASE_URL}/api/v1/${cleanedEndpoint}`;
  const url = `/api/${cleanedEndpoint}`; // Use the rewrites defined in next.config.ts

  // Check if body is FormData (for file uploads)
  const isFormData = options.body instanceof FormData;

  const defaultOptions: RequestInit = {
    headers: {
      // Only set Content-Type for JSON, not for FormData (browser handles it)
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    credentials: 'include', // Always send cookies
    ...options,
  };

  const response = await fetch(url, defaultOptions);

  const responseData = await response.json();

  if (!response.ok) {
    // Handle the standardized error response from the backend
    const errorResponse = responseData as ApiErrorResponse;
    // Extract the message from the nested error object
    const errorMessage = Array.isArray(errorResponse.error.message)
      ? errorResponse.error.message.join(', ')
      : errorResponse.error.message;
    throw new Error(errorMessage || 'An unknown API error occurred.');
  }

  // Handle the standardized success response
  const successResponse = responseData as ApiResponse<T>;
  return successResponse.data;
};
