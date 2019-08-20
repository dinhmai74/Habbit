import moment from 'moment'

export const today = moment(new Date())
  .format('YYYY-MM-DD')
  .toString()
export const formatDate = (date: Date): string =>
  moment(new Date(date))
    .format('YYYY-MM-DD')
    .toString()
export const currentMonth = moment(new Date())
  .format('YYYY-MM')
  .toString()

export const getPreviousDateFromNow = (numberOfDays: number = 0) =>
  moment()
    .subtract(numberOfDays, 'days')
    .format('YYYY-MM-DD')
    .toString()

export const getFirstCharacterOfDate = (date: Date): string =>
  moment(new Date(date))
    .format('dddd')
    .substring(0, 1)
    .toString()

export function getDaysBetweenTwoDate(
  container: [string],
  startDate: string | any,
  endDate: string | any,
) {
  endDate = moment(endDate)
  startDate = moment(startDate)
  for (let i = 0; i < endDate.diff(startDate, 'days') + 1; i += 1) {
    const date = moment(startDate)
      .add(i, 'days')
      .format('YYYY-MM-DD')
    container.push(date)
  }
}
