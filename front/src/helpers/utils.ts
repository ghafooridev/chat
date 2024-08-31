export const ConvertDateToISO = (value: Date) => {
    const dateTime = new Date(value)
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.toTimeString().split(' ')[0];
    return `${date} ${time}`
}