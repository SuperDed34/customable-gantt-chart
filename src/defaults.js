export const defaultGlobalSettings = {
  timeUnit: 'day',
  colorMode: 'light',
  tooltipPosition: 'top',
  globalStyle: {
    light: {
      gantt: {
        backgroundColor: 'white',
        color: 'black',
      },
      aside: {
        border: '1px solid #000000',
        color: 'black',
        fontWeight: 'bold'
      },
      header: {
        color: 'black',
        fontWeight: 'bold',
        borderLeft: '0.5px solid #000000',
        borderBottom: '0.5px solid #000000',
      },
      cell: {
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    dark: {
      gantt: {
        backgroundColor: 'black',
        color: 'white',
      },
      aside: {
        border: '1px solid #ffffff',
        color: 'white',
        fontWeight: 'bold'
      },
      header: {
        color: 'white',
        fontWeight: 'bold',
        borderLeft: '0.5px solid #ffffff',
        borderRight: '0px',
        borderBottom: '0.5px solid #ffffff',
      },
      cell: {
        borderBottom: '1px solid #ffffff',
        borderLeft: '1px solid #ffffff'
      }
    }
  }
}
export const defaultFieldSettings = {
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

export const noDefinedTasksPlaceholder = [
        {
          id: 1,
          label: 'No defined tasks',
          startDate: new Date('2024-05-01').valueOf(),
          endDate: new Date('2024-05-10').valueOf(),
          barStyle: {
            light: {
              position: 'absolute',
              width: '100%',
              height: '1900%',
              fontSize: '100px',
              backgroundColor: 'green',
              zIndex: '1',
              textAlign: 'center',
            },
            dark: {
              position: 'absolute',
              width: '100%',
              height: '1900%',
              fontSize: '100px',
              backgroundColor: 'light-green',
              zIndex: '1',
              textAlign: 'center',
            }
          }
        },
]
    
export const defaultBarStyle = {
  light: {
    backgroundColor: 'black',
    borderRadius: '15px',
    height: '75%',
    border: 'red'
  },
  dark: {
    backgroundColor: 'white',
    borderRadius: '15px',
    height: '75%',
    border: 'red'
  }
};
export const defaultLabelStyle = {
  light: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '0.9rem'
  },
  dark: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: '0.9rem'
  }
  
}