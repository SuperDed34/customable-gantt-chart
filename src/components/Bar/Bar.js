import { useEffect, useRef, useState} from 'react'
import './Bar.css'
import { Tooltip } from '@mui/material'
import { timeStampHandler, getMonthsBetween } from '../../services/dateHandlerService'
import { defaultBarStyle, defaultLabelStyle } from '../../defaults'

const defaultFunc = (e) => alert(`No callback defined, this is default callback, you're pressed bar with ID: ${e.currentTarget.id}`)

const Bar = ({ item, startCell, lastCell, step, tooltipPosition, tUnit, colorTheme }) => {

  const [label, setLabel] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [barStyle, setBarStyle] = useState({})
  const [labelStyle, setLabelStyle] = useState({})
  const [firstCell, setFirstCell] = useState(0)
  const [endCell, setEndCell] = useState(0)
  const [steps, setSteps] = useState(0)
  const [fontSize, setFontSize] = useState('')
  const [TTPosition, setTTPosition] = useState(null)
  const [timeUnit, setTimeUnit] = useState(null)
  const [callback, setCallback] = useState(null)
  const [colorMode, setColorMode] = useState()

  const textRef = useRef(null)

  useEffect(() => {
    setTimeUnit(tUnit)
  }, [tUnit])

  const barPositioning = (startDate, endDate, firstCell, lstCell, step, timeUnit) => {
    
    const size = 100.8
    let before = (startDate - firstCell) / step
    let after = (endDate - startDate) / step
    let offset = 18
    let to = size / 2
    if (timeUnit === 'month') {
      //const monthAll = getMonthsBetween(firstCell, lstCell)
      const monthToFirstCell = getMonthsBetween(firstCell, startDate)
      const monthAffected = getMonthsBetween(startDate, endDate)
      before = monthToFirstCell.length-1
      after = monthAffected.length-1
    } 

    if ((endDate - startDate) >= step) {
      to = (size * after)
      offset = 35
    }

    const from = (size * before + offset)

    return { from, to }
  }
  const position = barPositioning(startDate, endDate, firstCell, endCell, steps, timeUnit)
  
  useEffect(() => {
    if (textRef.current) {
      const computedStyle = window.getComputedStyle(textRef.current)
      setFontSize(computedStyle.fontSize)
      setLabel(item.label.length * +fontSize.slice(0, -2)/2 > position.to
        ? (item.label.slice(0, +(position.to / (fontSize.slice(0, -2)/2) - 3)) + '...')
        : item.label)
    }
  }, [item.label, fontSize, position.to])

  useEffect(() => {
    if (item != null) {
      setStartDate(item.startDate)
      setEndDate(item.endDate)
      setBarStyle(item.barStyle ?? defaultBarStyle)
      setLabelStyle(item.labelStyle ?? defaultLabelStyle)
      setFirstCell(startCell.props.date)
      setEndCell(lastCell.props.date)
      setTTPosition(tooltipPosition)
      setSteps(step)
      setCallback((e) => item.onItemClick ?? defaultFunc)
      setColorMode(colorTheme)
    }
  }, [item, step, lastCell.props.date, startCell.props.date, tooltipPosition, colorTheme])
  const styles = {
    ...barStyle[colorMode],
    left: !isNaN(position.from) ? position.from : 0,
    width: !isNaN(position.to) ? position.to : 0
  }
  const startDateObj = timeStampHandler(startDate)
  const endDateObj = timeStampHandler(endDate)


  const formattedDate = (startDateObj) => {
    return `
    ${startDateObj.day < 10
        ? '0' + startDateObj.day
        : startDateObj.day}
         - ${startDateObj.month < 10
        ? '0' + startDateObj.month
        : startDateObj.month}
         - ${startDateObj.year} 
         ${startDateObj.hour < 10
        ? '0' + startDateObj.hour
        : startDateObj.hour}
        :${startDateObj.minutes < 10
        ? '0' + startDateObj.minutes
        : startDateObj.minutes}`
  }


  return (
    <Tooltip title={
      <div style={{width: '100%',margin:'0'}}>
        <p>{item.label}</p>
        <p>{`Start:  ${formattedDate(startDateObj)}`}</p>
        <p>{`End:   ${formattedDate(endDateObj)}`}</p>
      </div>
    } placement={TTPosition ? TTPosition : 'top'}>
      <div id={item.id} className="bar" style={styles} onClick={callback}>
        <p ref={textRef} className="bar-label" style={labelStyle[colorMode]}>{label}</p>
      </div>
    </Tooltip>
    )
}

export default Bar