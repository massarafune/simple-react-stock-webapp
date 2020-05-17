import React, {useState, useEffect} from 'react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import '../App.css';
import {AgGridReact} from "ag-grid-react";
import DropdownIndustry from "./dropdownIndustry"
import UseLists from "../useLists"
import UseSelectedLists from "../useSelectedLists";
import ChartObject from "./chart";
import StartDateFilter from "./startDateFilter";
import {Badge, Button} from "reactstrap";
import {useLocation} from "react-router-dom";


function Stocks(props) {
    const [search, setSearch] = useState(""); // State for Search Box
    const [keyword, setKeyword] = useState("All"); // State for Industry search drop box
    const [startDate, setStartDate] = useState(""); // State for calendar filtering
    const [gridApi, setGridApi] = useState(); // to initialise gridApi
    const [chartLists, setChartLists] = useState(""); // Store the data for ChartJS to draw
    const [searchError, setSearchError] = useState(null); // searchbox error
    const [filteredLists, setFilteredLists] = useState("");  // to reflect start date filtering
    const [selectedTitle, setSelectedTitle] = useState(""); // for gridApi selected row
    const {loading, error, lists, columns} = UseLists(keyword);
    const {selectedLoading, selectedError, selectedLists, selectedColumns} = UseSelectedLists(selectedTitle.symbol);
    const location = useLocation();


    // delete header nav menu when the path is /stocks
    useEffect((search)=>{
        const currentPath = location.pathname;
        if(currentPath === "/stocks" || currentPath === "/stocks/"){
            setSearch("");
            const topSearch = document.getElementById("topSearch");
            const topStocklists = document.getElementById("topStocklists");
            const notFound = document.getElementById("notFound");
            notFound.setAttribute("class","d-none");
            topSearch.setAttribute("class","d-none");
            topStocklists.setAttribute("class", "d-none");
        }
    },[location.pathname]);

    // search props from header search bar
    useEffect(()=>{
        if(typeof props.topSearch.location.state !== "undefined"){
            setSearch(props.topSearch.location.state.topSearch);
        }
    },[]);

    // input start date filtering data to draw chart
    useEffect(()=>{
        if(startDate){
            drawChart(filteredLists);
        }
    },[filteredLists]);

    // formatting date string into US style (e.g. mm/dd/yyyy)
    // this function is intended for filtering start date
    // since date format in the table is AU style whereas US style in calendar
    const usDateFormat = (date) =>{
        const matches = date.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})/);
        let year;
        let month;
        let day;
        if (matches !== null) {
            year = matches[3];
            month = matches[2];
            day = matches[1];
        }
        return `${month}/${day}/${year}`
    };

    // controls drawChart based on start date input
    // if no start date is selected, whole data will be used for chart
    useEffect(()=> {
        if(startDate){
            const selectedDateLists = selectedLists.filter(x => Date.parse(usDateFormat(x.timestamp)) >= startDate);
            setFilteredLists(selectedDateLists);
        }
        else{
            setFilteredLists(null);
            drawChart(selectedLists);
        }
    },[startDate]);

    // enable "click and go feature" when click a row in stock list and jump to detailed table
    useEffect(()=>{
        if(selectedTitle) {
            const x = ()=>{ setSelectedTitle(selectedTitle.symbol)};
        }
    },[selectedTitle]);

    // enable "click and go feature" to draw chart
    useEffect(()=> {
        if(selectedTitle.symbol) {
            drawChart(selectedLists);
        }
    },[selectedLists]);

    // draw chart function using a specific list as an argument
    const drawChart = (selectedLists)=>{
        setChartLists(selectedLists);
    };

    return (
        <div className="d-flex flex-row">
            <aside className="d-flex py-5" style={{width:"25vw",height:"90vh",color:"#767676"}}>
                <div style={{width:"100%"}}>
                    {!selectedTitle &&
                    <div className="col-lg-12">
                        <p className="border-bottom">Search by Keyword</p>
                        <form className="d-flex my-4"
                              style={{ background:"#eee", height:"40px", borderRadius:"24px", border:"1px transparent"}}
                              onSubmit={(e) => e.preventDefault()}
                        >
                                <button type="submit" style={{ background:"transparent",border:"none",boxShadow:"none" }}>
                                    <svg version="1.1" viewBox="0 0 32 32" width="15"
                                         height="15" aria-hidden="false" style={{ fill:"#929292"}}>
                                        <path
                                            d="M31 28.64l-7.57-7.57a12.53 12.53 0 1 0-2.36 2.36l7.57 7.57zm-17.5-6a9.17 9.17 0 1 1 6.5-2.64 9.11 9.11 0 0 1-6.5 2.67z"></path>
                                    </svg>
                                </button>
                            <div className="d-flex" style={{fontSize:"14px", width:"100%"}}>
                                <input style={{ border:"none", background:"transparent", width:"100%"}} placeholder="Search Stocks"
                                       value={search}
                                       onChange={e => {
                                           const { value } = e.target;
                                           if (/[!@#"'$%^&*)(+=._-]/.test(value)){
                                               setSearchError("Search word shouldn't have special characters");
                                           } else if (!/[0-9]/.test(value)){
                                               setSearch(value);
                                               setSearchError(null);
                                           }
                                           else {
                                               setSearchError("Search word shouldn't have numbers");
                                           }
                                       }}>
                                </input>
                            </div>
                        </form>
                        {searchError && <p className="position-absolute" style={{top:"12vh",left:"1vw",color:"red",width:"400px"}}>Error: {searchError}</p>}
                        <p className="border-bottom">Search by Category</p>
                        <DropdownIndustry onSubmit={newKeyword => setKeyword(newKeyword)}/>
                        <p>
                            <Badge color="success">{lists.length}</Badge> brands in this category
                        </p>

                    </div>
                    }
                    {selectedTitle &&
                    <div className="col-lg-12" style={{width:"100%"}}>
                        <div className="" style={{color:"#000"}}>
                            <p className="font-weight-lighter border-bottom" style={{color: "inherit"}}>Selected Stock</p>
                            <p>Symbol:  <strong>&emsp;{selectedTitle.symbol}</strong></p>
                            <p>Name:    <strong>&emsp;{selectedTitle.name}</strong></p>
                            <p>Industry:<strong>&emsp;{selectedTitle.industry}</strong></p>
                        </div>
                        <p className="border-bottom">Filter with the start date </p>
                        {/*<SearchBar onSubmit={newSearch => setSearch(newSearch)} />*/}
                        <StartDateFilter onSubmit={newStartDate => {setStartDate(newStartDate)}}/>
                        <p className="border-bottom" style={{marginTop:"1rem"}}></p>
                        <Button
                            color="info"
                            onClick={() => {
                                setChartLists("");
                                setSelectedTitle("");
                            }}>
                            Return to lists</Button>
                    </div>
                    }
                </div>
            </aside>
        <div className="container-md py-5 d-flex justify-content-center" style={{width:"75vw"}}>
            {!selectedTitle &&
            <div
                className="ag-theme-balham"
                style={{
                    height: "60vh",
                    width: "50vw"
                }}
            >
                <p className="font-weight-bold" style={{fontSize:"42px"}}>Ensplush stock lists</p>
                <p style={{fontSize:"24px"}}>Click the row to view the history of the stock price</p>
                <AgGridReact
                    columnDefs={columns}
                    rowData={lists}
                    pagination={true}
                    quickFilterText={search}
                    rowSelection="single"
                    onGridReady={params => {
                        setGridApi(params.api);
                    }}
                    onSelectionChanged={()=>{
                        gridApi && setSelectedTitle(gridApi.getSelectedRows()["0"]);
                    }}
                />

                {loading && <p className="mx-auto my-3 text-center font-weight-bold">Loading...</p>}
                {/*{error && error}*/}
                {error &&
                <div className="position-fixed font-weight-bold"
                   style={{
                       height:"100vh",
                       width:"100vw",
                       background:"rgba(255,255,255,0.7)",
                       top:"0",
                       left:"0",
                       lineHeight:"100vh",
                       textAlign:"center",
                       fontSize:"42px"
                   }}
                >
                    <p>Network error! Please check your network connection</p>
                </div>}
            </div>
            }
            {selectedTitle &&
            <div
                className="ag-theme-balham"
                style={{
                    height: "300px",
                    width: "900px"
                }}
            >
                {startDate &&
                <p className="font-weight-bolder" style={{color:"#767676"}}>Showing Result from&nbsp;{startDate.toLocaleDateString("en-AU")}&nbsp;to 23/03/2020</p>
                }
                <AgGridReact
                    columnDefs={selectedColumns}
                    rowData={filteredLists ? filteredLists : selectedLists}
                />
                {selectedLoading && <p>Loading...</p>}
                {selectedError && selectedError}
                {selectedLists &&
                <div>
                    {chartLists &&
                    <ChartObject data={chartLists} />
                    }
                </div>
                }
            </div>
            }
        </div>
        </div>
    );
}

export default Stocks;
