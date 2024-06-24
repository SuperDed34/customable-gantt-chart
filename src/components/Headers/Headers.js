import { useEffect, useState } from "react";
import { timeStampHandler } from "../../services/dateHandlerService";
import './Headers.css'

const Headers = ({ dates, colorMode, globalStyle, timeUnit }) => {
  console.log(globalStyle)

  const [headerGlobalStyle, setHeaderGlobalStyle] = useState()
  
  useEffect(() => {
    setHeaderGlobalStyle(globalStyle.header)

  },[dates, globalStyle.header, colorMode])

  if (!dates) {
    return null
  }

  const styles = { ...headerGlobalStyle }
  return (
    <div className="header-row">
      {dates.map(date => {
        const { year, month, day } = timeStampHandler(date)
        const formattedDate = timeUnit === 'day'
          ? `${day}/${month}/${year}`
          : timeUnit === 'month'
            ? `${month}/${year}`
            : timeUnit === 'year'
              ? `${year}`
              : `${day}/${month}/${year}`

        return (
          <div key={formattedDate} className='headers' style={styles}>{formattedDate}</div>
        )
      })}
    </div>
  );
};

export default Headers
