
const Cells = ({ colorTheme, i, date, globalStyle }) => {
  return (
    <div
      className={`field-cells`}
      style={globalStyle}
      key={date}
      id={date}
    >
    </div>
    )
}

export default Cells