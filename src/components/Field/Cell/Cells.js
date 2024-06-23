
const Cells = ({ colorTheme, i, date }) => {
  return (
    <div
      className={`field-cells ${colorTheme}`}
      key={date}
      id={date}
    >
    </div>
    )
}

export default Cells