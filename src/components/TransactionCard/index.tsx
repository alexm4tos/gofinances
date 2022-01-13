import React from 'react';

import { categories } from '../../utils/categories';

import {
	Container,
	Title,
	Amount,
	Footer,
	Category,
	Icon,
	CategoryName,
	Date,
} from './styles';

export interface TransactionCardProps {
	type: 'in' | 'out';
	name: string;
	amount: string;
	category: string;
	date: string;
}

interface Props {
	data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
	const [category] = categories.filter((item) => item.key === data.category);

	return (
		<Container>
			<Title>{data.name}</Title>
			<Amount type={data.type}>
				{data.type === 'out' && '- '}
				{data.amount}
			</Amount>
			<Footer>
				<Category>
					<Icon name={category.icon} />
					<CategoryName>{category.label}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
}
