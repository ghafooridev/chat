export const ConvertDate = (value: Date) => {
  const dateTime = new Date(value)
  const time = dateTime.toTimeString().split(' ')[0];
  return `${time}`
}



