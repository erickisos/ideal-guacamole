import { AnyFilterConfig, FilterMap, FilterValue } from '../models';

interface Props {
    filters?: FilterMap;
    configurations?: AnyFilterConfig[];
    onFiltersChanged: (filters: FilterMap) => void;
}

const FilterInput = ({ config, value, onChange }: { config: AnyFilterConfig, value: FilterValue, onChange: (v: string) => void }) => {
    return (
        <input type='text' placeholder={config.label} value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

export const Filterbar = ({ filters, configurations, onFiltersChanged }: Props) => {
    return (
        <div>
            {configurations?.map((config) => <FilterInput key={config.id} config={config} value={filters?.[config.id] || ''} onChange={(v) => onFiltersChanged({ ...filters, [config.id]: v })} />)}
        </div>
    )
}
