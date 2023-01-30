import React from 'react';
import {ICurrencies} from '../../../models/Currency';
import './CurrencySelect.scss';

interface IProps {
    className?: string;
    data: ICurrencies;
    value?: string;
    onChange: (selectedCurrency: string) => void;
}

function CurrencySelect(props: IProps) {
    const {className, data, onChange, value } = props;
    const currenciesKey = Object.keys(data);
    const cssClasses = ['currencySelect', className].join(' ').trim();
    return (
        <select
            className={cssClasses}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            {currenciesKey.map((key) => (
                <option
                    key={key}
                    className='currencySelect__option'
                    value={key}
                >
                    {data[key].Name}
                </option>
            )) }
        </select>
    );
}

export default React.memo(CurrencySelect);
