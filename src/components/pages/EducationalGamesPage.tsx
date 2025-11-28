import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Zap, BookOpen, ChevronRight, Check, X, Sparkles } from 'lucide-react';
import { translations, type Language } from '../../utils/translations';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: Difficulty;
  category: string;
}

interface QuestionsPageProps {
  onPointsEarned?: (points: number, tasksCompleted?: number) => void;
  onNavigate?: (page: string) => void;
  isDarkMode: boolean;
  language: Language;
}

// Question data for all languages
const getQuestions = (language: Language): Question[] => {
  if (language === 'en') {
    return [
      // Easy Level Questions
      { id: 1, question: 'How long does it take for a plastic bottle to decompose in nature?', options: ['50 years', '100 years', '450 years', '1000 years'], correctAnswer: 2, difficulty: 'easy', category: 'Recycling' },
      { id: 2, question: 'What color is generally used for paper waste in recycling bins?', options: ['Green', 'Blue', 'Yellow', 'Red'], correctAnswer: 1, difficulty: 'easy', category: 'Recycling' },
      { id: 3, question: 'What gas do trees absorb and what do they release into the air?', options: ['Absorb oxygen, release carbon dioxide', 'Absorb carbon dioxide, release oxygen', 'Absorb nitrogen, release oxygen', 'Absorb both'], correctAnswer: 1, difficulty: 'easy', category: 'Plants' },
      { id: 4, question: 'Which lamp saves electrical energy?', options: ['Incandescent lamp', 'LED lamp', 'Neon lamp', 'Halogen lamp'], correctAnswer: 1, difficulty: 'easy', category: 'Energy' },
      { id: 5, question: 'Which situation is water-saving?', options: ['Leaving water running while showering', 'Closing the tap while brushing teeth', 'Washing a car', 'Watering the garden every day'], correctAnswer: 1, difficulty: 'easy', category: 'Water Conservation' },
      
      // Medium Level Questions
      { id: 6, question: 'What percentage of waste is recycled in Azerbaijan?', options: ['5%', '15%', '30%', '50%'], correctAnswer: 1, difficulty: 'medium', category: 'Statistics' },
      { id: 7, question: 'What is compost?', options: ['Chemical fertilizer', 'Natural fertilizer made from organic waste', 'Plastic material', 'Metal scraps'], correctAnswer: 1, difficulty: 'medium', category: 'Composting' },
      { id: 8, question: 'What energy source do plants use in photosynthesis?', options: ['Wind energy', 'Water energy', 'Solar energy', 'Chemical energy'], correctAnswer: 2, difficulty: 'medium', category: 'Plants' },
      { id: 9, question: 'Which vehicle is more ecological to reduce carbon footprint?', options: ['Gasoline car', 'Diesel car', 'Electric car', 'Motorcycle'], correctAnswer: 2, difficulty: 'medium', category: 'Transportation' },
      { id: 10, question: 'What gases cause the thinning of the ozone layer?', options: ['Oxygen', 'Nitrogen', 'Chlorofluorocarbons (CFC)', 'Hydrogen'], correctAnswer: 2, difficulty: 'medium', category: 'Atmosphere' },
      
      // Hard Level Questions
      { id: 11, question: 'What is the main principle of the Circular Economy concept?', options: ['Minimize waste and reuse resources', 'Produce more products', 'Increase consumption', 'Lower prices'], correctAnswer: 0, difficulty: 'hard', category: 'Economy' },
      { id: 12, question: 'From what sources is biomass energy obtained?', options: ['Oil and gas', 'Coal', 'Organic materials and plant residues', 'Nuclear fission'], correctAnswer: 2, difficulty: 'hard', category: 'Renewable Energy' },
      { id: 13, question: 'What ecological problem is eutrophication?', options: ['Deforestation', 'Increase of nutrients in water bodies and algae blooming', 'Air pollution', 'Soil erosion'], correctAnswer: 1, difficulty: 'hard', category: 'Water Ecology' },
      { id: 14, question: 'What does the Carbon Sequestration process mean?', options: ['Release of carbon dioxide to atmosphere', 'Capture and storage of carbon dioxide', 'Burning of carbon dioxide', 'Production of carbon dioxide'], correctAnswer: 1, difficulty: 'hard', category: 'Climate Change' },
      { id: 15, question: 'Which international document is fundamental for biodiversity conservation?', options: ['Kyoto Protocol', 'Paris Agreement', 'Convention on Biological Diversity', 'Montreal Protocol'], correctAnswer: 2, difficulty: 'hard', category: 'International Agreements' }
    ];
  } else if (language === 'ru') {
    return [
      // Easy Level Questions
      { id: 1, question: 'Сколько времени требуется для разложения пластиковой бутылки в природе?', options: ['50 лет', '100 лет', '450 лет', '1000 лет'], correctAnswer: 2, difficulty: 'easy', category: 'Переработка' },
      { id: 2, question: 'Какой цвет обычно используется для бумажных отходов в контейнерах для переработки?', options: ['Зеленый', 'Синий', 'Желтый', 'Красный'], correctAnswer: 1, difficulty: 'easy', category: 'Переработка' },
      { id: 3, question: 'Какой газ поглощают деревья и что они выделяют в воздух?', options: ['Поглощают кислород, выделяют углекислый газ', 'Поглощают углекислый газ, выделяют кислород', 'Поглощают азот, выделяют кислород', 'Поглощают оба'], correctAnswer: 1, difficulty: 'easy', category: 'Растения' },
      { id: 4, question: 'Какая лампа экономит электроэнергию?', options: ['Лампа накаливания', 'LED лампа', 'Неоновая лампа', 'Галогенная лампа'], correctAnswer: 1, difficulty: 'easy', category: 'Энергия' },
      { id: 5, question: 'Какая ситуация является водосберегающей?', options: ['Оставлять воду включенной во время душа', 'Закрывать кран при чистке зубов', 'Мыть машину', 'Поливать сад каждый день'], correctAnswer: 1, difficulty: 'easy', category: 'Экономия воды' },
      
      // Medium Level Questions
      { id: 6, question: 'Какой процент отходов перерабатывается в Азербайджане?', options: ['5%', '15%', '30%', '50%'], correctAnswer: 1, difficulty: 'medium', category: 'Статистика' },
      { id: 7, question: 'Что такое компост?', options: ['Химическое удобрение', 'Натуральное удобрение из органических отходов', 'Пластиковый материал', 'Металлические обрезки'], correctAnswer: 1, difficulty: 'medium', category: 'Компостирование' },
      { id: 8, question: 'Какой источник энергии используют растения при фотосинтезе?', options: ['Энергия ветра', 'Энергия воды', 'Солнечная энергия', 'Химическая энергия'], correctAnswer: 2, difficulty: 'medium', category: 'Растения' },
      { id: 9, question: 'Какой транспорт более экологичен для уменьшения углеродного следа?', options: ['Бензиновый автомобиль', 'Дизельный автомобиль', 'Электромобиль', 'Мотоцикл'], correctAnswer: 2, difficulty: 'medium', category: 'Транспорт' },
      { id: 10, question: 'Какие газы вызывают истончение озонового слоя?', options: ['Кислород', 'Азот', 'Хлорфторуглероды (CFC)', 'Водород'], correctAnswer: 2, difficulty: 'medium', category: 'Атмосфера' },
      
      // Hard Level Questions
      { id: 11, question: 'Каков основной принцип концепции циркулярной экономики?', options: ['Минимизировать отходы и повторно использовать ресурсы', 'Производить больше продуктов', 'Увеличивать потребление', 'Снижать цены'], correctAnswer: 0, difficulty: 'hard', category: 'Экономика' },
      { id: 12, question: 'Из каких источников получают энергию биомассы?', options: ['Нефть и газ', 'Уголь', 'Органические материалы и растительные остатки', 'Ядерное деление'], correctAnswer: 2, difficulty: 'hard', category: 'Возобновляемая энергия' },
      { id: 13, question: 'Какая экологическая проблема является эвтрофикацией?', options: ['Вырубка лесов', 'Увеличение питательных веществ в водоемах и цветение водорослей', 'Загрязнение воздуха', 'Эрозия почвы'], correctAnswer: 1, difficulty: 'hard', category: 'Водная экология' },
      { id: 14, question: 'Что означает процесс связывания углерода (Carbon Sequestration)?', options: ['Выброс углекислого газа в атмосферу', 'Захват и хранение углекислого газа', 'Сжигание углекислого газа', 'Производство углекислого газа'], correctAnswer: 1, difficulty: 'hard', category: 'Изменение климата' },
      { id: 15, question: 'Какой международный документ является основным для сохранения биоразнообразия?', options: ['Киотский протокол', 'Парижское соглашение', 'Конвенция о биологическом разнообразии', 'Монреальский протокол'], correctAnswer: 2, difficulty: 'hard', category: 'Международные соглашения' }
    ];
  } else {
    return [
      // Easy Level Questions
      { id: 1, question: 'Plastik şüşənin təbiətdə parçalanması üçün təxminən neçə il lazımdır?', options: ['50 il', '100 il', '450 il', '1000 il'], correctAnswer: 2, difficulty: 'easy', category: 'Təkrar Emal' },
      { id: 2, question: 'Hansı rəng təkrar emal qablarında ümumiyyətlə kağız tullantıları üçün istifadə olunur?', options: ['Yaşıl', 'Mavi', 'Sarı', 'Qırmızı'], correctAnswer: 1, difficulty: 'easy', category: 'Təkrar Emal' },
      { id: 3, question: 'Ağaclar hansı qazı udur və havaya nə buraxır?', options: ['Oksigen udur, karbon dioksid buraxır', 'Karbon dioksid udur, oksigen buraxır', 'Azot udur, oksigen buraxır', 'Hər ikisini udur'], correctAnswer: 1, difficulty: 'easy', category: 'Bitkilər' },
      { id: 4, question: 'Elektrik enerjisi qənaət edən lampa hansıdır?', options: ['Közərmə lampa', 'LED lampa', 'Neon lampa', 'Halojen lampa'], correctAnswer: 1, difficulty: 'easy', category: 'Enerji' },
      { id: 5, question: 'Su qənaətli olan vəziyyət hansıdır?', options: ['Duş qəbul edərkən su axıtmaq', 'Diş fırçalayarkən kranı bağlamaq', 'Avtomobil yumaq', 'Bağda hər gün su vermək'], correctAnswer: 1, difficulty: 'easy', category: 'Su Qənaəti' },
      
      // Medium Level Questions
      { id: 6, question: 'Azərbaycanda neçə faiz tullantı təkrar emal olunur?', options: ['5%', '15%', '30%', '50%'], correctAnswer: 1, difficulty: 'medium', category: 'Statistika' },
      { id: 7, question: 'Kompost nədir?', options: ['Kimyəvi gübrə', 'Üzvi tullantılardan hazırlanan təbii gübrə', 'Plastik material', 'Metal qırıntıları'], correctAnswer: 1, difficulty: 'medium', category: 'Kompost' },
      { id: 8, question: 'Fotosintez prosesində bitkilər hansı enerji mənbəyindən istifadə edir?', options: ['Külək enerjisi', 'Su enerjisi', 'Günəş enerjisi', 'Kimyəvi enerji'], correctAnswer: 2, difficulty: 'medium', category: 'Bitkilər' },
      { id: 9, question: 'Karbon izinin azaldılması üçün hansı nəqliyyat vasitəsi daha ekologikdir?', options: ['Benzinli avtomobil', 'Dizel avtomobil', 'Elektromobil', 'Motosiklet'], correctAnswer: 2, difficulty: 'medium', category: 'Nəqliyyat' },
      { id: 10, question: 'Ozon təbəqəsinin incəlməsinə hansı qazlar səbəb olur?', options: ['Oksigen', 'Azot', 'Xloroflorokarbonlar (CFC)', 'Hidrogen'], correctAnswer: 2, difficulty: 'medium', category: 'Atmosfer' },
      
      // Hard Level Questions
      { id: 11, question: 'Dövri iqtisadiyyat (Circular Economy) konsepsiyasının əsas prinsipi nədir?', options: ['Tullantıları minimuma endirmək və resursları təkrar istifadə etmək', 'Daha çox məhsul istehsal etmək', 'İstehlakı artırmaq', 'Qiymətləri aşağı salmaq'], correctAnswer: 0, difficulty: 'hard', category: 'İqtisadiyyat' },
      { id: 12, question: 'Biokütlə enerjisi hansı mənbələrdən əldə edilir?', options: ['Neft və qaz', 'Kömür və daş kömür', 'Üzvi materiallar və bitki qalıqları', 'Nüvə parçalanması'], correctAnswer: 2, difficulty: 'hard', category: 'Yenilenən Enerji' },
      { id: 13, question: 'Ötrofikasiya hansı ekoloji problemdir?', options: ['Meşələrin qırılması', 'Su hövzələrində qida maddələrinin artması və alq çiçəklənməsi', 'Havanın çirklənməsi', 'Torpağın eroziyası'], correctAnswer: 1, difficulty: 'hard', category: 'Su Ekologiyası' },
      { id: 14, question: 'Karbon tutma (Carbon Sequestration) prosesi nə deməkdir?', options: ['Karbon dioksidin atmosferə buraxılması', 'Karbon dioksidin tutulması və saxlanılması', 'Karbon dioksidin yandırılması', 'Karbon dioksidin istehsalı'], correctAnswer: 1, difficulty: 'hard', category: 'İqlim Dəyişikliyi' },
      { id: 15, question: 'Bioloji müxtəlifliyin qorunmasında hansı beynəlxalq sənəd əsasdır?', options: ['Kioto Protokolu', 'Paris Sazişi', 'Bioloji Müxtəliflik Konvensiyası', 'Montreal Protokolu'], correctAnswer: 2, difficulty: 'hard', category: 'Beynəlxalq Sazişlər' }
    ];
  }
};

const difficultyConfig = {
  easy: {
    color: '#00C57A',
    icon: Star,
    points: 30
  },
  medium: {
    color: '#F5A623',
    icon: Zap,
    points: 60
  },
  hard: {
    color: '#E94B3C',
    icon: Trophy,
    points: 100
  }
};

export function QuestionsPage({ onPointsEarned, onNavigate, isDarkMode, language }: QuestionsPageProps) {
  const t = translations[language];
  const questions = getQuestions(language);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(false);

  const filteredQuestions = questions.filter(q => q.difficulty === selectedDifficulty);
  
  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setPointsAwarded(false);
  };

  useEffect(() => {
    if (showResults && !pointsAwarded) {
      const score = calculateScore();
      const totalQuestions = filteredQuestions.length;
      const percentage = Math.round((score / totalQuestions) * 100);
      
      if (percentage >= 70 && onPointsEarned) {
        const points = difficultyConfig[selectedDifficulty].points;
        onPointsEarned(points);
        setPointsAwarded(true);
      }
    }
  }, [showResults, pointsAwarded]);

  const calculateScore = () => {
    let correct = 0;
    filteredQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = showResults ? calculateScore() : 0;
  const totalQuestions = filteredQuestions.length;
  const percentage = showResults ? Math.round((score / totalQuestions) * 100) : 0;

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
            <BookOpen className="text-[#00C57A] w-8 h-8 md:w-10 md:h-10" />
            <h1 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{t.educationalQuestionsTitle}</h1>
          </div>
          <p className={`text-center md:text-left ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
            {t.educationalQuestionsSubtitle}
          </p>
        </motion.div>

        {/* Difficulty Selector */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {(Object.keys(difficultyConfig) as Difficulty[]).map((difficulty, index) => {
            const config = difficultyConfig[difficulty];
            const Icon = config.icon;
            const isSelected = selectedDifficulty === difficulty;
            
            return (
              <motion.button
                key={difficulty}
                onClick={() => {
                  setSelectedDifficulty(difficulty);
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  isDarkMode ? 'bg-[#1A2324]' : 'bg-white'
                } ${
                  isSelected
                    ? 'border-opacity-100'
                    : isDarkMode ? 'border-[#2F3B3C] hover:border-[#3F4B4C]' : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  borderColor: isSelected ? config.color : undefined
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                    animate={isSelected ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon style={{ color: config.color }} size={24} />
                  </motion.div>
                  <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'} style={{ color: isSelected ? config.color : undefined }}>
                    {t[difficulty as keyof typeof t] as string}
                  </h3>
                </div>
                <p className={`text-sm text-left ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                  {t[`${difficulty}Desc` as keyof typeof t] as string}
                </p>
                <p className={`text-xs text-left mt-2 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                  {questions.filter(q => q.difficulty === difficulty).length} {t.questions}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Questions Section */}
          <div className="lg:col-span-8">
            <motion.div 
              className={`rounded-2xl p-6 mb-6 ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>
                  {t[selectedDifficulty as keyof typeof t] as string} {t.levelQuestions}
                </h2>
                <span className={isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}>
                  {totalQuestions} {t.questions}
                </span>
              </div>
            </motion.div>

            <div className="space-y-6">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${difficultyConfig[selectedDifficulty].color}20`,
                        color: difficultyConfig[selectedDifficulty].color
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <span 
                        className="inline-block px-3 py-1 rounded-full text-xs mb-3"
                        style={{
                          backgroundColor: `${difficultyConfig[selectedDifficulty].color}20`,
                          color: difficultyConfig[selectedDifficulty].color
                        }}
                      >
                        {question.category}
                      </span>
                      <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{question.question}</h3>
                      
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selectedAnswers[question.id] === optionIndex;
                          const isCorrect = question.correctAnswer === optionIndex;
                          const showCorrectAnswer = showResults && isCorrect;
                          const showWrongAnswer = showResults && isSelected && !isCorrect;
                          
                          return (
                            <motion.button
                              key={optionIndex}
                              onClick={() => handleAnswerSelect(question.id, optionIndex)}
                              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                                showCorrectAnswer
                                  ? 'border-[#00C57A] bg-[#00C57A20]'
                                  : showWrongAnswer
                                  ? 'border-[#E94B3C] bg-[#E94B3C20]'
                                  : isSelected
                                  ? 'border-[#00C57A] bg-[#00C57A10]'
                                  : isDarkMode
                                  ? 'border-[#2F3B3C] hover:border-[#3F4B4C]'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              disabled={showResults}
                              whileHover={!showResults ? { scale: 1.02, x: 5 } : {}}
                              whileTap={!showResults ? { scale: 0.98 } : {}}
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                  style={{
                                    borderColor: showCorrectAnswer ? '#00C57A' : showWrongAnswer ? '#E94B3C' : isSelected ? '#00C57A' : isDarkMode ? '#4A5354' : '#D1D5DB',
                                    backgroundColor: (showCorrectAnswer || showWrongAnswer || isSelected) ? (showCorrectAnswer ? '#00C57A' : showWrongAnswer ? '#E94B3C' : '#00C57A') : 'transparent'
                                  }}
                                >
                                  {(showCorrectAnswer || showWrongAnswer || isSelected) && (
                                    <span className="text-[#101415] text-sm">✓</span>
                                  )}
                                </div>
                                <span className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{option}</span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Submit/Reset Buttons */}
            <motion.div 
              className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {!showResults ? (
                <motion.button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length !== totalQuestions}
                  className="flex items-center gap-2 px-8 py-4 bg-[#00C57A] text-[#101415] rounded-xl hover:bg-[#7DF2C6] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{t.checkAnswers}</span>
                  <ChevronRight size={20} />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-8 py-4 bg-[#00C57A] text-[#101415] rounded-xl hover:bg-[#7DF2C6] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{t.tryAgain}</span>
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Sidebar - Progress & Info */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Progress Card */}
            <motion.div 
              className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}
              whileHover={{ y: -5 }}
            >
              <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.progress}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}>{t.answered}</span>
                    <span className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>
                      {Object.keys(selectedAnswers).length} / {totalQuestions}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-200'}`}>
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: difficultyConfig[selectedDifficulty].color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(Object.keys(selectedAnswers).length / totalQuestions) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Card */}
            {showResults && (
              <motion.div 
                className="bg-[#1A2324] rounded-2xl p-6 border-2 border-[#00C57A]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#00C57A] flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <Trophy className="text-[#101415]" size={40} />
                  </motion.div>
                  <h3 className={isDarkMode ? 'text-[#E1E1E1] mb-2' : 'text-[#101415] mb-2'}>{t.result}</h3>
                  <motion.p 
                    className="text-4xl text-[#00C57A] mb-2"
                    style={{ fontFamily: 'Montserrat' }}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {percentage}%
                  </motion.p>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                    {score} / {totalQuestions} {t.correctAnswers}
                  </p>
                  
                  {percentage === 100 && (
                    <motion.p 
                      className="text-[#00C57A]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      🎉 {t.perfect}! +{difficultyConfig[selectedDifficulty].points} {t.pointsEarned}!
                    </motion.p>
                  )}
                  {percentage >= 70 && percentage < 100 && (
                    <motion.p 
                      className="text-[#00C57A]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      👏 {t.excellent}! +{difficultyConfig[selectedDifficulty].points} {t.pointsEarned}!
                    </motion.p>
                  )}
                  {percentage >= 50 && percentage < 70 && (
                    <motion.p 
                      className="text-[#F5A623]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      💪 {t.good}!
                    </motion.p>
                  )}
                  {percentage < 50 && (
                    <motion.p 
                      className="text-[#E94B3C]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      📚 {t.needMoreTraining}!
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tips Card */}
            <motion.div 
              className={`rounded-2xl p-6 ${isDarkMode ? 'bg-[#1A2324] border border-[#2F3B3C]' : 'bg-white border border-gray-200'}`}
              whileHover={{ y: -5 }}
            >
              <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{t.tips}</h3>
              <ul className={`space-y-3 text-sm ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <span className="text-[#00C57A] mt-0.5">•</span>
                  <span>{t.readEachQuestion}</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <span className="text-[#00C57A] mt-0.5">•</span>
                  <span>{t.saveUncertain}</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <span className="text-[#00C57A] mt-0.5">•</span>
                  <span>{t.learnFromMistakes}</span>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <span className="text-[#00C57A] mt-0.5">•</span>
                  <span>{t.completeAllLevels}</span>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
