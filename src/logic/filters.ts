import { AnyFilterConfig, FilterConfig, Framework, LocalFilterConfig } from '../models';

export const isLocalFilter = (config: FilterConfig): config is LocalFilterConfig => {
    const casted = config as LocalFilterConfig;
    return casted.filterFn !== undefined && typeof casted.filterFn === 'function';
}

export const getConfig = <T extends AnyFilterConfig>(id: string, configurations: T[]): T | undefined => {
    return configurations.find((config) => config.id === id);
}

export const filterByName = (data: Framework, value: Framework['name']): boolean =>
    data.name.toLowerCase().includes(value.toLowerCase())

export const filterByDescription = (data: Framework, value: string): boolean =>
    data.description?.toLowerCase()?.includes(value.toLowerCase()) ?? false;
