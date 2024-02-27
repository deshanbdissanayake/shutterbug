const getNews = async () => {
    let data = [
        {
            id: 1,
            title: "30%",
            sub_title: "Today's special",
            news: "Get discount for every order, only valid for today.",
            image: "https://shutterbug.introps.com/documents/news/test-1.jpg"
        },
        {
            id: 2,
            title: "10%",
            sub_title: "Day after Tomorrow's special",
            news: "Get discount for every order, only valid for Day after Tomorrow.",
            image: "https://shutterbug.introps.com/documents/news/test-3.jpg"
        },
        {
            id: 3,
            title: "10%",
            sub_title: "Valentine Special",
            news: "Special offer for lovebirds.",
            image: "https://shutterbug.introps.com/documents/news/test-4.jpg"
        },
    ];
    return data;
}

const getNewsById = async (newsID) => {
    const newsItems = [
        {
            id: 1,
            title: "30% OFF Blah Blah Blah",
            sub_title: "Today's special",
            news: "Get discount for every order, only valid for today.",
            image: "https://shutterbug.introps.com/documents/news/test-1.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget feugiat metus. Aenean faucibus vulputate sapien, et pretium risus pharetra sed. Nullam varius ac enim eu pharetra. Donec eget mollis purus. Suspendisse potenti. Sed luctus nibh cursus fringilla laoreet. Aenean scelerisque, orci vestibulum aliquam egestas, dui nulla aliquet eros, posuere mattis quam velit et massa. Nulla tristique, massa bibendum egestas consequat, dui purus ornare ante, vel venenatis quam nunc sit amet libero. Fusce vel dui vitae eros luctus aliquet ac vel ex. Nullam luctus luctus dui quis mollis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget feugiat metus. Aenean faucibus vulputate sapien, et pretium risus pharetra sed. Nullam varius ac enim eu pharetra. Donec eget mollis purus. Suspendisse potenti. Sed luctus nibh cursus fringilla laoreet. Aenean scelerisque, orci vestibulum aliquam egestas, dui nulla aliquet eros, posuere mattis quam velit et massa. Nulla tristique, massa bibendum egestas consequat, dui purus ornare ante, vel venenatis quam nunc sit amet libero. Fusce vel dui vitae eros luctus aliquet ac vel ex. Nullam luctus luctus dui quis mollis.',
        },
        {
            id: 2,
            title: "30% OFF",
            sub_title: "Today's special",
            news: "Get discount for every order, only valid for today.",
            image: "https://shutterbug.introps.com/documents/news/test-1.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget feugiat metus. Aenean faucibus vulputate sapien, et pretium risus pharetra sed. Nullam varius ac enim eu pharetra. Donec eget mollis purus. Suspendisse potenti. Sed luctus nibh cursus fringilla laoreet. Aenean scelerisque, orci vestibulum aliquam egestas, dui nulla aliquet eros, posuere mattis quam velit et massa. Nulla tristique, massa bibendum egestas consequat, dui purus ornare ante, vel venenatis quam nunc sit amet libero. Fusce vel dui vitae eros luctus aliquet ac vel ex. Nullam luctus luctus dui quis mollis.',
        },
        {
            id: 3,
            title: "30% OFF",
            sub_title: "Today's special",
            news: "Get discount for every order, only valid for today.",
            image: "https://shutterbug.introps.com/documents/news/test-1.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget feugiat metus. Aenean faucibus vulputate sapien, et pretium risus pharetra sed. Nullam varius ac enim eu pharetra. Donec eget mollis purus. Suspendisse potenti. Sed luctus nibh cursus fringilla laoreet. Aenean scelerisque, orci vestibulum aliquam egestas, dui nulla aliquet eros, posuere mattis quam velit et massa. Nulla tristique, massa bibendum egestas consequat, dui purus ornare ante, vel venenatis quam nunc sit amet libero. Fusce vel dui vitae eros luctus aliquet ac vel ex. Nullam luctus luctus dui quis mollis.',
        },
    ]

    // Find the news item with the specified ID
    const newsItem = newsItems.find(item => item.id === newsID);

    return newsItem;    
}

export { getNews, getNewsById }