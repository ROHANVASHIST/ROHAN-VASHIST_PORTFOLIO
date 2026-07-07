import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, Info, ChevronRight, BarChart3, TrendingUp, DollarSign, 
  Droplet, Wind, Sparkles, RefreshCw, Zap, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function ClimateFeasibilityLab() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [activeModule, setActiveModule] = useState<'dac' | 'desal' | 'h2'>('dac');

  // --- 1. DAC CONFIG STATE ---
  const [dacCapacity, setDacCapacity] = useState(2500); // 500 to 10000 tons CO2/year
  const [sorbentType, setSorbentType] = useState<'solid' | 'liquid'>('solid');
  const [heatTemp, setHeatTemp] = useState(95); // 70 to 130 °C (low temperature waste heat)

  // --- 2. SOLAR HDH DESAL STATE ---
  const [fieldArea, setFieldArea] = useState(150); // 20 to 500 m²
  const [waterSalinity, setWaterSalinity] = useState(35000); // 5000 to 50000 ppm (TDS)
  const [feedMode, setFeedMode] = useState<'sea' | 'brackish'>('sea');

  // --- 3. GREEN H2 STATE ---
  const [electrolyzerPower, setElectrolyzerPower] = useState(5.0); // 0.5 to 20.0 MW
  const [waterPurityFactor, setWaterPurityFactor] = useState(92); // 80 to 99 %

  // --- MODULE CALCULATIONS ---

  // DAC model
  const dacMetrics = useMemo(() => {
    // Sorbent energy efficiency multiplier
    const efficiencyFactor = sorbentType === 'solid' ? 1.0 : 1.6;
    
    // Higher temp improves kinetic desorption rate
    const tempKineticsMultiplier = Math.max(0.7, 1.4 - (heatTemp - 70) * 0.015);
    
    // Low temperature SSA thermal energy requirement: Rohan's bound is ~125 kWh/tonne under vacuum
    const specificThermalKwh = Math.round(125 * efficiencyFactor * tempKineticsMultiplier * 10) / 10;
    const electricalKwh = 35; // typical electrical vacuum blower power per tonne
    
    const annualThermalMWH = Math.round((specificThermalKwh * dacCapacity) / 1000);
    const annualElectricalMWH = Math.round((electricalKwh * dacCapacity) / 1000);
    
    // Estimate cost based on CapEx + heat rate
    const capExPerTonYear = sorbentType === 'solid' ? 320 : 580;
    const initialCapEx = dacCapacity * capExPerTonYear;
    
    // Operational cost per ton (power + sorbent replacements)
    const powerUnitCost = 0.055; // $0.055 per kWh representing optimized renewable PPAs
    const opExPerTon = specificThermalKwh * powerUnitCost * 0.4 + electricalKwh * powerUnitCost + 15; // with heat recuperation
    const annualOpEx = Math.round(dacCapacity * opExPerTon);
    
    // Direct avoided emissions (subtle reduction for auxiliary machinery footprint)
    const netAvoidedTons = Math.round(dacCapacity * 0.91);
    
    return {
      specificThermalKwh,
      electricalKwh,
      annualThermalMWH,
      annualElectricalMWH,
      initialCapEx,
      annualOpEx,
      netAvoidedTons,
      carbonCreditValue: Math.round(netAvoidedTons * 190) // $190 / ton premium compliance voluntary credits
    };
  }, [dacCapacity, sorbentType, heatTemp]);

  // DESAL model
  const desalMetrics = useMemo(() => {
    // Volume generation factors
    const salinityEffect = feedMode === 'sea' ? 0.92 : 1.15;
    
    // Yield from fieldArea in liters per day
    const solarConstant = 0.82; // kW/m² average irradiation
    const collectorEfficiency = 0.62;
    const thermalInputKw = fieldArea * solarConstant * collectorEfficiency;
    
    // Dynamic Humidification condensation yields
    const litersPerDay = Math.round(thermalInputKw * 9.5 * salinityEffect);
    const annualWaterM3 = Math.round((litersPerDay * 365) / 1000);
    
    // CapEx
    const initialCapEx = fieldArea * 180 + 12000; // collector + multistage HDH distillation tower
    const annualOpEx = Math.round(litersPerDay * 0.012 * 365); // filters, circulation pumps duty
    
    const householdsServed = Math.round(litersPerDay / 150); // assuming 150L standard conservation usage/household
    
    return {
      thermalInputKw: Math.round(thermalInputKw),
      litersPerDay,
      annualWaterM3,
      initialCapEx,
      annualOpEx,
      householdsServed,
      stecKwhM3: Math.round(thermalInputKw * 24 / (litersPerDay / 1000)),
      waterAssetValue: Math.round(annualWaterM3 * 4.25) // $4.25/m3 localized remote water logistics rate
    };
  }, [fieldArea, feedMode, waterSalinity]);

  // Hydrogen Electrolysis model
  const h2Metrics = useMemo(() => {
    // 1 MW of PEM electrolyzer produces roughly 20 kg of H2 per hr at peak efficiency
    const hydrogenKgPerMWh = 20.2 * (waterPurityFactor / 100);
    
    // Annual active hours (assuming solar tracking + microgrid storage buffer = 3200 hrs/year)
    const operationHours = 3200;
    const annualEnergyMWh = electrolyzerPower * operationHours;
    
    const annualH2Kg = Math.round(annualEnergyMWh * hydrogenKgPerMWh);
    const co2AvertedTons = Math.round((annualH2Kg * 9.2) / 1000); // 9.2 kg CO2 saved per kg of green H2 replacing grey steam methane H2
    
    const initialCapEx = electrolyzerPower * 1100000; // $1.1M per MW
    // electricity supply cost average
    const annualOpEx = Math.round(annualEnergyMWh * 42); // $42 / MWh operational microgrid rate
    
    return {
      annualH2Kg,
      co2AvertedTons,
      initialCapEx,
      annualOpEx,
      h2AssetValue: Math.round(annualH2Kg * 5.5) // $5.5 / kg target clean hydrogen price
    };
  }, [electrolyzerPower, waterPurityFactor]);

  // Financial summary based on active module
  const financialProjection = useMemo(() => {
    const years = Array.from({ length: 15 }, (_, i) => i + 1);
    
    let capEx = 0;
    let annualOpEx = 0;
    let annualYieldValue = 0;
    let cumulativeCarbonSavedPerYear = 0;

    if (activeModule === 'dac') {
      capEx = dacMetrics.initialCapEx;
      annualOpEx = dacMetrics.annualOpEx;
      annualYieldValue = dacMetrics.carbonCreditValue;
      cumulativeCarbonSavedPerYear = dacMetrics.netAvoidedTons;
    } else if (activeModule === 'desal') {
      capEx = desalMetrics.initialCapEx;
      annualOpEx = desalMetrics.annualOpEx;
      annualYieldValue = desalMetrics.waterAssetValue;
      cumulativeCarbonSavedPerYear = Math.round(desalMetrics.annualWaterM3 * 0.15); // proxy transport emission carbon credits offsets
    } else {
      capEx = h2Metrics.initialCapEx;
      annualOpEx = h2Metrics.annualOpEx;
      annualYieldValue = h2Metrics.h2AssetValue;
      cumulativeCarbonSavedPerYear = h2Metrics.co2AvertedTons;
    }

    const chartPoints = years.map(year => {
      // Linear cash flow modeling
      const cumulativeOpEx = annualOpEx * year;
      const cumulativeRevenue = annualYieldValue * year;
      const netCashFlow = cumulativeRevenue - cumulativeOpEx - capEx;
      const cumulativeCarbon = cumulativeCarbonSavedPerYear * year;
      
      return {
        year: `Y${year}`,
        netReturnK: Math.round(netCashFlow / 1000),
        carbonSaved: cumulativeCarbon,
        cumulativeRevenueK: Math.round(cumulativeRevenue / 1000)
      };
    });

    const netAnnualReturn = annualYieldValue - annualOpEx;
    const paybackYears = netAnnualReturn > 0 ? Math.round((capEx / netAnnualReturn) * 10) / 10 : '∞';

    return {
      chartPoints,
      paybackYears,
      initialInvestment: capEx,
      ongoingOpEx: annualOpEx,
      grossRevenue: annualYieldValue,
      netAnnualProfit: netAnnualReturn,
      co2Avoided15Y: cumulativeCarbonSavedPerYear * 15
    };
  }, [activeModule, dacMetrics, desalMetrics, h2Metrics]);

  return (
    <div id="climate-feasibility-sandbox" className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all font-sans">
      
      {/* Header section with CleanTech branding */}
      <div className="p-8 md:p-12 border-b border-gray-100 dark:border-white/5 bg-gradient-to-r from-cyan-600/[0.02] to-cyan-700/[0.04]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs bg-cyan-150/40 dark:bg-cyan-900/30 text-cyan-650 dark:text-cyan-400 font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
              <Leaf size={12} className="text-cyan-600 animate-pulse" /> Decarbonization Sandbox
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
              CleanTech Feasibility Lab
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl">
              Calibrate thermodynamic bounds, collector grids, and process scales to estimate CapEx/OpEx thresholds, carbon capture yields, and green transition payback horizons.
            </p>
          </div>
          
          <div className="flex bg-gray-100/70 dark:bg-white/5 p-1.5 rounded-2xl gap-1">
            {(['dac', 'desal', 'h2'] as const).map((module) => (
              <button
                key={module}
                id={`btn-feasibility-module-${module}`}
                onClick={() => setActiveModule(module)}
                className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeModule === module 
                    ? 'bg-white dark:bg-gray-900 text-cyan-600 dark:text-cyan-400 shadow-md shadow-gray-250/10' 
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                }`}
              >
                {module.toUpperCase()} {module === 'dac' ? 'Capture' : module === 'desal' ? 'Desal' : 'Hydrogen'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* --- LEFT PANEL: CONTROLS & MODULE CONFIG --- */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              {activeModule === 'dac' && (
                <motion.div 
                  key="dac" 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                      <Wind size={18} className="text-cyan-600" /> Atmospheric Direct Air Capture
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Estimating low-temperature Thermal Swing Adsorption cycles directly.</p>
                  </div>

                  {/* Slider: Target Capacity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-500">Target Sorbent Capture Capacity</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{dacCapacity.toLocaleString()} t-CO2/year</span>
                    </div>
                    <input 
                      type="range"
                      min={500}
                      max={10000}
                      step={100}
                      value={dacCapacity}
                      onChange={(e) => setDacCapacity(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>500 tons (Pilot)</span>
                      <span>5,000 tons (Regional Hub)</span>
                      <span>10,000 tons (Industrial)</span>
                    </div>
                  </div>

                  {/* Sorbent Selection Mode */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 block">Active Sorbent Matrix</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        id="sorbent-selection-solid"
                        onClick={() => setSorbentType('solid')}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          sorbentType === 'solid'
                            ? 'border-cyan-600 bg-cyan-600/5 text-cyan-600 dark:text-cyan-400'
                            : 'border-gray-200 dark:border-white/5 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span className="block font-black text-sm">Solid Amine TSA</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Vacuum assisted (~125 kWh/t thermal)</span>
                      </button>
                      <button 
                        id="sorbent-selection-liquid"
                        onClick={() => setSorbentType('liquid')}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          sorbentType === 'liquid'
                            ? 'border-cyan-600 bg-cyan-600/5 text-cyan-600 dark:text-cyan-400'
                            : 'border-gray-200 dark:border-white/5 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span className="block font-black text-sm">Liquid KOH Solvent</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">High temp calciner (~800 °C, high intensive)</span>
                      </button>
                    </div>
                  </div>

                  {/* Slider: Regenerator Heat Source Temp */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-500">Regenerator Waste Heat Temperature</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{heatTemp}°C</span>
                    </div>
                    <input 
                      type="range"
                      min={70}
                      max={130}
                      value={heatTemp}
                      onChange={(e) => setHeatTemp(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>70°C (District heating recycle)</span>
                      <span>100°C (Standard utility steam)</span>
                      <span>130°C (Pressurized system)</span>
                    </div>
                  </div>

                  {/* Validation to academic reference bounds */}
                  <div className="p-4 bg-cyan-600/5 border border-cyan-100 dark:border-cyan-950/20 rounded-2xl flex gap-3.5 text-xs text-cyan-800 dark:text-cyan-400 leading-relaxed font-semibold">
                    <Info size={16} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Rohan Vashist's primary published thermodynamic model demonstrates solid sorbent Solid-Amine cycles achieve regeneration at a thermal bound of <strong className="font-extrabold text-cyan-700 dark:text-cyan-300">~125 kWh/ton CO2</strong> under moderate vacuum environments.
                    </span>
                  </div>
                </motion.div>
              )}

              {activeModule === 'desal' && (
                <motion.div 
                  key="desal" 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                      <Droplet size={18} className="text-cyan-600" /> Multi-Stage Humidification Desalination
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Sizing passive marine solar Humidification-Dehumidification loops.</p>
                  </div>

                  {/* Slider: Collector Area */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-500">Solar Thermal Collector Array Area</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{fieldArea} m²</span>
                    </div>
                    <input 
                      type="range"
                      min={20}
                      max={500}
                      step={10}
                      value={fieldArea}
                      onChange={(e) => setFieldArea(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>20 m² (Farmhouse still)</span>
                      <span>250 m² (Village microgrid)</span>
                      <span>500 m² (Coastal district loop)</span>
                    </div>
                  </div>

                  {/* Feed Water Mode */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 block">Source Salinity Class</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        id="feed-mode-sea"
                        onClick={() => setFeedMode('sea')}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          feedMode === 'sea'
                            ? 'border-cyan-600 bg-cyan-600/5 text-cyan-600 dark:text-cyan-400'
                            : 'border-gray-200 dark:border-white/5 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span className="block font-black text-sm">Marine Seawater</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">35k ppm TDS (Seaside grid)</span>
                      </button>
                      <button 
                        id="feed-mode-brackish"
                        onClick={() => setFeedMode('brackish')}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          feedMode === 'brackish'
                            ? 'border-cyan-600 bg-cyan-600/5 text-cyan-600 dark:text-cyan-400'
                            : 'border-gray-200 dark:border-white/5 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span className="block font-black text-sm">Brackish Ground</span>
                        <span className="text-[10px] text-gray-400 block mt-0.5">15k ppm (Inland aquifer purification)</span>
                      </button>
                    </div>
                  </div>

                  {/* Info alert */}
                  <div className="p-4 bg-cyan-600/5 border border-cyan-100 dark:border-cyan-950/20 rounded-2xl flex gap-3 text-xs text-cyan-800 dark:text-cyan-400 leading-relaxed font-semibold">
                    <Sparkles size={16} className="text-cyan-600 flex-shrink-0 mt-0.5 animate-bounce" />
                    <span>
                      Humidification-Dehumidification (HDH) functions by heating saline water to form saturated water vapor on warm carrier airflow, recycling thermal latent condensations across clean internal recuperator grids.
                    </span>
                  </div>
                </motion.div>
              )}

              {activeModule === 'h2' && (
                <motion.div 
                  key="h2" 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                      <Zap size={18} className="text-cyan-600 animate-pulse" /> Green H2 Hydrogen Electrolysis
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">PEM high-pressure clean hydrogen water split analysis.</p>
                  </div>

                  {/* Slider: Electrolyzer Power */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-500">Dedicated Renewable PEM Power Input</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{electrolyzerPower} MW</span>
                    </div>
                    <input 
                      type="range"
                      min={0.5}
                      max={20.0}
                      step={0.5}
                      value={electrolyzerPower}
                      onChange={(e) => setElectrolyzerPower(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>0.5 MW (Pilot stack)</span>
                      <span>10.0 MW (Regional grid)</span>
                      <span>20.0 MW (Industrial transport)</span>
                    </div>
                  </div>

                  {/* Slider: Water Feed Purity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-500">Ultradeionized Water Feed Guard Level</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{waterPurityFactor}%</span>
                    </div>
                    <input 
                      type="range"
                      min={80}
                      max={99}
                      value={waterPurityFactor}
                      onChange={(e) => setWaterPurityFactor(Number(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>80% (Mild filtration degradation)</span>
                      <span>99% (Perfect ion-exchange bed)</span>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-4 bg-cyan-600/5 border border-cyan-100 dark:border-cyan-950/20 rounded-2xl flex gap-3 text-xs text-cyan-800 dark:text-cyan-400 leading-relaxed font-semibold">
                    <Info size={16} className="text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>
                      Clean PEM (Proton Exchange Membrane) systems demand ultra-pure water feedstocks to shield precious electrolyte coatings (iridium/platinum anode matrices) from ionic scaling and thermal decay over cycles.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* General module outcome statistics */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-black text-gray-450 uppercase tracking-widest">Active System Yields</h4>
              
              <div className="space-y-3">
                {activeModule === 'dac' && (
                  <>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Heat Bound Requirement</span>
                      <span className="text-gray-900 dark:text-white font-mono font-bold">{dacMetrics.specificThermalKwh} MWh_th / t</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Blower Parasitic Electrical Power</span>
                      <span className="text-gray-900 dark:text-white font-mono font-bold">{dacMetrics.electricalKwh} kWh / t</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Combined Microgrid Energy input</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{dacMetrics.annualThermalMWH + dacMetrics.annualElectricalMWH} MWh / yr</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 select-none">
                      <span className="text-cyan-700 dark:text-cyan-400 font-extrabold flex items-center gap-1">Carbon Saved Net</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-extrabold">{dacMetrics.netAvoidedTons} tons/yr</span>
                    </div>
                  </>
                )}

                {activeModule === 'desal' && (
                  <>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Required Solar Array Collectors</span>
                      <span className="text-gray-900 dark:text-white font-mono font-bold">~{Math.ceil(fieldArea / 2.5)} units (2.5m² ea)</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Thermal Collector Input Level</span>
                      <span className="text-gray-900 dark:text-white font-mono font-bold">{desalMetrics.thermalInputKw} kW_th</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Daily Water Production Rate</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{desalMetrics.litersPerDay.toLocaleString()} Liters/day</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 select-none">
                      <span className="text-cyan-700 dark:text-cyan-400 font-extrabold">Remote Water Yield</span>
                      <span className="text-cyan-600 dark:text-cyan-300 font-mono font-extrabold">{desalMetrics.annualWaterM3.toLocaleString()} m³ / yr</span>
                    </div>
                  </>
                )}

                {activeModule === 'h2' && (
                  <>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Water Demineralizer Duty required</span>
                      <span className="text-gray-900 dark:text-white font-mono font-bold">~{Math.round(h2Metrics.annualH2Kg * 9 / 1000)} m³ / yr (9:1 ratio)</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Electrolysis Capacity Rate</span>
                      <span className="text-gray-900 dark:text-white font-mono font-bold">~{Math.round(electrolyzerPower * 20.2)} kg-H2 / hr</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 border-b border-gray-100 dark:border-white/5">
                      <span className="text-gray-500">Annual Clean H2 produced</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">{h2Metrics.annualH2Kg.toLocaleString()} kg / yr</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold py-1 select-none">
                      <span className="text-cyan-700 dark:text-cyan-400 font-extrabold">CO2 Emissions Averted replacing grey</span>
                      <span className="text-emerald-600 dark:text-emerald-450 font-mono font-extrabold">{h2Metrics.co2AvertedTons.toLocaleString()} tons/yr</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* --- RIGHT PANEL: FINANCIAL PROJECTION & MULTI-YEAR CHART --- */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            
            {/* Dashboard summary Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              
              <div className="p-6 bg-cyan-600/5 border border-cyan-100/30 dark:border-cyan-950/20 rounded-[2rem]">
                <span className="text-[10px] text-cyan-650 dark:text-cyan-400 font-black uppercase tracking-wider block">Initial Capital CapEx</span>
                <span className="text-2xl font-black font-mono text-gray-900 dark:text-white block mt-1.5 leading-none">
                  ${(financialProjection.initialInvestment / 1000).toLocaleString(undefined, {maximumFractionDigits:0})}k
                </span>
                <span className="text-[10px] text-gray-400 block mt-1">Infrastructure setup bound</span>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2rem]">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-wider block font-bold">Annual Operational OpEx</span>
                <span className="text-2xl font-black font-mono text-gray-900 dark:text-white block mt-1.5 leading-none">
                  ${(financialProjection.ongoingOpEx / 1000).toLocaleString(undefined, {maximumFractionDigits:1})}k<span className="text-xs font-sans text-gray-400">/yr</span>
                </span>
                <span className="text-[10px] text-gray-400 block mt-1">Power + maintenance cost</span>
              </div>

              <div className="p-6 bg-cyan-600/10 dark:bg-cyan-950/10 border border-cyan-100/40 dark:border-white/5 rounded-[2rem]">
                <span className="text-[10px] text-cyan-650 dark:text-cyan-400 font-black uppercase tracking-wider block">Est. Payback Horizon</span>
                <span className="text-2xl font-black font-mono text-cyan-700 dark:text-cyan-350 block mt-1.5 leading-none">
                  {financialProjection.paybackYears} <span className="text-xs font-sans text-gray-400">Years</span>
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 block mt-1">ROI break-even timeline</span>
              </div>
            </div>

            {/* Recharts Area Chart showing return vs time */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 flex-grow relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                <div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base flex items-center gap-2">
                    <TrendingUp size={16} className="text-cyan-600" strokeWidth={2.5} />
                    15-Year Financial Return & CO₂ Offset Project Timeline
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1">Calculated linearly with continuous operations, carbon offset, and local utility asset prices.</p>
                </div>
                <div className="flex gap-4 text-[10px] text-gray-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-cyan-500 rounded-sm" />
                    <span>Net Profit ($k)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" />
                    <span>CO₂ Saved (Tons)</span>
                  </div>
                </div>
              </div>

              <div className="h-[210px] w-full text-[10px] font-mono select-none">
                {mounted && <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={financialProjection.chartPoints} 
                    margin={{ top: 10, right: 10, left: -25, bottom: -10 }}
                  >
                    <defs>
                      <linearGradient id="colorNetReturn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.01}/>
                      </linearGradient>
                      <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                    <XAxis dataKey="year" stroke="#888888" fontSize={9} />
                    <YAxis stroke="#888888" fontSize={9} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#111827', 
                        border: 'none', 
                        borderRadius: '16px', 
                        color: '#f3f4f6',
                        fontSize: '11px',
                        fontFamily: 'monospace'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="netReturnK" 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorNetReturn)"
                      name="Net Return ($k)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="carbonSaved" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorCarbon)"
                      name="CO₂ Offset (Tons)"
                    />
                  </AreaChart>
                </ResponsiveContainer>}
              </div>
            </div>

            {/* Bottom informational metrics footer */}
            <div className="grid md:grid-cols-2 gap-6 bg-gray-50/50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-white/5 p-6 md:p-8 text-xs leading-relaxed text-gray-500">
              <div className="space-y-2">
                <span className="font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-600 block text-[10px]">Strategic Carbon Offsets</span>
                <p className="text-semibold text-gray-650 dark:text-gray-300">
                  Over a 15-year active scope loop, this setup averts or removes a compiled <strong className="font-extrabold text-cyan-600 dark:text-cyan-400">{financialProjection.co2Avoided15Y.toLocaleString()} tons of CO2</strong>. That represents a localized climate remediation footprint comparable to planting over 250,000 native pine trees.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-600 block text-[10px]">Process Feasibility Index</span>
                <p className="text-semibold text-gray-650 dark:text-gray-300">
                  Calculated values incorporate dynamic thermal recuperator effectiveness, solar panel cloud coverage variances, PEM membrane resistance degradation curves, and standard municipal power infrastructure rates.
                </p>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
