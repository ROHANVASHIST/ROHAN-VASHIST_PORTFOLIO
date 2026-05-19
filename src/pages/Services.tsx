import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import servicesData from '../data/services.json';

export default function Services() {
  return (
    <main className="max-w-6xl mx-auto py-32 px-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-32">
        <div className="max-w-2xl">
          <h1 className="text-sm font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.3em] mb-4">Services</h1>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-[0.9]">
            Professional <br /> Solutions.
          </h2>
        </div>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed self-end">
          Tailored engineering and development services focused on performance, durability, and elegance.
        </p>
      </div>

      <div className="grid gap-1">
        {servicesData.services.map((service: any, index: number) => (
          <motion.div 
            key={service.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group grid lg:grid-cols-12 gap-8 py-16 border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-all px-8 -mx-8 rounded-[2rem]"
          >
            <div className="lg:col-span-1">
              <span className="text-4xl font-black text-gray-200 dark:text-gray-800 tabular-nums">
                0{index + 1}
              </span>
            </div>
            
            <div className="lg:col-span-5">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                {service.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-8">
              <h4 className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-6 border-b dark:border-gray-800 pb-2">Deliverables</h4>
              <ul className="space-y-4">
                {service.deliverables.map((item: string) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1 lg:col-start-12 flex justify-end items-center">
              <motion.div 
                whileHover={{ rotate: -45, scale: 1.2 }}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-400 group-hover:text-cyan-600 group-hover:border-cyan-600 transition-all"
              >
                <ArrowRight size={20} />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] p-12 md:p-20 text-center">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Need a custom technical implementation?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
          I specialize in domain-specific solutions that standard agencies can't handle. Let's discuss your unique requirements.
        </p>
        <button className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black hover:bg-black dark:hover:bg-gray-100 transition-all shadow-xl active:scale-95">
          Schedule a Consultation
        </button>
      </div>
    </main>
  );
}
