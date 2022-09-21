import { useState } from 'react';

import Select from './components/Select';
import { SelectOption } from './types';

import './index.scss';

const options = [
   { label: 'First', value: 1 },
   { label: 'Second', value: 2 },
   { label: 'Third', value: 3 },
   { label: 'Fourth', value: 4 },
   { label: 'Fifth', value: 5 },
   { label: 'Sixth', value: 6 },
];

function App() {
   const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
   const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

   return (
      <div className="container">
         <div>
            <h2>Multiple Select</h2>
            <Select
               multiple
               value={value1}
               options={options}
               onChange={(option) => setValue1(option)}
            />
         </div>
         <div>
            <h2>Normal Select</h2>
            <Select
               value={value2}
               options={options}
               onChange={(option) => setValue2(option)}
            />
         </div>
      </div>
   );
}

export default App;
