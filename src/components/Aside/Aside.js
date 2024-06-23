import { useEffect, useState } from 'react'
import './Aside.css'

const Aside = ({ items, fieldSettings, colorMode }) => {
  const { hideList, listPosition, listWdt, listHeaderLabel } = fieldSettings.listSettings
  
  const { rowHeight, minRows } = fieldSettings
  const [clrMode, setClrMode] = useState()
  const [visibility, setVisibility] = useState()
  const [position, setPosition] = useState()
  const [listWidth, setListWidth] = useState()
  const [label, setLabel] = useState('')

  useEffect(() => {
    setClrMode(colorMode)
    setVisibility(hideList)
    setPosition(listPosition)
    setListWidth(visibility ? 0 : listWdt)
    setLabel(listHeaderLabel)
        
  }, [
    colorMode,
    hideList,
    listWdt,
    listPosition,
    listHeaderLabel,
    visibility
  ])

  const style = {
    visibility: visibility ? 'hidden' : 'visible',
    flexDirection: position === 'left' ? 'row' : 'row-reversed',
    width: `${listWidth}px`
  }

  const adaptiveFontSize = (item) => {
    return item.label.length < 44
      ? '1rem'
      : item.label.length < 66
        ? '0.6rem'
        : '0.5rem'
  }

  const rows = []

    items.map((item, idx) => {
      const text = item.label.length > 155 ? item.label.slice(0, 155) + '...' : item.label
      rows.push(<div key={idx} className='aside-cell' style={{height: `${rowHeight - 0.8}px`, fontSize: adaptiveFontSize(item)}}>
        {text}
      </div>)
      return item
    })
    while (rows.length < minRows) {
      rows.push(<div key={rows.length} className='aside-cell' style={{height: `${rowHeight - 0.8}px`}}>

      </div>)
    }

  return (
    <div className={`aside ${clrMode}`} style={style}>
      <div className='aside-cell' >{label}</div>
        {rows}
      </div>
    )
}

export default Aside