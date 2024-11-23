import { Framework, FrameworksService, Query } from '../domain';

const mockPackages: Framework[] = [
    { id: '1', name: 'React', version: '17.0.2', updatedAt: new Date() },
    { id: '2', name: 'Vue', version: '3.0.0' },
    { id: '3', name: 'Angular', version: '12.0.0' },
    { id: '4', name: 'Svelte', version: '3.38.2', createdAt: new Date(), description: 'The magical disappearing UI framework' },
    { id: '5', name: 'Ember', version: '3.27.0', description: 'A framework for ambitious web developers' },
]

const filterFrameworks = (frameworks: Framework[], filters?: Query): Framework[] => {
    /**
     * This function represents a server-side filtering of data.
     */
    console.info('Filtering frameworks with filters', filters);
    return frameworks.filter((pkg) => {
        if (!filters) {
            return true;
        }
        return Object.entries(filters)
            .filter(([_, value]) => value)
            .every(([key, value]) => {
                return key in pkg && pkg[key as keyof Framework]?.toString().includes(value);
            });
    });
}

export const mockFrameworksServiceImpl: FrameworksService = {
    searchFrameworks: (filters: Query): Promise<Framework[]> => {
        const delay = Math.random() * 1000; // Random delay between 0 and 1s
        const errorProbability = 0.01; // 1% de probabilidad de error
        console.info('If you are watching this, it means that we are trying to fetch frameworks');
        const filteredFrameworks = filterFrameworks(mockPackages, filters);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < errorProbability) {
                    reject(new Error('Error al buscar frameworks'));
                } else {
                    resolve(filteredFrameworks);
                }
            }, delay);
        });
    },
}
