import RestHelper from './RestHelper';
import { REQUEST_METHODS } from './RestConfig';

/**
 * This Rest Client is used to invoke Service API calls for the requested methods.
 */
export default class RestClient {
    static setContext(context) {
        this.context = context;
    }

    static getContext() {
        return this.context;
    }

    static delete = (config) => RestHelper.invoke(this.context, config, REQUEST_METHODS.DELETE);
    
    static get = (config) => RestHelper.invoke(this.context, config, REQUEST_METHODS.GET);

    static patch = (config) => RestHelper.invoke(this.context, config, REQUEST_METHODS.PATCH);

    static post = (config) => RestHelper.invoke(this.context, config, REQUEST_METHODS.POST);

    static put = (config) => RestHelper.invoke(this.context, config, REQUEST_METHODS.PUT);
};
