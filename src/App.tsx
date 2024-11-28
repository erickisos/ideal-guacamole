import { useMemo } from 'react';
import './App.css';
import { Dashboard, Filterbar } from './components';
import { filtersConfig } from './config';
import { useFilters, useFrameworks } from './hooks';
import { MockFrameworksService } from './ports';

function App() {
  const { filters, remoteFilters, applyLocalFilters, setFilters } = useFilters({ configurations: filtersConfig });
  const { frameworks, isLoading, error } = useFrameworks({ filters: remoteFilters, frameworksService: MockFrameworksService });
  const filteredFrameworks = useMemo(() => frameworks?.filter((f) => applyLocalFilters({ data: f })) ?? [], [frameworks, applyLocalFilters]);

  return (
    <>
      <h1>Framework Manager</h1>
      <Filterbar filters={filters} configurations={filtersConfig} onFiltersChanged={(f) => setFilters(f)} />
      <Dashboard frameworks={filteredFrameworks} isLoading={isLoading} error={error as Error} />
    </>
  )
}

export default App
