import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function handleAxiosError(error: unknown) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            // Check the server message first, fallback to custom messages
            const serverMessage = error?.response?.data?.message;
            switch (error.response.status) {
                case 400:
                    toast.error(serverMessage || 'Bad Request: Please check your input.');
                    break;
                case 401:
                    toast.error(serverMessage || 'Unauthorized: Please login again.');
                    break;
                case 403:
                    toast.error(serverMessage || 'Forbidden: You do not have permission to access this resource.');
                    break;
                case 404:
                    toast.error(serverMessage || 'Not Found: The requested resource was not found.');
                    break;
                case 405:
                    toast.error(serverMessage || 'Method Not Allowed: The HTTP method used is not allowed.');
                    break;
                case 406:
                    toast.error(serverMessage || 'Not Acceptable: The resource is not available in an acceptable format.');
                    break;
                case 407:
                    toast.error(serverMessage || 'Proxy Authentication Required: Authentication is required by the proxy.');
                    break;
                case 408:
                    toast.error(serverMessage || 'Request Timeout: Please try again later.');
                    break;
                case 409:
                    toast.error(serverMessage || 'Conflict: There is a conflict with the current state of the resource.');
                    break;
                case 410:
                    toast.error(serverMessage || 'Gone: The resource is no longer available.');
                    break;
                case 411:
                    toast.error(serverMessage || 'Length Required: The request must include a Content-Length header.');
                    break;
                case 412:
                    toast.error(serverMessage || 'Precondition Failed: One or more preconditions were not met.');
                    break;
                case 413:
                    toast.error(serverMessage || 'Payload Too Large: The request is too large to process.');
                    break;
                case 414:
                    toast.error(serverMessage || 'URI Too Long: The URI provided is too long.');
                    break;
                case 415:
                    toast.error(serverMessage || 'Unsupported Media Type: The media type is not supported by the server.');
                    break;
                case 417:
                    toast.error(serverMessage || 'Expectation Failed: The server cannot meet the requirements.');
                    break;
                case 429:
                    toast.error(serverMessage || 'Too Many Requests: Please slow down with your requests.');
                    break;
                case 431:
                    toast.error(serverMessage || 'Request Header Fields Too Large: Headers are too large to process.');
                    break;
                case 451:
                    toast.error(serverMessage || 'Unavailable For Legal Reasons: The resource is unavailable due to legal issues.');
                    break;
                case 500:
                    toast.error(serverMessage || 'Internal Server Error: Please try again later.');
                    break;
                case 502:
                    toast.error(serverMessage || 'Bad Gateway: The server is down or not responding.');
                    break;
                case 503:
                    toast.error(serverMessage || 'Service Unavailable: Please check back later.');
                    break;
                default:
                    toast.error(serverMessage || 'An unexpected API error occurred');
            }
        } else if (error.request) {
            if (typeof window !== 'undefined' && !navigator?.onLine) {
                toast.error('You are offline. Please check your internet connection.');
            } else {
                toast.error('Cannot reach the server. It may be down or not responding.');
            }
        } else {
            // Something happened in setting up the request
            toast.error('Error setting up request: Please report this bug.');
        }
    } else {
        // This handles the case where the error is not from Axios
        toast.error('An unexpected error occurred: ' + (error instanceof Error ? error?.message : JSON.stringify(error)));
    }
}
