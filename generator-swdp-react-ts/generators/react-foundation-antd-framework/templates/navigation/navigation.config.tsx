import { NavigationItem } from "../../models/navigation.types";
import {
    HomeOutlined,
} from '@ant-design/icons';

export const getHomeNavigation = (): NavigationItem[] => [
    {
        key: 'home',
        icon: <HomeOutlined />,
        label: 'Home',
        type: 'item',
    }
]