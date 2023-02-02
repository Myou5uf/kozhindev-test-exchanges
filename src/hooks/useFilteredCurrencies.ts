import {useMemo} from 'react';
import {ICurrencies} from '../models/Currency';

/**
 * Отфильтровать полученные валюты currencies по введеному запросу.
 * Вернуть ключи currencies, которые удовлетворяют запроку.
 * Если запроса нет вернуть все ключи currencies.
 * Поиск ведется по коду и названию валюты.
 * @param currencies объект с валютами
 * @param query значение запроса из input
 */
export const useFilteredCurrencies = (currencies: ICurrencies, query: string): string[] => useMemo(() => {
    const currenciesKeys = Object.keys(currencies); // ключи всех полученных валют
    // если запрос есть
    if (query !== '') {
        const lowerCaseQuery = query.toLowerCase(); // перенести запрос в нижний регистр
        // вернуть отфильтрованные ключи по названию и коду
        return currenciesKeys.filter((key) => currencies[key].Name.toLowerCase()
            .includes(lowerCaseQuery)
            || currencies[key].NumCode.toLowerCase()
                .includes(lowerCaseQuery));
    }
    // иначе вернуть ключи всех полученных валют
    return currenciesKeys;
}, [currencies, query]);
