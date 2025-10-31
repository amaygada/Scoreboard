import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Config from "./pages/Config";
import ScoreboardPage from "./pages/ScoreboardPage";
import Scoreboard2Page from "./pages/Scoreboard2Page";
import { Scoreboard } from "./components/Scoreboard";
import tournamentLogo from "./assets/images/Tournament_name.jpeg";
import titleSponsor from "./assets/images/title_sponsor.jpeg";
import eventManager from "./assets/images/T_event_managed_by.jpeg";

{/* <Link className="text-blue-600 hover:underline" to="/about"></Link> */}

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-dvh bg-white text-slate-900">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/v2/:turfId" element={<Scoreboard2Page />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/config" element={<Config />} />
                    <Route path="/scoreboard" element={<Scoreboard matchTitle="Test Match" score={{ runs: 100, wickets: 2 }} overs="4.1" target={150} tournamentLogoSrc={tournamentLogo} titleSponsorLogoSrc={titleSponsor} eventManagerLogoSrc={eventManager} />} />
                    <Route path=":turfId" element={<ScoreboardPage />} />
                    <Route path="*" element={<div>Not found</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}


