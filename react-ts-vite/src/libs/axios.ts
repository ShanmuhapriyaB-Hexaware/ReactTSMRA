import axios, { AxiosInstance } from "axios";

export class axiosHttpRequest {
    axiosInstance: AxiosInstance;

    constructor() {
        const options = {
            baseURL: '',
            headers: {
                'Content-type': 'application/json'
            },
        };
        this.axiosInstance = axios.create(options)
    }

    get axiosHttpRequest() {
        return this.axiosInstance;
    }
}