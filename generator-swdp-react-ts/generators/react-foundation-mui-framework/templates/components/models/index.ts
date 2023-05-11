import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router-dom';

export type NavigationItem = {
  path: string;
  icon: JSX.Element;
  id: string;
  label: string;
  permissions?: string[];
  badge?: {
    loading?: boolean;
    content: string | number;
  };
};
