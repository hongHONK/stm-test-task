import { useState, useEffect, useMemo } from 'react'
import { User } from '../../utils/types';
import { SearchInput } from '../search-input/SearchInput';
import { UsersTable } from '../users-table/UsersTable';
import { Loader } from '../loader/Loader';
import styles from './App.module.css';

type UserState = {
  data: User[];
  isLoaded: boolean;
  error: null | Error;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserState>({
    data: [],
    isLoaded: false,
    error: null,
  });

  const filtredUsers = useMemo(() => {
    return users.data.filter((item) => {
      const fullName = `${item.name.first} ${item.name.last}`;

      return fullName.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
    })
  }, [users.data, searchQuery]);

  useEffect(() => {
    if (!users.isLoaded && !users.error) {
      const abortController = new AbortController();

      fetch('https://randomuser.me/api/?results=15', { signal: abortController.signal })
        .then(response => response.json())
        .then(data => setUsers((prevState) => ({ ...prevState, isLoaded: true, data: data.results })))
        .catch(err => setUsers((prevState) => ({ ...prevState, isLoaded: false, error: err.code === 20 ? null : err })));

      return () => abortController.abort();
    }
  }, []);

  return (
    <main className={styles.container}>
      {users.isLoaded ? (
        <>
          <SearchInput setSerchQwery={setSearchQuery} />
          <UsersTable data={filtredUsers} />
        </>
      ) : <Loader />}
    </main>
  )
}

export default App
