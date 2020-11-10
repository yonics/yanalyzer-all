import React, {useState} from 'react';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Analyzer.css';

function Analyzer() {

    const [values, setValues] = useState({
        searchField: '',
        searchResults: []
    });

    const handleSearchChange = event => {
        setValues({ ...values, searchField: event.target.value });
    }

    const clickSearch = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/search`,
            data: {searchField: values.searchField}
          })
          .then( newSearchResults => setValues({...values, searchResults: newSearchResults.data}))
          .catch(err => {
            console.log("Error fetching search results: " + err)});
    }

    return (
        <div className="analyzer">
            <form className="analyzer__searchForm">
            <TextField value={values.searchField} onChange={handleSearchChange} id="analyzer__search" label="Search" variant="outlined" />
            <Button onClick={clickSearch} variant="contained" color="primary">
            Search
            </Button>
            </form>
        </div>
    )
}

export default Analyzer;
