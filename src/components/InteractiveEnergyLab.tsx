import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot 
} from 'recharts';
import { 
  Zap, Wind, Flame, Eye, Settings2, BarChart3, HelpCircle, RefreshCw, Milestone, Droplet, Sun 
} from 'lucide-react';

// Hydrogen thermodynamic constants
const R = 8.314; // Universal gas constant in J/(mol K)
const M_H2 = 2.016e-3; // Molar mass of Hydrogen in kg/mol
const A_H2 = 0.02476; // Van der Waals constant 'a' in Pa m^6 / mol^2
const B_H2 = 2.661e-5; // Van der Waals constant 'b' in m^3 / mol

export default function InteractiveEnergyLab() {
  const [activeLab, setActiveLab] = useState<'h2' | 'dac' | 'desal'>('h2');

  // --- HYDROGEN LABORATORY STATE ---
  const [pressureBar, setPressureBar] = useState(350); // 1 to 700 bar
  const [tempCelsius, setTempCelsius] = useState(25); // -50 to 120 C
  const [volumeL, setVolumeL] = useState(50); // 10 to 250 L

  // --- DAC STATE ---
  const [sorbentFlow, setSorbentFlow] = useState(50); // 10 to 150 L/min
  const [inletPpm, setInletPpm] = useState(420); // 400 to 1000 ppm (CO2 concentration)
  const [calcTemperature, setCalcTemperature] = useState(820); // 700 to 950 C
  const [recoveryEfficiency, setRecoveryEfficiency] = useState(65); // 10 to 95 %

  // --- DESAL STATE ---
  const [hotWaterTemp, setHotWaterTemp] = useState(75); // 40 to 90 C
  const [coolingDelta, setCoolingDelta] = useState(20); // 5 to 30 C
  const [solarArea, setSolarArea] = useState(25); // 5 to 50 m^2
  const [airFlowScale, setAirFlowScale] = useState(0.15); // 0.05 to 0.5 kg/s

  // --- HYDROGEN CALCULATIONS ---
  const h2Metrics = useMemo(() => {
    const P = pressureBar * 1e5; // Convert bar to Pascal
    const T = tempCelsius + 273.15; // Convert to Kelvin
    const V_m3 = volumeL * 1e-3; // Convert L to m^3

    // 1. Ideal Gas Calculations
    // PV = nRT => n = PV/RT
    const molesIdeal = (P * V_m3) / (R * T);
    const massIdealKg = molesIdeal * M_H2;
    const densityIdeal = massIdealKg / V_m3; // kg/m^3

    // 2. Van der Waals Real Gas Calculations
    // (P + a/V_m^2)(V_m - b) = RT
    // Let's solve cubic equation for molar volume: V_m^3 - (b + RT/P)V_m^2 + (a/P)V_m - ab/P = 0
    // For high accuracy in browser, we can perform Newton-Raphson approximation
    let V_m = (R * T) / P; // Start guess with ideal molar volume
    for (let i = 0; i < 10; i++) {
      const f = (P + A_H2 / (V_m * V_m)) * (V_m - B_H2) - R * T;
      const df = P - (A_H2 / (V_m * V_m)) + 2 * A_H2 * B_H2 / (V_m * V_m * V_m);
      V_m = V_m - f / df;
    }

    const molesReal = V_m3 / V_m;
    const massRealKg = molesReal * M_H2;
    const densityReal = massRealKg / V_m3;

    // Hydrogen properties
    const LHV_H2 = 120; // Lower heating value of hydrogen in MJ/kg
    const totalEnergyMJ = massRealKg * LHV_H2;
    const kwhEquivalent = totalEnergyMJ / 3.6; // 1 kWh = 3.6 MJ
    const mileageKm = massRealKg * 100; // Average fuel cell vehicle mileage config: 1kg ~ 100km

    // Index of compressibility Z = PV / RT
    const Z = (P * V_m) / (R * T);

    return {
      densityIdeal: Math.round(densityIdeal * 10) / 10,
      densityReal: Math.round(densityReal * 10) / 10,
      massKg: Math.round(massRealKg * 1000) / 1000,
      energyMJ: Math.round(totalEnergyMJ),
      energyKwh: Math.round(kwhEquivalent),
      mileage: Math.round(mileageKm),
      compressibilityZ: Math.round(Z * 1000) / 1000,
      deviationPercent: Math.round(Math.abs((densityReal - densityIdeal) / densityReal) * 1000) / 10
    };
  }, [pressureBar, tempCelsius, volumeL]);

  // Hydrogen Isotherm generation
  const h2ChartData = useMemo(() => {
    const T = tempCelsius + 273.15;
    const points = [];
    
    // Generate pressures from 10 bar to 750 bar
    for (let pBar = 10; pBar <= 750; pBar += 30) {
      const P = pBar * 1e5;
      
      // Calculate molar volume V_m using Newton-Raphson
      let V_m = (R * T) / P;
      for (let i = 0; i < 6; i++) {
        const f = (P + A_H2 / (V_m * V_m)) * (V_m - B_H2) - R * T;
        const df = P - (A_H2 / (V_m * V_m)) + 2 * A_H2 * B_H2 / (V_m * V_m * V_m);
        V_m = V_m - f / df;
      }
      
      const density = (1 * M_H2) / V_m; // in kg/m3 for molar unit volume
      points.push({
        pressure: pBar,
        densityReal: Math.round(density * 10) / 10,
        densityIdeal: Math.round(((P * M_H2) / (R * T)) * 10) / 10,
      });
    }
    return points;
  }, [tempCelsius]);


  // --- DAC SIMULATOR CALCULATIONS ---
  const dacMetrics = useMemo(() => {
    // Sorbent flow, Inlet concentration, calciner temp.
    // Efficiencies and chemical reactions of aqueous KOH/Ca(OH)2 or DAC filter
    const theoreticalMaxRate = (sorbentFlow * (inletPpm / 1e6) * 1.8); // kg CO2 / hr capture model scale
    const calcTempModifier = calcTemperature < 800 
      ? Math.max(0.1, (calcTemperature - 600) / 200) 
      : 1.0 + (calcTemperature - 800) * 0.0005; // Thermal desorption activation threshold

    const actualCaptureRate = theoreticalMaxRate * calcTempModifier * 0.82; // Capture rate in kg/hr
    
    // Heat Requirements: high heat recovery reduces required GJ/tonne
    // Aqueous carbon loop requires about 5-8 GJ thermal energy per tonne CO2
    const baselineThermalRequired = 7.5; // GJ / tonne
    const calculatedThermalGJ = (baselineThermalRequired * (1 - (recoveryEfficiency / 100) * 0.7)) / calcTempModifier;

    const yearlyTreesEquivalent = (actualCaptureRate * 24 * 365) / 22; // Average mature tree sequesters ~22kg CO2/year
    const powerRequirementKw = (actualCaptureRate * 0.45); // Electrical work in kW

    return {
      captureRate: Math.round(actualCaptureRate * 100) / 100,
      thermalGJPerTonne: Math.round(calculatedThermalGJ * 10) / 10,
      trees: Math.round(yearlyTreesEquivalent),
      powerKw: Math.round(powerRequirementKw * 10) / 10,
      saturationIndex: Math.round(Math.min(98, 45 + (inletPpm * 0.05) - (sorbentFlow * 0.1)))
    };
  }, [sorbentFlow, inletPpm, calcTemperature, recoveryEfficiency]);

  const dacChartData = useMemo(() => {
    const data = [];
    // Generate capturing rate over varying inlet concentration
    for (let ppm = 380; ppm <= 1000; ppm += 50) {
      const theoretical = (sorbentFlow * (ppm / 1e6) * 1.8);
      const calcTempModifier = calcTemperature < 800 
        ? Math.max(0.1, (calcTemperature - 600) / 200) 
        : 1.0 + (calcTemperature - 800) * 0.0005;
      const rate = theoretical * calcTempModifier * 0.82;
      
      data.push({
        ppm,
        captureRate: Math.round(rate * 100) / 100,
        optimizedRate: Math.round(rate * 1.35 * 100) / 100, // with pre-recovery catalyst
      });
    }
    return data;
  }, [sorbentFlow, calcTemperature]);

  // --- DESAL MODEL CALCULATIONS ---
  const getHumidityRatio = (tempC: number) => {
    // Saturation pressure of water vapor using Antoine Equation
    const pSat = 133.32 * Math.pow(10, 8.07131 - 1730.63 / (tempC + 233.426)); // Pa
    const pAtm = 101325; // Pa
    const w = 0.622 * (pSat / (pAtm - pSat));
    return Math.max(0.001, w);
  };

  const desalMetrics = useMemo(() => {
    const tHot = hotWaterTemp;
    const tCold = Math.max(20, hotWaterTemp - coolingDelta);
    
    const wHot = getHumidityRatio(tHot);
    const wCold = getHumidityRatio(tCold);
    
    // Freshwater yield in kg/hr
    const yieldKgHr = airFlowScale * (wHot - wCold) * 3600;
    
    // Solar heat input (kW) - assume direct solar constant 0.8 kW / m^2
    const solarIrradiance = 0.8; // kW/m^2
    const qSolar = solarArea * solarIrradiance; 
    
    // Performance Ratio (PR)
    // PR = (yield [kg/s] * latent_heat [kJ/kg]) / solar_heat_kw
    const latentHeatVac = 2400; // kJ/kg
    const yieldKgS = yieldKgHr / 3600;
    const pr = qSolar > 0 ? (yieldKgS * latentHeatVac) / qSolar : 0;
    
    // Specific Thermal Energy Consumption (STEC) in kWh / m^3
    // STEC = qSolar [kW] / (yield [m^3/hr]) = qSolar / (yieldKgHr / 1000)
    // 1 m^3 of water = 1000 kg
    const yieldM3Hr = yieldKgHr / 1000;
    const stec = yieldM3Hr > 0 ? qSolar / yieldM3Hr : 0;
    
    // Equivalent Carbon savings scale
    const dynamicCOP = Math.min(99.5, 45 + pr * 12);
    
    return {
      freshwaterLHr: Math.round(yieldKgHr * 10) / 10,
      solarHeatKw: Math.round(qSolar * 10) / 10,
      performanceRatio: Math.round(pr * 100) / 100,
      stecKwhM3: Math.round(stec),
      dynamicCop: Math.round(dynamicCOP),
      savingCo2KgYear: Math.round(yieldKgHr * 24 * 365 * 0.12) // proxy sustainability metrics
    };
  }, [hotWaterTemp, coolingDelta, solarArea, airFlowScale]);

  const desalChartData = useMemo(() => {
    const points = [];
    const tColdDelta = coolingDelta;
    
    // Vary hot water temp from 40 to 90
    for (let temp = 40; temp <= 90; temp += 5) {
      const wHot = getHumidityRatio(temp);
      const wCold = getHumidityRatio(Math.max(20, temp - tColdDelta));
      const yieldKgHr = airFlowScale * (wHot - wCold) * 3600;
      
      // Static custom baseline model showing static conventional solar still limits
      const baseStillYield = 0.05 * temp * (solarArea / 25);
      
      points.push({
        temp,
        freshwaterLHr: Math.round(yieldKgHr * 10) / 10,
        baseStillYield: Math.round(baseStillYield * 10) / 10
      });
    }
    return points;
  }, [coolingDelta, airFlowScale, solarArea]);

  return (
    <div className="bg-white dark:bg-gray-901 border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all">
      {/* Tab Selectors */}
      <div className="flex border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-950/20 p-2 gap-1">
        <button
          onClick={() => setActiveLab('h2')}
          className={`flex-1 py-4 px-6 font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
            activeLab === 'h2' 
              ? 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 text-cyan-600 dark:text-cyan-400 shadow-xl shadow-cyan-600/5' 
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
          }`}
        >
          <Flame size={18} className={activeLab === 'h2' ? 'text-cyan-500' : 'text-gray-400'} />
          1D Hydrogen Cell Lab
        </button>
        <button
          onClick={() => setActiveLab('dac')}
          className={`flex-1 py-4 px-6 font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
            activeLab === 'dac' 
              ? 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 text-cyan-600 dark:text-cyan-400 shadow-xl shadow-cyan-600/5' 
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
          }`}
        >
          <Wind size={18} className={activeLab === 'dac' ? 'text-cyan-500' : 'text-gray-400'} />
          Carbon Capture DAC Loop
        </button>
        <button
          onClick={() => setActiveLab('desal')}
          className={`flex-1 py-4 px-6 font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
            activeLab === 'desal' 
              ? 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 text-cyan-600 dark:text-cyan-400 shadow-xl shadow-cyan-600/5' 
              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
          }`}
        >
          <Droplet size={18} className={activeLab === 'desal' ? 'text-cyan-500' : 'text-gray-400'} />
          Solar thermal HDH Desalination
        </button>
      </div>

      <div className="p-8 md:p-10">
        {activeLab === 'h2' ? (
          /* --- HYDROGEN LAB VIEW --- */
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[10px] bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  System Parameterization
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-3">Hydrogen State Solver</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Adjust thermodynamic values using real gas equations (Van der Waals) to monitor gas compressibility, deviation from ideal states, and equivalent energy outputs.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                {/* Pressure Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">P - Storage Pressure</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{pressureBar} bar</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={700}
                    value={pressureBar}
                    onChange={(e) => setPressureBar(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>1 bar (Atmospheric)</span>
                    <span>350 (Passenger FCEV)</span>
                    <span>700 (Heavy Truck)</span>
                  </div>
                </div>

                {/* Temperature Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">T - Operating Temperature</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{tempCelsius} °C <span className="text-gray-400 font-light font-sans">({tempCelsius + 273} K)</span></span>
                  </div>
                  <input
                    type="range"
                    min={-40}
                    max={120}
                    value={tempCelsius}
                    onChange={(e) => setTempCelsius(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>-40 °C (Cryo/Cold)</span>
                    <span>25 °C (Ambient)</span>
                    <span>120 °C (Heat Spike)</span>
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">V - Tank Physical Capacity</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{volumeL} Liters</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={250}
                    value={volumeL}
                    onChange={(e) => setVolumeL(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>10 L (Compact unit)</span>
                    <span>150 L (Commercial cell)</span>
                    <span>250 L (Stationary array)</span>
                  </div>
                </div>
              </div>

              {/* Solved Chemical Output Block */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/5 rounded-3xl p-6 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block">Compressibility (Z)</span>
                  <span className="text-2xl font-black font-mono text-gray-800 dark:text-gray-100">{h2Metrics.compressibilityZ}</span>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    {h2Metrics.compressibilityZ > 1 
                      ? "Z > 1: Repulsive forces dominate, harder to compress." 
                      : "Z < 1: Attractive forces dominant."}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block">Real Equation Deviation</span>
                  <span className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">{h2Metrics.deviationPercent}%</span>
                  <p className="text-[10px] text-gray-400">Error if assuming Ideal Gas model incorrectly.</p>
                </div>
              </div>
            </div>

            {/* Calculations & Chart Visual Area */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
              {/* Dashboard Metrics Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 bg-cyan-600/5 border border-cyan-100 dark:border-cyan-950/20 rounded-2xl relative overflow-hidden">
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-extrabold uppercase tracking-wider block">Stored Mass</span>
                  <span className="text-3xl font-black font-mono text-cyan-700 dark:text-cyan-300 block my-1">
                    {h2Metrics.massKg} <span className="text-sm font-bold font-sans">kg</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">Calculated at live P/T</span>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-white/3 border border-gray-150 dark:border-white/5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block">Energy Volume</span>
                  <span className="text-3xl font-black font-mono text-gray-800 dark:text-gray-100 block my-1">
                    {h2Metrics.energyMJ} <span className="text-xs font-bold font-sans text-gray-400">MJ</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">({h2Metrics.energyKwh} kWh energy equivalent)</span>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-white/3 border border-gray-150 dark:border-white/5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block">FCEV Vehicle Range</span>
                  <span className="text-3xl font-black font-mono text-gray-800 dark:text-gray-100 block my-1">
                    ~{h2Metrics.mileage} <span className="text-xs font-bold font-sans text-gray-400">km</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">Clean zero-emission travel</span>
                </div>
              </div>

              {/* Plot rendering density vs Pressure */}
              <div className="bg-gray-50 dark:bg-white/3 rounded-3xl p-6 border border-gray-150 dark:border-white/5 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm flex items-center gap-1.5">
                      <BarChart3 size={15} className="text-cyan-600" />
                      Density (kg/m³) vs. Pressure (bar) Isotherm
                    </h4>
                    <p className="text-[10px] text-gray-400">Real Gas State (Cyan) vs Ideal Gas State (Dotted Slate)</p>
                  </div>
                  <span className="text-[10px] bg-white dark:bg-gray-900 border border-gray-150 dark:border-white/10 text-gray-500 dark:text-gray-450 px-2.5 py-1 rounded-lg font-mono">
                    T = {tempCelsius}°C
                  </span>
                </div>

                <div className="h-[230px] w-full text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={h2ChartData} margin={{ top: 10, right: 10, left: -20, bottom: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                      <XAxis dataKey="pressure" stroke="#888888" fontSize={9} />
                      <YAxis stroke="#888888" fontSize={9} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111827', 
                          border: 'none', 
                          borderRadius: '12px', 
                          color: '#f3f4f6',
                          fontSize: '11px',
                          fontFamily: 'monospace'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="densityReal" 
                        stroke="#0891b2" 
                        strokeWidth={2.5} 
                        dot={false} 
                        name="Real Gas (Van der Waals)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="densityIdeal" 
                        stroke="#94a3b8" 
                        strokeDasharray="4 4" 
                        strokeWidth={1.5} 
                        dot={false}
                        name="Ideal Gas"
                      />
                      {/* Live dot position */}
                      <ReferenceDot 
                        x={pressureBar} 
                        y={h2Metrics.densityReal} 
                        r={6} 
                        fill="#0891b2" 
                        stroke="#ffffff" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ) : activeLab === 'dac' ? (
          /* --- DAC VIEW --- */
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[10px] bg-teal-100 dark:bg-emerald-900/30 text-teal-700 dark:text-emerald-400 font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Thermochemical Carbon Loop
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-3">Direct Air Capture (DAC)</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Model aqueous solvent cycle loops. Calibrate flow velocity, inlet ambient CO2 counts, and calciner regenerating temperatures to calculate Net efficiency.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                {/* Sorbent Flow */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">KOH/Carbonate Flow Rate</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{sorbentFlow} L/min</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={150}
                    value={sorbentFlow}
                    onChange={(e) => setSorbentFlow(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>10 L/min</span>
                    <span>75 L/min (Standard loop)</span>
                    <span>150 L/min (Industrial)</span>
                  </div>
                </div>

                {/* Ambient CO2 count */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">Ambient Air Inlet Concentration</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{inletPpm} ppm</span>
                  </div>
                  <input
                    type="range"
                    min={400}
                    max={1000}
                    value={inletPpm}
                    onChange={(e) => setInletPpm(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>420 ppm (Standard Room)</span>
                    <span>700 ppm (Urban Core)</span>
                    <span>1000 ppm (Flue/Exhaust gas)</span>
                  </div>
                </div>

                {/* Regenerating Temperature */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">Calcination Kiln Temperature</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{calcTemperature}°C</span>
                  </div>
                  <input
                    type="range"
                    min={650}
                    max={950}
                    value={calcTemperature}
                    onChange={(e) => setCalcTemperature(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>650 °C (Slow reaction)</span>
                    <span>820 °C (Nominal CaCO3 peak)</span>
                    <span>950 °C (Ultra-high heat)</span>
                  </div>
                </div>

                {/* Thermal Recovery Efficiency */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">Preheater Heat Recovery Efficiency</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{recoveryEfficiency}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={95}
                    value={recoveryEfficiency}
                    onChange={(e) => setRecoveryEfficiency(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>10% (Low efficiency)</span>
                    <span>65% (Modern Recuperator)</span>
                    <span>95% (Advanced Pinch-Point)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations & Graph Visual Area */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
              {/* Dashboard Metrics Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 bg-cyan-600/5 border border-cyan-100 dark:border-cyan-950/20 rounded-2xl">
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-extrabold uppercase tracking-wider block">Capture Yield</span>
                  <span className="text-3xl font-black font-mono text-cyan-700 dark:text-cyan-300 block my-1">
                    {dacMetrics.captureRate} <span className="text-sm font-bold font-sans">kg/hr</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">Carbon locked from atmospheric air</span>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-white/3 border border-gray-150 dark:border-white/5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block font-bold">Specific Thermal Duty</span>
                  <span className="text-3xl font-black font-mono text-gray-800 dark:text-gray-100 block my-1">
                    {dacMetrics.thermalGJPerTonne} <span className="text-xs font-bold font-zinc-400">GJ/t</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">Gigajoules heat per tonne CO2</span>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-white/3 border border-gray-150 dark:border-white/5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block">Yearly Tree Offset Eq</span>
                  <span className="text-3xl font-black font-mono text-gray-800 dark:text-gray-100 block my-1">
                    {dacMetrics.trees} <span className="text-xs font-bold font-sans text-gray-400">x</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">Trees offsetting same output</span>
                </div>
              </div>

              {/* Chart of Capture capacity over varying inlet concentration */}
              <div className="bg-gray-50 dark:bg-white/3 rounded-3xl p-6 border border-gray-150 dark:border-white/5 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm flex items-center gap-1.5">
                      <BarChart3 size={15} className="text-cyan-600" />
                      CO₂ Captured Capacity vs Inlet Concentrations
                    </h4>
                    <p className="text-[10px] text-gray-400">Base Loop Output (Cyan) vs Thermodynamic Optimized Catalyst Loop (Slate)</p>
                  </div>
                  <span className="text-[10px] bg-white dark:bg-gray-900 border border-gray-150 dark:border-white/10 text-gray-500 dark:text-gray-450 px-2.5 py-1 rounded-lg font-mono">
                    Kiln = {calcTemperature}°C
                  </span>
                </div>

                <div className="h-[210px] w-full text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dacChartData} margin={{ top: 10, right: 10, left: -20, bottom: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                      <XAxis dataKey="ppm" stroke="#888888" fontSize={9} />
                      <YAxis stroke="#888888" fontSize={9} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111827', 
                          border: 'none', 
                          borderRadius: '12px', 
                          color: '#f3f4f6',
                          fontSize: '11px',
                          fontFamily: 'monospace'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="captureRate" 
                        stroke="#0d9488" 
                        strokeWidth={2.5} 
                        dot={false} 
                        name="Base Cap Rate (kg/hr)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="optimizedRate" 
                        stroke="#64748b" 
                        strokeDasharray="4 4" 
                        strokeWidth={1.5} 
                        dot={false}
                        name="Optimized Loop"
                      />
                      <ReferenceDot 
                        x={inletPpm} 
                        y={dacMetrics.captureRate} 
                        r={6} 
                        fill="#0d9488" 
                        stroke="#ffffff" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* --- DESAL VIEW --- */
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[10px] bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Solar thermal cycles
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-3">Solar Thermal HDH Desalination</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Model multi-stage solar water desalination loops using Humidification-Dehumidification (HDH). Calibrate temperatures and carrier air-flows to maximize recovery ratio and minimize specific thermal energy bounds.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                {/* Hot water Inlet temp */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">T_hot - Solar Water Temp</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{hotWaterTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={90}
                    value={hotWaterTemp}
                    onChange={(e) => setHotWaterTemp(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>40 °C (Low solar)</span>
                    <span>75 °C (Standard thermal)</span>
                    <span>90 °C (Vacuum pressurized)</span>
                  </div>
                </div>

                {/* Sorbent cooling delta */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">ΔT_cooling - Condensation Delta</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{coolingDelta}°C</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={coolingDelta}
                    onChange={(e) => setCoolingDelta(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>5 °C (Low delta)</span>
                    <span>20 °C (Recuperator standard)</span>
                    <span>30 °C (Chilled multi-stage)</span>
                  </div>
                </div>

                {/* Solar area */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">A_solar - Collector Field Area</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{solarArea} m²</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    value={solarArea}
                    onChange={(e) => setSolarArea(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>5 m² (Residential)</span>
                    <span>25 m² (Community)</span>
                    <span>50 m² (Industrial grid)</span>
                  </div>
                </div>

                {/* Air Flow Scale */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">m_air - Carrier Dry Air Flow</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono">{airFlowScale} kg/s</span>
                  </div>
                  <input
                    type="range"
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    value={airFlowScale}
                    onChange={(e) => setAirFlowScale(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>0.05 kg/s</span>
                    <span>0.15 kg/s (Nominal)</span>
                    <span>0.50 kg/s (High fan duty)</span>
                  </div>
                </div>
              </div>

              {/* Distillation thermodynamics details */}
              <div className="bg-gray-50 dark:bg-white/5 border border-gray-150 dark:border-white/5 rounded-3xl p-6 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block">Performance Ratio (PR)</span>
                  <span className="text-2xl font-black font-mono text-gray-800 dark:text-gray-100">{desalMetrics.performanceRatio}</span>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    Multi-stage extraction index. Standard basins are single-effect (PR &lt; 1).
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block">Energy Recovery Index</span>
                  <span className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">{desalMetrics.dynamicCop}%</span>
                  <p className="text-[10px] text-gray-450">Latent heat recovery level across condensing boards.</p>
                </div>
              </div>
            </div>

            {/* Calculations & Graph Visual Area */}
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
              {/* Dashboard Metrics Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 bg-cyan-600/5 border border-cyan-100 dark:border-cyan-950/20 rounded-2xl">
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-extrabold uppercase tracking-wider block">Distillate Pure Out</span>
                  <span className="text-3xl font-black font-mono text-cyan-700 dark:text-cyan-300 block my-1">
                    {desalMetrics.freshwaterLHr} <span className="text-sm font-bold font-sans">L/hr</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">Pure distilled freshwater</span>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-white/3 border border-gray-150 dark:border-white/5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-wider block font-bold">Specific Thermal Duty</span>
                  <span className="text-3xl font-black font-mono text-gray-800 dark:text-gray-100 block my-1">
                    {desalMetrics.stecKwhM3} <span className="text-xs font-bold font-zinc-400">kWh/m³</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 block">Required thermal energy input bound</span>
                </div>
                <div className="p-5 bg-gray-50 dark:bg-white/3 border border-gray-150 dark:border-white/5 rounded-2xl">
                  <span className="text-[10px] text-gray-400 dark:text-gray-400 font-extrabold uppercase tracking-wider block">Solar Thermal Power</span>
                  <span className="text-3xl font-black font-mono text-gray-800 dark:text-gray-100 block my-1">
                    {desalMetrics.solarHeatKw} <span className="text-xs font-bold font-sans text-gray-400">kW</span>
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-550 block">Captured solar collection utility</span>
                </div>
              </div>

              {/* Chart of Freshwater yield vs solar collector inlet temperatures */}
              <div className="bg-gray-50 dark:bg-white/3 rounded-3xl p-6 border border-gray-150 dark:border-white/5 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm flex items-center gap-1.5">
                      <BarChart3 size={15} className="text-cyan-600" />
                      Water Distillation Rate vs Solar Water Temp
                    </h4>
                    <p className="text-[10px] text-gray-400">Multi-Stage HDH Yield (Cyan) vs Non-Recycling Traditional Solar Basin Still (Slate)</p>
                  </div>
                  <span className="text-[10px] bg-white dark:bg-gray-900 border border-gray-150 dark:border-white/10 text-gray-500 dark:text-gray-450 px-2.5 py-1 rounded-lg font-mono">
                    Area = {solarArea} m²
                  </span>
                </div>

                <div className="h-[210px] w-full text-xs font-mono">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={desalChartData} margin={{ top: 10, right: 10, left: -20, bottom: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                      <XAxis dataKey="temp" stroke="#888888" fontSize={9} />
                      <YAxis stroke="#888888" fontSize={9} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111827', 
                          border: 'none', 
                          borderRadius: '12px', 
                          color: '#f3f4f6',
                          fontSize: '11px',
                          fontFamily: 'monospace'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="freshwaterLHr" 
                        stroke="#06b6d4" 
                        strokeWidth={2.5} 
                        dot={false} 
                        name="Multi-Stage HDH Yield (L/hr)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="baseStillYield" 
                        stroke="#64748b" 
                        strokeDasharray="4 4" 
                        strokeWidth={1.5} 
                        dot={false}
                        name="Conventional Solar Basin"
                      />
                      <ReferenceDot 
                        x={hotWaterTemp} 
                        y={desalMetrics.freshwaterLHr} 
                        r={6} 
                        fill="#06b6d4" 
                        stroke="#ffffff" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
