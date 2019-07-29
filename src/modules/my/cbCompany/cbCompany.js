import { register, ValueChangedEvent } from '@lwc/wire-service';
// import getApiKey from '@salesforce/apex/Controller.method';

// const apiKey = async () => getApiKey();
const apiKey = '';
const companyRequest = params => {
    const url = 'https://company.clearbit.com/v2/companies/find?';
    const options = {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'content-type': 'application/json',
            'Salesforce-App-Id': 'prospector',
            'API-Version': `2019-07-27`
        },
        method: 'GET',
        credentials: 'same-origin',
        withCredentials: true
    };
    params = Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
    return fetch(url + params, options)
        .then(result => result.json())
        .then(json => {
            return json;
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.log('error', error);
        });
};

const company = () => {};

register(company, eventTarget => {
    let connected = false;
    let requestParams = null;
    let payload = null;

    // eslint-disable-next-line no-console
    console.log('HELLO WORLD WIRE REGISTER');

    const handleConnect = async () => {
        connected = true;
        // eslint-disable-next-line no-console
        console.log('HELLO WORLD WIRE CONNECT');
    };

    const handleConfig = async config => {
        if (!connected) return;
        requestParams = config;
        payload = await companyRequest(requestParams);
        // eslint-disable-next-line no-console
        console.log('HELLO WORLD WIRE DISPATCH EVENT', payload);
        const event = new ValueChangedEvent(payload);
        eventTarget.dispatchEvent(event);
    };

    const handleDisconnect = async () => {
        // eslint-disable-next-line no-console
        console.log('HELLO WORLD WIRE DISCONNECT');
        connected = false;
        eventTarget.removeEventListener('disconnect', handleDisconnect);
        eventTarget.removeEventListener('connect', handleConnect);
        eventTarget.removeEventListener('config', handleConfig);
    };

    eventTarget.addEventListener('config', handleConfig);

    eventTarget.addEventListener('connect', handleConnect);

    eventTarget.addEventListener('disconnect', handleDisconnect);
});

export default company;
