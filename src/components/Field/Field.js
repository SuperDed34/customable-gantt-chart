import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getTimeFrames } from '../../services/dateHandlerService';
import Headers from '../Headers/Headers';
import './Field.css';
import Bar from '../Bar/Bar';
import Cells from './Cell/Cells';
import { scrollToElement } from '../../services/scrollService';

const Field = ({ items, fieldSettings, timeUnit, colorTheme, tooltipPosition }) => {
  const { emptyColumnsNumber, rowHeight, minRows } = fieldSettings ?? {
    rowHeight: '50',
    minRows: '10',
    emptyColumnsNumber: '20'
  }

  const [hasScrolled, setHasScrolled] = useState(false);
  const [emptyColumns, setEmptyColumns] = useState();
  const [rowHgt, setRowHgt] = useState()
  const [minRws, setMinRws] = useState()
  const [tUnit, setTUnit] = useState();
  const [separatedFrames, setSeparatedFrames] = useState({ frames: [], dates: [], timeFrames: 0, time: 0 });

  useEffect(() => {
    setTUnit(timeUnit)
    setEmptyColumns(emptyColumnsNumber)
    setRowHgt(rowHeight)
    setMinRws(minRows)
  }, [
    emptyColumnsNumber,
    timeUnit,
    rowHeight,
    minRows
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (tUnit && items && emptyColumns) {
        const { timeFrames, minRange, presentDateRange, maxRange, time, getSteps } = await getTimeFrames(items, tUnit, emptyColumns)
        const dates = [...minRange, ...presentDateRange, ...maxRange].sort((a, b) => a - b)
        const frames = dates.map((date, index) => (
          <Cells colorTheme={colorTheme} key={index} date={date} />
        ));
        setSeparatedFrames({ frames, dates, timeFrames, time, getSteps })
      }
    };
    fetchData();
  }, [items, tUnit, emptyColumns, colorTheme]);

  useEffect(() => {
    if (items.length > 0 && !hasScrolled && separatedFrames.dates.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const timestamp = today.getTime();
      separatedFrames.dates.includes(timestamp)
        ? scrollToElement(timestamp)
        : scrollToElement(items[0].startDate);
      setHasScrolled(true);
    }
  }, [items, hasScrolled, separatedFrames]);



  const countRows = () => {
    let rows = [];
    if (separatedFrames.frames && separatedFrames.frames.length > 0) {
      const itemsToRender = minRws > items.length ? items.concat(Array(minRws - items.length).fill({})) : items;

      itemsToRender.forEach((item, idx) => {
        rows.push(
          <RowView
            key={uuidv4()}
            item={item}
            i={idx}
            styles={{ height: `${rowHgt}px` }}
            cells={separatedFrames.frames}
            colorTheme={colorTheme}
            step={separatedFrames.time}
            tooltipPosition={tooltipPosition}
            tUnit={tUnit}
          />
        );
      });
    }
    return rows;
  };

  const rows = countRows();

  return (
    <div className="field">
      <Headers dates={separatedFrames.dates} colorMode={colorTheme} timeUnit={tUnit} />
      {rows}
    </div>
  );
};

const RowView = ({ i, styles, cells, colorTheme, item, step, tooltipPosition, tUnit }) => {
  return (
    <div key={uuidv4()} className={`field-row ${colorTheme}`} style={styles}>
      {cells}
      {item && item.id === i + 1 ? (
        <Bar
          key={uuidv4()}
          item={item}
          startCell={cells[0]}
          lastCell={cells[cells.length-1]}
          step={step}
          tooltipPosition={tooltipPosition}
          tUnit={tUnit}
        />
      ) : null}
    </div>
  );
};

export default Field;
