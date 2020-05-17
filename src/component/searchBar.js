import React, {useEffect, useState} from "react";
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import {Badge, Button} from "reactstrap";


export default function SearchBar(props) {
    const [search, setSearch] = useState("");

    return (
        <div>
            <input
                aria-labelledby="search-button"
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                }}
            />
            <Button
                id="search-button"
                color="info"
                onClick={e => {
                    // alert(search);
                    if (props.onSubmit) {
                        props.onSubmit(search);
                    }
                }}
            >
                Search
            </Button>
            <Button
                color="info"
                onClick={e => {
                    setSearch("");
                    if (props.onSubmit) {
                        props.onSubmit("");
                    }
                }}
            >
                Clear
            </Button>
        </div>
    );
}