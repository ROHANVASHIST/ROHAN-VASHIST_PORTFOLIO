import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope, but most standard web applications take between 4 to 8 weeks from initial discovery to final deployment."
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes, I offer monthly maintenance packages that include security updates, performance monitoring, and priority support for any new feature requests."
  },
  {
    question: "Can you work with existing codebases?",
    answer: "Absolutely. I often help teams refactor legacy code, upgrade tech stacks, or add new features to existing production environments."
  },
  {
    question: "Which industries do you specialize in?",
    answer: "While I am a generalist, I have significant experience in Engineering, SaaS, and Bio-Energy sectors, where complex data visualization and real-time processing are key."
  },
  {
    question: "What is your primary tech stack?",
    answer: "My core stack includes React, Node.js, and TypeScript. I also work extensively with Python for data-heavy projects and scientific modeling."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-cyan-600' : 'text-gray-800 dark:text-gray-200'}`}>
          {question}
        </span>
        <span className={`p-1 rounded-full transition-all ${isOpen ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rotate-180' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Everything you need to know about working with me.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-100 dark:shadow-none border border-gray-50 dark:border-gray-800 p-8 md:p-12">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-20 bg-cyan-600 rounded-3xl p-10 text-center text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500 rounded-full opacity-50 blur-3xl animate-pulse" />
        <div className="relative z-10">
          <MessageCircle className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-cyan-100 mb-8 max-w-xl mx-auto text-lg">
            If you couldn't find what you're looking for, feel free to reach out directly. I'm always happy to talk about new projects and opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold hover:bg-cyan-50 transition-all shadow-lg active:scale-[0.98]"
          >
            Get in touch
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
