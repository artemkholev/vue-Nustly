export interface CheckboxType {
  id: number;
  text: string;
  textLink: string | null;
  checked: boolean;
  handlerErMessage: (_value: string) => void | null;
  trackAgreement: (_value: boolean) => void | null;
  handlerFilterValue: (id: number, _value: boolean) => void | null;
  handlerCheckedFlag: (value: boolean) => void | null;
  deleteValue: (value: string) => void | null;
  selectedFilters: { category: string[]; published: string[] } | null;
};