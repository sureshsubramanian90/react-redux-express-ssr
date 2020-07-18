
export const REQUEST_METHODS = {
    DELETE: 'delete',
    GET: 'get',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put'
}

/**
 * To get the required request configuration for all the requests.
 * 
 * @param {object} config 
 * @param {string} method 
 * @param {string} url 
 */
export const getRequestConfig = (config, method, url) => {
    const { baseURL, headers, params, data } = config;
    const requestConfig = {
        // `url` is the server URL that will be used for the request
        url,
      
        // `method` is the request method to be used when making the request
        method: method || REQUEST_METHODS.GET, // default
      
        // `baseURL` will be prepended to `url` unless `url` is absolute.
        baseURL,
      
        // `headers` are custom headers to be sent
        headers,
      
        // `params` are the URL parameters to be sent with the request
        // Must be a plain object or a URLSearchParams object
        params,
      
        // `data` is the data to be sent as the request body
        // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
        // When no `transformRequest` is set, must be of one of the following types:
        // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
        // - Browser only: FormData, File, Blob
        // - Node only: Stream, Buffer
        data,
      };

      return requestConfig;
};