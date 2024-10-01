
import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import styles from "./Seach.module.scss"

interface SearchProps {
  onChange: (query: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
    const [query, setQuery] = useState<string>('');
  

  return (
    <div className={styles.searchContainer}>
      <span className={styles.icon}></span>
    <input className={styles.input} 
        type="text" 
        value={query}
        placeholder="Search" 
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newQuery = event.target.value;
            setQuery(newQuery);
            onChange(newQuery); 
          }}
    />
    </div>
  );
};

export default Search;
