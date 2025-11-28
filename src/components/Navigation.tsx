import { useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import logo from 'figma:asset/7af1293a77ad635af7592a238503869be2e5fbba.png';
import { type Language, getTranslation } from '../utils/translations';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function Navigation({ currentPage, onNavigate, isLoggedIn = false, onLogout, isDarkMode = true, onToggleTheme, language = 'az', onLanguageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = (key: keyof typeof import('../utils/translations').translations.az) => getTranslation(language, key);

  const menuItems = [
    { label: t('home'), value: 'home' },
    { label: t('about'), value: 'about' },
    { label: t('plantRecognition'), value: 'plant' },
    { label: t('tasks'), value: 'tasks' },
    { label: t('educationalGames'), value: 'games' },
    { label: t('map'), value: 'map' },
    { label: t('contact'), value: 'contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'az', label: 'AZ' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <nav className={`h-[64px] md:h-[72px] transition-colors duration-300 ${isDarkMode ? 'bg-[#101415] border-[#2F3B3C]' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[120px] h-full flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate(isLoggedIn ? 'welcome' : 'home')}
          className="flex items-center gap-2 md:gap-3 flex-shrink-0"
        >
          <img 
            src={logo} 
            alt="Greenify Logo" 
            className="h-12 md:h-16 lg:h-20 w-auto flex-shrink-0"
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              className={`transition-colors ${
                isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
              } ${
                currentPage === item.value ? 'text-[#00C57A]' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                isDarkMode ? 'bg-[#1A2324] text-[#00C57A] hover:bg-[#2F3B3C]' : 'bg-gray-100 text-[#00C57A] hover:bg-gray-200'
              }`}
              title="Change Language"
            >
              <Globe size={20} />
              <span className="text-sm">{language.toUpperCase()}</span>
            </button>
            
            {isLangMenuOpen && (
              <div className={`absolute right-0 mt-2 py-2 w-24 rounded-lg shadow-lg z-50 ${
                isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange?.(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors ${
                      language === lang.code ? 'text-[#00C57A]' : isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode ? 'bg-[#1A2324] text-[#00C57A] hover:bg-[#2F3B3C]' : 'bg-gray-100 text-[#00C57A] hover:bg-gray-200'
            }`}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate('profile')}
                className={`transition-colors ${
                  isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                } ${
                  currentPage === 'profile' ? 'text-[#00C57A]' : ''
                }`}
              >
                {t('profile')}
              </button>
              <button
                onClick={onLogout}
                className={`px-5 py-2 rounded-lg border border-[#00C57A] text-[#00C57A] transition-all ${
                  isDarkMode ? 'hover:bg-[#00C57A] hover:text-[#101415]' : 'hover:bg-[#00C57A] hover:text-white'
                }`}
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className={`px-5 py-2 rounded-lg bg-[#00C57A] transition-all ${
                isDarkMode ? 'text-[#101415] hover:bg-[#7DF2C6]' : 'text-white hover:bg-[#7DF2C6]'
              }`}
            >
              {t('loginRegister')}
            </button>
          )}
        </div>

        {/* Mobile Menu Button, Language & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language Selector Mobile */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`p-2 rounded-lg transition-all flex items-center gap-1 ${
                isDarkMode ? 'bg-[#1A2324] text-[#00C57A]' : 'bg-gray-100 text-[#00C57A]'
              }`}
            >
              <Globe size={18} />
              <span className="text-xs">{language.toUpperCase()}</span>
            </button>
            
            {isLangMenuOpen && (
              <div className={`absolute right-0 mt-2 py-2 w-20 rounded-lg shadow-lg z-50 ${
                isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange?.(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left transition-colors text-sm ${
                      language === lang.code ? 'text-[#00C57A]' : isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode ? 'bg-[#1A2324] text-[#00C57A]' : 'bg-gray-100 text-[#00C57A]'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-800'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden transition-colors ${isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-gray-50 border-gray-200'} border-t`}>
          <div className="flex flex-col py-4 px-6 gap-4">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left transition-colors ${
                  isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                } ${
                  currentPage === item.value ? 'text-[#00C57A]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    onNavigate('profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors ${
                    isDarkMode ? 'text-[#E1E1E1] hover:text-[#00C57A]' : 'text-gray-800 hover:text-[#00C57A]'
                  } ${
                    currentPage === 'profile' ? 'text-[#00C57A]' : ''
                  }`}
                >
                  {t('profile')}
                </button>
                <button
                  onClick={() => {
                    onLogout?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left px-5 py-2 rounded-lg border border-[#00C57A] text-[#00C57A]"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-5 py-2 rounded-lg bg-[#00C57A] ${
                  isDarkMode ? 'text-[#101415]' : 'text-white'
                }`}
              >
                {t('loginRegister')}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}