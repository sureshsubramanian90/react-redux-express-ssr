import _get from 'lodash/get';
import _merge from 'lodash/merge';
import RestClient from './interfaces/RestClient/RestClient';
import settings from './settings.json'

export const DEVICE_TYPES = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
};

export const getDevice = () => {
    // TODO
};

const mergeCommonToDevice = () => {
    const context = {};

    Object.keys(settings).forEach((type) => {
        context[type] = _merge({}, settings[type].common);
    });
    return context;
}

const setEnvContext = (context) => {
    const deviceType = getDevice();
    const env = _get(context, `environments.env`, {});
    const apiHosts = _get(context, `environments.${env}.apiHosts`, {});
    const envContext = {
        // host: location.host,
        // isSecure: location.protocol === 'https:',
        // protocol: location.protocol,
        apiHosts
    };

    RestClient.setContext(envContext);
    context.environment = envContext;
    context.deviceType = {
        isDesktop: deviceType === DEVICE_TYPES.DESKTOP,
        isMobile: deviceType === DEVICE_TYPES.MOBILE,
    }
    delete context.environments;
};

export const getApplicationContext = () => {
    const context = mergeCommonToDevice();
    setEnvContext(context);
    return context;
};
