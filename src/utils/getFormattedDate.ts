/**
 * Форматировать дату и вернуть строку вида: 'Воскресенье, 29 Января 2023 Г., 23:08:20'
 * @param date Дата
 */

export function getFormattedDate(date: number): string {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
}
