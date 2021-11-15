import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';

import currencyFormatter from 'app/utils/formatter/currencyBrl';

import TableComponent from 'app/fuse-layouts/shared-components/table';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

import { getAll, selectAll } from '../store/recadosSlice';

const columns = [
	{
		id: 'title',
		align: 'left',
		disablePadding: false,
		label: 'Recado',
		sort: true
	},
	{
		id: 'description',
		align: 'left',
		disablePadding: false,
		label: 'Detalhes',
		sort: false
	},
	{
		id: 'price',
		align: 'left',
		disablePadding: false,
		label: 'Data',
		sort: false
	}
];

export default function Recados() {
	const history = useHistory();
	const dispatch = useDispatch();
	const recadosRedux = useSelector(selectAll);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	function handleClick(value) {
		history.push(`/recados/${value.id}`);
	}

	function handleClickNew() {
		history.push(`/recados/new`);
	}

	console.log(data);

	useEffect(() => {
		setLoading(true);
		dispatch(getAll());
	}, []);

	useEffect(() => {
		if (recadosRedux) {
			setLoading(false);
			if (recadosRedux.length) {
				const parseRecados = recadosRedux.map(item => {
					return {
						...item,
						price: currencyFormatter.format(item.price)
					};
				});
				setData(parseRecados);
			}
		}
	}, [recadosRedux]);

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden rounded-t-12',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 white'
			}}
			header={<PageCardedHeader title="Recados" buttonTitle="ADICIONAR NOVO" buttonAction={handleClickNew} />}
			content={<TableComponent columns={columns} data={data} action={handleClick} />}
			innerScroll
		/>
	);
}
