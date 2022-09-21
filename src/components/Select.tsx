import { useEffect, useState } from 'react';

import { SelectOption, SelectProps } from '../types';

import classes from './select.module.scss';

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   // Highlighted options
   const [highlightedIndex, setHighlightedIndex] = useState(0);

   const openSelectHandler = () => setIsOpen((prev) => !prev);

   const closeSelecthandler = () => setIsOpen(false);

   // Clear options
   const clearOptions = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      multiple ? onChange([]) : onChange(undefined);
   };

   // Select option
   const selectOption = (
      e: React.MouseEvent<HTMLElement>,
      option: SelectOption
   ) => {
      e.stopPropagation();

      if (multiple)
         if (value.includes(option))
            onChange(value.filter((o) => o !== option));
         else onChange([...value, option]);
      else if (option !== value) onChange(option);

      setIsOpen(false);
   };

   // Check if option is selected
   const isOptionSelected = (option: SelectOption) => {
      return multiple ? value.includes(option) : option === value;
   };

   // Reset highlighted option when select closes
   useEffect(() => {
      if (isOpen) setHighlightedIndex(0);
   }, [isOpen]);

   const optionsElements = options.map((option, index) => (
      <li
         key={option.value}
         className={`
				${classes.option} 
				${isOptionSelected(option) ? classes.selected : ''}
				${index === highlightedIndex ? classes.highlighted : ''}
			`}
         onClick={(e) => selectOption(e, option)}
         onMouseEnter={() => setHighlightedIndex(index)}
      >
         {option.label}
      </li>
   ));

   return (
      <div
         className={classes.container}
         tabIndex={0}
         onClick={openSelectHandler}
         onBlur={closeSelecthandler}
      >
         <span className={classes.value}>
            {multiple
               ? value.map((v) => (
                    <button
                       key={v.value}
                       onClick={(e) => selectOption(e, v)}
                       className={classes['option-badge']}
                    >
                       {v.label}
                       <span className={classes['remove-btn']}>&times;</span>
                    </button>
                 ))
               : value?.label}
         </span>
         <button
            className={classes['clear-btn']}
            onClick={(e) => clearOptions(e)}
         >
            &times;
         </button>
         <div className={classes.divider}></div>
         <div className={classes.caret}></div>
         <ul className={`${classes.options} ${isOpen ? classes.show : ''}`}>
            {optionsElements}
         </ul>
      </div>
   );
};

export default Select;
