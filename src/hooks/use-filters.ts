import { partition, pick } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { getConfig, isLocalFilter } from '../logic';
import { AnyFilterConfig, FilterMap, Framework } from '../models';

interface Props {
    configurations: AnyFilterConfig[];
}

export const useFilters = ({ configurations }: Props) => {
    const [filters, setFilters] = useState<FilterMap>({});
    const [localFilterConfigurations, remoteFilterConfigurations] = useMemo(() => partition(configurations, isLocalFilter), [configurations]);
    const [localFilters, remoteFilters] = useMemo(() => [
        pick(filters, localFilterConfigurations.map(config => config.id)),
        pick(filters, remoteFilterConfigurations.map(config => config.id))],
        [filters, localFilterConfigurations, remoteFilterConfigurations]
    );

    const applyLocalFilters = useCallback(({ data }: { data: Framework }) => Object.entries(localFilters)
        .every(([id, value]) => {
            const config = getConfig(id, localFilterConfigurations);
            return config?.filterFn(data, value) ?? true;
        }),
        [localFilters, localFilterConfigurations]);

    return {
        filters,
        localFilters,
        remoteFilters,
        applyLocalFilters,
        setFilters
    }
};
