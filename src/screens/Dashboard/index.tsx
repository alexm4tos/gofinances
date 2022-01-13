import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { HighlightCard } from '../../components/HighlightCard';
import {
	TransactionCard,
	TransactionCardProps,
} from '../../components/TransactionCard';

import {
	Container,
	Header,
	UserWrapper,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	Icon,
	HighlightCards,
	Transactions,
	Title,
	TransactionList,
	LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardProps {
	id: string;
}

interface HighLightProps {
	amount: string;
	lastTransaction: string;
}

interface HighLightData {
	entries: HighLightProps;
	expenses: HighLightProps;
	total: HighLightProps;
}

export function Dashboard() {
	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<DataListProps[]>([]);
	const [highLightData, setHighLightData] = useState<HighLightData>(
		{} as HighLightData,
	);
	const theme = useTheme();

	function getLastTransactionDate(
		collection: DataListProps[],
		type: 'in' | 'out',
	) {
		const lastTransaction = new Date(
			Math.max.apply(
				Math,
				collection
					.filter((transaction) => transaction.type === type)
					.map((transaction) => new Date(transaction.date).getTime()),
			),
		);

		return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
			'pt-BR',
			{
				month: 'long',
			},
		)}`;
	}

	async function loadTransactions() {
		const dataKey = '@gofinances:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const transactions = response ? JSON.parse(response) : [];

		let entriesTotal = 0;
		let expensiveTotal = 0;

		const transactionsFormatted: DataListProps[] = transactions.map(
			(item: DataListProps) => {
				if (item.type === 'in') {
					entriesTotal += Number(item.amount);
				} else {
					expensiveTotal += Number(item.amount);
				}

				const amount = Number(item.amount).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				});

				const date = Intl.DateTimeFormat('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
				}).format(new Date(item.date));

				return {
					id: item.id,
					name: item.name,
					amount,
					type: item.type,
					category: item.category,
					date,
				};
			},
		);

		setTransactions(transactionsFormatted);

		const lastEntryDate = getLastTransactionDate(transactions, 'in');
		const lastExpenseDate = getLastTransactionDate(transactions, 'out');
		const totalInterval = `01 a ${lastExpenseDate}`;

		const total = entriesTotal - expensiveTotal;

		setHighLightData({
			entries: {
				amount: entriesTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}),
				lastTransaction: `Última entrada dia ${lastEntryDate}`,
			},
			expenses: {
				amount: expensiveTotal.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}),
				lastTransaction: `Última saída dia ${lastExpenseDate}`,
			},
			total: {
				amount: total.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}),
				lastTransaction: totalInterval,
			},
		});

		setIsLoading(false);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadTransactions();
		}, []),
	);

	return (
		<Container>
			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator color={theme.colors.secondary} size="large" />
				</LoadContainer>
			) : (
				<>
					<Header>
						<UserWrapper>
							<UserInfo>
								<Photo
									source={{
										uri: 'https://avatars.githubusercontent.com/u/25274156?v=4',
									}}
								/>
								<User>
									<UserGreeting>Olá,</UserGreeting>
									<UserName>Alex</UserName>
								</User>
							</UserInfo>

							<Icon name="power" />
						</UserWrapper>
					</Header>

					<HighlightCards>
						<HighlightCard
							title="Entradas"
							amount={highLightData.entries.amount}
							lastTransaction={highLightData.entries.lastTransaction}
							type="in"
						/>

						<HighlightCard
							title="Saídas"
							amount={highLightData.expenses.amount}
							lastTransaction={highLightData.expenses.lastTransaction}
							type="out"
						/>

						<HighlightCard
							title="Total"
							amount={highLightData.total.amount}
							lastTransaction={highLightData.total.lastTransaction}
							type="total"
						/>
					</HighlightCards>

					<Transactions>
						<Title>Listagem</Title>

						<TransactionList
							data={transactions}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => <TransactionCard data={item} />}
						/>
					</Transactions>
				</>
			)}
		</Container>
	);
}
