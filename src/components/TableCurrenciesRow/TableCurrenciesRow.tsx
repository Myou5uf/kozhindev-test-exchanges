import React from 'react';
import './TableCurrenciesRow.scss';

interface IProps {
    index: number;
    isoCode: string;
    nominal: number;
    nameCurrency: string;
    currencyRUB: string;
    currencyUSD: string;
    currencyEUR: string;
    currencyCNY: string;
}

function TableCurrenciesRow(props: IProps) {
    const { index, isoCode, nominal, nameCurrency, currencyRUB, currencyUSD, currencyEUR, currencyCNY } = props;

    return (
        <tr className='tableRow'>
            <td className='tableRow__item'>{index}</td>
            <td className='tableRow__item'>{isoCode}</td>
            <td className='tableRow__item'>{nominal}</td>
            <td className='tableRow__item'>{nameCurrency}</td>
            <td className='tableRow__item'>{currencyRUB}</td>
            <td className='tableRow__item'>{currencyUSD}</td>
            <td className='tableRow__item'>{currencyEUR}</td>
            <td className='tableRow__item'>{currencyCNY}</td>
        </tr>
    );
}

export default React.memo(TableCurrenciesRow);
