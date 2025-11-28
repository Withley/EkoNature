import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import questionIcon from 'figma:asset/0b95fa0e4a82100771246bbd78e48faa34de7428.png';
import gameIcon from 'figma:asset/7dc903a9ec6632e530e94d101dcdcf6a686c58c4.png';
import { translations, type Language } from '../../utils/translations';

interface GamesSelectionPageProps {
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  language: Language;
}

const FloatingParticle = ({ delay = 0, duration = 3 }: { delay?: number; duration?: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full bg-[#00C57A] opacity-20"
    initial={{ y: 0, x: 0, scale: 0 }}
    animate={{
      y: [0, -100, -200],
      x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
      scale: [0, 1, 0],
      opacity: [0, 0.6, 0]
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }}
  />
);

export function GamesSelectionPage({ onNavigate, isDarkMode, language }: GamesSelectionPageProps) {
  const t = translations[language];
  
  return (
    <div className={`min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-12 relative overflow-hidden ${
      isDarkMode ? 'bg-[#101415]' : 'bg-white'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} duration={3 + Math.random() * 2} />
        ))}
      </div>

      {/* Animated Grid Lines */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00C57A 1px, transparent 1px), linear-gradient(90deg, #00C57A 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <div className="max-w-[1200px] w-full relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="text-[#00C57A] mx-auto" size={48} />
          </motion.div>
          <motion.h1 
            className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
            style={{ fontFamily: 'Montserrat' }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
          >
            {t.gamesTitle}
          </motion.h1>
          <motion.p 
            className={`text-xl ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t.selectGame}
          </motion.p>
        </motion.div>

        {/* Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Questions Card */}
          <motion.div
            className={`relative rounded-2xl p-8 border-2 transition-all cursor-pointer group overflow-hidden ${
              isDarkMode 
                ? 'bg-[#1A2324] border-[#2F3B3C]' 
                : 'bg-white border-gray-200'
            }`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              borderColor: '#00C57A',
              boxShadow: '0 20px 60px rgba(0, 197, 122, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('games-questions')}
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#00C57A] to-transparent opacity-0 group-hover:opacity-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
            />

            {/* Floating Icons Background */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#00C57A] text-2xl"
                  initial={{ y: '100%', x: `${i * 20}%`, opacity: 0 }}
                  whileHover={{
                    y: '-100%',
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                >
                  📚
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#00C57A] bg-opacity-20 flex items-center justify-center relative"
              whileHover={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-[#00C57A]"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0.2, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <img src={questionIcon} alt="Questions" className="w-10 h-10 relative z-10" />
            </motion.div>

            <motion.h2 
              className={`text-center mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
              style={{ fontFamily: 'Montserrat' }}
              whileHover={{ scale: 1.05, color: '#00C57A' }}
            >
              {t.quizGame}
            </motion.h2>

            <p className={`text-center mb-6 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
              {t.quizGameDesc}
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: '📝', text: language === 'az' ? '15 sual (3 səviyyə)' : language === 'en' ? '15 questions (3 levels)' : '15 вопросов (3 уровня)' },
                { icon: '⚡', text: language === 'az' ? 'Dərhal nəticə və rəy' : language === 'en' ? 'Instant results and feedback' : 'Мгновенные результаты и обратная связь' },
                { icon: '🌱', text: language === 'az' ? 'Ekologiya mövzuları' : language === 'en' ? 'Ecology topics' : 'Темы экологии' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, color: isDarkMode ? '#E1E1E1' : '#101415' }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex items-center justify-center gap-2 text-[#00C57A] group-hover:gap-4 transition-all"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>{language === 'az' ? 'Başla' : language === 'en' ? 'Start' : 'Начать'}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Games Card */}
          <motion.div
            className={`relative rounded-2xl p-8 border-2 transition-all cursor-pointer group overflow-hidden ${
              isDarkMode 
                ? 'bg-[#1A2324] border-[#2F3B3C]' 
                : 'bg-white border-gray-200'
            }`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              borderColor: '#00C57A',
              boxShadow: '0 20px 60px rgba(0, 197, 122, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('games-interactive')}
          >
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-bl from-[#00C57A] to-transparent opacity-0 group-hover:opacity-10"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
            />

            {/* Floating Icons Background */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#00C57A] text-2xl"
                  initial={{ y: '100%', x: `${100 - i * 20}%`, opacity: 0 }}
                  whileHover={{
                    y: '-100%',
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                >
                  🎮
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#00C57A] bg-opacity-20 flex items-center justify-center relative"
              whileHover={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl bg-[#00C57A]"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0.2, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <img src={gameIcon} alt="Games" className="w-10 h-10 relative z-10" />
            </motion.div>

            <motion.h2 
              className={`text-center mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}
              style={{ fontFamily: 'Montserrat' }}
              whileHover={{ scale: 1.05, color: '#00C57A' }}
            >
              {t.interactiveGame}
            </motion.h2>

            <p className={`text-center mb-6 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
              {t.interactiveGameDesc}
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: '🎯', text: language === 'az' ? 'İnteraktiv oyun təcrübəsi' : language === 'en' ? 'Interactive game experience' : 'Интерактивный игровой опыт' },
                { icon: '🎨', text: language === 'az' ? '3 çətinlik səviyyəsi' : language === 'en' ? '3 difficulty levels' : '3 уровня сложности' },
                { icon: '🏆', text: language === 'az' ? 'Bal və nailiyyətlər' : language === 'en' ? 'Points and achievements' : 'Очки и достижения' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, color: isDarkMode ? '#E1E1E1' : '#101415' }}
                >
                  <motion.span
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex items-center justify-center gap-2 text-[#00C57A] group-hover:gap-4 transition-all"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>{language === 'az' ? 'Başla' : language === 'en' ? 'Start' : 'Начать'}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className={`inline-block rounded-xl px-6 py-4 border ${
              isDarkMode 
                ? 'bg-[#1A2324] border-[#2F3B3C]' 
                : 'bg-white border-gray-200'
            }`}
            whileHover={{ 
              scale: 1.05,
              borderColor: '#00C57A',
              boxShadow: '0 10px 30px rgba(0, 197, 122, 0.2)'
            }}
          >
            <motion.p 
              className={`text-sm ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💡 {language === 'az' ? 'Məsləhət: Hər iki fəaliyyəti tamamlayaraq daha çox bal qazana bilərsiniz' : language === 'en' ? 'Tip: Complete both activities to earn more points' : 'Совет: Выполните оба задания, чтобы заработать больше очков'}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
