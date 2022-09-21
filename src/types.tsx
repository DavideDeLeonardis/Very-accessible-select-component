export type SelectOption = {
   label: string;
   value: string | number;
};

export type SingleSelectProps = {
   multiple?: false;
   value?: SelectOption;
   onChange: (value: SelectOption | undefined) => void;
};

export type MultipleSelectProps = {
   multiple: true;
   value: SelectOption[];
   onChange: (value: SelectOption[]) => void;
};

export type SelectProps = {
   options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export type AccessiblityProps = {
   containerRef: React.RefObject<HTMLDivElement>;
   selectIsOpen: boolean;
   setSelectIsOpen: (value: any) => void;
   selectOption: (value: SelectOption) => void;
   options: SelectOption[];
   highlightedIndex: number;
   setHighlightedIndex: (value: number) => void;
};
