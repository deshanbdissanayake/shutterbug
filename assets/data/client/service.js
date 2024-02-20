const getServices = [
    {
        s_id: 1,
        provider_id: 1,
        provider_name: 'Deshan Dissanayake',
        provider_pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        s_rating: 4.8,
        number_of_reviews: 1234,
        cat_id: 1,
        cat_name: 'Drone',
        s_name: 'Portrait Photography',
        s_desc: 'Best provider with highest ratings.',
        s_type: 'photography',
        packages: [
            {
                pkg_id: 1,
                pkg_name: 'Normal',
                pkg_price: '1000',
                pkg_desc: 'this is normal package description',
                is_main: 1,
                highlight_1: '3 hrs',
                highlight_2: 'portrait only',
                highlight_3: 'album with 20 photos',
            },
            {
                pkg_id: 2,
                pkg_name: 'Premium',
                pkg_price: '2000',
                pkg_desc: 'this is premium package description',
                is_main: 0,
                highlight_1: '6 hrs',
                highlight_2: 'portrait and drone',
                highlight_3: 'album with 50 photos',
            },
        ],
        s_images: [
            {
                si_id: 1,
                img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
                is_main: 1,
            },
            {
                si_id: 2,
                img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
                is_main: 0,
            },
            {
                si_id: 3,
                img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
                is_main: 0,
            },
        ]
    },
    {
        s_id: 2,
        provider_id: 1,
        provider_name: 'Deshan Dissanayake',
        provider_pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        s_rating: 3.9,
        number_of_reviews: 231,
        cat_id: 2,
        cat_name: 'Outdoor',
        s_name: 'Wildlife Videography Wildlife Videography Wildlife Videography',
        s_desc: 'Best provider with highest ratings.',
        s_type: 'videography',
        packages: [
            {
                pkg_id: 1,
                pkg_name: 'Normal',
                pkg_price: '1000',
                pkg_desc: 'this is normal package description',
                is_main: 1,
                highlight_1: '3 hrs',
                highlight_2: 'portrait only',
                highlight_3: 'album with 20 photos',
            },
            {
                pkg_id: 2,
                pkg_name: 'Premium',
                pkg_price: '2000',
                pkg_desc: 'this is premium package description',
                is_main: 0,
                highlight_1: '6 hrs',
                highlight_2: 'portrait and drone',
                highlight_3: 'album with 50 photos',
            },
        ],
        s_images: [
            {
                si_id: 1,
                img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
                is_main: 1,
            },
            {
                si_id: 2,
                img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
                is_main: 0,
            },
            {
                si_id: 3,
                img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
                is_main: 0,
            },
        ]
    }
];

const getServiceById = {
    s_id: 1,
    provider_id: 1,
    provider_username: 'Desh',
    provider_name: 'Deshan Dissanayake',
    provider_pro_pic: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
    s_rating: 4.8,
    number_of_reviews: 1234,
    cat_id: 1,
    cat_name: 'Drone',
    s_name: 'Portrait Photography',
    s_desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
    s_type: 'photography',
    packages: [
        {
            pkg_id: 1,
            pkg_name: 'Normal',
            pkg_price: '1000',
            pkg_desc: 'this is normal package description',
            is_main: 1,
            highlight_1: '3 hrs',
            highlight_2: 'portrait only',
            highlight_3: 'album with 20 photos',
        },
        {
            pkg_id: 2,
            pkg_name: 'Premium',
            pkg_price: '2000',
            pkg_desc: 'this is premium package description',
            is_main: 0,
            highlight_1: '6 hrs',
            highlight_2: 'portrait and drone',
            highlight_3: 'album with 50 photos',
        },
        {
            pkg_id: 3,
            pkg_name: 'Plus',
            pkg_price: '5000',
            pkg_desc: 'this is plus package description',
            is_main: 0,
            highlight_1: '10 hrs',
            highlight_2: 'portrait and drone and everything',
            highlight_3: 'album with 100 photos',
        },
    ],
    s_images: [
        {
            si_id: 1,
            img: 'https://shutterbug.introps.com/documents/service/test-1.jpg',
            is_main: 1,
        },
        {
            si_id: 2,
            img: 'https://shutterbug.introps.com/documents/service/test-2.jpg',
            is_main: 0,
        },
        {
            si_id: 3,
            img: 'https://shutterbug.introps.com/documents/service/test-3.jpg',
            is_main: 0,
        },
    ],
    events: [
        {
            e_id: 1,
            e_name: 'Birthday',
        },
        {
            e_id: 2,
            e_name: 'Wedding',
        },
        {
            e_id: 3,
            e_name: 'Drone',
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
            name: 'John Yooghyuk',
            city: 'Korea',
            rating: 3.9,
            review: 'Integer vehicula pellentesque ultricies. Nam condimentum auctor interdum. Nunc ac maximus mauris. Sed volutpat mi nec tortor porta, in consequat justo consequat. ',
            time: '5 days ago',
        },
    ]
}


export { getServices, getServiceById };
