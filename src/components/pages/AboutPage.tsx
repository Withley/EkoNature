import { motion } from 'motion/react';
import { Footer } from '../Footer';
import globeIcon from 'figma:asset/b135128d799295f7b858a70c1058d10e7151e9d8.png';
import bookIcon from 'figma:asset/4805f6a74e866be31d68525329cff2e924729172.png';
import peopleIcon from 'figma:asset/a22b7f8dce784524e7ec5cba50d16f401d53c028.png';
import { translations, type Language } from '../../utils/translations';

interface AboutPageProps {
  isDarkMode: boolean;
  language: Language;
}

export function AboutPage({ isDarkMode, language }: AboutPageProps) {
  const t = translations[language];

  return (
    <div className={`min-h-[calc(100vh-72px)] py-8 md:py-12 ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px]">
        {/* Hero */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.aboutTitle}</h1>
          <p className={`opacity-80 text-base md:text-xl ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {t.ourMissionText}
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <motion.div
            className={`rounded-[16px] p-6 md:p-8 text-center ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <img src={globeIcon} alt="Globe" className="w-7 h-7" />
            </motion.div>
            <h3 className={`mb-2 md:mb-3 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.ourMission}</h3>
            <p className={`opacity-70 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.ourMissionText}
            </p>
          </motion.div>

          <motion.div
            className={`rounded-[16px] p-6 md:p-8 text-center ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center"
              whileHover={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <img src={bookIcon} alt="Book" className="w-7 h-7" />
            </motion.div>
            <h3 className={`mb-2 md:mb-3 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.ourValues}</h3>
            <p className={`opacity-70 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.ourValuesText}
            </p>
          </motion.div>

          <motion.div
            className={`rounded-[16px] p-6 md:p-8 text-center ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-[#00C57A] bg-opacity-20 flex items-center justify-center"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img src={peopleIcon} alt="People" className="w-7 h-7" />
            </motion.div>
            <h3 className={`mb-2 md:mb-3 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.community}</h3>
            <p className={`opacity-70 caption ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {t.communityText}
            </p>
          </motion.div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {language === 'az' ? 'Hekayəmiz' : language === 'en' ? 'Our Story' : 'Наша история'}
            </h2>
            <div className={`space-y-4 opacity-80 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {language === 'az' 
                  ? '2025-ci ildə bir qrup ekologiya həvəskarı tərəfindən qurulan platformamız, Azərbaycanda ekologiya şüurunun artırılması və təkrar emal mədəniyyətinin inkişafı məqsədilə fəaliyyətə başlamışdır.'
                  : language === 'en'
                  ? 'Founded in 2025 by a group of environmental enthusiasts, our platform started operations with the goal of raising ecological awareness and developing recycling culture in Azerbaijan.'
                  : 'Основанная в 2025 году группой экологических энтузиастов, наша платформа начала свою деятельность с целью повышения экологической осведомленности и развития культуры переработки в Азербайджане.'
                }
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {language === 'az'
                  ? 'Təkrar emal məntəqələrinin tapılmasının çətinliyi və bitkilər haqqında məlumat əldə etmənin mürəkkəbliyi bizə bu platformanı yaratmaq üçün ilham verdi.'
                  : language === 'en'
                  ? 'The difficulty of finding recycling centers and the complexity of obtaining information about plants inspired us to create this platform.'
                  : 'Сложность поиска центров переработки и получения информации о растениях вдохновила нас создать эту платформу.'
                }
              </motion.p>

            </div>
          </motion.div>

          <motion.div
            className={`rounded-[16px] p-6 md:p-8 ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="text-5xl md:text-7xl mb-3 md:mb-4 text-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              🌱
            </motion.div>
            <h3 className={`text-center mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {language === 'az' ? 'Nailiyyətlərimiz' : language === 'en' ? 'Our Achievements' : 'Наши достижения'}
            </h3>
            <div className="space-y-4">
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Aktiv İstifadəçi' : language === 'en' ? 'Active Users' : 'Активных пользователей'}
                </span>
                <span className="text-[#00C57A]">0</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Təkrar Emal Nöqtəsi' : language === 'en' ? 'Recycling Points' : 'Пунктов переработки'}
                </span>
                <span className="text-[#00C57A]">0</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Tanınmış Bitki' : language === 'en' ? 'Plants Recognized' : 'Распознано растений'}
                </span>
                <span className="text-[#00C57A]">0</span>
              </motion.div>
              <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <span className={`opacity-70 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                  {language === 'az' ? 'Tullantı Toplanması (kg)' : language === 'en' ? 'Waste Collected (kg)' : 'Собрано отходов (кг)'}
                </span>
                <span className="text-[#00C57A]">0</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`mb-6 md:mb-8 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {language === 'az' ? 'Komandamız' : language === 'en' ? 'Our Team' : 'Наша команда'}
          </h2>
          <p className={`opacity-80 max-w-2xl mx-auto mb-8 md:mb-12 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
            {language === 'az'
              ? 'Ekologiya, texnologiya və dizayn sahəsində peşəkarlardan ibarət komandamız təbiəti qorumaq üçün çalışır.'
              : language === 'en'
              ? 'Our team of professionals in ecology, technology, and design work to protect nature.'
              : 'Наша команда профессионалов в области экологии, технологий и дизайна работает для защиты природы.'
            }
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['Fərhad Abbaslı', 'Ümid İsmayılov', 'Kərim Əlizadə', 'Ayxan Şadimanpur'].map((name, index) => (
              <motion.div
                key={index}
                className={`rounded-[16px] p-4 md:p-6 text-center ${
                  isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
                }`}
                style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full bg-[#00C57A] flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={peopleIcon} alt="Team Member" className="w-8 h-8" />
                </motion.div>
                <p className={`text-sm md:text-base ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
}
