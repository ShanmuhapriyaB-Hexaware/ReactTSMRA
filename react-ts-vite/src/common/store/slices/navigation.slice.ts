import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationItem } from '../../../models/navigation.types';

type ColorModes = 'dark' | 'light';

type InitialStateType = {
    navItems: NavigationItem[];
    activeItem: string;
};

const initialState : InitialStateType = {
    navItems: [] as NavigationItem[],
    activeItem: '',
};

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setNavigation: (state, action: PayloadAction<NavigationItem[]>) => {
            state.navItems = action.payload;
        },
        resetNavigation: (state) => {
            state.navItems = [];
        },
        appendNavigationItem: (state, action: PayloadAction<NavigationItem>) => {
            state.navItems.push(action.payload);
        },
        prependNavigationItem: (state, action: PayloadAction<NavigationItem>) => {
            state.navItems.unshift(action.payload);
        },
        removeNavigationItem: (state, action: PayloadAction<string>) => {
            state.navItems = state.navItems.filter((item) => item.id !== action.payload);
        },
        setActiveNavItem: (state, action: PayloadAction<string>) => {
            state.activeItem = action.payload;
        }
    },
    extraReducers: (builder) => { },
});

export const {
    setNavigation,
    resetNavigation,
    appendNavigationItem,
    prependNavigationItem,
    removeNavigationItem,
} = themeSlice.actions;

export default themeSlice.reducer;