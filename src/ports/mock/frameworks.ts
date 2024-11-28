import { Framework } from '../../models';
import { FrameworksService, Query } from '../../services';

const mockPackages: Framework[] = [
    { id: '1', name: 'React', version: '17.0.2', updatedAt: new Date() },
    { id: '2', name: 'Vue', version: '3.0.0' },
    { id: '3', name: 'Angular', version: '12.0.0' },
    { id: '4', name: 'Svelte', version: '3.38.2', createdAt: new Date(), description: 'The magical disappearing UI framework' },
    { id: '5', name: 'Ember', version: '3.27.0', description: 'A framework for ambitious web developers' },
    { id: '6', name: 'Backbone', version: '1.4.0', description: 'Give your JS App some Backbone with Models, Views, Collections, and Events' },
    { id: '7', name: 'Aurelia', version: '1.3.0', description: 'Aurelia is a JavaScript client framework for web, mobile and desktop.' },
    { id: '8', name: 'Meteor', version: '2.3.6', description: 'An ultra-simple, database-everywhere, data-on-the-wire, pure-Javascript web framework.' },
    { id: '9', name: 'Polymer', version: '3.0.0', description: 'Build modern apps using web components' },
    { id: '10', name: 'Mithril', version: '2.0.4', description: 'A modern client-side Javascript framework for building Single Page Applications' },
]

const filterFrameworks = (frameworks: Framework[], filters?: Query): Framework[] => {
    /**
     * This function represents a server-side filtering of data.
     */
    console.info('Remote filters', filters);
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

export const MockFrameworksService: FrameworksService = {
    searchFrameworks: (filters: Query): Promise<Framework[]> => {
        const delay = Math.random() * 1000; // Random delay between 0 and 1s
        const errorProbability = 0.01; // 1% de probabilidad de error
        console.info('Fetching data from the backend with filters:', filters);
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
