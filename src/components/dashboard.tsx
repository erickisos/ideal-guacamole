import { Framework } from '../models';

export interface DashboardProps {
    frameworks: Framework[];
    isLoading?: boolean;
    error?: Error;
}

const Row = ({ framework }: { framework: Framework }) => (
    <tr>
        <td>{framework.name}</td>
        <td>{framework.version}</td>
        <td>{framework.updatedAt?.toLocaleDateString()}</td>
        <td>{framework.description}</td>
    </tr>
);

/**
 * This component is responsible of rendering all the frameworks we receive.
 *
 * Currently, we don't have any interaction with the individual rows, but
 * in the future we might consider adding some individual or bulk actions.
 **/
export const Dashboard = ({ frameworks, isLoading, error }: DashboardProps) => {
    const hasError = !!error;
    return (
        <>
            {!isLoading && (
                frameworks?.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Version</th>
                                <th>Updated At</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {frameworks?.map((framework) => (
                                <Row key={framework.id} framework={framework} />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No frameworks found</div>
                )
            )}
            {isLoading && <div>Loading...</div>}
            {hasError && <div>Error: {error?.message}</div>}
        </>
    )
}
