import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ICurrencies, ServerResponse, TransformResponse} from '../../models/Currency';

export const exchangeRateApi = createApi({
    reducerPath: 'exchangeRates/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.cbr-xml-daily.ru/',

    }),
    endpoints: (builder) => ({
        getExchangeRates: builder.query<TransformResponse, void>({
            query: () => ({
                url: 'daily_json.js',
            }),
            transformResponse: (response: ServerResponse<ICurrencies>) => {
                const RUB = {
                    ID: 'R55555',
                    NumCode: '643',
                    CharCode: 'RUB',
                    Nominal: 1,
                    Name: 'Российский рубль',
                    Value: 1,
                    Previous: 1,
                };
                const currencies = response.Valute;
                currencies.RUB = RUB;

                return {
                    Date: response.Date,
                    PreviousDate: response.PreviousDate,
                    Timestamp: response.Timestamp,
                    Currencies: currencies,
                };
            },
        }),
    }),
});

export const {
    useLazyGetExchangeRatesQuery,
    useGetExchangeRatesQuery,
} = exchangeRateApi;
