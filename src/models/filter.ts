import { Framework } from './framework';

export type FilterValue = string | number | (string | number)[] | undefined;
export interface FilterMap {
    [key: string]: FilterValue;
}

export interface FilterConfig {
    id: string;
    label: string;
}
export type FilterFn<T, V extends FilterValue> = (data: T, filterValue: V) => boolean;
export type FrameworkFilterFn = FilterFn<Framework, FilterValue>;

export interface LocalFilterConfig extends FilterConfig {
    filterFn: FrameworkFilterFn;
};

export type AnyFilterConfig = FilterConfig | LocalFilterConfig;
