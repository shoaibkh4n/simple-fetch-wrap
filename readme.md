# Fetch Wrapper Library

A simple, lightweight fetch wrapper designed to simplify making HTTP requests in both JavaScript and TypeScript projects. It comes with built-in support for configuring global headers, base URL, and authorization tokens, making it easier to interact with REST APIs.

## Features

- Easy configuration of global headers, base URL, and authorization tokens.
- Supports `GET`, `POST`, `PUT`, and `DELETE` HTTP methods.
- TypeScript support out of the box with included type definitions.

## Installation

Install the package with npm:

```
npm install simple-fetch-wrap
```

## Usage

### First, set up the global configuration for your requests in your app.tsx/jsx file or root(entry) file :

```
import { setConfig } from 'simple-fetch-wrap';

setConfig({
  token: 'auth_token_here',
  baseurl: 'https://api.example.com',
  globalHeaders: { 'Custom-Header': 'value' },
});
```

### Making requests:

```
import { fetchWrapper } from 'simple-fetch-wrap';

// Example GET request
async function fetchData() {
  const { data, error } = await fetchWrapper({
    endpoint: '/data',
    method: 'GET',
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}

// Example POST request
async function createData() {
  const { data, error } = await fetchWrapper({
    endpoint: '/data',
    method: 'POST',
    body: { key: 'value' },
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}

fetchData();
createData();
```

## API Reference

### `setConfig(config)`

Sets the global configuration.

- config.token: Authorization token.
- config.baseurl: Base URL for all requests.
- config.globalHeaders: Global headers to be included in every request.

| Parameter                  | Type          | Default | Description                               |
| -------------------------- | ------------- | ------- | ----------------------------------------- |
| `token` (required)         | `string`      |         | API token for Authorization header.       |
| `baseurl` (required)       | `string`      |         | The base URL for the API endpoints.       |
| `globalHeaders` (optional) | `HeadersInit` | `{}`    | Optional global headers for all requests. |

### `fetchWrapper(options)`

Makes an HTTP request.

- options.endpoint: The endpoint path.
- options.method: HTTP method (GET, POST, PUT, DELETE).
- options.withAuth: Include authorization token in the request (default: false).
- options.body: Request payload for POST and PUT methods.
- options.customHeaders: Custom headers for the specific request.

| Property                   | Type                          | Default | Description                                  |
| -------------------------- | ----------------------------- | ------- | -------------------------------------------- |
| `endpoint` (required)      | `string`                      |         | The API endpoint to call.                    |
| `method` (required)        | `"GET"/"POST"/"PUT"/"DELETE"` |         | HTTP method of the request.                  |
| `withAuth` (optional)      | `boolean`                     | `false` | Whether to include the Authorization header. |
| `body` (optional)          | `Generic`                     |         | Request payload for POST, PUT requests.      |
| `customHeaders` (optional) | `HeadersInit`                 | `{}`    | Custom headers for the specific request.     |

### `fetchWrapper(options)` returns:

`Promise<R | ReturnMessage<R>>`

The function returns a Promise that resolves to either the data of type `R` or an object of `ReturnMessage<R>` containing `error`, `success`, and `data` properties, allowing for both data retrieval and error handling.

#### `ReturnMessage<R>`

| Property  | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| `error`   | `string`  | Optional. Error message if the request fails.      |
| `success` | `string`  | Optional. Success message if the request succeeds. |
| `data`    | `Generic` | Optional. The response data from the request.      |

### Contributing

Contributions are welcome! If you'd like to help improve the Astro Website Template, feel free to submit issues, feature requests, or pull requests.

### License

Distributed under the MIT License. See [LICENCE](https://github.com/shoaibkh4n/simple-fetch-wrap/blob/main/LICENSE) for more information.

### Acknowledgments

- Icon and designs from [Quazire.com](https://quazire.com/)
- Backed by [Quazire.com](https://quazire.com/)

- Follow me on [Twitter](https://twitter.com/theshoaibkh4n) and [Linkedin](https://linkedin.com/in/shoaibkh4n)
- Support my work with a [Donation](https://github.com/sponsors/shoaibkh4n) 🔥🚀
