import { timeStampHandler } from "../../services/dateHandlerService";
import './Headers.css'

const Headers = ({ dates, colorMode, timeUnit }) => {

  if (!dates) {
    return null
  }


  return (
    <div className="header-row">
      {dates.map(date => {
        const { year, month, day } = timeStampHandler(date);
        const formattedDate = timeUnit === 'day'
          ? `${day}/${month}/${year}`
          : timeUnit === 'month'
            ? `${month}/${year}`
            : timeUnit === 'year'
              ? `${year}`
              : `${day}/${month}/${year}`

        return (
          <div key={formattedDate} className={`headers ${colorMode}`}>{formattedDate}</div>
        )
      })}
    </div>
  );
};

export default Headers
