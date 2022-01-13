import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
	const theme = useTheme();

	return (
		<Navigator
			screenOptions={{
				tabBarActiveTintColor: theme.colors.secondary,
				tabBarInactiveTintColor: theme.colors.text,
				tabBarLabelPosition: 'beside-icon',
				tabBarStyle: {
					paddingVertical: Platform.OS === 'ios' ? 20 : 0,
					height: 72,
				},
				headerShown: false,
			}}
		>
			<Screen
				name="Listagem"
				component={Dashboard}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name="format-list-bulleted"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Screen
				name="Cadastrar"
				component={Register}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="attach-money" size={size} color={color} />
					),
				}}
			/>
		</Navigator>
	);
}
