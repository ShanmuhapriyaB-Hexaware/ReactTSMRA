import axios from "axios";


class DatagridService {

    fetchDataWithPagination(url: string, queryParams: URLSearchParams) {
        return axios.get(`${url}?${queryParams.toString()}`);
    }

    fetchData(url: string) {
        return axios.get(url);
    }

}

export default new DatagridService();
