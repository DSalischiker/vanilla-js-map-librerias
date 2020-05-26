const baseUrl = "http://localhost:3000/";
/* const baseUrl = "https://librerias-api-rest.now.sh/"; */

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
    //CRUD FUNCTIONS
    //CREATE
    createLibrerias: async formData => {
        const dataResponse = await fetch(baseUrl + 'librerias_caba', fetchParams('POST', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //READ
    getLibrerias: async () => {
        const dataResponse = await fetch(baseUrl + 'librerias_caba', fetchParams('GET'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //UPDATE
    updateLibrerias: async (formData, id) => {
        const dataResponse = await fetch(baseUrl + 'libreria/' + id, fetchParams('PUT', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //DELETE
    deleteLibrerias: async id => {
        const dataResponse = await fetch(baseUrl + 'libreria/' + id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    }
};