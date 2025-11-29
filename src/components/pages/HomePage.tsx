import { Map, Scan, MessageCircle } from 'lucide-react';
import { FeatureCard } from '../FeatureCard';
import { Footer } from '../Footer';
import { motion } from 'motion/react';
import { type Language, getTranslation } from '../../utils/translations';

interface HomePageProps {
  onNavigate: (page: string) => void;
  isDarkMode?: boolean;
  language?: Language;
}

export function HomePage({ onNavigate, isDarkMode = true, language = 'az' }: HomePageProps) {
  const t = (key: keyof typeof import('../../utils/translations').translations.az) => getTranslation(language, key);

  const bgOpacity = isDarkMode ? 0.2 : 0.07;
  const sectionBg = isDarkMode ? '#1A2324' : '#f7f9f9';
  const cardBg = isDarkMode ? '#1A2324' : '#ffffff';
  const cardShadow = isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.08)';
  const cardHoverShadow = isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.08)';

  return (
    <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)]">
      {/* Hero Section */}
      <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-12 md:py-20 lg:py-32">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1718307842442-e4c776ecdc96?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: bgOpacity
          }}
        ></div>

        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className={`mb-4 md:mb-6 px-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-800 opacity-95'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('welcomeTitle')}
          </motion.h1>
          <motion.p 
            className={`text-base md:text-lg lg:text-xl mb-8 md:mb-12 px-4 ${isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-gray-700 opacity-90'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('welcomeSubtitle')}
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => onNavigate('map')}
              className="px-6 md:px-8 py-3 md:py-4 bg-[#00C57A] text-white rounded-[12px] hover:bg-[#7DF2C6] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('getStarted')}
            </motion.button>

            <motion.button
              onClick={() => onNavigate('plant')}
              className={`px-6 md:px-8 py-3 md:py-4 border-2 border-[#00C57A] text-[#00C57A] rounded-[12px] transition-all ${
                isDarkMode ? 'hover:bg-[#00C57A] hover:text-[#101415]' : 'hover:bg-[#00C57A] hover:text-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('plantRecognition')}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards Section */}
      <section className={`py-12 md:py-16`} style={{ backgroundColor: sectionBg }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px]">
          <motion.h2 
            className={`text-center mb-8 md:mb-12 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900 opacity-95'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('features')}
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 justify-center items-stretch">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <FeatureCard
                icon={<Map size={48} />}
                title={t('recyclingMapTitle')}
                description={t('recyclingMapDesc')}
                onClick={() => onNavigate('map')}
                isDarkMode={isDarkMode}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <FeatureCard
                icon={<Scan size={48} />}
                title={t('plantRecognitionTitle')}
                description={t('plantRecognitionDesc')}
                onClick={() => onNavigate('plant')}
                isDarkMode={isDarkMode}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <FeatureCard
                icon={<MessageCircle size={48} />}
                title={t('tasksTitle')}
                description={t('tasksDesc')}
                onClick={() => onNavigate('tasks')}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className={`mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900 opacity-95'}`}>{t('ourMission')}</h2>
            <p className={`mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-gray-700 opacity-90'}`}>{t('ourMissionText')}</p>
            <ul className={`space-y-3 ${isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-gray-700 opacity-90'}`}>
              <motion.li className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}>
                <span className="text-[#00C57A] mt-1">✓</span>
                <span>{t('recyclingMapDesc')}</span>
              </motion.li>
              <motion.li className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
                <span className="text-[#00C57A] mt-1">✓</span>
                <span>{t('plantRecognitionDesc')}</span>
              </motion.li>
              <motion.li className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}>
                <span className="text-[#00C57A] mt-1">✓</span>
                <span>{t('communityText')}</span>
              </motion.li>
            </ul>
          </motion.div>
              
          <motion.div 
            className={`rounded-[16px] p-6 md:p-8 text-center`}
            style={{ backgroundColor: cardBg, boxShadow: cardShadow }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: cardHoverShadow }}
          >
            <motion.div className="text-5xl md:text-7xl mb-4" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, type: "spring" }}>
              🌍
            </motion.div>
            <h3 className={`mb-3 md:mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900 opacity-95'}`}>{t('community')}</h3>
            <p className={`caption mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-700 opacity-90'}`}>{t('communityText')}</p>
            <motion.button
              onClick={() => onNavigate('login')}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-[#00C57A] text-white rounded-[12px] hover:bg-[#7DF2C6] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('getStarted')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
}
 
