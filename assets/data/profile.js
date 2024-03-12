const getMyData = async () => {
    let user_id = 1;
    let data = {
        p_id: 1,
        pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        fullname: 'Deshan Dissanayake',
        username: 'Desh',
        balance: '1435.00',
        email: 'desh.introps@gmail.com',
    }
    return data;
}

export { getMyData }