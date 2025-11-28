import { Map, Scan, Gamepad2, ListTodo } from 'lucide-react';
import { motion } from 'motion/react';
import { getTranslation, type Language } from '../../utils/translations';

interface WelcomePageProps {
  userName: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  language: Language;
}

export function WelcomePage({ userName, onNavigate, isDarkMode, language }: WelcomePageProps) {
  const t = (key: keyof typeof import('../../utils/translations').translations.az) => getTranslation(language, key);

  return (
    <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)]">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] py-12 md:py-20 lg:py-32">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}
            style={{ marginBottom: '1.5rem' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('welcome')}, {userName}!
          </motion.h1>
          <motion.p 
            className={`text-base md:text-lg lg:text-xl mb-8 md:mb-12 px-4 ${isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-[#101415] opacity-70'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isDarkMode ? 0.8 : 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('readyToStart')}
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => onNavigate('map')}
              className="group flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#00C57A] text-[#101415] rounded-[12px] hover:bg-[#7DF2C6] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Map className="group-hover:scale-110 transition-transform" size={20} />
              <span className="text-sm md:text-base">{t('startRecycling')}</span>
            </motion.button>

            <motion.button
              onClick={() => onNavigate('plant')}
              className="group flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 border-2 border-[#00C57A] text-[#00C57A] rounded-[12px] hover:bg-[#00C57A] hover:text-[#101415] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Scan className="group-hover:scale-110 transition-transform" size={20} />
              <span className="text-sm md:text-base">{t('recognizePlants')}</span>
            </motion.button>

            <motion.button
              onClick={() => onNavigate('tasks')}
              className="group flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 border-2 border-[#00C57A] text-[#00C57A] rounded-[12px] hover:bg-[#00C57A] hover:text-[#101415] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ListTodo className="group-hover:scale-110 transition-transform" size={20} />
              <span className="text-sm md:text-base">{t('completeTasks')}</span>
            </motion.button>

            <motion.button
              onClick={() => onNavigate('games')}
              className="group flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 border-2 border-[#00C57A] text-[#00C57A] rounded-[12px] hover:bg-[#00C57A] hover:text-[#101415] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gamepad2 className="group-hover:scale-110 transition-transform" size={20} />
              <span className="text-sm md:text-base">{t('playGames')}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className={`py-12 md:py-16 ${isDarkMode ? 'bg-[#1A2324]' : 'bg-gray-50'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px]">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className={`text-center mb-6 md:mb-8 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('ourMission')}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl">♻️</span>
                </motion.div>
                <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'} style={{ marginBottom: '0.5rem' }}>
                  {t('recyclingMapTitle')}
                </h3>
                <p className={`caption ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-[#101415] opacity-60'}`}>
                  {t('recyclingMapDesc')}
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl">🌿</span>
                </motion.div>
                <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'} style={{ marginBottom: '0.5rem' }}>
                  {t('plantRecognitionTitle')}
                </h3>
                <p className={`caption ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-[#101415] opacity-60'}`}>
                  {t('plantRecognitionDesc')}
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl">🌍</span>
                </motion.div>
                <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'} style={{ marginBottom: '0.5rem' }}>
                  {t('community')}
                </h3>
                <p className={`caption ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-[#101415] opacity-60'}`}>
                  {t('communityText')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div 
              className="text-[#00C57A] mb-2"
              style={{ fontSize: '2.5rem', fontWeight: 700 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              250+
            </motion.div>
            <p className={isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-[#101415] opacity-70'}>
              {language === 'az' ? 'Təkrar Emal Nöqtəsi' : language === 'en' ? 'Recycling Points' : 'Точки переработки'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="text-[#00C57A] mb-2"
              style={{ fontSize: '2.5rem', fontWeight: 700 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              1000+
            </motion.div>
            <p className={isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-[#101415] opacity-70'}>
              {language === 'az' ? 'Tanınan Bitki' : language === 'en' ? 'Recognized Plants' : 'Распознанные растения'}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="text-[#00C57A] mb-2"
              style={{ fontSize: '2.5rem', fontWeight: 700 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              5000+
            </motion.div>
            <p className={isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-[#101415] opacity-70'}>
              {language === 'az' ? 'Aktiv İstifadəçi' : language === 'en' ? 'Active Users' : 'Активные пользователи'}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
