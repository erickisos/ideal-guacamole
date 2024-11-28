import { useQuery } from 'react-query';
import { Framework } from '../models';
import { FrameworksService } from '../services';

interface Props {
    filters: any;
    frameworksService: FrameworksService;
}
export const useFrameworks = ({ filters, frameworksService }: Props) => {
    const { data: frameworks, isLoading, error } = useQuery<Framework[]>({
        queryKey: ['frameworks', filters],
        queryFn: () => frameworksService.searchFrameworks(filters),
        // ! If your request depends on the existence of filters, use this:
        // enabled: !!filters
    });

    return {
        frameworks,
        isLoading,
        error
    }
}
