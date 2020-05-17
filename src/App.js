import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './component/Home';
import Stocks from './component/Stocks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faYenSign } from '@fortawesome/free-solid-svg-icons'

library.add(faYenSign);
function App() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    return(
   <Router>
       <header className="Home site-header shadow" style={{display:"flex",background:"#fff", height:"10vh"}}>
           <nav className="container d-flex flex-column flex-md-row align-items-center">
               <Link to={`/`} className="py-2 d-flex align-items-center nav-link">
                   <div>
                       <FontAwesomeIcon icon="yen-sign" size="3x" style={{ color:"#111"}}/>
                   </div>
               </Link>
               <div className="px-4" id="topSearch">
                   <form className="d-flex" style={{ background:"#eee", height:"40px", borderRadius:"24px", border:"1px transparent"}}>
                       {/*<button type="submit" style={{ background:"transparent",border:"none",boxShadow:"none" }}>*/}
                       <Link to={{pathname:"/stocks", state:{topSearch: search}}} className="d-flex align-items-center">
                           <button type="submit" style={{ background:"transparent",border:"none",boxShadow:"none" }} onClick={()=>{
                               console.log(search);
                               setSearch("");
                           }}>

                           <svg version="1.1" viewBox="0 0 32 32" width="15"
                                height="15" aria-hidden="false" style={{ fill:"#929292"}}>
                               <path
                                   d="M31 28.64l-7.57-7.57a12.53 12.53 0 1 0-2.36 2.36l7.57 7.57zm-17.5-6a9.17 9.17 0 1 1 6.5-2.64 9.11 9.11 0 0 1-6.5 2.67z"></path>
                           </svg>
                        </button>
                       </Link>
                       <div className="d-flex" style={{fontSize:"14px"}}>
                           <input style={{ border:"none", background:"transparent" }} placeholder="Search Stocks"
                                  value={search}
                                  onChange={e => {
                                      const { value } = e.target;
                                      if (/[!@#"'$%^&*)(+=._-]/.test(value)){
                                          setError("Search word shouldn't have special characters");
                                      } else if (!/[0-9]/.test(value)){
                                          setSearch(value);
                                          setError(null);
                                      }
                                      else {
                                          setError("Search word shouldn't have numbers");
                                      }
                                  }}>
                           </input>
                       </div>
                   </form>
                   {error && <p className="position-absolute" style={{top:"10vh",left:"15vw",color:"red"}}>Error: {error}</p>}

               </div>
               <Link to={`/stocks`} className="py-2 d-flex align-items-center nav-link" id="topStocklists" style={{ color: "#767676"}}>Stock Lists</Link>
           </nav>
       </header>
           <main>
               <div className="text-center" id="notFound" style={{margin:"10vh 0",color:"#767676"}}>
                   <p>Sorry, the requested page is not found</p>
                   <p>Please click the Top icon or links to return the original page</p>
               </div>
               <Route
                   exact path="/"
                   render={() => <Home/>}
               />
               <Route
                   exact path='/stocks'
                   render={(search) => <Stocks topSearch={search}/>}
               />
           </main>
   </Router>
    )
}

export default App;
