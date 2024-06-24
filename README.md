# customable-gantt-chart

# Gantt Chart Custom Module

## Overview

Welcome to the customable-gantt-chart! This open-source project provides a flexible and easy-to-use solution for creating and managing Gantt charts. The module is designed with customization in mind, allowing users to tailor it to their specific needs. Whether you're a hobbyist or a professional, this tool can help you visualize project timelines and track progress efficiently. Please, notice that I not professional developer and only studying. If you find some bugs, issues or you are have thought about functionality improvement - feel free and create PullRequest. 

## Features

- **Easy Integration**: Quickly integrate the Gantt chart module into your existing projects.
- **Highly Customizable**: Modify the chart's appearance and functionality to suit your needs.
- **Interactive Elements**: Add, remove, and edit tasks directly on the chart.
- **Responsive Design**: The chart adjusts seamlessly to different screen sizes.
- **Lightweight**: Minimal dependencies ensure fast performance and ease of use.

## Installation from GitHub:

To get started, you can fork this repository and clone the repository from your GitHub:

```sh
git clone https://github.com/SuperDed34/customable-gantt-chart.git
```

istall all dependencies:

```sh
npm install
```

For using in your project import ''Gantt'' component from components:

```sh
import Gantt from './Gantt'
```

Gantt component get 3 objects as props = **items**, **fieldSetings**, **globalSettings**, each prop have default value:

```sh
    <Gantt
      items={items}
      fieldSettings={fieldSettings}
      globalSettings={globalSettings}
      />
```

**Items Object:**
Items prop contains array of objects. Each object is equial 1 task, if items is undefined default value from default.js will be taken. You can customize default appiarence. Styles could be an centralized object or customized for each bar. Example of stucture:

```sh
    export const items = [
        {
          id: 1, **MUST be an unique ordered with step + 1**
          label: 'No defined tasks',
          startDate: new Date('2024-05-01').valueOf(), **Must be a timestamp in milliseconds.**
          endDate: new Date('2024-05-10').valueOf(),   **Must be a timestamp in milliseconds.**
          barStyle: { **Two objects with light and dark theme styles, default styles below, also few default stylers hardcoded in .css files.**
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
          },
          labelStyle: { **Two objects with styles for label of each bar.**
            light:{
              color: '#000000',
            },
            dark:{
              color: '#000000',
            }
          }
        },

]
```

**Field Settings object:**
fieldSettings prop contains an object with settings for field, example below:

```sh
    export const defaultFieldSettings = {
      rowHeight: 50, **Rows height.**
      emptyColumnsNumber: 20, **Number of empty columns before and after affecterd columns.**
      minRows: 10, **Minimum rows. If minRows less than number then add empty to fill that.**
      listSettings: { **Settings for aside component.**
          hideList: false, **Hides aside.**
          listPosition: 'left', **Could be left or right. Change position of aside.**
          listWdt: 200, **Width of a whole aside.**
          listHeaderLabel: 'Tasks'
    }
}

```

**Global Settings object:**
globalSettings prop gets an object with global settings and styles. Example below: 

```sh
    export const defaultGlobalSettings = {
  timeUnit: 'day', **Disblayed timeUnit, could be day|month|year**
  colorMode: 'light'**Color mode, could be light|dark**,
  tooltipPosition: 'top' **Tooltip position, could be left|top|right|bottom**,
  globalStyle: {**Two objects with light and dark theme styles, default styles below, also few default stylers hardcoded in .css files.**
    light: {
      gantt: { **Styles for whole app**
        ---some styles
      },
      aside: { **Styles for aside only**
        ---some styles
      },
      header: { **Styles for headers only**
        ---some styles
      },
      cell: { **Styles for each cell in pre-rendering**
        ---some styles
      }
    },
    dark: {
        ---some styles for same blocks
    }
  }
}
```

Each object and value into object has default value. All default values contain inti defailt.js vile and you can customize it instead passing new props. Work on the project continues. Below you can find a list of improvements and fixes that will be implemented in the future:

|Feature\Bug?|Tittle|Description|Status|
|:-------|:---------|:----------|:----:|
|Feature|Translation from native new Date to moment.js|Since part of moment.js is already in use, there is no need to keep the entire application on the native version.|in Progress|
|Feature|Introduction of the universal unit of time - hour.|At the moment, the time unit is established both technically and stylistically. This will make it difficult to work with drag and drop functionality in the future. The transition to a universal technical unit will allow you to implement drag and drop as well as correct visual positioning on all time units.|On Hold|
