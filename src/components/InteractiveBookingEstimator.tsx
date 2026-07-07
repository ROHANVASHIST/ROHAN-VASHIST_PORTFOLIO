import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Sparkles, Check, CheckCircle2, ChevronRight, Calculator, AlertCircle } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const AVAILABLE_SLOTS: TimeSlot[] = [
  { id: '1', time: '09:00 AM - 10:00 AM EST', available: true },
  { id: '2', time: '11:00 AM - 12:00 PM EST', available: false },
  { id: '3', time: '02:00 PM - 03:00 PM EST', available: true },
  { id: '4', time: '04:00 PM - 05:00 PM EST', available: true }
];

export default function InteractiveBookingEstimator() {
  // Project sizing variables
  const [projectType, setProjectType] = useState<'simulation' | 'web-app' | 'consulting'>('web-app');
  const [complexity, setComplexity] = useState<number>(2); // 1 = Simple, 2 = Medium, 3 = Advanced
  const [timeline, setTimeline] = useState<number>(6); // weeks

  // Booking variables
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('2026-06-01');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  // Estimator logic calculations
  const calculateEstimate = () => {
    let baseRate = 0;
    if (projectType === 'simulation') baseRate = 1200; // per cycle/unit
    else if (projectType === 'web-app') baseRate = 1500; // per major view
    else baseRate = 180; // per hour, estimated 40 hours consultation

    const complexityMultiplier = complexity === 1 ? 0.8 : complexity === 2 ? 1.2 : 2.0;
    const timelineDiscount = timeline < 4 ? 1.3 : timeline > 8 ? 0.9 : 1.0; // tight timeline costs more

    const calculatedHrs = Math.round(40 * complexityMultiplier * (projectType === 'consulting' ? 1 : 2.5));
    const estimatedCost = Math.round(baseRate * complexityMultiplier * timelineDiscount * (projectType === 'consulting' ? 10 : 3.5));

    return {
      hours: calculatedHrs,
      cost: estimatedCost.toLocaleString(),
      rate: projectType === 'consulting' ? '$180/hr' : 'Fixed Scope'
    };
  };

  const estimate = calculateEstimate();

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !clientName || !clientEmail) return;

    setIsBookingLoading(true);

    try {
      // Simulate real API interaction
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsBooked(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsBookingLoading(false);
    }
  };

  return (
    <div id="estimator-booking-scheduler" className="grid lg:grid-cols-12 gap-12 bg-gray-50/40 dark:bg-gray-900/10 border border-gray-100 dark:border-white/5 rounded-[3rem] p-8 md:p-12 font-sans overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-600/5 blur-[120px] rounded-full" />

      {/* Estimator Sizing Block */}
      <div className="lg:col-span-6 space-y-8 relative z-10">
        <div>
          <span className="text-[10px] font-black tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase block mb-2">Scope Modeling</span>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">Project Work Estimator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Configure proposed parameter options to calculate estimated development timelines and baseline work cost models for custom solutions.
          </p>
        </div>

        {/* Project Type selection */}
        <div className="space-y-3">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">1. Solution Type</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'web-app', label: 'Web Platform' },
              { id: 'simulation', label: 'Solver / Sim' },
              { id: 'consulting', label: 'Consulting' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setProjectType(t.id as any)}
                className={`py-3 px-2 text-center text-xs font-bold rounded-2xl border transition-all cursor-pointer ${
                  projectType === t.id 
                    ? 'bg-white dark:bg-gray-900 border-cyan-600/30 dark:border-cyan-400/20 text-cyan-600 dark:text-cyan-400 shadow-lg shadow-cyan-600/5' 
                    : 'bg-transparent border-gray-100 dark:border-white/5 text-gray-600 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Range Selection */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">2. Solution Complexity</label>
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-black uppercase">
              {complexity === 1 ? 'Proof of Concept' : complexity === 2 ? 'Production Standard' : 'Enterprise Scale'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { level: 1, label: 'Simple' },
              { level: 2, label: 'Standard' },
              { level: 3, label: 'Advanced' }
            ].map(c => (
              <button
                key={c.level}
                onClick={() => setComplexity(c.level)}
                className={`py-2 px-1 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  complexity === c.level 
                    ? 'bg-cyan-550/15 border-cyan-600/30 text-cyan-600 dark:text-cyan-400' 
                    : 'bg-transparent border-gray-100 dark:border-white/5 text-gray-400 hover:bg-gray-100/40 dark:hover:bg-white/5'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sizing timeline slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">3. Requested Duration Timeline</label>
            <span className="text-xs text-gray-900 dark:text-white font-bold">{timeline} Weeks</span>
          </div>
          <input 
            type="range" 
            min="2" 
            max="12" 
            value={timeline} 
            onChange={(e) => setTimeline(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-600 select-none outline-none"
          />
          <div className="flex justify-between text-[9px] text-gray-400 font-mono">
            <span>2 WEEKS (RUSHED)</span>
            <span>12 WEEKS (STANDARD)</span>
          </div>
        </div>

        {/* Calculated result estimate panel */}
        <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl flex justify-between items-center shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Calculator size={11} /> Calculated Model Sizing
            </span>
            <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">${estimate.cost}</p>
            <span className="text-[10px] text-gray-400 block font-medium">Model Sized rate: {estimate.rate}</span>
          </div>

          <div className="text-right border-l border-gray-100 dark:border-white/5 pl-6 space-y-1 py-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Estimated Scope</span>
            <p className="text-base font-black text-cyan-600 dark:text-cyan-400">{estimate.hours} Dev Hrs</p>
            <span className="text-[10px] text-gray-400 block font-medium">Over {timeline} weeks duration</span>
          </div>
        </div>
      </div>

      {/* Calendar Booker Scheduling Column */}
      <div className="lg:col-span-6 bg-white dark:bg-gray-900/40 border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 relative z-10">
        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.form 
              key="booking-form"
              onSubmit={handleBookingSubmit}
              className="space-y-6"
            >
              <div>
                <span className="text-[10px] font-black tracking-[0.25em] text-cyan-600 dark:text-cyan-400 uppercase block mb-1">Calendar Access</span>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Secure Consult Slot</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Schedule a direct 1-on-1 engineering sync to discuss this estimated modeled scope.
                </p>
              </div>

              {/* Date selection input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Choose Consult Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min="2026-05-26"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl text-xs font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-cyan-600 outline-none"
                  />
                </div>
              </div>

              {/* Time Slots grid layout */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Available Slots ({bookingDate})</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {AVAILABLE_SLOTS.map(slot => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`p-3 text-left rounded-xl text-xs font-bold border transition-all ${
                        !slot.available 
                          ? 'bg-gray-50 dark:bg-gray-950/25 border-gray-100 dark:border-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-60 line-through' 
                          : selectedSlot === slot.id
                            ? 'bg-cyan-600 border-cyan-600 text-white shadow-md shadow-cyan-600/10'
                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-white/5 text-gray-600 hover:bg-gray-55/60 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white cursor-pointer'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock size={12} className={selectedSlot === slot.id ? "text-cyan-200" : "text-cyan-600"} />
                        {slot.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Info fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Dr. Jordan"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-xl text-xs text-gray-800 dark:text-white focus:ring-1 focus:ring-cyan-600 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="jordan@lab.org"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-xl text-xs text-gray-800 dark:text-white focus:ring-1 focus:ring-cyan-600 outline-none"
                  />
                </div>
              </div>

              {/* Booking Submission CTA Button */}
              <button
                type="submit"
                disabled={isBookingLoading || !selectedSlot}
                className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  !selectedSlot 
                    ? 'bg-gray-100 dark:bg-white/5 text-gray-400 border border-gray-100 dark:border-white/5 cursor-not-allowed' 
                    : 'bg-cyan-600 text-white shadow-xl shadow-cyan-600/10 hover:bg-cyan-500 cursor-pointer active:translate-y-0.5'
                }`}
              >
                {isBookingLoading ? (
                  <>Securing slot...</>
                ) : (
                  <>
                    Request Booking Slot <ChevronRight size={14} />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="booking-success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-16 px-4 space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-gray-900 dark:text-white">Time Slot Requested!</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
                  Hi {clientName}, Rohan has received your modeled scope of works inquiry for this <strong>{projectType === 'web-app' ? 'Web Platform' : projectType === 'simulation' ? 'Solver/Sim' : 'Consulting'}</strong> and requested consult slot for {bookingDate}.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 text-[10px] text-gray-400 max-w-sm mx-auto flex gap-2 justify-center">
                <Sparkles size={14} className="text-cyan-500" />
                <span>Rohan will email confirmation files to <strong>{clientEmail}</strong> within 12 hours.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
