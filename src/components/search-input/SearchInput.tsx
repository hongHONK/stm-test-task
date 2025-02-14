import useDebounce from '../../hooks/useDebounce'
import clsx from '../../utils/clsx'
import styles from './SearchInput.module.css'

type SearchInputProps = {
    className?: string;
    setSerchQwery: (value: string) => void;
};

export function SearchInput({ className, setSerchQwery, ...props }: SearchInputProps) {
    const debouncedSerchQwery = useDebounce((value: unknown) => {
        if (typeof value === 'string') {
            setSerchQwery(value);
        }
    }, 500);

    return (
        <form className={clsx(styles.search, className)} {...props}>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => debouncedSerchQwery(e.target.value)}
            />
            <button
                type="reset"
                onClick={() => { setSerchQwery('') }}
            >Сбросить</button>
        </form>
    )
}