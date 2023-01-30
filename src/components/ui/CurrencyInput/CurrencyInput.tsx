import React from 'react';
import './CurrencyInput.scss';

interface ICurrencyInputProps {
    type?: string;
    className?: string;
    value?: string;
    onChange: (value: string) => void;
}

function CurrencyInput(props: ICurrencyInputProps) {
    const { type = 'text', className, value = '', onChange } = props;
    const cssClasses = ['currencyInput', className].join(' ').trim();

    return (
        <input
            type={type}
            className={cssClasses}
            tabIndex={0}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    );
}

export default React.memo(CurrencyInput);
