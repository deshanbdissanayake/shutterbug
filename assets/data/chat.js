const chatListByUserId = async () => {
    let data = [
        {
            chat_id: 1,
            chat_user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            chat_user_name: 'Melani Fernando',
            chat_last_msg_time: '1.30 pm',
            chat_last_msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget feugiat metus. Aenean faucibus vulputate sapien, et pretium risus pharetra sed.',
            chat_unread: 0,
            offer_id: 1,
            service: 'wildlife',
            pkg: 'premium',
        },
        {
            chat_id: 2,
            chat_user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            chat_user_name: 'Nadun Bandara',
            chat_last_msg_time: 'Yesterday',
            chat_last_msg: 'Nullam varius ac enim eu pharetra. Donec eget mollis purus. Suspendisse potenti. Sed luctus nibh cursus fringilla laoreet. Aenean scelerisque, orci vestibulum aliquam egestas, dui nulla aliquet eros, posuere mattis quam velit et massa. Nulla tristique, massa bibendum egestas consequat, dui purus ornare ante, vel venenatis quam nunc sit amet libero.',
            chat_unread: 0,
            offer_id: 2,
            service: 'wedding',
            pkg: 'plus',
        },
        {
            chat_id: 3,
            chat_user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            chat_user_name: 'Sam Wick',
            chat_last_msg_time: '2024-02-10',
            chat_last_msg: 'Nullam blandit erat ac lacinia cursus. Integer dapibus molestie enim, in malesuada erat interdum et.',
            chat_unread: 2,
            offer_id: 3,
            service: 'drone',
            pkg: 'platinum',
        },
        {
            chat_id: 4,
            chat_user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
            chat_user_name: 'Pubudu Galpatha',
            chat_last_msg_time: '2023-10-24',
            chat_last_msg: 'Aliquam erat volutpat.',
            chat_unread: 10,
            offer_id: 4,
            service: 'outdoor',
            pkg: 'wow',
        },
    ];
    return data;
}

const chatDataByChatId = async (chat_id) => {
    let data = {
        chat_id: 4,
        chat_user_img: 'https://shutterbug.introps.com/documents/user/test-1.jpg',
        chat_user_name: 'Pubudu Galpatha',
        chat_last_msg_time: '2023-10-24',
        chat_last_msg: 'Aliquam erat volutpat.',
        chat_unread: 10,
        offer_id: 4,
        service: 'outdoor',
        pkg: 'wow',
    }
    return data;
}

const chatMessagesByChatId = async (chat_id) => {
    let data = [
        {
            msgId: 1, 
            msgBy: 1, 
            msgType: 'text', 
            msgText: 'Hi', // text or image link or doc link
            createdAt: '2024-03-04 11:35:00', 
            readStt: 1
        },
        {msgId: 2, msgBy: 2, msgType: 'text', msgText: 'Hi', createdAt: '2024-03-05 11:37:00', readStt: 1},
        {msgId: 3, msgBy: 2, msgType: 'text', msgText: 'How are you?', createdAt: '2024-03-05 11:38:00', readStt: 1},
        {msgId: 4, msgBy: 1, msgType: 'text', msgText: 'I\'m fine. Wbu?', createdAt: '2024-03-05 11:39:00', readStt: 1},
        {msgId: 5, msgBy: 2, msgType: 'text', msgText: 'I\'m ok too', createdAt: '2024-03-05 11:40:00', readStt: 1},
        {msgId: 6, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {msgId: 7, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {msgId: 8, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {msgId: 9, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {msgId: 10, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {msgId: 11, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {msgId: 12, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {msgId: 13, msgBy: 2, msgType: 'text', msgText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis lacus id arcu condimentum facilisis. Curabitur id molestie arcu. Mauris eu orci at neque condimentum ornare sit amet ut nisi.', createdAt: '2024-03-06 11:42:00', readStt: 0},
        {
            msgId: 14, 
            msgBy: 2, 
            msgType: 'doc', 
            msgText: 'https://shutterbug.introps.com/documents/user/test-1.jpg', 
            createdAt: '2024-03-06 11:42:00', 
            readStt: 0
        },
        {
            msgId: 15, 
            msgBy: 2, 
            msgType: 'image', 
            msgText: 'https://shutterbug.introps.com/documents/service/test-1.jpg', 
            createdAt: '2024-03-06 11:42:00', 
            readStt: 0
        },
        {msgId: 16, msgBy: 1, msgType: 'text', msgText: 'ok', createdAt: '2024-03-06 11:42:00', readStt: 1},
        {
            msgId: 17, 
            msgBy: 2,
            msgType: 'offer', 
            msgText: {
                offer_id: 1,
                offer_stt: 'pending',
            }, 
            createdAt: '2024-03-06 11:42:00', 
            readStt: 1
        },
    ];

    return data;
}

const lastMessageSeen = async (chat_id) => {}



export { chatListByUserId, chatMessagesByChatId, chatDataByChatId };