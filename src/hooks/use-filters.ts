import { useCallback, useMemo, useState } from 'react';

export interface FilterConfig {
    id: string;
    isLocal?: boolean;
    filterFn?: (data: any, filterValue: any) => boolean;
};
export type Filter = {
    filterFn: any;
    id: string;
    value: string | number | boolean | undefined;
};

interface Props {
    configurations: FilterConfig[];
}

export const useFilters = ({ configurations }: Props) => {
    const [filters, setFilters] = useState({});

    const isRemoteFilter = useCallback((id: string) => {
        const config = configurations.find((c) => c.id === id);
        return !config?.isLocal;
    }, [configurations]);

    const isLocalFilter = useCallback((id: string) => {
        const config = configurations.find((c) => c.id === id);
        return !!config?.isLocal;
    }, [configurations]);

    const applyLocalFilters = useCallback(({ data }: { data: any }) => {
        return Object.entries(filters)
            .filter(([id, value]) => isLocalFilter(id) && value !== undefined)
            .every(([id, value]) => {
                const config = configurations.find((c) => c.id === id);
                return typeof config?.filterFn === 'function' ? config?.filterFn(data, value) : true;
            });
    }, [filters, isLocalFilter, configurations]);

    const remoteFilterValues = useMemo(() => {
        return Object.entries(filters)
            .filter(([id, value]) => isRemoteFilter(id) && value !== undefined);
    }, [filters, configurations]);

    return {
        filters,
        remoteFilterValues,
        applyLocalFilters,
        setFilters
    }
};
