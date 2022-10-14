import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Test = ({ bgcolor, home, Explore, Help }) => {

    return (
        <div style={{ backgroundColor: bgcolor }}>

            <div class="flex justify-between container mx-auto pt-5">
                <a href=""><img src="assets/images/logo.png" alt="" /></a>
                <ul class="flex gap-10 text-slate-50">
                    <li> <Link to="/">{home}</Link></li>
                    <li><a href="">{Explore}</a></li>
                    <li><a href="">{Help}</a></li>
                    <li><a href=""><i class="fa-solid fa-magnifying-glass"></i></a></li>
                    <li class="bg-[#575757] px-4 py-1 rounded-sm"><Link to="/singin">Login</Link></li>
                </ul>
            </div>
        </div>
    );

}

export default Test;