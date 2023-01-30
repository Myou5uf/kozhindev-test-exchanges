// Валюта
export interface ICurrency {
    ID: string;
    NumCode: string;
    CharCode: string;
    Nominal: number;
    Name: string;
    Value: number;
    Previous: number;
}

// Объект валют
export interface ICurrencies {
    [key: string]: ICurrency;
}

// Базовые валюты для таблицы - курсы валют
export enum BaseCurrenciesTypes {
    RUB = 'RUB',
    USD = 'USD',
    EUR = 'EUR',
    CNY = 'CNY'
}

// Ответ от сервера
export interface ServerResponse<T> {
    Date: Date;
    PreviousDate: Date;
    PreviousURL: string;
    Timestamp: Date;
    Valute: T;
}

// Настроенный ответ от сервера
export interface TransformResponse {
    Date: Date;
    PreviousDate: Date;
    Timestamp: Date;
    Currencies: ICurrencies;
}

// Количество цифр после десятичной запятой
export const NUMBER_OF_DIGITS_AFTER_POINT = 3;
