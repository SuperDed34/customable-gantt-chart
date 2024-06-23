import { useEffect, useState } from 'react'
import Field from './components/Field/Field'
import './Gantt.css'
import Aside from './components/Aside/Aside'
import Loading from './components/Loading/Loading'
import { defaultFieldSettings, defaultGlobalSettings, noDefinedTasksPlaceholder } from './defaults'

function Gantt({
  items = noDefinedTasksPlaceholder,
  fieldSettings,
  globalSettings
}) {
  fieldSettings = fieldSettings ? fieldSettings : defaultFieldSettings


  const { listPosition } = fieldSettings.listSettings
  const [aside, setAside] = useState()
  const [settings, setSettings] = useState()
  const [loading, setLoading] = useState(true)
  const [globalStyle, setGlobalStyle] = useState()

  useEffect(() => {
    setSettings({...defaultGlobalSettings, ...globalSettings })
    setAside(listPosition)
    setGlobalStyle(globalSettings.globalStyle ?? defaultGlobalSettings.globalStyle)
    setLoading(false)
  }, [globalSettings, listPosition])

  const listPos = aside === 'left' ? 'row' : 'row-reverse'

  const View = () => {
    const style = {
      ...globalStyle[globalSettings.colorMode].gantt,
      flexDirection: listPos,
      margin: "0 auto",
      width: '90vw',
      height: '90vh',
      display: 'flex',
    }
  return (
    <div className="gantt" style={style}>
      <Aside
        items={items}
        fieldSettings={fieldSettings}
        globalStyle={globalStyle[globalSettings.colorMode].aside}
        colorMode={settings.colorMode}
      />
      <Field
        items={items}
        fieldSettings={fieldSettings}
        globalStyle={globalStyle[globalSettings.colorMode]}
        timeUnit={settings.timeUnit}
        colorTheme={settings.colorMode}
        tooltipPosition={settings.tooltipPosition}
      />
      </div>
  )
}

  return (
    <>
      {
        loading
        ? <Loading/>
        : <View/>
      }
    </>
  )
}


export default Gantt;
