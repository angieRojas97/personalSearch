import SearchBox from "./components/SearchBox";
import {useState, useEffect} from "react";

import "./style.css";
import SearchResults from "./components/SearchResults";

export default function Search() {
    const [isAtTop, setIsAtTop] = useState(false);
    const [results, setResults] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
        };

        getUsers().catch(null);
    }, []);

    const handleCloseSearch = () => {
        setIsAtTop(false);
        setResults([]);
    };

    const handleSearchClick = (searchText) => {
        debugger;
        setIsAtTop(true);
        if (userData?.length) {
            const filteredData = userData.filter((value) => (
                value.name.includes(searchText) ||
                value.phone.includes(searchText) ||
                value.email.includes(searchText) ||
                value.username.includes(searchText)
            )
        );
        debugger;
        setResults(filteredData);
        }
    };


    return(
        <div className={'search ${isAtTop ? "search--top" : "search--center"}'}>
            <SearchBox
             onSearch={handleSearchClick}
             onClose={handleCloseSearch}
             isSearching={isAtTop}
            />
            <SearchResults results={results} isSearching={isAtTop} />
        </div>
    );
}