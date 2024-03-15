const getAllRequests = async () => {
    let data = [
        {
            req_id: 1,
            user_id: 1,
            user_fullname: 'Desh Dissanayake',
            user_username: 'Desh',
            cat_id: 1,
            category: 'Wedding',
            title: 'Need a wedding photographer',
            desc: "I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio. I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio.",
            budget: '4300.00',
            sdate: '2024-03-12',
            edate: '2024-03-12',
            apply_status: 'applied', //active, applied - whether provider applied or not
            offer_status: 'confirm', //active, confirm - whether client confirmed or not
        },
        {
            req_id: 2,
            user_id: 1,
            user_fullname: 'Desh Dissanayake',
            user_username: 'Desh',
            cat_id: 1,
            category: 'Wedding',
            title: 'Need a wedding photographer',
            desc: "I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio.",
            budget: '4300.00',
            sdate: '2024-03-12',
            edate: '2024-03-12',
            apply_status: 'active',
            offer_status: 'active',
        },
        {
            req_id: 3,
            user_id: 1,
            user_fullname: 'Desh Dissanayake',
            user_username: 'Desh',
            cat_id: 1,
            category: 'Wedding',
            title: 'Need a wedding photographer',
            desc: "I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio.",
            budget: '4300.00',
            sdate: '2024-03-12',
            edate: '2024-03-12',
            apply_status: 'active',
            offer_status: 'active',
        },
        {
            req_id: 4,
            user_id: 1,
            user_fullname: 'Desh Dissanayake',
            user_username: 'Desh',
            cat_id: 1,
            category: 'Wedding',
            title: 'Need a wedding photographer',
            desc: "I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio.",
            budget: '4300.00',
            sdate: '2024-03-12',
            edate: '2024-03-12',
            apply_status: 'active',
            offer_status: 'active',
        },
        {
            req_id: 5,
            user_id: 1,
            user_fullname: 'Desh Dissanayake',
            user_username: 'Desh',
            cat_id: 1,
            category: 'Wedding',
            title: 'Need a wedding photographer',
            desc: "I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio.",
            budget: '4300.00',
            sdate: '2024-03-12',
            edate: '2024-03-12',
            apply_status: 'active',
            offer_status: 'active',
        },
        {
            req_id: 6,
            user_id: 1,
            user_fullname: 'Desh Dissanayake',
            user_username: 'Desh',
            cat_id: 1,
            category: 'Wedding',
            title: 'Need a wedding photographer',
            desc: "I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio.",
            budget: '4300.00',
            sdate: '2024-03-12',
            edate: '2024-03-12',
            apply_status: 'active',
            offer_status: 'active',
        },
    ];

    return data;
}

const getRequestById = async (req_id) => {
    let data = {
        req_id: 1,
        user_id: 1,
        user_fullname: 'Desh Dissanayake',
        user_username: 'Desh',
        cat_id: 1,
        category: 'Wedding',
        title: 'Need a wedding photographer',
        desc: "I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio. I need a wedding photographer for my friend's wedding. I am looking for a professional who has at least 5 years of experience and a good portfolio.",
        budget: '4300.00',
        sdate: '2024-03-12',
        edate: '2024-03-12',
        apply_status: 'active', //active, applied - whether provider applied or not
        offer_status: 'active', //active, confirm - whether client confirmed or not
    };
    return data;
}

const getOffersByReqId = async (req_id) => {
    let data = [
        {
            offer_id: 1,
            provider_id: 1,
            provider_name: 'Desh Dissanayake',
            provider_username: 'Desh',
            provider_pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            s_rating: 4.8,
            number_of_reviews: 1234,
            cat_id: 1,
            cat_name: 'Drone',
            s_name: 'Portrait Photography',
            s_type: 'photography',
            s_img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
            offer_status: 'confirm', // active or confirm - whether client confirmed an offer or not
            offer_note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus ipsum in elementum iaculis. Nam eu libero rutrum, scelerisque massa ut, vestibulum tortor. Proin ultricies magna aliquam, eleifend lacus a, semper risus. Donec tempor pharetra quam, nec euismod ligula tincidunt et. In eget odio id erat bibendum consequat.',
            pkg_id: 1,
            pkg_name: 'Normal',
        },
        {
            offer_id: 2,
            provider_id: 1,
            provider_name: 'Desh Dissanayake',
            provider_username: 'Desh',
            provider_pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            s_rating: 4.8,
            number_of_reviews: 1234,
            cat_id: 1,
            cat_name: 'Drone',
            s_name: 'Portrait Photography',
            s_type: 'photography',
            s_img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
            offer_status: 'active',
            offer_note: 'offer note',
            pkg_id: 1,
            pkg_name: 'Normal',
        }
    ];

    return data;
}

const deleteRequest = async (req_id) => {
    let data = {
        stt: 'ok',
        msg: 'Job Request Deleted Successfully!',
        data: ''
    }
    return data;
}

const createRequest = async (formData) => {
    let data = {
        stt: 'ok',
        msg: 'Job Request Created Successfully!',
        data: ''
    }
    return data;
}

export { getAllRequests, deleteRequest, createRequest, getRequestById, getOffersByReqId }