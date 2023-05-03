import axios from "axios";


class MultiSelectDropDownService {

    fetchData(url: string) {
        return axios.get(url);
    }

}

export default new MultiSelectDropDownService();
