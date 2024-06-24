import { useEffect, useState, useMemo } from 'react'
import './Aside.css'

const Aside = ({ items, fieldSettings, colorMode, globalStyle }) => {
  const { hideList, listPosition, listWdt, listHeaderLabel } = fieldSettings.listSettings
  const { rowHeight, minRows } = fieldSettings

  const [visibility, setVisibility] = useState(hideList)
  const [listWidth, setListWidth] = useState(hideList ? 0 : listWdt)
  const [asideGlobalStyle, setAsideGlobalStyle] = useState(globalStyle)

  useEffect(() => {
    setVisibility(hideList)
    setListWidth(hideList ? 0 : listWdt)
    setAsideGlobalStyle(globalStyle)
  }, [hideList, listWdt, globalStyle])

  const style = useMemo(() => ({
    ...asideGlobalStyle,
    visibility: visibility ? 'hidden' : 'visible',
    flexDirection: listPosition === 'left' ? 'row' : 'row-reverse'
  }), [asideGlobalStyle, visibility, listPosition])

  const adaptiveFontSize = (item) => {
    return item.label.length < 44
      ? '1rem'
      : item.label.length < 66
        ? '0.6rem'
        : '0.5rem'
  };

  const generateRows = (items, rowHeight, minRows) => {
    const rows = items.map((item, idx) => {
      const text = item.label.length > 155 ? item.label.slice(0, 155) + '...' : item.label
      return (
        <div key={idx} className='aside-cell' style={{ ...style, height: `${rowHeight - 0.8}px`, fontSize: adaptiveFontSize(item) }}>
          {text}
        </div>
      );
    });

    while (rows.length < minRows) {
      rows.push(<div key={rows.length} className='aside-cell' style={{ ...style, height: `${rowHeight - 0.8}px` }} />);
    }

    return rows
  };

  return (
    <div className={`aside ${colorMode}`} style={{ width: `${listWidth}px` }}>
      <div className='aside-cell' style={style}>{listHeaderLabel}</div>
      {generateRows(items, rowHeight, minRows)}
    </div>
  );
};

export default Aside
