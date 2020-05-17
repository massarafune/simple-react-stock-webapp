import {useEffect, useState} from "react";

function getListFromApi(search) {
    const url = `http://131.181.190.87:3001/history?symbol=${search}`;

    const dateFormat = (date) =>{
        const matches = date.match(/^(2[0-9]{3})-([0-9]{2})-([0-9]{2}).+?/);
        let year;
        let month;
        let day;
        if (matches !== null) {
            year = matches[1];
            month = matches[2];
            day = matches[3];
        }
        return `${day}/${month}/${year}`
    };

    return fetch(url)
        .then(res => res.json())
        .then(res => {
            return res.map(x => {
                return {
                    timestamp: dateFormat(x.timestamp),
                    symbol: x.symbol,
                    name: x.name,
                    industry: x.industry,
                    open: x.open,
                    high: x.high,
                    low: x.low,
                    close: x.close,
                    volumes: x.volumes
                };
            });
        });
}

export default function UseSelectedLists(search) {
    const [selectedError, setSelectedError] = useState(null);
    const [selectedLoading, setSelectedLoading] = useState(true);
    const [selectedLists, setSelectedLists] = useState([]);


    const selectedColumns = [
        {headerName: "Date", field: "timestamp", sortable: true},
        {headerName: "Open", field: "open"},
        {headerName: "High", field: "high"},
        {headerName: "Low", field: "low"},
        {headerName: "Close", field: "close"},
        {headerName: "Volumes", field: "volumes"}
    ];

    useEffect(
        () => {
            setSelectedLoading(true);
            if(search) {
                getListFromApi(search)
                    .then(x => {
                        setSelectedLists(x);
                        setSelectedLoading(false);
                    })
                    .catch(e => {
                        setSelectedError(e);
                        setSelectedLoading(false);
                    });
                }
            },
        [search]
    );
    return {
        selectedLoading,
        selectedLists,
        selectedError,
        selectedColumns
    };
}