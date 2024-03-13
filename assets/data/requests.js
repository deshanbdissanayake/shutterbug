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
            status: 'active',
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
            status: 'active',
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
            status: 'active',
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
            status: 'active',
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
            status: 'active',
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
            status: 'active',
        },
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

export { getAllRequests, deleteRequest, createRequest }