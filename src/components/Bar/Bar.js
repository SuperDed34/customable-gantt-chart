import { useEffect, useRef, useState, useMemo } from 'react';
import './Bar.css';
import { Tooltip } from '@mui/material';
import { timeStampHandler, getMonthsBetween } from '../../services/dateHandlerService';
import { defaultBarStyle, defaultLabelStyle } from '../../defaults';

const defaultFunc = (e) => alert(`No callback defined, this is default callback, you're pressed bar with ID: ${e.currentTarget.id}`);

const Bar = ({ item, startCell, lstCell, step, tooltipPosition, tUnit, colorTheme }) => {
  const [label, setLabel] = useState('')
  const [fontSize, setFontSize] = useState('')
  const textRef = useRef(null)

  const { startDate, endDate, barStyle = defaultBarStyle, labelStyle = defaultLabelStyle, onItemClick = defaultFunc } = item
  const firstCell = startCell.props.date

  const timeUnit = tUnit
  const colorMode = colorTheme

  const barPositioning = useMemo(() => {
    const size = 100.8
    let before = (startDate - firstCell) / step
    let after = (endDate - startDate) / step
    let offset = 18
    let to = size / 2

    if (timeUnit === 'month') {
      const monthToFirstCell = getMonthsBetween(firstCell, startDate)
      const monthAffected = getMonthsBetween(startDate, endDate)
      before = monthToFirstCell.length - 1
      after = monthAffected.length - 1
    }

    if ((endDate - startDate) > step) {
      to = size * after
      offset = 35
    }

    const from = size * before + offset

    return { from, to }
  }, [startDate, endDate, firstCell, step, timeUnit])

  useEffect(() => {
    if (textRef.current) {
      const computedStyle = window.getComputedStyle(textRef.current)
      setFontSize(computedStyle.fontSize)
      setLabel(
        item.label.length * +fontSize.slice(0, -2) / 2 > barPositioning.to
          ? item.label.slice(0, +(barPositioning.to / (fontSize.slice(0, -2) / 2) - 3)) + '...'
          : item.label
      );
    }
  }, [item.label, fontSize, barPositioning.to])

  const styles = useMemo(() => ({
    ...barStyle[colorMode],
    left: !isNaN(barPositioning.from) ? barPositioning.from : 0,
    width: !isNaN(barPositioning.to) ? barPositioning.to : 0
  }), [barStyle, colorMode, barPositioning])

  const formattedDate = (dateObj) => {
    return `
      ${dateObj.day < 10 ? '0' + dateObj.day : dateObj.day}
      - ${dateObj.month < 10 ? '0' + dateObj.month : dateObj.month}
      - ${dateObj.year} 
      ${dateObj.hour < 10 ? '0' + dateObj.hour : dateObj.hour}
      : ${dateObj.minutes < 10 ? '0' + dateObj.minutes : dateObj.minutes}`
  };

  const startDateObj = timeStampHandler(startDate)
  const endDateObj = timeStampHandler(endDate)

  return (
    <Tooltip
      title={
        <div style={{ width: '100%', margin: '0' }}>
          <p>{item.label}</p>
          <p>{`Start:  ${formattedDate(startDateObj)}`}</p>
          <p>{`End:   ${formattedDate(endDateObj)}`}</p>
        </div>
      }
      placement={tooltipPosition ?? 'top'}
    >
      <div id={item.id} className="bar" style={styles} onClick={onItemClick}>
        <p ref={textRef} className="bar-label" style={labelStyle[colorMode]}>{label}</p>
      </div>
    </Tooltip>
  );
};

export default Bar
