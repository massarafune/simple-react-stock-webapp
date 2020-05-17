import React, {useEffect, useState} from 'react';
import '../App.css';
import {useLocation} from "react-router-dom";
import { useHistory } from 'react-router-dom';

function Home(props) {
    const [search, setSearch] = useState();
    const history = useHistory();
    const handleLink = path => history.push(path);

    const location = useLocation();

    useEffect(()=>{
        const currentPath = location.pathname;
        if(currentPath === "/"){
            const topSearch = document.getElementById("topSearch");
            const topStocklists = document.getElementById("topStocklists");
            const notFound = document.getElementById("notFound");
            notFound.setAttribute("class","d-none");
            topSearch.classList.remove("d-none");
            topStocklists.classList.remove("d-none");
        }else{
            console.log("Changed Route?")
        }

    },[location.pathname])
    return(
        <div>
            <div style={{
                backgroundImage: "url(topImage.jpg)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: "brightness(0.4)",
                width: "100vw",
                height: "100vh",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "-1",
            }}>
            </div>
            <div className="col-md-8 mx-auto">
                <div className="mx-auto" style={{paddingTop:"170px",color:"#fff"}}>
                    <h2 className="font-weight-bold mb-4" style={{fontSize:"46px"}}>Ensplush</h2>
                    <p className="font-weight-bolder">The internet’s source of usable data.</p>
                    <p className="mb-5 font-weight-bolder">Powered by IFN666</p>
                </div>
                <div>
                    <form className="d-flex align-items-center" style={{ background:"#fff", height:"54px", borderRadius:"4px"}}>
                        <button type="submit" style={{ background:"transparent",border:"none",boxShadow:"none",width:"100%" }} className="d-flex flex-md-row"
                        onClick={(e) => {
                            if (props.onSubmit) {
                                props.onSubmit(search);
                                console.log(search)
                            }
                            handleLink('/stocks');
                        }}>
                            <svg version="1.1" viewBox="0 0 32 32" width="25"
                                 height="25" aria-hidden="false" style={{ fill:"#929292"}}>
                                <path
                                    d="M31 28.64l-7.57-7.57a12.53 12.53 0 1 0-2.36 2.36l7.57 7.57zm-17.5-6a9.17 9.17 0 1 1 6.5-2.64 9.11 9.11 0 0 1-6.5 2.67z"></path>
                            </svg>
                            <span style={{width:"100%",color:"#767676"}}>Explore stocks</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
//Photo by NeONBRAND on Unsplash
export default Home;
