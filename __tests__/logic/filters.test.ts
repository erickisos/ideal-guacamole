import { describe, expect, it } from 'vitest';
import { isLocalFilter, getConfig, filterByName, filterByDescription } from '../../src/logic/filters';
import { AnyFilterConfig, FilterConfig, LocalFilterConfig, Framework } from '../../src/models';

describe('isLocalFilter', () => {
    it('should return true for a LocalFilterConfig', () => {
        const localFilterConfig: LocalFilterConfig = {
            id: 'local',
            filterFn: () => true,
            label: ''
        };
        expect(isLocalFilter(localFilterConfig)).toBe(true);
    });

    it('should return false for a non-LocalFilterConfig', () => {
        const filterConfig: FilterConfig = {
            id: 'non-local',
            label: ''
        };
        expect(isLocalFilter(filterConfig)).toBe(false);
    });
});

describe('getConfig', () => {
    const configs: AnyFilterConfig[] = [
        { id: 'config1', label: 'Config 1' },
        { id: 'config2', label: 'Config 2' }
    ];
    it('should return the correct configuration by id', () => {
        expect(getConfig('config1', configs)).toEqual({ id: 'config1', label: 'Config 1' });
    });

    it('should return undefined if the configuration is not found', () => {
        expect(getConfig('config3', configs)).toBeUndefined();
    });
});

describe('filterByName', () => {
    it('should return true if the name includes the value', () => {
        const framework: Framework = {
            name: 'React', description: 'A JavaScript library for building user interfaces',
            id: '',
            version: ''
        };
        expect(filterByName(framework, 'react')).toBe(true);
    });

    it('should return false if the name does not include the value', () => {
        const framework: Framework = {
            name: 'Angular', description: 'A platform for building mobile and desktop web applications',
            id: '',
            version: ''
        };
        expect(filterByName(framework, 'react')).toBe(false);
    });
});

describe('filterByDescription', () => {
    it('should return true if the description includes the value', () => {
        const framework: Framework = {
            name: 'Vue', description: 'The Progressive JavaScript Framework',
            id: '',
            version: ''
        };
        expect(filterByDescription(framework, 'progressive')).toBe(true);
    });

    it('should return false if the description does not include the value', () => {
        const framework: Framework = {
            name: 'Svelte', description: 'Cybernetically enhanced web apps',
            id: '',
            version: ''
        };
        expect(filterByDescription(framework, 'react')).toBe(false);
    });

    it('should return false if the description is undefined', () => {
        const framework: Framework = {
            name: 'Ember', description: undefined,
            id: '',
            version: ''
        };
        expect(filterByDescription(framework, 'anything')).toBe(false);
    });
});
