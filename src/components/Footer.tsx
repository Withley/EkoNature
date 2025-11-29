import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { type Language, getTranslation } from '../utils/translations';
import telegramIcon from '../assets/Telegram.png';

interface FooterProps {
  isDarkMode: boolean;
  language: Language;
}

export function Footer({ isDarkMode, language }: FooterProps) {
  const t = (key: keyof typeof import('../utils/translations').translations.az) => getTranslation(language, key);

  return (
    <footer className={`mt-16 md:mt-24 border-t transition-colors ${isDarkMode ? 'bg-[#101415] border-[#2F3B3C]' : 'bg-white border-gray-200'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px] py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>Greenify</h3>
            <p className={`caption mb-4 ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}`}>
              {t('ourMissionText')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
              {language === 'az' ? 'Sürətli Keçidlər' : language === 'en' ? 'Quick Links' : 'Быстрые ссылки'}
            </h3>
            <ul className={`space-y-2 caption ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}`}>
              <li>
                <a href="#" className="hover:text-[#00C57A] transition-colors">{t('home')}</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C57A] transition-colors">{t('about')}</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00C57A] transition-colors">{t('contact')}</a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t('contactInfo')}</h3>
            <ul className={`space-y-3 caption ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}`}>
              <li className="flex items-center gap-2">
                <Mail className="text-[#00C57A] flex-shrink-0" size={16} />
                <span>greenify.personal@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-[#00C57A] flex-shrink-0" size={16} />
                <span>+994 12 345 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="text-[#00C57A] flex-shrink-0" size={16} />
                <span>{t('addressText')}</span>
              </li>
            </ul>
          </motion.div>

          {/* Telegram Bot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t('telegramBot')}</h3>
            <p className={`caption mb-4 ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}`}>
              {t('telegramBotDesc')}
            </p>
            <motion.a
              href="https://t.me/GreenifyBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#00C57A] hover:text-[#7DF2C6] transition-colors"
              whileHover={{ x: 5 }}
            >
              <img src={telegramIcon} alt="Telegram" className="w-6 h-6" />
              <span className="caption">{t('telegramBotLink')}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className={`mt-8 md:mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? 'border-[#2F3B3C]' : 'border-gray-200'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className={`caption ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}`}>
            {t('allRightsReserved')} © 2025 Greenify
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className={`caption hover:text-[#00C57A] transition-colors ${isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600'}`}>
              {t('followUs')}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
