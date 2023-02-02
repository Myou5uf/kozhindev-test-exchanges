import React, {useCallback, useState} from 'react';
import './TableCurrencies.scss';
import {BaseCurrenciesTypes, ICurrencies, NUMBER_OF_DIGITS_AFTER_POINT} from '../../models/Currency';
import convertCurrency from '../../utils/convertCurrency';
import {useFilteredCurrencies} from '../../hooks/useFilteredCurrencies';
import {TableCurrenciesRow} from '../TableCurrenciesRow';
import {Button} from '../ui/Button';

interface IProps {
    data: ICurrencies;
    headerNames: string[];
}

const NUMBER_OF_CURRENCIES_PER_PAGE = 5; // количество валют на странице по умолчанию

function TableCurrencies(props: IProps) {
    const { data, headerNames } = props;

    const [searchValue, setSearchValue] = useState('');
    const [visibleAllCurrencies, setVisibleAllCurrencies] = useState(false);
    const [visibleButtonLoadMore, setVisibleButtonLoadMore] = useState(true);
    const handleClickButtonLoadMore = useCallback(() => setVisibleAllCurrencies((prevState) => !prevState), []);
    const handleChangeInput = useCallback((value: string) => {
        setSearchValue(value);
        // если запрос есть
        if (value !== '') {
            setVisibleAllCurrencies(true); // показать все возможные валюты
            setVisibleButtonLoadMore(false); // скрыть кнопку - 'показать ещё'
        } else {
            setVisibleAllCurrencies(false); // запретить показ всех возможных валют
            setVisibleButtonLoadMore(true); // показать кнопку - 'показать ещё'
        }
    }, []);

    const filteredCurrencies = useFilteredCurrencies(data, searchValue.trim());

    const getVisibleCurrencies = useCallback(() => {
        // если не нужно показывает все валюты
        if (!visibleAllCurrencies) {
            // вернуть первые NUMBER_OF_CURRENCIES_PER_PAGE валют
            return filteredCurrencies.slice(0, NUMBER_OF_CURRENCIES_PER_PAGE);
        }
        // иначе вернуть ключи всех валют
        return filteredCurrencies;
    }, [filteredCurrencies, visibleAllCurrencies]);

    return (
        <div className='tableCurrencies'>
            <input
                type='text'
                placeholder='Поиск валюты по коду (ISO 4217) и названию'
                className='tableCurrencies__input'
                value={searchValue}
                onChange={(event) => handleChangeInput(event.target.value)}
            />
            <div className='tableCurrencies__tableWrapper'>
                {filteredCurrencies?.length > 0
                    ? (
                        <table className='table w-100'>
                            <thead className='table__head'>
                                <tr className='table__headRow'>
                                    {headerNames.map((name) => <th key={name} className='table__headItem'>{name}</th>)}
                                </tr>
                            </thead>
                            <tbody className='table__body'>
                                {getVisibleCurrencies()
                                    .map((currency, i) => (
                                        <TableCurrenciesRow
                                            key={currency}
                                            index={i + 1}
                                            isoCode={data[currency].NumCode}
                                            nominal={data[currency].Nominal}
                                            nameCurrency={data[currency].Name}
                                            currencyRUB={convertCurrency(data[currency].Value, data[BaseCurrenciesTypes.RUB].Value)
                                                .toFixed(NUMBER_OF_DIGITS_AFTER_POINT)}
                                            currencyUSD={convertCurrency(data[currency].Value, data[BaseCurrenciesTypes.USD].Value)
                                                .toFixed(NUMBER_OF_DIGITS_AFTER_POINT)}
                                            currencyEUR={convertCurrency(data[currency].Value, data[BaseCurrenciesTypes.EUR].Value)
                                                .toFixed(NUMBER_OF_DIGITS_AFTER_POINT)}
                                            currencyCNY={convertCurrency(data[currency].Value, data[BaseCurrenciesTypes.CNY].Value)
                                                .toFixed(NUMBER_OF_DIGITS_AFTER_POINT)}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    )
                    : <p className='tableCurrencies__notFound'>Такой валюты в нашей базе нет...</p>}
            </div>
            {visibleButtonLoadMore && (
                <Button
                    className='tableCurrencies__btn'
                    onClick={handleClickButtonLoadMore}
                >
                    {visibleAllCurrencies ? 'Скрыть' : 'Показать все'}
                </Button>
            )}
        </div>
    );
}

export default React.memo(TableCurrencies);
