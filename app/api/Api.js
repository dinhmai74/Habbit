// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const BASE_URL = "https://api.ipify.org?format=json";

const create = (baseURL = BASE_URL) => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache'
        },
        timeout: 10000
    })

    const getRoot = () => api.get('')
    const getRate = () => api.get('rate_limit')
    const getUser = (username) => api.get('search/users', {q: username})
    const getIPAddressFromApi = (sort) => {
        console.debug("Param is passed ---->" + sort);
        return api.get()
    }

    return {
        getRoot,
        getRate,
        getUser,
        getIPAddressFromApi
    }
}

// let's return back our create method as the default.
export default {
    create
}
