import React from 'react';
import { StatusBar, Text } from 'react-native';
import AppLoading from 'expo-app-loading';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { Routes } from './src/routes';

import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { AuthProvider, useAuth } from './src/hooks/auth';
import { ThemeSwitchProvider } from './src/hooks/theme';

export default function App() {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	const { userStorageLoading } = useAuth();

	if (!fontsLoaded || userStorageLoading) {
		return <AppLoading />;
	}

	return (
		<ThemeSwitchProvider>
			<StatusBar barStyle="light-content" />
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeSwitchProvider>
	);
}
