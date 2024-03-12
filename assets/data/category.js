//dummy data - replace later with actual data later - use common.js to fetch data from APIs
const getEvents = async () => {
    let data = [
        { id: 1, name: 'Wedding' },
        { id: 2, name: 'Outdoor' },
        { id: 3, name: 'Birthday' }
    ];

    return data;
};

const getCategories = async () => {
    let data = [
        { 
            id: 1, 
            name: 'Wedding', 
            image: 'https://shutterbug.introps.com/documents/category/test-1.png', 
            type: 'photography',
            events: [1, 2] 
        },
        { 
            id: 2, 
            name: 'Outdoor',
            image: 'https://shutterbug.introps.com/documents/category/test-2.png', 
            type: 'videography',
            events: [1] 
        },
        { 
            id: 3, 
            name: 'Birthday',
            image: 'https://shutterbug.introps.com/documents/category/test-3.png', 
            type: 'videography',
            events: [2, 3] 
        },
        { 
            id: 4, 
            name: 'drone', 
            image: 'https://shutterbug.introps.com/documents/category/test-4.png', 
            type: 'videography',
            events: [1, 2] 
        },
        { 
            id: 5, 
            name: 'fineart',
            image: 'https://shutterbug.introps.com/documents/category/test-5.png', 
            type: 'videography',
            events: [1] 
        },
        { 
            id: 6, 
            name: 'portrait',
            image: 'https://shutterbug.introps.com/documents/category/test-6.png', 
            type: 'photography',
            events: [2, 3] 
        },
        { 
            id: 7, 
            name: 'Outdoor',
            image: 'https://shutterbug.introps.com/documents/category/test-7.png', 
            type: 'photography',
            events: [1] 
        },
        { 
            id: 8, 
            name: 'Cat 1', 
            image: 'https://shutterbug.introps.com/documents/category/test-1.png', 
            type: 'photography',
            events: [1, 2] 
        },
        { 
            id: 9, 
            name: 'Cat 2',
            image: 'https://shutterbug.introps.com/documents/category/test-7.png', 
            type: 'photography',
            events: [1] 
        },
        { 
            id: 10, 
            name: 'Cat 3',
            image: 'https://shutterbug.introps.com/documents/category/test-7.png', 
            type: 'photography',
            events: [1] 
        },
    ];
    return data;
}

export { getEvents, getCategories };

