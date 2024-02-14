const fetchData = async (endpoint, params = {}) => {
    try {
        const response = await fetch(endpoint + '?' + new URLSearchParams(params).toString());
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export { fetchData }