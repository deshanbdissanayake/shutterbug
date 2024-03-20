const getMyData = async () => {
    let user_id = 1;
    let data = {
        p_id: 1,
        pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        fullname: 'Deshan Dissanayake',
        first_name: 'Deshan',
        last_name: 'Dissanayake',
        username: 'Desh',
        balance: '1435.00',
        email: 'desh.introps@gmail.com',
        address: 'kandy',
        contact: '94772341234',
        city: 'kandy',
        location: {
            lat: '12.340324',
            long: '123.234123'
        },
        c_date: '2024-03-20 09:33:00',
    }
    return data;
}

export { getMyData }