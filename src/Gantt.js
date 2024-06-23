import { useEffect, useState } from 'react'
import Field from './components/Field/Field'
import './Gantt.css'
import Aside from './components/Aside/Aside'
import { fontSize, textAlign } from '@mui/system'

const defaultGlobalSettings = {
  timeUnit: 'day',
  colorMode: 'light',
  tooltipPosition: 'top'
}
const defaultFieldSettings = {
  rowHeight: 50,
  emptyColumnsNumber: 20,
  minRows: 10,
  listSettings: {
      hideList: false, 
      listPosition: 'left',
      listWdt: 200,
      listHeaderLabel: 'Tasks'
  }
}


function Gantt({ items, fieldSettings=defaultFieldSettings, globalSettings=defaultGlobalSettings }) {

  if (!items) {
    items = [
        {
          id: 1,
          label: 'No defined tasks',
          startDate: new Date('2024-05-01').valueOf(),
          endDate: new Date('2024-05-10').valueOf(),
          barStyle: {
            position: 'absolute',
            width: '100%',
            height: '1900%',
            fontSize: '100px',
            backgroundColor: 'green',
            zIndex: '1',
            textAlign: 'center',
            
          }
        },
    ]
  }

  const { listPosition } = fieldSettings.listSettings
  const [aside, setAside] = useState()
  const [settings, setSettings] = useState()

  useEffect(() => {
    setSettings(globalSettings)
    setAside(listPosition)
  }, [globalSettings, listPosition])

  const listPos = aside === 'left' ? 'row' : 'row-reverse'
  return (
    <div className="gantt" style={{ flexDirection: listPos}}>
      <Aside
        items={items}
        fieldSettings={fieldSettings}
        colorMode={settings ? settings.colorMode : 'light'} 
      />
      <Field
        items={items}
        fieldSettings={fieldSettings}
        timeUnit={globalSettings.timeUnit} 
        colorTheme={settings ? settings.colorMode : 'light'} 
        tooltipPosition={settings ? settings.tooltipPosition : 'top'} 
      />
    </div>
  );
}

export default Gantt;
