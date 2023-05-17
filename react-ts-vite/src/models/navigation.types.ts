export type NavigationItem = {
    path: string;
    icon: JSX.Element;
    id: string;
    label: string;
    badge?: {
        loading?: boolean;
        content: string | number;
    };
    type? : string;
};