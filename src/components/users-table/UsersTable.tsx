import clsx from '../../utils/clsx';
import formatDate from '../../utils/formatDate';
import styles from './UsersTable.module.css';
import { User } from '../../utils/types';
import { WithTooltipImg } from '../hocs/with-tooltip/withTooltip';

type UsersTableProps = {
    className?: string;
    data: User[];
}

export function UsersTable({ className, data, ...props }: UsersTableProps) {


    return (
        <>

            <table className={clsx(styles.table, className)} {...props}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Picture</th>
                        <th>Location</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Register date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ?
                        <tr><td>No results.</td></tr>
                        : data.map(user => (
                            <tr key={user.login.uuid}>
                                <td>{`${user.name.first} ${user.name.last}`}</td>
                                <td>
                                    <WithTooltipImg
                                        tooltipContent={<img src={user.picture.medium} />}
                                        src={user.picture.thumbnail}
                                    />
                                </td>
                                <td>{`${user.location.state} ${user.location.city}`}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{formatDate(user.registered.date)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}
