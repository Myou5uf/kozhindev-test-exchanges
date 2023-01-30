/***
 * Сконвертировать полученную сумму из одной валюты в другую.
 * Учитываются номиналы, тк в api валюты разного номинала.
 * @param fromCurrency  базовая валюта
 * @param toCurrency    котируемая валюта
 * @param amount        сумма
 * @param nominalFrom   номинал базовой валюты
 * @param nominalTo     номинал котируемой валюты
 */

export default function convertCurrency(
    fromCurrency: number,
    toCurrency: number,
    amount = 1,
    nominalFrom = 1,
    nominalTo = 1,
): number {
    return (amount * (fromCurrency / nominalFrom)) / (toCurrency / nominalTo);
}
