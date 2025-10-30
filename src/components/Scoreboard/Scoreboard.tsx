import React from "react";

export type ScoreboardProps = {
	matchTitle: string;
	score: { runs: number; wickets: number };
	overs: string; // e.g. "4.1"
	target: number;
    tournamentLogoSrc?: string;
    titleSponsorLogoSrc?: string;
    eventManagerLogoSrc?: string;
};

export function Scoreboard({ matchTitle, score, overs, target, tournamentLogoSrc, titleSponsorLogoSrc, eventManagerLogoSrc }: ScoreboardProps) {
    return (
        <section className="w-full min-h-dvh flex flex-col">
			
            <div className="bg-[#d16615] text-white">
                <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
                    <div className="flex-1 truncate text-center text-[64px] font-semibold md:text-[64px]">
                        {matchTitle}
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-[#3f3f3f] text-white pt-36">
                <div className="flex h-full flex-col justify-between">
                    <div className="grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:items-start">
                        <div className="text-center">
                            <div className="text-3xl font-bold tracking-wide md:text-[96px]">SCORE</div>
                            <div className="mt-3 text-[64px] font-extrabold leading-none md:text-[260px]">
                                {score.runs}/{score.wickets}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold tracking-wide md:text-[96px]">OVERS</div>
                            <div className="mt-3 text-[64px] font-extrabold leading-none md:text-[260px]">
                                {overs}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold tracking-wide text-yellow-300 md:text-[96px]">TARGET</div>
                            <div className="mt-3 text-[64px] font-extrabold leading-none text-yellow-300 md:text-[260px]">
                                {target}
                            </div>
                        </div>
                    </div>
				</div>
			</div>

			<div className="flex flex-col">	
			{(tournamentLogoSrc || titleSponsorLogoSrc || eventManagerLogoSrc) ? (
                        <div className="flex items-center justify-center gap-8 px-6 py-8">
                            {/* {tournamentLogoSrc ? (
                                <img src={tournamentLogoSrc} alt="Tournament" className="h-32 w-auto object-contain md:h-48" />
                            ) : null}
                            {titleSponsorLogoSrc ? (
                                <img src={titleSponsorLogoSrc} alt="Title Sponsor" className="h-32 w-auto object-contain md:h-48" />
                            ) : null} */}
                            {eventManagerLogoSrc ? (
                                <img src={eventManagerLogoSrc} alt="Event Manager" className="h-32 w-auto object-contain md:h-48" />
                            ) : null}
                        </div>
                    ) : null}
			</div>

			
		</section>
	);
}


