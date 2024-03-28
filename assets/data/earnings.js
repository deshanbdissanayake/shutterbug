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

const getTransactionsByUserId = async () => {
    /*
        transaction types => 

        earning => payment table -> user_id = payee_id -> pay_amt => deduct rate
        payment => payment table -> user_id = payer_id -> pay_amt (rate already added)
        refund => refund table -> user_id = provider_id total paid amount in payment
        withdrawal => withdrawal table -> user_id = user_id -> with_amt (rate already deducted)
        
    */
    let data = [
        { 
            tr_id: 1,
            tr_token: 'asdf23493',
            tr_name: 'Desh Dissanayake',
            tr_type: 'earning',
            tr_amount: '1000.00',
            tr_datetime: '2024-03-28 15:57:00',
            tr_note: 'this is transaction note',
            bank: 'Bank - Com Bank - 123923198',
        },
        { 
            tr_id: 2,
            tr_token: 'asdf23493',
            tr_name: 'Nadun Tharaka',
            tr_type: 'earning',
            tr_amount: '500.00',
            tr_datetime: '2024-03-28 15:57:00',
            tr_note: 'this is transaction note',
            bank: 'Bank - Com Bank - 123923198',
        },
        { 
            tr_id: 3,
            tr_token: 'asdf23493',
            tr_name: 'Melani Fernando',
            tr_type: 'payment',
            tr_amount: '1000.00',
            tr_datetime: '2024-03-28 15:57:00',
            tr_note: 'this is transaction note',
            bank: 'Stripe - Stripe - 123923198',
        },
        { 
            tr_id: 4,
            tr_token: 'asdf23493',
            tr_name: 'Pubudu Galpatha',
            tr_type: 'refund',
            tr_amount: '1000.00',
            tr_datetime: '2024-03-28 15:57:00',
            tr_note: 'this is transaction note',
            bank: 'Bank - Union Bank - 123923198',
        },
        { 
            tr_id: 5,
            tr_token: 'asdf23493',
            tr_name: 'Sam Wick',
            tr_type: 'withdrawal',
            tr_amount: '1000.00',
            tr_datetime: '2024-03-28 15:57:00',
            tr_note: 'this is transaction note',
            bank: 'Paypal - Stripe - 123923198',
        },
    ];
    return data;
}

export { getEarnings, getWithdrawlMethodsByUserId, withdrawEarnings, getTransactionsByUserId }