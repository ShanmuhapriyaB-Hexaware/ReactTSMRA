import "./Home.css"
import { useEffect, useState } from 'react'
import reactLogo from "../../../assets/react.svg"
import { axiosHttpRequest } from '../../../libs/axios';
import { Button } from 'antd';
import { useDispatch } from '../../../store';
import { setNavigation } from '../../../theme/layout/store/slices/theme.slice';
import { getHomeNavigation } from '../../../configs/navigation/navigation.config';
import { Typography } from 'antd';

const { Title } = Typography;

function Home() {
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

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
        <div className="Home">
            <div>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <Title level={1}>Welcome To RapidX</Title>
        </div>
    )
}

export default Home
