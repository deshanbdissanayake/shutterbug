const getEarnings = async () => {
    let data = {
        withdrawable_amount: '20000.00',
        pending_clearance: '2334.45',
        total_amount: '45339.66',
        this_month_earnings: '1200.00',
        avg_job_price: '2500.00',
        active_jobs: 5,
    };
    
    return data;
}

const getWithdrawlMethodsByUserId = async () => {
    let data = [
        {
            wdm_id: 1,
            wdt_id: 1,
            wd_type: 'Stripe',
            is_main: 1,
            acc_number: '123091283',
            acc_holder: 'Sam Wick',
            acc_bank: 'Stripe',
        },
        {
            wdm_id: 2,
            wdt_id: 2,
            wd_type: 'Bank',
            is_main: 0,
            acc_number: '48005699874',
            acc_holder: 'Sam Wick',
            acc_bank: 'Com Bank',
        },
    ];
    return data;
}

const withdrawEarnings = async () => {
    // send user_id, amount
    let data = {
        stt: 'ok',
        msg: 'Withdraw successful!',
        data: 1,
    }
    return data;
}

export { getEarnings, getWithdrawlMethodsByUserId, withdrawEarnings }