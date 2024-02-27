const getProviderById = async (id) => {
    let data = {
        id: 1,
        pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        fullname: 'Deshan Dissanayake',
        username: 'Desh',
        p_ratings: 4.8,
        number_of_reviews: 1234,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis tortor ex, varius rutrum elit euismod sit amet. Phasellus iaculis maximus leo, non lobortis diam pellentesque ut. Aenean non dolor rhoncus ex aliquet sollicitudin. Nunc luctus at lacus in mattis. Fusce hendrerit eu est accumsan cursus. ',
        services: [
            {
                s_id: 1,
                s_rating: 4.8,
                number_of_reviews: 1234,
                s_name: 'Portrait Photography',
                s_type: 'photography',
                main_pkg_price: '1000',
                main_s_img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
            },
            {
                s_id: 2,
                s_rating: 4.8,
                number_of_reviews: 1234,
                s_name: 'Portrait Photography The best drone shots',
                s_type: 'photography',
                main_pkg_price: '1000',
                main_s_img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
            }
        ],
        portfolio: [
            {
                p_id: 1,
                img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
            },
            {
                p_id: 2,
                img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
            },
            {
                p_id: 3,
                img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
            },
            {
                p_id: 4,
                img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
            },
            {
                p_id: 5,
                img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
            },
        ],
        feedbacks: [
            {
                f_id: 1,
                user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
                name: 'Melani Fernando',
                city: 'Kandy',
                rating: 5.0,
                review: 'In eget pellentesque sapien, quis gravida risus. Vivamus vel magna diam. Nullam porta felis sit amet eleifend vehicula. Proin congue est maximus quam imperdiet suscipit. ',
                time: '3 minutes ago',
            },
            {
                f_id: 2,
                user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
                name: 'Sam Wick',
                city: 'Melbourne',
                rating: 4.8,
                review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis tortor ex, varius rutrum elit euismod sit amet. Phasellus iaculis maximus leo, non lobortis diam pellentesque ut. Aenean non dolor rhoncus ex aliquet sollicitudin. Nunc luctus at lacus in mattis. Fusce hendrerit eu est accumsan cursus. ',
                time: '7 hours ago',
            },
            {
                f_id: 3,
                user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
                name: 'Yoo Jonghyuk',
                city: 'Korea',
                rating: 3.9,
                review: 'Integer vehicula pellentesque ultricies. Nam condimentum auctor interdum. Nunc ac maximus mauris. Sed volutpat mi nec tortor porta, in consequat justo consequat. ',
                time: '5 days ago',
            },
        ]
    }
    return data;
}

export { getProviderById }