import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

import { HistoryCard } from '../../components/HistoryCard';

import {
	Container,
	Header,
	Title,
	Content,
	CharContainer,
	MonthSelect,
	MonthSelectButton,
	MonthSelectIcon,
	Month,
	LoadContainer,
} from './styles';

import { categories } from '../../utils/categories';

interface TransactionData {
	type: 'in' | 'out';
	name: string;
	amount: number;
	category: string;
	date: string;
}

interface CategoryData {
	key: string;
	name: string;
	total: number;
	totalFormatted: string;
	color: string;
	percentFormatted: string;
	percent: number;
}

export function Resume() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
		[],
	);

	const theme = useTheme();

	function handleChangeDate(action: 'next' | 'prev') {
		if (action === 'next') {
			setSelectedDate(addMonths(selectedDate, 1));
			console.log(selectedDate);
		} else {
			setSelectedDate(subMonths(selectedDate, 1));
		}
	}

	async function loadData() {
		setIsLoading(true);

		const dataKey = '@gofinances:transactions';
		const response = await AsyncStorage.getItem(dataKey);
		const responseFormatted = response ? JSON.parse(response) : [];

		const expenses = responseFormatted.filter(
			(transaction: TransactionData) =>
				transaction.type === 'out' &&
				new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
				new Date(transaction.date).getFullYear() === selectedDate.getFullYear(),
		);

		const expensesTotal = expenses.reduce(
			(accumulator: number, item: TransactionData) => {
				return accumulator + Number(item.amount);
			},
			0,
		);

		const totalByCategory: CategoryData[] = [];

		categories.forEach((category) => {
			let categorySum = 0;

			expenses.forEach((expensive: TransactionData) => {
				if (expensive.category === category.key) {
					categorySum += Number(expensive.amount);
				}
			});

			if (categorySum > 0) {
				const totalFormatted = categorySum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				});

				const percent = (categorySum / expensesTotal) * 100;
				const percentFormatted = `${percent.toFixed(0)}%`;

				totalByCategory.push({
					key: category.key,
					name: category.label,
					color: category.color,
					total: categorySum,
					totalFormatted,
					percent,
					percentFormatted,
				});
			}
		});

		setTotalByCategories(totalByCategory);
		setIsLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			loadData();
		}, [selectedDate]),
	);

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>

			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator color={theme.colors.secondary} size="large" />
				</LoadContainer>
			) : (
				<Content
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingHorizontal: 24,
						paddingBottom: useBottomTabBarHeight(),
					}}
				>
					<MonthSelect>
						<MonthSelectButton onPress={() => handleChangeDate('prev')}>
							<MonthSelectIcon name="chevron-left" />
						</MonthSelectButton>

						<Month>
							{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
						</Month>

						<MonthSelectButton onPress={() => handleChangeDate('next')}>
							<MonthSelectIcon name="chevron-right" />
						</MonthSelectButton>
					</MonthSelect>

					<CharContainer>
						<VictoryPie
							data={totalByCategories}
							colorScale={totalByCategories.map((category) => category.color)}
							style={{
								labels: {
									fontSize: RFValue(18),
									fontWeight: 'bold',
									fill: theme.colors.shape,
								},
							}}
							labelRadius={50}
							x="percentFormatted"
							y="total"
						/>
					</CharContainer>

					{totalByCategories.map((category) => (
						<HistoryCard
							key={category.key}
							title={category.name}
							amount={category.totalFormatted}
							color={category.color}
						/>
					))}
				</Content>
			)}
		</Container>
	);
}
