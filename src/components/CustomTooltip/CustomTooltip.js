import React, {createContext, useContext } from 'react'
import Tooltip from '@mui/material/Tooltip'

const ChildContext = createContext()

const CustomTooltip = ({children}) => {

  const childComponent = React.Children.toArray(children)

  return (
    <ChildContext.Provider value={childComponent}>
      <Tooltip tittle='test'>
        {children}
      </Tooltip>
    </ChildContext.Provider>
    )
}


const useChildComponents = (ChildContext) => {
  return useContext(ChildContext)
};

export { CustomTooltip, useChildComponents}