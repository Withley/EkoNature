import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  isDarkMode?: boolean;
}

export function FeatureCard({ icon, title, description, onClick, isDarkMode = true }: FeatureCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`w-full lg:w-[320px] min-h-[180px] md:h-[200px] rounded-[16px] p-5 md:p-6 cursor-pointer transition-all group ${
        isDarkMode 
          ? 'bg-[#1A2324] hover:bg-[#2F3B3C] hover:shadow-[0_4px_24px_rgba(0,196,122,0.2)]' 
          : 'bg-white border border-gray-200 hover:border-[#00C57A] hover:shadow-[0_4px_24px_rgba(0,196,122,0.15)]'
      }`}
      style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 2px 12px rgba(0,0,0,0.1)' }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        <motion.div 
          className="text-[#00C57A] group-hover:text-[#7DF2C6] transition-colors mb-4"
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className={`mb-2 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900'}`}>{title}</h3>
        <p className={`caption ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}`}>{description}</p>
      </div>
    </motion.div>
  );
}