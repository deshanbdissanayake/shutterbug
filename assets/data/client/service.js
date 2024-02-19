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
}


export { getServices, getServiceById };
