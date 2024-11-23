import { Framework } from './types';

export type Query = {
    [key in keyof Framework]: string;
};

export interface FrameworksService {
    searchFrameworks(query: Query): Promise<Framework[]>;
}
