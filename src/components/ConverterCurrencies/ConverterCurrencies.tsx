import React, {useCallback, useState} from 'react';
import './ConverterCurrencies.scss';
import {BaseCurrenciesTypes, ICurrencies, NUMBER_OF_DIGITS_AFTER_POINT} from '../../models/Currency';
import convertCurrency from '../../utils/convertCurrency';
import {CurrencyInput} from '../ui/CurrencyInput';
import {CurrencySelect} from '../ui/CurrencySelect';

interface IProps {
    data: ICurrencies;
}

const KEY_LAST_SELECTED_CURRENCY_1 = 'KEY_LAST_SELECTED_CURRENCY_1';
const KEY_LAST_SELECTED_CURRENCY_2 = 'KEY_LAST_SELECTED_CURRENCY_2';

const handleChangeAmount = (
    amount: string, // сумма для конвертации
    setAmountFrom: (value: string) => void,
    setAmountTo: (value: string) => void,
    fromCurrency: number, // базовая валюта
    toCurrency: number, // котируемая валюта
    nominalFrom: number, // номинал базовой валюты
    nominalTo: number, // номинал котируемой валюты
) => {
    const pattern = /[^\d.]/g;
    const value = amount.replace(pattern, ''); // если введенное значение не число и не точка, то заменяем на пустую строку
    setAmountFrom(value);
    // если строка конвертируется в число
    if (Number(value)) {
        // то сохраняем в переменную результат выполнения функции конвертера
        const convertResult = convertCurrency(fromCurrency, toCurrency, Number(value), nominalFrom, nominalTo);
        // сохраняем в стейт полученный результат с фиксированной точкой до NUMBER_OF_DIGITS_AFTER_POINT знаков
        setAmountTo(convertResult.toFixed(NUMBER_OF_DIGITS_AFTER_POINT));
    } else {
        // иначе в стейт передаем пустую строку
        setAmountTo('');
    }
};

function ConverterCurrencies(props: IProps) {
    const {data} = props;
    const [amount1, setAmount1] = useState<string>('');
    const [amount2, setAmount2] = useState<string>('');
    const [currency1, setCurrency1] = useState<string>(localStorage.getItem(KEY_LAST_SELECTED_CURRENCY_1) || BaseCurrenciesTypes.RUB);
    const [currency2, setCurrency2] = useState<string>(localStorage.getItem(KEY_LAST_SELECTED_CURRENCY_2) || BaseCurrenciesTypes.USD);

    const handleChangeCurrency1 = useCallback((selectedCurrency: string) => {
        setCurrency1(selectedCurrency);
        handleChangeAmount(
            amount1,
            setAmount1,
            setAmount2,
            data[selectedCurrency].Value,
            data[currency2].Value,
            data[selectedCurrency].Nominal,
            data[currency2].Nominal,
        );
        localStorage.setItem(KEY_LAST_SELECTED_CURRENCY_1, selectedCurrency);
    }, [amount1, currency2, data]);

    const handleChangeCurrency2 = useCallback((selectedCurrency: string) => {
        setCurrency2(selectedCurrency);
        handleChangeAmount(
            amount1,
            setAmount1,
            setAmount2,
            data[currency1].Value,
            data[selectedCurrency].Value,
            data[currency1].Nominal,
            data[selectedCurrency].Nominal,
        );
        localStorage.setItem(KEY_LAST_SELECTED_CURRENCY_2, selectedCurrency);
    }, [amount1, currency1, data]);

    return (
        <div className='converterCurrency'>
            <div className='converterCurrency__row'>
                <CurrencyInput
                    type='text'
                    className='converterCurrency__input'
                    value={amount1}
                    onChange={(value) => handleChangeAmount(
                        value,
                        setAmount1,
                        setAmount2,
                        data[currency1].Value,
                        data[currency2].Value,
                        data[currency1].Nominal,
                        data[currency2].Nominal,
                    )}
                />
                <CurrencySelect
                    className='converterCurrency__select'
                    data={data}
                    value={currency1}
                    onChange={(value) => handleChangeCurrency1(value)}
                />
            </div>
            <div className='converterCurrency__row'>
                <CurrencyInput
                    type='text'
                    className='converterCurrency__input'
                    value={amount2}
                    onChange={(value) => handleChangeAmount(
                        value,
                        setAmount2,
                        setAmount1,
                        data[currency2].Value,
                        data[currency1].Value,
                        data[currency2].Nominal,
                        data[currency1].Nominal,
                    )}
                />
                <CurrencySelect
                    className='converterCurrency__select'
                    data={data}
                    value={currency2}
                    onChange={(value) => handleChangeCurrency2(value)}
                />
            </div>
        </div>
    );
}

export default React.memo(ConverterCurrencies);
