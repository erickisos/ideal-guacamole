import { useState } from 'react';
import { useQuery } from 'react-query';
import { Framework, FrameworksService } from '../modules';

interface Props {
    filters: any;
    frameworksService: FrameworksService;
}

export const useFrameworks = ({ filters, frameworksService }: Props) => {
    const [frameworks, setFrameworks] = useState<Framework[]>([]);

    const { isLoading, error } = useQuery(['frameworks', filters], () => frameworksService.searchFrameworks(filters), {
        onSuccess: (data) => {
            setFrameworks(data);
        }
    });

    return {
        frameworks,
        isLoading,
        error,
        setFrameworks
    }
}
