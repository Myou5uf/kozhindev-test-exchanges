import React from 'react';
import './ErrorMessage.scss';
import ErrorGif from './error.gif';
import Button from '../Button/Button';
import {useLazyGetExchangeRatesQuery} from '../../../store/exchangeRate/exchangeRate.api';

interface IProps {
    errorMessage: string;
}

function ErrorMessage(props: IProps) {
    const [fetchRates] = useLazyGetExchangeRatesQuery();
    return (
        <div className='error'>
            <p className='error__message'>{props.errorMessage}</p>
            <img
                src={ErrorGif}
                alt='Ошибка'
                className='error__img'
            />
            <Button
                className='error__btn'
                onClick={fetchRates}
            >
                Обновить
            </Button>
        </div>
    );
}

export default ErrorMessage;
