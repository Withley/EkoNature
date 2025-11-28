import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Zap, Gamepad2, Play, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import { translations, type Language } from '../../utils/translations';

type Difficulty = 'easy' | 'medium' | 'hard';
type WasteCategory = 'plastic' | 'paper' | 'glass' | 'organic';

interface WasteItem {
  id: number;
  name: { az: string; en: string; ru: string };
  emoji: string;
  category: WasteCategory;
}

interface GameStats {
  score: number;
  correct: number;
  wrong: number;
  total: number;
}

interface InteractiveGamesPageProps {
  onPointsEarned?: (points: number, tasksCompleted?: number) => void;
  onNavigate?: (page: string) => void;
  isDarkMode: boolean;
  language: Language;
}

const difficultyConfig = {
  easy: {
    color: '#00C57A',
    icon: Star,
    itemCount: 6,
    timeLimit: 60,
    points: 50
  },
  medium: {
    color: '#F5A623',
    icon: Zap,
    itemCount: 10,
    timeLimit: 45,
    points: 75
  },
  hard: {
    color: '#E94B3C',
    icon: Trophy,
    itemCount: 15,
    timeLimit: 30,
    points: 100
  }
};

const allWasteItems: WasteItem[] = [
  // Plastic
  { id: 1, name: { az: 'Plastik şüşə', en: 'Plastic bottle', ru: 'Пластиковая бутылка' }, emoji: '🍾', category: 'plastic' },
  { id: 2, name: { az: 'Plastik paket', en: 'Plastic bag', ru: 'Пластиковый пакет' }, emoji: '🛍️', category: 'plastic' },
  { id: 3, name: { az: 'Plastik qab', en: 'Plastic cup', ru: 'Пластиковый стакан' }, emoji: '🥤', category: 'plastic' },
  { id: 4, name: { az: 'Şampun', en: 'Shampoo', ru: 'Шампунь' }, emoji: '🧴', category: 'plastic' },
  { id: 5, name: { az: 'CD disk', en: 'CD disk', ru: 'CD диск' }, emoji: '💿', category: 'plastic' },
  
  // Paper
  { id: 6, name: { az: 'Kağız', en: 'Paper', ru: 'Бумага' }, emoji: '📄', category: 'paper' },
  { id: 7, name: { az: 'Karton qutu', en: 'Cardboard box', ru: 'Картонная коробка' }, emoji: '📦', category: 'paper' },
  { id: 8, name: { az: 'Qəzet', en: 'Newspaper', ru: 'Газета' }, emoji: '📰', category: 'paper' },
  { id: 9, name: { az: 'Kitab', en: 'Book', ru: 'Книга' }, emoji: '📚', category: 'paper' },
  { id: 10, name: { az: 'Jurnal', en: 'Magazine', ru: 'Журнал' }, emoji: '📓', category: 'paper' },
  
  // Glass
  { id: 11, name: { az: 'Şüşə şüşə', en: 'Glass bottle', ru: 'Стеклянная бутылка' }, emoji: '🍷', category: 'glass' },
  { id: 12, name: { az: 'Cam qab', en: 'Glass jar', ru: 'Стеклянная банка' }, emoji: '🫙', category: 'glass' },
  { id: 13, name: { az: 'Şüşə şüşə (su)', en: 'Water glass bottle', ru: 'Стеклянная бутылка (вода)' }, emoji: '🧊', category: 'glass' },
  { id: 14, name: { az: 'Güzgü', en: 'Mirror', ru: 'Зеркало' }, emoji: '🪞', category: 'glass' },
  { id: 15, name: { az: 'Pəncərə şüşəsi', en: 'Window glass', ru: 'Оконное стекло' }, emoji: '🔲', category: 'glass' },
  
  // Organic
  { id: 16, name: { az: 'Alma', en: 'Apple', ru: 'Яблоко' }, emoji: '🍎', category: 'organic' },
  { id: 17, name: { az: 'Banan qabığı', en: 'Banana peel', ru: 'Банановая кожура' }, emoji: '🍌', category: 'organic' },
  { id: 18, name: { az: 'Çörək', en: 'Bread', ru: 'Хлеб' }, emoji: '🍞', category: 'organic' },
  { id: 19, name: { az: 'Yumurta qabığı', en: 'Egg shell', ru: 'Яичная скорлупа' }, emoji: '🥚', category: 'organic' },
  { id: 20, name: { az: 'Yarpaq', en: 'Leaf', ru: 'Лист' }, emoji: '🍂', category: 'organic' }
];

const getBins = (language: Language) => {
  const binNames = {
    plastic: { az: 'Plastik', en: 'Plastic', ru: 'Пластик' },
    paper: { az: 'Kağız', en: 'Paper', ru: 'Бумага' },
    glass: { az: 'Şüşə', en: 'Glass', ru: 'Стекло' },
    organic: { az: 'Üzvi', en: 'Organic', ru: 'Органика' }
  };

  return [
    { category: 'plastic' as WasteCategory, name: binNames.plastic[language], color: '#FFD700' },
    { category: 'paper' as WasteCategory, name: binNames.paper[language], color: '#4A90E2' },
    { category: 'glass' as WasteCategory, name: binNames.glass[language], color: '#7ED321' },
    { category: 'organic' as WasteCategory, name: binNames.organic[language], color: '#CD7F32' }
  ];
};

export function InteractiveGamesPage({ onPointsEarned, onNavigate, isDarkMode, language }: InteractiveGamesPageProps) {
  const t = translations[language];
  const bins = getBins(language);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameItems, setGameItems] = useState<WasteItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [stats, setStats] = useState<GameStats>({ score: 0, correct: 0, wrong: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; message: string }>({
    show: false,
    correct: false,
    message: ''
  });
  const [hoveredBin, setHoveredBin] = useState<WasteCategory | null>(null);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted && !gameOver) {
      endGame();
    }
  }, [timeLeft, gameStarted, gameOver]);

  const startGame = () => {
    if (!selectedDifficulty) return;
    
    const config = difficultyConfig[selectedDifficulty];
    const shuffled = [...allWasteItems].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, config.itemCount);
    
    setGameItems(selected);
    setCurrentItemIndex(0);
    setStats({ score: 0, correct: 0, wrong: 0, total: selected.length });
    setTimeLeft(config.timeLimit);
    setGameOver(false);
    setGameStarted(true);
  };

  const handleBinClick = (category: WasteCategory) => {
    if (!gameStarted || gameOver || currentItemIndex >= gameItems.length) return;
    
    const currentItem = gameItems[currentItemIndex];
    const isCorrect = currentItem.category === category;
    
    if (isCorrect) {
      const pointsEarned = 10;
      setStats(prev => ({ 
        ...prev, 
        score: prev.score + pointsEarned, 
        correct: prev.correct + 1 
      }));
      setFeedback({ 
        show: true, 
        correct: true, 
        message: language === 'az' ? `Düzgün! +${pointsEarned} xal` : language === 'en' ? `Correct! +${pointsEarned} points` : `Правильно! +${pointsEarned} очков`
      });
    } else {
      setStats(prev => ({ 
        ...prev, 
        score: Math.max(0, prev.score - 5), 
        wrong: prev.wrong + 1 
      }));
      setFeedback({ 
        show: true, 
        correct: false, 
        message: language === 'az' ? 'Səhv! -5 xal' : language === 'en' ? 'Wrong! -5 points' : 'Неправильно! -5 очков'
      });
    }
    
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: '' });
      
      if (currentItemIndex + 1 >= gameItems.length) {
        endGame();
      } else {
        setCurrentItemIndex(currentItemIndex + 1);
      }
    }, 1000);
  };

  const endGame = () => {
    setGameOver(true);
    if (selectedDifficulty && onPointsEarned) {
      const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
      if (accuracy >= 70) {
        onPointsEarned(difficultyConfig[selectedDifficulty].points);
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setCurrentItemIndex(0);
    setStats({ score: 0, correct: 0, wrong: 0, total: 0 });
  };

  const currentItem = gameItems[currentItemIndex];
  const progress = stats.total > 0 ? (currentItemIndex / stats.total) * 100 : 0;
  const accuracy = stats.total > 0 ? ((stats.correct / (stats.correct + stats.wrong)) * 100) : 0;

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 md:px-6 lg:px-8 ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <Gamepad2 className="text-[#00C57A] w-8 h-8 md:w-10 md:h-10" />
            <h1 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{t.wasteSortingGame}</h1>
          </div>
          <p className={`text-center md:text-left ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
            {t.wasteSortingSubtitle}
          </p>
        </motion.div>

        {!selectedDifficulty ? (
          // Difficulty Selection Screen
          <>
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className={`mb-2 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.selectDifficultyLevel}</h2>
              <p className={isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}>{t.selectOwnLevel}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {(Object.keys(difficultyConfig) as Difficulty[]).map((difficulty, index) => {
                const config = difficultyConfig[difficulty];
                const Icon = config.icon;
                
                return (
                  <motion.button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`rounded-2xl p-6 md:p-8 border-2 transition-all group ${
                      isDarkMode 
                        ? 'bg-[#1A2324] border-[#2F3B3C] hover:border-[#3F4B4C]' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${config.color}20` }}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon style={{ color: config.color }} size={40} />
                    </motion.div>
                    
                    <h3 
                      className="text-center mb-3" 
                      style={{ color: config.color }}
                    >
                      {t[difficulty as keyof typeof t] as string}
                    </h3>
                    
                    <p className={`text-center mb-4 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                      {t[`${difficulty}Desc` as keyof typeof t] as string}
                    </p>

                    <div className={`space-y-2 text-center caption ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                      <p>🎯 {config.itemCount} {language === 'az' ? 'element' : language === 'en' ? 'elements' : 'элементов'}</p>
                      <p>⏱️ {config.timeLimit} {language === 'az' ? 'saniyə' : language === 'en' ? 'seconds' : 'секунд'}</p>
                      <p>🏆 {config.points} {language === 'az' ? 'xal' : language === 'en' ? 'points' : 'очков'}</p>
                    </div>

                    <motion.div 
                      className="flex items-center justify-center gap-2 text-[#00C57A] group-hover:gap-4 transition-all mt-4"
                      whileHover={{ x: 5 }}
                    >
                      <span>{t.start}</span>
                      <Play size={20} />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </>
        ) : !gameStarted ? (
          // Start Screen
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`rounded-2xl p-8 text-center ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}>
              <div className="text-6xl mb-6">♻️</div>
              <h2 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.ready}</h2>
              <p className={`mb-6 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                {t.sortCorrectly}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100'}`}>
                  <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.elementCount}</p>
                  <p className="text-[#00C57A]">{difficultyConfig[selectedDifficulty].itemCount}</p>
                </div>
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100'}`}>
                  <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.timeLimit}</p>
                  <p className="text-[#00C57A]">{difficultyConfig[selectedDifficulty].timeLimit}s</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-6 py-3 border-2 rounded-xl transition-all ${
                    isDarkMode 
                      ? 'border-[#2F3B3C] text-[#E1E1E1] hover:border-[#00C57A] hover:text-[#00C57A]' 
                      : 'border-gray-300 text-gray-800 hover:border-[#00C57A] hover:text-[#00C57A]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.back}
                </motion.button>
                <motion.button
                  onClick={startGame}
                  className="px-8 py-3 bg-[#00C57A] text-[#101415] rounded-xl hover:bg-[#7DF2C6] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.start}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : gameOver ? (
          // Game Over Screen
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`rounded-2xl p-8 text-center ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}>
              <motion.div 
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                {accuracy >= 70 ? '🏆' : '📊'}
              </motion.div>
              <h2 className={`mb-2 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.gameOver}!</h2>
              <p className={`mb-8 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                {accuracy >= 70 
                  ? (language === 'az' 
                    ? `Təbriklər! ${difficultyConfig[selectedDifficulty].points} xal qazandınız! 🎉`
                    : language === 'en'
                    ? `Congratulations! You earned ${difficultyConfig[selectedDifficulty].points} points! 🎉`
                    : `Поздравляем! Вы заработали ${difficultyConfig[selectedDifficulty].points} очков! 🎉`)
                  : t.tryBetter}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100'}`}>
                  <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{language === 'az' ? 'Xal' : language === 'en' ? 'Score' : 'Счет'}</p>
                  <p className="text-[#00C57A]">{stats.score}</p>
                </div>
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100'}`}>
                  <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.correct}</p>
                  <p className="text-[#00C57A]">{stats.correct}</p>
                </div>
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100'}`}>
                  <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.wrong}</p>
                  <p className="text-red-400">{stats.wrong}</p>
                </div>
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-100'}`}>
                  <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.accuracy}</p>
                  <p className="text-[#00C57A]">{accuracy.toFixed(0)}%</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <motion.button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-6 py-3 border-2 rounded-xl transition-all ${
                    isDarkMode 
                      ? 'border-[#2F3B3C] text-[#E1E1E1] hover:border-[#00C57A] hover:text-[#00C57A]' 
                      : 'border-gray-300 text-gray-800 hover:border-[#00C57A] hover:text-[#00C57A]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.selectLevel}
                </motion.button>
                <motion.button
                  onClick={resetGame}
                  className="px-6 py-3 bg-[#00C57A] text-[#101415] rounded-xl hover:bg-[#7DF2C6] transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.playAgain}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Game Play Screen
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Game Area */}
            <div className="lg:col-span-8">
              {/* Stats Bar */}
              <div className={`rounded-2xl p-4 mb-6 ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.time}</p>
                    <p className={`${timeLeft <= 10 ? 'text-red-400' : 'text-[#00C57A]'}`}>
                      {timeLeft}s
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{language === 'az' ? 'Xal' : language === 'en' ? 'Score' : 'Счет'}</p>
                    <p className="text-[#00C57A]">{stats.score}</p>
                  </div>
                  <div className="text-center">
                    <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.correct}</p>
                    <p className="text-[#00C57A]">{stats.correct}</p>
                  </div>
                  <div className="text-center">
                    <p className={`caption mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{t.progress}</p>
                    <p className="text-[#00C57A]">{currentItemIndex}/{stats.total}</p>
                  </div>
                </div>
                
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full bg-[#00C57A]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Current Item */}
              {currentItem && (
                <motion.div
                  className={`rounded-2xl p-12 border-2 text-center mb-6 ${
                    isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-white border-gray-200'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={currentItem.id}
                >
                  <motion.div 
                    className="text-8xl mb-6"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {currentItem.emoji}
                  </motion.div>
                  <h3 className={`mb-2 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{currentItem.name[language]}</h3>
                  <p className={isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}>{t.placeWasteCorrectly}</p>
                </motion.div>
              )}

              {/* Bins */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bins.map((bin) => (
                  <motion.button
                    key={bin.category}
                    onClick={() => handleBinClick(bin.category)}
                    onMouseEnter={() => setHoveredBin(bin.category)}
                    onMouseLeave={() => setHoveredBin(null)}
                    className={`rounded-2xl p-6 border-2 transition-all ${
                      isDarkMode ? 'bg-[#1A2324]' : 'bg-white'
                    }`}
                    style={{
                      borderColor: hoveredBin === bin.category ? bin.color : (isDarkMode ? '#2F3B3C' : '#E5E7EB')
                    }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className="w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `${bin.color}20` }}
                    >
                      🗑️
                    </div>
                    <p className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'} style={{ color: bin.color }}>
                      {bin.name}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}
                whileHover={{ y: -5 }}
              >
                <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.rules}</h3>
                <div className={`space-y-3 caption ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#FFD700] bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🟡</span>
                    </div>
                    <span>{t.plasticRule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#4A90E2] bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🔵</span>
                    </div>
                    <span>{t.paperRule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#7ED321] bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🟢</span>
                    </div>
                    <span>{t.glassRule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#CD7F32] bg-opacity-20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🟤</span>
                    </div>
                    <span>{t.organicRule}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}
                whileHover={{ y: -5 }}
              >
                <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.tips}</h3>
                <ul className={`space-y-2 caption ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C57A] mt-0.5">•</span>
                    <span>{t.correctAnswerPoints}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C57A] mt-0.5">•</span>
                    <span>{t.wrongAnswerPoints}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00C57A] mt-0.5">•</span>
                    <span>{t.accuracyEarnsPoints}</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        )}

        {/* Feedback Toast */}
        <AnimatePresence>
          {feedback.show && (
            <motion.div
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <div 
                className={`px-6 py-4 rounded-2xl flex items-center gap-3 ${
                  feedback.correct ? 'bg-[#00C57A]' : 'bg-red-500'
                }`}
              >
                {feedback.correct ? <Check size={24} /> : <X size={24} />}
                <span className="text-[#101415]">{feedback.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
