import React from "react";

export type Scoreboard2Props = {
	matchTitle: string;
	score: { runs: number; wickets: number };
	overs: string; // e.g. "4.1"
	target: number;
    tournamentLogoSrc?: string;
    titleSponsorLogoSrc?: string;
    eventManagerLogoSrc?: string;
};

export function Scoreboard2({ matchTitle, score, overs, target, tournamentLogoSrc, titleSponsorLogoSrc, eventManagerLogoSrc }: Scoreboard2Props) {
    return (
        <section className="w-full min-h-dvh flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
			
            {/* Header Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-center px-8 py-6 md:px-12 md:py-8 border-b-4 border-blue-400/30">
                    <div className="flex-1 text-center">
                        <div className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                            {matchTitle}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Scoreboard Section */}
            <div className="flex-1 flex items-center justify-center py-12 px-6 md:px-12">
                <div className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr] md:gap-8">
                        
                        {/* SCORE Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-400/30 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                                <div className="text-center mb-6">
                                    <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-xl md:text-2xl font-bold tracking-wide shadow-lg">
                                        SCORE
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-6xl md:text-[280px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-2xl">
                                        {score.runs}<span className="text-[200px] font-light">/</span>{score.wickets}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* OVERS Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-emerald-400/30 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                                <div className="text-center mb-6">
                                    <div className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full text-xl md:text-2xl font-bold tracking-wide shadow-lg">
                                        OVERS
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-6xl md:text-[280px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white drop-shadow-2xl">
                                        {overs}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TARGET Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-400/30 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                                <div className="text-center mb-6">
                                    <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full text-xl md:text-2xl font-bold tracking-wide shadow-lg">
                                        TARGET
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-6xl md:text-[280px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-white drop-shadow-2xl">
                                        {target}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t-2 border-slate-700/50">
                {(tournamentLogoSrc || titleSponsorLogoSrc || eventManagerLogoSrc) && (
                    <div className="flex items-center justify-center gap-12 px-6 py-8 md:py-12">
                        {tournamentLogoSrc && (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                <img 
                                    src={tournamentLogoSrc} 
                                    alt="Tournament" 
                                    className="relative h-24 w-auto object-contain md:h-32 opacity-90 hover:opacity-100 transition-opacity duration-300" 
                                />
                            </div>
                        )}
                        {titleSponsorLogoSrc && (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                <img 
                                    src={titleSponsorLogoSrc} 
                                    alt="Title Sponsor" 
                                    className="relative h-24 w-auto object-contain md:h-32 opacity-90 hover:opacity-100 transition-opacity duration-300" 
                                />
                            </div>
                        )}
                        {eventManagerLogoSrc && (
                            <div className="relative group">
                                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                <img 
                                    src={eventManagerLogoSrc} 
                                    alt="Event Manager" 
                                    className="relative h-24 w-auto object-contain md:h-32 opacity-90 hover:opacity-100 transition-opacity duration-300" 
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Decorative Accent Lines */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
			
		</section>
	);
}

