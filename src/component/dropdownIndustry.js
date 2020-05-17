import React, {useEffect, useState} from "react";

export default function DropdownIndustry(props) {
    const options = [
        {label: "All", value: "All"},
        {label: "Health Care", value: "Health Care"},
        {label: "Industrials", value: "Industrials"},
        {label: "Consumer Discretionary", value: "Consumer Discretionary"},
        {label: "Information Technology", value: "Information Technology"},
        {label: "Consumer Staples", value: "Consumer Staples"},
        {label: "Utilities", value: "Utilities"},
        {label: "Financials", value: "Financials"},
        {label: "Real Estate", value: "Real Estate"},
        {label: "Materials", value: "Materials"},
        {label: "Energy", value: "Energy"},
        {label: "Telecommunication Services", value: "Telecommunication Services"}
    ];
    const [industrySearch, setIndustrySearch] = useState(options[0].value);

    useEffect(()=>{
           props.onSubmit(industrySearch);
        },[industrySearch]);

    return (
        <div>
            <select
                className="btn-lg dropdown-toggle"
                style={{fontSize:"14px", marginBottom:"10px"}}
                value={industrySearch}
                onChange={e => {
                    setIndustrySearch(e.target.value);
                    // onSubmit(industrySearch)
                }}
            >
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>

    );
}
