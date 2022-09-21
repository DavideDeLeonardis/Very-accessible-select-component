import { useEffect, useRef, useState } from 'react';

import { SelectOption, SelectProps } from '../types';
import useAccessibility from '../hooks/useAccessibility';

import classes from './select.module.scss';

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
   const [selectIsOpen, setSelectIsOpen] = useState(false);
   // Highlighted options
   const [highlightedIndex, setHighlightedIndex] = useState(0);
   // For keyboard events
   const containerRef = useRef<HTMLDivElement>(null);

   const openSelectHandler = () => setSelectIsOpen((prev) => !prev);

   const closeSelecthandler = () => setSelectIsOpen(false);

   // Select option
   const selectOption = (option: SelectOption) => {
      if (multiple)
         if (value.includes(option))
            onChange(value.filter((o) => o !== option));
         else onChange([...value, option]);
      else if (option !== value) onChange(option);

      setSelectIsOpen(false);
   };

   // Accessibility hook
   useAccessibility({
      containerRef,
      selectIsOpen,
      setSelectIsOpen,
      selectOption,
      options,
      highlightedIndex,
      setHighlightedIndex,
   });

   // Check if option is selected
   const isOptionSelected = (option: SelectOption) => {
      return multiple ? value.includes(option) : option === value;
   };

   // Clear options
   const clearOptions = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      multiple ? onChange([]) : onChange(undefined);
   };

   // Reset highlighted option when select closes
   useEffect(() => {
      if (selectIsOpen) setHighlightedIndex(0);
   }, [selectIsOpen]);

   const optionsElements = options.map((option, index) => (
      <li
         key={option.value}
         className={`
				${classes.option} 
				${isOptionSelected(option) ? classes.selected : ''}
				${index === highlightedIndex ? classes.highlighted : ''}
			`}
         onClick={(e) => {
            e.stopPropagation();
            selectOption(option);
         }}
         onMouseEnter={() => setHighlightedIndex(index)}
      >
         {option.label}
      </li>
   ));

   return (
      <div
         className={classes.container}
         tabIndex={0}
         ref={containerRef}
         onClick={openSelectHandler}
         onBlur={closeSelecthandler}
      >
         <span className={classes.value}>
            {multiple
               ? value.map((v) => (
                    <button
                       key={v.value}
                       onClick={(e) => {
                          e.stopPropagation();
                          selectOption(v);
                       }}
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
         <ul
            className={`
					${classes.options} 
					${selectIsOpen ? classes.show : ''}
				`}
         >
            {optionsElements}
         </ul>
      </div>
   );
};

export default Select;
