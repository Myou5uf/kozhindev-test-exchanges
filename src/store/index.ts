import {configureStore} from '@reduxjs/toolkit';
import {exchangeRateApi} from './exchangeRate/exchangeRate.api';

export const store = configureStore({
    reducer: {
        [exchangeRateApi.reducerPath]: exchangeRateApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exchangeRateApi.middleware),
});
