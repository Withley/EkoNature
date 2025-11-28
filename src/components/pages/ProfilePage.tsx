import { Heart, MapPin, User, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { translations, type Language } from '../../utils/translations';

interface ProfilePageProps {
  userName: string;
  userEmail: string;
  userPoints?: number;
  tasksCompleted?: number;
  isDarkMode: boolean;
  language: Language;
}

export function ProfilePage({ userName, userEmail, userPoints = 0, tasksCompleted = 0, isDarkMode, language }: ProfilePageProps) {
  const t = translations[language];
  
  const favoritePlants = [
    { name: 'Ficus Elastica', savedDate: '15.11.2024' },
    { name: 'Monstera Deliciosa', savedDate: '12.11.2024' },
    { name: 'Pothos', savedDate: '08.11.2024' },
  ];

  const recyclingPoints = [
    { name: 'Plastik Təkrar Emal Mərkəzi', visitDate: '14.11.2024' },
    { name: 'Kağız Mərkəzi', visitDate: '10.11.2024' },
  ];

  return (
    <div className={`min-h-[calc(100vh-72px)] py-8 md:py-12 ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px]">
        <motion.h1 
          className={`mb-6 md:mb-8 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.profileTitle}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Profile Info */}
          <motion.div
            className={`rounded-[16px] p-6 ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.15)' }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#00C57A] flex items-center justify-center mb-3 md:mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              >
                <User size={40} className="text-[#101415] md:w-12 md:h-12" />
              </motion.div>
              <motion.h3 
                className={`mb-1 md:mb-2 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {userName}
              </motion.h3>
              <motion.p 
                className={`opacity-70 caption mb-4 md:mb-6 text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5 }}
              >
                {userEmail}
              </motion.p>
              
              <div className="w-full space-y-3">
                <motion.div 
                  className={`flex justify-between items-center py-2 border-t ${isDarkMode ? 'border-[#2F3B3C]' : 'border-gray-200'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className={`opacity-70 caption text-sm flex items-center gap-2 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                    <Trophy size={16} className="text-[#00C57A]" />
                    {t.points}
                  </span>
                  <motion.span 
                    className="text-[#00C57A]"
                    key={userPoints}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {userPoints}
                  </motion.span>
                </motion.div>
                <motion.div 
                  className={`flex justify-between items-center py-2 border-t ${isDarkMode ? 'border-[#2F3B3C]' : 'border-gray-200'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className={`opacity-70 caption text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.completedTasks}</span>
                  <span className="text-[#00C57A]">{tasksCompleted}</span>
                </motion.div>
                <motion.div 
                  className={`flex justify-between items-center py-2 border-t ${isDarkMode ? 'border-[#2F3B3C]' : 'border-gray-200'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className={`opacity-70 caption text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                    {language === 'az' ? 'Yadda saxlanmış bitkilər' : language === 'en' ? 'Saved plants' : 'Сохраненные растения'}
                  </span>
                  <span className="text-[#00C57A]">{favoritePlants.length}</span>
                </motion.div>
                <motion.div 
                  className={`flex justify-between items-center py-2 border-t ${isDarkMode ? 'border-[#2F3B3C]' : 'border-gray-200'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <span className={`opacity-70 caption text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                    {language === 'az' ? 'Ziyarət edilmiş nöqtələr' : language === 'en' ? 'Visited points' : 'Посещенные точки'}
                  </span>
                  <span className="text-[#00C57A]">{recyclingPoints.length}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Favorite Plants */}
          <motion.div
            className={`rounded-[16px] p-6 ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.15)' }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-4 md:mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Heart className="text-[#00C57A]" size={20} />
              <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>
                {language === 'az' ? 'Sevimli Bitkilər' : language === 'en' ? 'Favorite Plants' : 'Любимые растения'}
              </h3>
            </motion.div>

            <div className="space-y-3">
              {favoritePlants.map((plant, index) => (
                <motion.div
                  key={index}
                  className={`rounded-lg p-3 md:p-4 hover:bg-opacity-80 transition-all cursor-pointer ${
                    isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100 border border-gray-200'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <p className={`mb-1 text-sm md:text-base ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{plant.name}</p>
                  <p className={`opacity-60 caption text-xs md:text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                    {language === 'az' ? 'Yadda saxlanıb' : language === 'en' ? 'Saved on' : 'Сохранено'}: {plant.savedDate}
                  </p>
                </motion.div>
              ))}

              {favoritePlants.length === 0 && (
                <motion.div 
                  className={`text-center py-6 md:py-8 opacity-50 caption text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.5 }}
                >
                  {language === 'az' ? 'Hələ sevimli bitkiniz yoxdur' : language === 'en' ? 'No favorite plants yet' : 'Пока нет любимых растений'}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Recycling Points History */}
          <motion.div
            className={`rounded-[16px] p-6 ${
              isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
            }`}
            style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.15)' }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-4 md:mb-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MapPin className="text-[#00C57A]" size={20} />
              <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>
                {language === 'az' ? 'Təkrar Emal Tarixçəsi' : language === 'en' ? 'Recycling History' : 'История переработки'}
              </h3>
            </motion.div>

            <div className="space-y-3">
              {recyclingPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className={`rounded-lg p-3 md:p-4 hover:bg-opacity-80 transition-all cursor-pointer ${
                    isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100 border border-gray-200'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <p className={`mb-1 text-sm md:text-base ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{point.name}</p>
                  <p className={`opacity-60 caption text-xs md:text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                    {language === 'az' ? 'Ziyarət' : language === 'en' ? 'Visited' : 'Посещено'}: {point.visitDate}
                  </p>
                </motion.div>
              ))}

              {recyclingPoints.length === 0 && (
                <motion.div 
                  className={`text-center py-6 md:py-8 opacity-50 caption text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.6 }}
                >
                  {language === 'az' ? 'Hələ ziyarət tarixçəniz yoxdur' : language === 'en' ? 'No visit history yet' : 'Пока нет истории посещений'}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Activity Section */}
        <motion.div
          className={`mt-6 md:mt-8 rounded-[16px] p-6 ${
            isDarkMode ? 'bg-[#1A2324]' : 'bg-white border-2 border-gray-200'
          }`}
          style={{ boxShadow: isDarkMode ? '0 4px 24px rgba(0,0,0,0.35)' : '0 4px 24px rgba(0,0,0,0.1)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -5, boxShadow: isDarkMode ? '0 8px 32px rgba(0,197,122,0.2)' : '0 8px 32px rgba(0,197,122,0.15)' }}
        >
          <motion.h3 
            className={`mb-4 md:mb-6 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {t.stats}
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: 12, label: language === 'az' ? 'Tanınmış Bitki' : language === 'en' ? 'Recognized Plants' : 'Распознанных растений' },
              { value: 5, label: language === 'az' ? 'Ziyarət Edilmiş Nöqtə' : language === 'en' ? 'Visited Points' : 'Посещенных точек' },
              { value: 3, label: language === 'az' ? 'Sevimli Bitki' : language === 'en' ? 'Favorite Plants' : 'Любимых растений' },
              { value: 30, label: language === 'az' ? 'Aktiv Gün' : language === 'en' ? 'Active Days' : 'Активных дней' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-[#00C57A] mb-1 md:mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <p className={`opacity-70 caption text-xs md:text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
