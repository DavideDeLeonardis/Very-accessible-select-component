import { useState } from 'react';

import { SelectOption } from './types';
import Select from './components/Select';

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
            <div className="container-select">
               <h2 className="h2">Multiple Custom Selection</h2>
               <p className="h2p">
                  Possibility of <u>multiple</u> option selection.
               </p>
               <Select
                  multiple
                  value={value1}
                  options={options}
                  onChange={(option) => setValue1(option)}
               />
            </div>
            <div className="container-select">
               <h2 className="h2">Single Custom Selection</h2>
               <p className="h2p">Possibility of <u>single</u> option selection.</p>
               <Select
                  value={value2}
                  options={options}
                  onChange={(option) => setValue2(option)}
               />
            </div>
         </div>

         <div>
            <h3 className="h3">ACCESSIBILITY COMMANDS</h3>
            <p className="p">
               - Press <span>TAB</span> for highlight the select.
               <br />- Press <span>ENTER</span> or <span>SPACE</span> for open
               the dropdown.
               <br />- Move between options with <span>ARROWS</span>.
               <br />- Select options pressing <span>ENTER</span> or{' '}
               <span>SPACE</span>.
               <br />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- If option is alredy
               selected, select it again will remove it.
            </p>
         </div>
      </div>
   );
}

export default App;
