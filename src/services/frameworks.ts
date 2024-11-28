import { Framework } from '../models';

export type Query = {
    [key in keyof Framework]: string;
};

/**
 * Services should only return internal models, not schema interfaces.
 */
export interface FrameworksService {
    searchFrameworks(query: Query): Promise<Framework[]>;
}
