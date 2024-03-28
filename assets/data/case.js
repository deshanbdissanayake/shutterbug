const getCasesByUserId = async (isClient) => {
    // check isClient and user_id

    let data = [
        {
            case_id: 1,
            case_token: '7894512165',
            job_id: 1,
            job_offer_id: 1,
            job_token: '123123112',
            chat_id: 1,
            service_id: 1,
            service_name: 'Outdoor photography',
            pkg_id: 1,
            pkg_name: 'Premium',
            provider_id: 1,
            provider_name: 'Sam Wick',
            client_id: 2,
            client_name: 'Melani Fernando',
            case_type_id: 1, 
            case_type: 'Default',
            case_desc: 'This is a case',
            status: 'active',
        },
        {
            case_id: 2,
            case_token: '123123523',
            job_id: 1,
            job_offer_id: 1,
            job_token: '123123112',
            chat_id: 1,
            service_id: 1,
            service_name: 'Outdoor photography',
            pkg_id: 1,
            pkg_name: 'Plus',
            provider_id: 1,
            provider_name: 'Sam Wick',
            client_id: 2,
            client_name: 'Melani Fernando',
            case_type_id: 1, 
            case_type: 'Refund',
            case_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi augue metus, pellentesque et semper at, feugiat eu neque. Praesent et fringilla lorem. Etiam at commodo lorem. Nullam in volutpat felis. Aenean tincidunt eros id dolor rhoncus, sit amet facilisis odio semper. Nulla ac congue odio.',
            status: 'resolved',
        },
    ];
    return data;
}

export { getCasesByUserId }