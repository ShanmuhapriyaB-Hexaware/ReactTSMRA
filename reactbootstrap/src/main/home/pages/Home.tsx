import { axiosHttpRequest } from '../../../libs/axios';

function Home() {
    const axios = new axiosHttpRequest();
    axios.axiosHttpRequest
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => {
        console.log(res.data)
    })

    return (
            <h2 style={{margin: '20% auto'}}>
                Welcome to Rapidx
            </h2>
    )
}

export default Home
