import {useEffect, useState} from "react";

function getListFromApi(search) {
    const url = "http://131.181.190.87:3001/" + (search === "All" ? "all" : `industry?industry=${search}`);

    return fetch(url)
        .then(res => res.json())
        .then(res => {
            return res.map(x => {
                return {
                    symbol: x.symbol,
                    name: x.name,
                    industry: x.industry
                };
            });
        });
}

export default function UseLists(search) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);

    const columns = [
        {headerName: "Symbol", field: "symbol", sortable: true, checkboxSelection: true},
        {headerName: "Name", field: "name", sortable: true},
        {headerName: "Industry", field: "industry", sortable: true}
    ];

    useEffect(
        () => {
            setLoading(true);
            getListFromApi(search)
                .then(lists => {
                    setLists(lists);
                    setLoading(false);
                })
                .catch(e => {
                    setError(e);
                    console.log("Network Error Occurs");
                    console.log(e);
                    setLoading(false);
                });
        },
        [search]
    );
    return {
        loading,
        lists,
        error,
        columns
    };
}