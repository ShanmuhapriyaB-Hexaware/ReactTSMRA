import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigationItem } from '../../../../models/navigation.types';

type ColorModes = 'dark' | 'light';

type InitialStateType = {
    navItems: NavigationItem[];
    activeItem: string;
    mode: ColorModes;
    data: any
};

const initialState : InitialStateType = {
    navItems: [] as NavigationItem[],
    activeItem: '',
    mode: 'dark',
    data: [],
};

const layoutSlice = createSlice({
    name: 'layoutSlice',
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
            state.navItems = state.navItems.filter((item) => item.key !== action.payload);
        },
        setActiveNavItem: (state, action: PayloadAction<string>) => {
            state.activeItem = action.payload;
        },
        toggleColorMode: (state) => {
            if (state.mode === 'light') state.mode = 'dark';
            else state.mode = 'light';
        },
        setColorTheme: (state, action: PayloadAction<ColorModes>) => {
            state.mode = action.payload;
        },
    },
    extraReducers: (builder) => { },
});

export const {
    setNavigation,
    resetNavigation,
    appendNavigationItem,
    prependNavigationItem,
    removeNavigationItem,
} = layoutSlice.actions;

export default layoutSlice.reducer;