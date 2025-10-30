import React from "react";
import { Scoreboard } from "../components/Scoreboard";
import tournamentLogo from "../assets/images/Tournament_name.jpeg";
import titleSponsor from "../assets/images/title_sponsor.jpeg";
import eventManager from "../assets/images/T_event_managed_by.jpeg";

export default function Home() {
    return (
        <div className="w-full min-h-dvh">
            <Scoreboard
                matchTitle="Mayka Mighties V/S Champion Challengers"
                score={{ runs: 36, wickets: 3 }}
                overs="4.1"
                target={58}
                tournamentLogoSrc={tournamentLogo}
                titleSponsorLogoSrc={titleSponsor}
                eventManagerLogoSrc={eventManager}
            />
        </div>
    );
}


