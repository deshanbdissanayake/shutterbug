const getJobsByUserId = async () => {
    let data = [
        {
            job_id: 1,
            job_token: '1asdlfkj33lkf',
            chat_id: 1,
            jof_price: '2000.00',
            jof_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis nunc, tincidunt eget viverra in, iaculis non risus. Nam vel mi eros. Suspendisse maximus imperdiet arcu, imperdiet facilisis ipsum viverra sagittis. Curabitur venenatis nisl vestibulum risus bibendum tempus. ',
            jof_sdate: '2024-02-14',
            jof_edate: '2024-03-29',
            time_remaining: '15 Days Left',
            status: 'active', //active, done, closed
            case: '1', // 1 or 0
            job_date: '2024-02-14',
            provider_id: 1,
            provider_fullname: 'Deshan Dissanayake',
            provider_username: 'desh',
            provider_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            pkg_id: 1,
            pkg_name: 'Premium',
            service_id: 1,
            service_name: 'Amo amo supiri service ekak meka',
            service_cat: 'Drone',
            service_cat_type: 'photography',
            service_img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
        },
        {
            job_id: 2,
            job_token: 'Dafsdewdf13sd',
            chat_id: 2,
            jof_price: '3000.00',
            jof_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis nunc, tincidunt eget viverra in, iaculis non risus. Nam vel mi eros. Suspendisse maximus imperdiet arcu, imperdiet facilisis ipsum viverra sagittis. Curabitur venenatis nisl vestibulum risus bibendum tempus. ',
            jof_sdate: '2024-02-14',
            jof_edate: '2024-02-15',
            time_remaining: 'Pending Payment',
            status: 'done', //active, done, closed
            case: '1', // 1 or 0
            job_date: '2024-02-14',
            provider_id: 1,
            provider_fullname: 'Nadun Tharaka',
            provider_username: 'SNT',
            provider_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            pkg_id: 2,
            pkg_name: 'Plus',
            service_id: 2,
            service_name: 'Mekath cora aa',
            service_cat: 'Outdoor',
            service_cat_type: 'videography',
            service_img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
        },
        {
            job_id: 3,
            job_token: 'saf2344df13sd',
            chat_id: 3,
            jof_price: '2000.00',
            jof_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis nunc, tincidunt eget viverra in, iaculis non risus. Nam vel mi eros. Suspendisse maximus imperdiet arcu, imperdiet facilisis ipsum viverra sagittis. Curabitur venenatis nisl vestibulum risus bibendum tempus. ',
            jof_sdate: '2024-02-14',
            jof_edate: '2024-02-15',
            time_remaining: 'Closed',
            status: 'closed', //active, done, closed
            case: '1', // 1 or 0
            job_date: '2024-02-15',
            provider_id: 1,
            provider_fullname: 'Sampath Wick',
            provider_username: 'Sam',
            provider_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            pkg_id: 2,
            pkg_name: 'Plus',
            service_id: 2,
            service_name: 'Mekath cora aa',
            service_cat: 'Outdoor',
            service_cat_type: 'videography',
            service_img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
        },
    ];
    return data
}

const getJobByJobId = async () => {
    let data = {
        job_id: 1,
        job_token: 'Dafsdewdf13sd',
        chat_id: 2,
        jof_price: '3000.00',
        jof_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis nunc, tincidunt eget viverra in, iaculis non risus. Nam vel mi eros. Suspendisse maximus imperdiet arcu, imperdiet facilisis ipsum viverra sagittis. Curabitur venenatis nisl vestibulum risus bibendum tempus. ',
        jof_sdate: '2024-02-14',
        jof_edate: '2024-03-29',
        status: 'done', //active, done, closed
        case: '', // 1 or 0
        job_date: '2024-02-14',
        provider_id: 1,
        provider_fullname: 'Nadun Tharaka',
        provider_username: 'SNT',
        provider_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        pkg_id: 2,
        pkg_name: 'Plus',
        service_id: 2,
        service_name: 'Mekath cora aa Mekath cora aa Mekath cora aa',
        service_cat: 'Outdoor',
        service_cat_type: 'videography',
        service_img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
    }
    return data
}

const jobMarkAsComplete = async () => {
    let data = {stt: 'ok', msg: 'Marked as Complete', data: '1'}
    return data;
}

const jobOpenCase = async () => {
    let data = {stt: 'ok', msg: 'Opened a case', data: '1'}
    return data;
}

const saveRatings = async () => {
    let data = {stt: 'ok', msg: 'Thank you for your feedback!', data: '1'}
    return data;
}

export { getJobsByUserId, getJobByJobId, jobMarkAsComplete, jobOpenCase, saveRatings }