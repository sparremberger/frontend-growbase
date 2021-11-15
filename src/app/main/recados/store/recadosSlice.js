import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('recados/getRecados', async () => {
	const response = await ApiService.doGet('/recados');
	const data = await response.data;

	return data;
});

const adapter = createEntityAdapter({
	selectId: recado => recado.id
});

export const { selectAll, selectById } = adapter.getSelectors(state => state.products);

const recadosSlice = createSlice({
	name: 'recados',
	initialState: adapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: adapter.setAll
	}
});

export default recadosSlice.reducer;
