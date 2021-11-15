import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import FuseAnimate from '@fuse/core/FuseAnimate';

import { Link, useHistory } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Typography, Grid } from '@material-ui/core';
import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const recadoRedux = useSelector(({ recado }) => recado);
	const [recado, setRecado] = useState({});

	useEffect(() => {
		if (recadoRedux) {
			setRecado(recadoRedux);
		}
	}, [recadoRedux]);

	return <PageCardedHeader link="/recados" title={recado?.recado || 'Novo recado'} textBack="Recados" />;
}

export default Header;
