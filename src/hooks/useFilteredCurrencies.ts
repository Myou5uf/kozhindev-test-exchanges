import {useMemo} from 'react';
import {ICurrencies} from '../models/Currency';

/**
 * Отфильтровать полученные валюты currencies по введеному запросу query.
 * Если запроса нет вернуть currencies.
 * Поиск ведется по коду и названию валюты.
 * @param currencies объект с валютами
 * @param query значение запроса из input
 */
export const useFilteredCurrencies = (currencies: ICurrencies, query: string): ICurrencies | string[] => useMemo(() => {
    // если запрос есть
    if (query !== '') {
        const currenciesKeys = Object.keys(currencies); // ключи валют
        const lowerCaseQuery = query.toLowerCase(); // перенос запроса в нижний регистр
        // фильтрация ключей по названию и коду и возврат отфильтрованных ключей по запросу
        return currenciesKeys.filter((key) => currencies[key].Name.toLowerCase()
            .includes(lowerCaseQuery)
            || currencies[key].NumCode.toLowerCase()
                .includes(lowerCaseQuery));
    }
    // иначе вернуть полученные данные - currencies
    return currencies;
}, [currencies, query]);
