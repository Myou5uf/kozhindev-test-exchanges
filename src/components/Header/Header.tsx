import React, {useCallback, useEffect, useState} from 'react';
import './Header.scss';
import {useGetExchangeRatesQuery, useLazyGetExchangeRatesQuery} from '../../store/exchangeRate/exchangeRate.api';
import {getFormattedDate} from '../../utils/getFormattedDate';
import {Button} from '../ui/Button';

function Header() {
    const {error: errorOnFirstFetch} = useGetExchangeRatesQuery();
    const [fetchCurrencies] = useLazyGetExchangeRatesQuery();
    const [lastUpdateDate, setLastUpdateDate] = useState<string>('');

    const handleClickUpdate = useCallback(async () => {
        const { isError, error: errorOnReFetch } = await fetchCurrencies();

        // если нет ошибки при запросе по клику
        if (!isError) {
            // сохраняем в стейт дату текущую дату
            setLastUpdateDate(getFormattedDate(Date.now()));
        } else {
            // иначе сохраняем в стейт ошибку
            setLastUpdateDate(JSON.stringify(errorOnReFetch));
        }
    }, [fetchCurrencies]);

    useEffect(() => {
        // если есть ошибка при первом запросе
        if (errorOnFirstFetch) {
            // сохраняем в стейт ошибку
            setLastUpdateDate(JSON.stringify(errorOnFirstFetch));
        } else {
            // иначе сохраняем в стейт дату текущую дату
            setLastUpdateDate(getFormattedDate(Date.now()));
        }
    }, [errorOnFirstFetch]);

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__row'>
                    <a className='header__logo logo' href='/'>
                        React
                        <br />
                        Exchange rate
                    </a>
                    <div className='header__info'>
                        <div className='header__time'>
                            <p>Последнее обновление данных:</p>
                            <p>{lastUpdateDate}</p>
                        </div>
                        <Button
                            className='header__btn'
                            onClick={handleClickUpdate}
                        >
                            Обновить
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);
