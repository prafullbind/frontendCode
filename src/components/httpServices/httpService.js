import axios from "axios";

const baseApiUrl = "http://localhost:2410";

function get(url){
    return axios.get(baseApiUrl+url);
}

function post(url, body){
    return axios.post(baseApiUrl+url, body);
}

function put(url, body){
    return axios.put(baseApiUrl+url, body);
}

function deletReq(url){
    return axios.delete(baseApiUrl+url);
}

export default {
    get,
    post,
    put,
    deletReq
}