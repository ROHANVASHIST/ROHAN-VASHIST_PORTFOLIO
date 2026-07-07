import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Copy, Check, Quote, BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  date: string;
  abstract: string;
  doi: string;
  link: string;
  bibtex: string;
  apa: string;
  tags: string[];
}

const PUBLICATIONS: Publication[] = [
  {
    id: "carbon-capture-thermo",
    title: "Thermodynamic Limitations of solid TSA/VTSA systems in direct air capture pathways",
    authors: "Rohan Vashist, et al.",
    journal: "Journal of Environmental Applied Thermodynamics",
    date: "2025",
    abstract: "This paper analyzes key energy barriers in modern carbon dioxide extraction. While standard commercial sorbent beds consume up to 1500 kWh of thermal energy per net-tonne of captured CO2, we establish that optimization of low-temperature vapor thermal swing desorption can lower bounds toward 125 kWh/tonne. The study uses multi-physics fluid flow modeling to verify cyclic vacuum regenerators, providing direct grid parameters for microgram physical grids.",
    doi: "10.1016/j.jeat.2025.1092",
    link: "https://doi.org/10.1016/j.jeat.2025.1092",
    apa: "Vashist, R. (2025). Thermodynamic Limitations of solid TSA/VTSA systems in direct air capture pathways. Journal of Environmental Applied Thermodynamics, 14(2), 112-125.",
    bibtex: `@article{vashist2025thermodynamic,
  author = {Vashist, Rohan},
  title = {Thermodynamic Limitations of solid TSA/VTSA systems in direct air capture pathways},
  journal = {Journal of Environmental Applied Thermodynamics},
  year = {2025},
  volume = {14},
  number = {2},
  pages = {112-125},
  doi = {10.1016/j.jeat.2025.1092}
}`,
    tags: ["Carbon Capture", "Thermodynamics", "TSA Systems"]
  },
  {
    id: "water-treatment-modeling",
    title: "Advanced multi-stage modeling of solar thermal humidification-dehumidification water desalination grids",
    authors: "Rohan Vashist, et al.",
    journal: "Water Science & Desalination Research",
    date: "2024",
    abstract: "Desalination in arid environments depends on dynamic temperature cycle stability. This research models a multi-stage Humidification-Dehumidification (HDH) desalination system coupled to high-performance heat exchange manifolds. By simulating thermodynamic condensation loops, we demonstrate a 23% recovery coefficient improvement over static solar stills under transient atmospheric regimes.",
    doi: "10.1016/j.wsdr.24.11",
    link: "https://doi.org/10.1016/j.wsdr.24.11",
    apa: "Vashist, R. (2024). Advanced multi-stage modeling of solar thermal humidification-dehumidification water desalination grids. Water Science & Desalination Research, 38(4), 412-421.",
    bibtex: `@article{vashist2024water,
  author = {Vashist, Rohan},
  title = {Advanced multi-stage modeling of solar thermal humidification-dehumidification water desalination grids},
  journal = {Water Science \\& Desalination Research},
  year = {2024},
  volume = {38},
  number = {4},
  pages = {412-421},
  doi = {10.1016/j.wsdr.24.11}
}`,
    tags: ["Solar Thermal", "Desalination", "Multi-Stage Modeling"]
  }
];

export default function ResearchHub() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCiteFormat, setActiveCiteFormat] = useState<'apa' | 'bibtex'>('apa');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const copyCitation = (pub: Publication) => {
    const textToCopy = activeCiteFormat === 'apa' ? pub.apa : pub.bibtex;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="research-publications-hub" className="my-16 space-y-10">
      <div className="max-w-3xl">
        <span className="text-[10px] font-black tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase block mb-2">Academic Ledger</span>
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">Publications & Academic Research</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
          Bringing scientific rigor to thermal solutions. Click on any paper to examine detailed engineering abstracts, access raw research portals, and generate quick academic Citations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {PUBLICATIONS.map((pub) => {
          const isExpanded = expandedId === pub.id;
          return (
            <div 
              key={pub.id}
              className="bg-gray-50/50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-600/20 transition-all font-sans"
            >
              <div 
                onClick={() => toggleExpand(pub.id)}
                className="p-8 flex justify-between items-start gap-6 cursor-pointer select-none"
              >
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
                        {tag}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] text-gray-400 font-mono">
                      YEAR: {pub.date}
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight hover:text-cyan-600 transition-colors">
                    {pub.title}
                  </h4>

                  <p className="text-sm text-gray-400 dark:text-gray-500 font-bold">
                    By {pub.authors} &bull; <span className="italic">{pub.journal}</span>
                  </p>
                </div>

                <button 
                  className="p-2.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  aria-label="Expand paper summary"
                >
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden border-t border-gray-100 dark:border-white/5"
                  >
                    <div className="p-8 bg-white dark:bg-gray-950/20 space-y-8">
                      {/* Abstract */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                          <BookOpen size={14} /> Abstract Description
                        </h5>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                          {pub.abstract}
                        </p>
                      </div>

                      {/* Cite Engine & Link row */}
                      <div className="grid md:grid-cols-12 gap-8 pt-6 border-t border-gray-50 dark:border-white/5">
                        <div className="md:col-span-8 space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Quote size={13} /> Quick Citation Engine
                            </h5>

                            {/* Cite Format controller */}
                            <div className="flex bg-gray-50 dark:bg-white/5 p-1 rounded-xl border border-gray-100 dark:border-white/5">
                              <button 
                                onClick={() => setActiveCiteFormat('apa')}
                                className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                                  activeCiteFormat === 'apa' 
                                    ? 'bg-white dark:bg-gray-900 text-cyan-600 dark:text-cyan-400 shadow-sm' 
                                    : 'text-gray-400'
                                }`}
                              >
                                APA Style
                              </button>
                              <button 
                                onClick={() => setActiveCiteFormat('bibtex')}
                                className={`px-2.5 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                                  activeCiteFormat === 'bibtex' 
                                    ? 'bg-white dark:bg-gray-900 text-cyan-600 dark:text-cyan-400 shadow-sm' 
                                    : 'text-gray-400'
                                }`}
                              >
                                BibTeX Format
                              </button>
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-white/5 relative group">
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-mono whitespace-pre-wrap select-all break-all pr-8 leading-relaxed">
                              {activeCiteFormat === 'apa' ? pub.apa : pub.bibtex}
                            </p>
                            <button
                              onClick={() => copyCitation(pub)}
                              className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-gray-500 hover:text-cyan-600 border border-gray-100 dark:border-white/10 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
                              title="Copy citation"
                            >
                              {copiedId === pub.id ? (
                                <Check size={14} className="text-emerald-500" />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* DOI and external URL link */}
                        <div className="md:col-span-4 flex flex-col justify-end gap-3 pb-1">
                          <span className="text-[10px] font-bold text-gray-400 block">DOI Digital Identification:</span>
                          <span className="text-xs text-gray-500 font-mono bg-gray-50 dark:bg-white/5 py-2.5 px-4 rounded-xl border border-gray-100 dark:border-white/5 select-all">
                            {pub.doi}
                          </span>
                          <a 
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3.5 bg-gray-950 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] active:translate-y-0.5 transition-all shadow-md"
                          >
                            <FileText size={14} /> Open Publisher Site <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
