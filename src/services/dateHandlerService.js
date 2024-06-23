import moment from 'moment'

export const timeStampHandler = (timeStamp) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();

  //const formattedDate = moment(timeStamp).format('DD-MM-YYYY');

  return {
    year,
    month,
    day
  };
};
const getMinMaxDate = (items) => {
  let min = Number.MAX_SAFE_INTEGER
  let max = 0
  items.forEach(item => {
    min = item.startDate < min ? item.startDate : min
    max = item.endDate > max ? item.endDate : max
  })
  return { min, max }
}

export const getDaysInMonth = (date) => {
  return moment(date, 'DD-MM-YYYY').daysInMonth()
}

export const getMonthsBetween = (startTimestamp, endTimestamp) => {
  const startDate = moment(startTimestamp).startOf('month')
  const endDate = moment(endTimestamp).startOf('month').add(1, 'month').subtract(1, 'day')

  const months = [];

  if (startDate.isAfter(endDate)) {
    throw new Error('Start date must be before end date')
  }

  let currentDate = startDate.clone()

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'month')) {
    months.push(currentDate.format('DD-MM-YYYY'))
    currentDate.add(1, 'month').startOf('month')
  }

  return months;
}


const getEmptyDatesRange = (min, max, timeUnit, emptyColumnsNumber) => {
  const minRange = []
  const maxRange = []
  for (let i = 0; i < emptyColumnsNumber; i++) {
    const minStep = getSteps(min, timeUnit, 'min')
    const maxStep = getSteps(max, timeUnit, 'max')
    min -= minStep
    max += maxStep
    minRange.push(min)
    maxRange.push(max)
  }
  return { minRange, maxRange }
}

const getPresentDateRange = (min, max, timeUnit) => {
  let presentRange = []
  if (timeUnit === 'month') {
    if (new Date(min).getMonth() === new Date(max).getMonth()
      && new Date(min).getFullYear() === new Date(max).getFullYear()) {
      presentRange.push(min)
    } else {
      while (new Date(min) <= new Date(max)) {
        presentRange.push(min)
        min = new Date(min).setMonth(new Date(min).getMonth() + 1)
      }
    }
  } else if(timeUnit === 'day'){
    let step = 86400000
    presentRange.push(min)
    while (min < max) {
      min += step
      presentRange.push(min)
    }
  } else if (timeUnit === 'year') {
    if (new Date(max).getFullYear() === new Date(min).getFullYear()) {
      presentRange.push(min)
    } else {
      while (new Date(max).getFullYear() >= new Date(min).getFullYear()) {
        presentRange.push(min)
        min = new Date(min).setFullYear(new Date(min).getFullYear() + 1)
      }
    }
  }
  return presentRange
}

export const getTimeFrames = (items, timeUnit, emptyColumnsNumber) => {
  const { min, max } = getMinMaxDate(items)
  const millisecondsLeapYear = 31622400000
  const millisecondsYear = 31536000000
  const millisecondsDay = 24 * 60 * 60 * 1000
  const step = timeUnit === 'day'
    ? millisecondsDay
    : timeUnit === 'week'
      ? 604800000
      : timeUnit === 'month'
        ? 2592000000 
        : timeUnit === 'year'
          ? +(millisecondsLeapYear + millisecondsYear) / 2
          : console.error('Unhandled timeUnit')

  const presentDateRange = getPresentDateRange(min, max, timeUnit)
  const { minRange, maxRange } = getEmptyDatesRange(min, max, timeUnit, emptyColumnsNumber)
  return {
    timeFrames: [...minRange, ...presentDateRange, ...maxRange].length,
    time: step,
    getSteps,
    min,
    max,
    minRange,
    maxRange,
    presentDateRange
  }
}

export const getSteps = (timeStamp, timeUnit, mode) => {
  const millisecondsDay = 86400000
  if (timeUnit === 'day') {
    return millisecondsDay
  } else if (timeUnit === 'month') {
    return mode === 'min'
      ? moment(timeStamp).month(moment(timeStamp).month()-1).daysInMonth() * millisecondsDay
      : moment(timeStamp).daysInMonth() * millisecondsDay
    
  } else if (timeUnit === 'year') {
    return moment(timeStamp).isLeapYear() ? millisecondsDay * 366 : millisecondsDay * 365
  }
}