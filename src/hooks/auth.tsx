import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import { CLIENT_ID, REDIRECT_URI } from '@env';

interface AuthProviderProps {
	children: ReactNode;
}

interface User {
	id: string;
	name: string;
	email: string;
	photo?: string;
}

interface AuthContextData {
	user: User;
	signInWithGoogle(): Promise<void>;
	signInWithApple(): Promise<void>;
	signOut(): Promise<void>;
	userStorageLoading: boolean;
}

interface AuthorizationResponse {
	params: {
		access_token: string;
	};
	type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({} as User);
	const [userStorageLoading, setUserStorageLoading] = useState(true);

	const userStorageKey = '@gofinances:user';

	async function signInWithGoogle() {
		try {
			const RESPONSE_TYPE = 'token';
			const SCOPE = encodeURI('profile email');

			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

			const { type, params } = (await AuthSession.startAsync({
				authUrl,
			})) as AuthorizationResponse;

			if (type === 'success') {
				const response = await fetch(
					`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`,
				);
				const { id, email, given_name, picture } = await response.json();

				const userData = {
					id: String(id),
					name: given_name,
					email,
					photo: picture,
				};

				setUser(userData);

				await AsyncStorage.setItem(userStorageKey, JSON.stringify(userData));
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	async function signInWithApple() {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (credential) {
				const userData = {
					id: String(credential.user),
					name: credential.fullName.givenName,
					email: credential.email,
					photo: undefined,
				};

				setUser(userData);

				await AsyncStorage.setItem(userStorageKey, JSON.stringify(userData));
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	async function signOut() {
		setUser({} as User);

		AsyncStorage.removeItem(userStorageKey);
	}

	useEffect(() => {
		async function loadUserStorageData() {
			const userStorage = await AsyncStorage.getItem(userStorageKey);

			if (userStorage) {
				const userLogged = JSON.parse(userStorage) as User;
				setUser(userLogged);
			}

			setUserStorageLoading(false);
		}

		loadUserStorageData();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				signInWithGoogle,
				signInWithApple,
				signOut,
				userStorageLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth };
