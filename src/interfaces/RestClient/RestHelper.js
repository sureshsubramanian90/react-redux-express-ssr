import axios from 'axios';
import { getRequestConfig } from './RestConfig';

/**
 * This method is responsible of preparing API end point URL.
 * Note: All query parameters and request body data is taken care by getRequestConfig() method.
 * 
 * @param {object} context 
 * @param {objject} config 
 */
const getApiUrl = (context, config) => {
    const { url, version = '' } = config;
    const { apiHosts = {}, protocol = 'https:' } = context;
    return `${protocol}//${apiHosts}${url}`;
}

/**
 * This class is to invoke the actual Service API calls for all the request methods.
 */
export default class RestHelper {

    static invoke = (context, config, method) => {
        const apiUrl = getApiUrl(context, config);
        let response = {};
        const requestConfig = getRequestConfig(config, method, apiUrl);
        return (axios(requestConfig)
            .then((response) => {
                response = { ...response, isSuccess: true };
                return response;
            })
            .catch((error) => {
                response = { ...error, isSuccess: false };
                return response;
            })
        );
    };
};