'use client';
import { useDispatch, useSelector } from 'react-redux';
import { BiLaptop } from 'react-icons/bi';

import { MoonFill, SunFill } from 'react-bootstrap-icons';
import React from 'react';
import { handleAxiosError } from '@/utils/handleAxiosError';
import { AppDispatch, RootState } from '@/store';
import { toggleTheme } from '@/store/slices/themeConfigSlice';
import { updateUserPrefrencesService } from '../slices/service';

type ThemeMode = 'light' | 'dark' | 'system';

const THEME_CYCLE: Record<ThemeMode, ThemeMode> = {
    light: 'dark',
    dark: 'system',
    system: 'light',
};

const THEME_ICONS: Record<ThemeMode, React.ReactNode> = {
    light: <SunFill />,
    dark: <MoonFill />,
    system: <BiLaptop />,
};

const BTN_CLASS = 'flex items-center hover:cursor-pointer rounded-full bg-white-light/80 p-2 hover:bg-white-light/90 hover:text-primary dark:text-white dark:bg-dark/40 dark:hover:bg-dark/60 dark:text-light';

// ✅ Standalone: resolves 'system' to actual 'dark'/'light' and patches the DOM
const applyTheme = (mode: ThemeMode) => {
    const resolved = mode === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : mode;
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(resolved);
};

function ThemeToggle() {
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useSelector((state: RootState) => state.themeConfig);
    const user = useSelector((state: RootState) => state.auth);

    console.log("user is", user)

    // ✅ On mount: restore saved theme to both Redux + DOM
    React.useEffect(() => {
        const saved = localStorage.getItem('theme') as ThemeMode | null;
        if (saved) {
            dispatch(toggleTheme(saved));
            applyTheme(saved);
        }
    }, []);

    // ✅ Cross-tab sync: another tab changed localStorage → update this tab's Redux + DOM
    React.useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'theme' && e.newValue) {
                const incoming = e.newValue as ThemeMode;
                dispatch(toggleTheme(incoming));
                applyTheme(incoming);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const updatePreference = async (mode: ThemeMode) => {
        try {
            await updateUserPrefrencesService(user?.role, mode);
            localStorage.setItem('theme', mode);
            dispatch(toggleTheme(mode));
            applyTheme(mode);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    return (
        <button className={BTN_CLASS} onClick={() => updatePreference(THEME_CYCLE[theme as ThemeMode])}>
            {THEME_ICONS[theme as ThemeMode]}
        </button>
    );
}

export default ThemeToggle;