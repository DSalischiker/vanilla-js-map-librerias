const baseUrl = "http://localhost:3000/";

const apiHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

const fetchParams = (method, data = '') => {
    const body = data ? {
        body: JSON.stringify(data)
    } : {};
    return {
        method: method,
        headers: apiHeaders,
        credentials: 'same-origin',
        ...body
    }
}

const api = {
    //GET
    getLibrerias: async () => {
        const dataResponse = await fetch(baseUrl + 'librerias_caba', fetchParams('GET'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //DELETE
    deleteLibrerias: async id => {
        const dataResponse = await fetch(baseUrl + 'libreria/' + id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    }
    //PUT

    //POST
};