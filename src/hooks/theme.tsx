import React, {
	ReactNode,
	createContext,
	useContext,
	useState,
	useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from 'styled-components';

import themes from '../global/styles/themes';

interface ThemeSwitchProviderProps {
	children: ReactNode;
}

interface ThemeContextData {
	theme: string;
	toggleTheme: (newTheme: string) => void;
}

const defaultTheme = {
	theme: 'light',
	toggleTheme: () => {},
};

const ThemeSwitchContext = createContext<ThemeContextData>(defaultTheme);

function ThemeSwitchProvider({ children }: ThemeSwitchProviderProps) {
	const [theme, setTheme] = useState('light');

	const ThemeStorageKey = '@gofinances:theme';

	async function toggleTheme(newTheme: string) {
		if (themes[newTheme] !== undefined) {
			setTheme(newTheme);

			await AsyncStorage.setItem(ThemeStorageKey, newTheme);
		}
	}

	useEffect(() => {
		async function loadTheme() {
			const themeStorage = await AsyncStorage.getItem(ThemeStorageKey);

			if (themeStorage && themes[themeStorage] !== undefined) {
				setTheme(themeStorage);
			} else {
				setTheme('light');

				await AsyncStorage.setItem(ThemeStorageKey, 'light');
			}
		}

		loadTheme();
	}, [theme, toggleTheme]);

	return (
		<ThemeSwitchContext.Provider value={{ theme, toggleTheme }}>
			<ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
		</ThemeSwitchContext.Provider>
	);
}

function useThemeSwitch() {
	const context = useContext(ThemeSwitchContext);

	return context;
}

export { ThemeSwitchProvider, useThemeSwitch };
