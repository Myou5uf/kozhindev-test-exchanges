import React from 'react';
import './IndexPage.scss';
import {TableCurrencies} from '../../components/TableСurenncies';
import {ConverterCurrencies} from '../../components/ConverterCurrencies';
import {Loader} from '../../components/ui/Loader';
import {useGetExchangeRatesQuery} from '../../store/exchangeRate/exchangeRate.api';
import {ErrorMessage} from '../../components/ui/ErrorMessage';

const tableHeaderNames = [
    '№',
    'ISO 4217',
    'Единиц',
    'Название валюты',
    'Курс к рублю',
    'Курс к доллару',
    'Курс к Евро',
    'Курс к Юаню',
];

function IndexPage() {
    const { data, isLoading, isError } = useGetExchangeRatesQuery();

    if (isLoading) {
        return (
            <Loader width='200' color='#8b3bc0' />
        );
    }

    if (isError) {
        return (
            <ErrorMessage errorMessage='Произошла ошибка при загрузке данных...' />
        );
    }

    return (
        <div className='indexPage'>
            <main className='indexPage__currencies'>
                <div className='container'>
                    <h1 className='app__title title'>Курсы валют</h1>
                    {data && (
                        <TableCurrencies
                            data={data.Currencies}
                            headerNames={tableHeaderNames}
                        />
                    )}
                </div>
            </main>
            <section className='indexPage__converter'>
                <div className='container'>
                    <h2 className='app__title title'>Конвертер валют</h2>
                    {data?.Currencies && <ConverterCurrencies data={data.Currencies} />}
                </div>
            </section>
        </div>
    );
}

export default React.memo(IndexPage);
