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
            service_name: 'Lorem ipsum dolor sit amet',
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
            service_name: 'Lorem ipsum dolor',
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
            service_name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            service_cat: 'Outdoor',
            service_cat_type: 'videography',
            service_img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
        },
    ];
    return data
}

const getJobById = async (type, id) => {
    //type can be 'job' or 'offer'
    //id can be 'job_id' or 'offer_id'
    let data = {
        job_id: 1,
        job_token: 'Dafsdewdf13sd',
        chat_id: 2,
        jof_price: '3000.00',
        jof_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis nunc, tincidunt eget viverra in, iaculis non risus. Nam vel mi eros. Suspendisse maximus imperdiet arcu, imperdiet facilisis ipsum viverra sagittis. Curabitur venenatis nisl vestibulum risus bibendum tempus. ',
        jof_sdate: '2024-02-14',
        jof_edate: '2024-03-29',
        status: 'active', //active, done, closed
        case: 1, // 1 or 0
        job_date: '2024-02-14',
        provider_id: 2,
        provider_fullname: 'Nadun Tharaka',
        provider_username: 'SNT',
        provider_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        pkg_id: 2,
        pkg_name: 'Plus',
        service_id: 2,
        service_name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
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

const getJobInvoiceByJobId = async () => {
    let data = {
        inv_id: 1,
        inv_token: 'asdfsdfadf',
        job_id: 1,
        job_token: 'asdfasdfas',
        chat_id: 2,
        provider_id: 1,
        provider_name: 'Sam Wick',
        client_id: 2,
        client_name: 'Desh Dissanayake',
        inv_date: '2024-03-15 12:24:56', 
        inv_amt: '3000.00',
        service_charge: '300.00',
    } 
    return data;
}

export { getJobsByUserId, getJobById, jobMarkAsComplete, jobOpenCase, saveRatings, getJobInvoiceByJobId }