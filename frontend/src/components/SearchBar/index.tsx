import { FC, useRef, useState, useEffect, KeyboardEvent } from 'react';
import './style.css';
interface SearchBarProps {
  token: string;
  onChoose: (user: object) => void;
}
const SearchBar: FC<SearchBarProps> = ({ token, onChoose }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    const searchTerm = searchInputRef.current?.value;
    if (!searchTerm) {
      return;
    }

    fetch(
      `/api/search/${searchTerm}`,
      {
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + token
        }
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json().then(
            data => {
              setSearchResults(data);
            }
          );
        }
        console.log(response.status);
      });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target as Node)
    ) {
      setSearchResults([]);
      searchInputRef.current.value = "";
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div id="search">
      <input
        type="text"
        placeholder="Search for users..."
        ref={searchInputRef}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div className="search_dropdown">
          {searchResults.map(result => (
            <div
              key={result._id}
              onClick={
                () => {
                  onChoose({ _id: result._id, fullname: result.fullname })
                }}>
              <img src={result.avatar} alt="Avatar" />
              {result.fullname}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;