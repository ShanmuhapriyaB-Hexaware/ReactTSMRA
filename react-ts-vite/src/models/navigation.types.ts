import React from "react";
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export type NavigationItem = {
    key: string,
    icon: React.ReactNode,
    label: string,
    children?: MenuItem[],
    type?: string,
}