import { useMemo } from 'react';
import { FrameworksService } from '../modules';
import { FilterConfig, useFilters } from './use-filters';
import { useFrameworks } from './use-frameworks';

interface Props {
    filtersConfig: FilterConfig[];
    frameworksService: FrameworksService;
}

export const useFilteredFrameworks = ({ filtersConfig, frameworksService }: Props) => {
    const { filters, remoteFilterValues, applyLocalFilters, setFilters } = useFilters({ configurations: filtersConfig });
    const { frameworks, isLoading, error } = useFrameworks({ frameworksService, filters: remoteFilterValues });

    const filteredFrameworks = useMemo(() => {
        return frameworks?.filter((f) => applyLocalFilters({ data: f }));
    }, [frameworks, applyLocalFilters]);

    return { filteredFrameworks, isLoading, error, filters, setFilters };

};
