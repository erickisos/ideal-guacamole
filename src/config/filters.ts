import { filterByDescription, filterByName } from '../logic';
import { AnyFilterConfig, FilterValue, Framework } from '../models';

/** This config allows to create different types of filters:
 *
 * 1. Local filters are applied on the client side, without making any request to the server.
 * 2. Remote filters are applied on the server side, making a request to the server.
 */
export const filtersConfig: AnyFilterConfig[] = [
    {
        id: 'name',
        label: 'Name',
        filterFn: (data: Framework, value: FilterValue) => filterByName(data, value as string)
    },
    {
        id: 'version',
        label: 'Version',
    },
    {
        id: 'description',
        label: 'Description',
        filterFn: (data: Framework, value: FilterValue) => filterByDescription(data, value as string)
    }
]
