import themeConfig from '@/component/layout/config/theme.config';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDarkMode: false,
    sidebar: false,
    theme: themeConfig.theme,
    initialized: themeConfig.initialized,
    menu: themeConfig.menu,
    layout: themeConfig.layout,
    rtlClass: themeConfig.rtlClass,
    animation: themeConfig.animation,
    navbar: themeConfig.navbar,
    locale: themeConfig.locale,
    semidark: themeConfig.semidark,
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ae', name: 'Arabic' },
    ],
};

const themeConfigSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toggleTheme(state, { payload }) {
            state.theme = payload;
            // state.isDarkMode =
            //     payload === 'dark' ||
            //     (payload === 'system' &&
            //         window.matchMedia('(prefers-color-scheme: dark)').matches);

            state.initialized = true;
        },
        toggleMenu(state, { payload }) {
            payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
            state.menu = payload;
        },
        toggleLayout(state, { payload }) {
            payload = payload || state.layout; // full, boxed-layout
            state.layout = payload;
        },
        toggleRTL(state, { payload }) {
            payload = payload || state.rtlClass; // rtl, ltr
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation(state, { payload }) {
            payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            state.animation = payload;
        },
        toggleNavbar(state, { payload }) {
            payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static           
            state.navbar = payload;
        },
        toggleSemidark(state, { payload }) {
            payload = payload === true || payload === 'true' ? true : false;
            state.semidark = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },
        resetToggleSidebar(state) {
            state.sidebar = false;
        },
    },
});

export const { toggleTheme, toggleMenu, toggleLayout, toggleRTL, toggleAnimation, toggleNavbar, toggleSemidark, toggleSidebar, resetToggleSidebar } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
