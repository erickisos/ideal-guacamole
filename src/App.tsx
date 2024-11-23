import './App.css';
import { Dashboard, Filterbar } from './components';
import { FilterConfig } from './hooks';
import { useFilteredFrameworks } from './hooks/use-filtered-frameworks';
import { mockFrameworksServiceImpl } from './modules';

/** This config allows to create different types of filters:
 *
 * 1. Local filters are applied on the client side, without making any request to the server.
 * 2. Remote filters are applied on the server side, making a request to the server.
 */
const filtersConfig: FilterConfig[] = [
  {
    id: 'name',
    isLocal: true,
    filterFn: (data: any, filterValue: any) => {
      return data.name.toLowerCase().includes(filterValue.toLowerCase());
    }
  },
  {
    id: 'version',
  }
]

function App() {
  const { filteredFrameworks: frameworks, isLoading, error, filters, setFilters } = useFilteredFrameworks({ filtersConfig, frameworksService: mockFrameworksServiceImpl });

  const handleFilterChanges = (filters: any) => {
    console.info('We received an event of filters changes', filters);
    setFilters(filters);
  }

  return (
    <>
      <h1>Framework Manager</h1>
      <Filterbar filters={filters} onFiltersChanged={handleFilterChanges} />
      <Dashboard frameworks={frameworks} isLoading={isLoading} error={error as Error} />
    </>
  )
}

export default App
