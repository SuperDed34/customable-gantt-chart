import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Gantt from './Gantt'

const root = ReactDOM.createRoot(document.getElementById('root'))

const items = [
  {
    id: 1,
    label: 'Task 1',
    startDate: new Date('2024-05-01').valueOf(),
    endDate: new Date('2024-05-10').valueOf(),
  },
    {
    id: 2,
    label: 'Task 2',
    startDate: new Date('2024-05-15').valueOf(),
    endDate: new Date('2025-05-15').valueOf(),
  },
  {
    id: 3,
    label: 'Task 3',
    startDate: new Date('2024-06-19').valueOf(),
    endDate: new Date('2024-06-22').valueOf(),
  },
  {
    id: 4,
    label: 'Task штеукьшвфеу вфывп фвыап ьджл фпфот п лтф дждплттжддыотылоп джллтаыдп ugj',
    startDate: new Date(1717200000000).valueOf(),
    endDate: new Date(1717200000000).valueOf(),
  },
    {
    id: 5,
    label: 'Task штеукьшвфеу вфывп фвыап ьджл фпфот п лтф дждплттжддыотылоп джллтаыдп ugj',
    startDate: new Date('2024-06-22').valueOf(),
    endDate: new Date('2024-09-22').valueOf(),
  },

]

root.render(
  <>
    <Gantt
      items={items}
      fieldSettings={undefined}
      globalSettings={{colorMode:'light'}}
      />
  </>
);




