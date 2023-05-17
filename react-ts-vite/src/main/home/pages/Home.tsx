import { useEffect, useState } from 'react'
import reactLogo from "../../../assets/react.svg"
import { setNavigation } from '../../../common/store/slices/navigation.slice';
import { getHomeNavigation } from '../../../configs/navigation/navigation.config';
import { axiosHttpRequest } from '../../../libs/axios';
import { useDispatch } from '../../../store';

function Home() {
    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const axios = new axiosHttpRequest();
    axios.axiosHttpRequest
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => {
        console.log(res.data)
    })

    useEffect(() => {
        dispatch(setNavigation(getHomeNavigation()))
    }, [])

    return (
        <div className="App">
            <div>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/main/home/pages/Home.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the React logo to learn more
            </p>
        </div>
    )
}

export default Home
