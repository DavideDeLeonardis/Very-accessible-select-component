import { useEffect } from 'react';

import { AccessiblityProps } from '../types';

const useAccessibility = ({
   containerRef,
   selectIsOpen,
   setSelectIsOpen,
   selectOption,
   options,
   highlightedIndex,
   setHighlightedIndex,
}: AccessiblityProps) => {
   useEffect(() => {
      const current = containerRef.current;
		
      const handler = (e: KeyboardEvent) => {
         if (e.target !== current) return;

         switch (e.code) {
            // Enter / Space
            case 'Enter':
            case 'Space':
               setSelectIsOpen((prev: any) => !prev);
               if (selectIsOpen) selectOption(options[highlightedIndex]);
               break;

            // ArrowUp / ArrowDown
            case 'ArrowUp':
            case 'ArrowDown': {
               if (!selectIsOpen) {
                  setSelectIsOpen(true);
                  break;
               }

               const newValue =
                  highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
               if (newValue >= 0 && newValue < options.length)
                  setHighlightedIndex(newValue);
               break;
            }

            // Escape
            case 'Escape':
               setSelectIsOpen(false);
               break;
         }
      };

      current?.addEventListener('keydown', handler);

      return () => {
         current?.removeEventListener('keydown', handler);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectIsOpen, highlightedIndex, options]);
};

export default useAccessibility;
