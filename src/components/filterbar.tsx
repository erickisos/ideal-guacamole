import { useState } from 'react';

interface Props {
    filters?: any;
    onFiltersChanged: (filters: any) => void;
}

export const Filterbar = ({ filters, onFiltersChanged }: Props) => {
    const [name, setName] = useState(filters?.name);
    const [version, setVersion] = useState(filters?.version);

    return (
        <div>
            <input type="text" placeholder="Search by name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Search by version" value={version} onChange={(e) => setVersion(e.target.value)} />
            <button onClick={() => onFiltersChanged({ name, version })}>Apply</button>
        </div>
    )
}
