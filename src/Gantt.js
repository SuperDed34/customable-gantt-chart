import { useEffect, useState, useMemo } from 'react';
import Field from './components/Field/Field';
import './Gantt.css';
import Aside from './components/Aside/Aside';
import Loading from './components/Loading/Loading';
import { defaultFieldSettings, defaultGlobalSettings, noDefinedTasksPlaceholder } from './defaults';

const Gantt = ({
  items = noDefinedTasksPlaceholder,
  fieldSettings,
  globalSettings
}) => {

  fieldSettings = fieldSettings ? fieldSettings : defaultFieldSettings
  const [aside, setAside] = useState()
  const [settings, setSettings] = useState()
  const [loading, setLoading] = useState(true)
  const [globalStyle, setGlobalStyle] = useState()

  useEffect(() => {
    setSettings({ ...defaultGlobalSettings, ...globalSettings })
    setAside(fieldSettings.listSettings.listPosition)
    setGlobalStyle({...defaultGlobalSettings.globalStyle, ...globalSettings.globalStyle})
    setLoading(false)
  }, [globalSettings.globalStyle, globalSettings, fieldSettings.listSettings.listPosition])

  const listPos = aside === 'left' ? 'row' : 'row-reverse'
  console.log(globalStyle)
  const viewStyle = useMemo(() => ({
    ...defaultGlobalSettings.globalStyle,
    ...globalSettings.globalStyle,
    flexDirection: listPos,
    margin: '0 auto',
    width: '90vw',
    height: '90vh',
    display: 'flex',
  }), [globalSettings.globalStyle, listPos]);

  const View = () => {
    return (
      <div className="gantt" style={viewStyle}>
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
      {loading ? <Loading /> : <View />}
    </>
  );
}

export default Gantt;

