import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Award, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '../Footer';
import { translations, type Language } from '../../utils/translations';

interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'recycle' | 'reuse' | 'reduce' | 'plant';
}

interface TasksPageProps {
  onPointsEarned?: (points: number, tasksCompleted: number) => void;
  onNavigate?: (page: string) => void;
  isDarkMode: boolean;
  language: Language;
}

const taskTranslations: Record<Language, Array<{title: string; description: string}>> = {
  az: [
    {
      title: '1 plastik şüşəni təkrar istifadə et',
      description: 'Plastik şüşəni təkrar istifadə edərək təbiətə töhfə ver'
    },
    {
      title: '5 kağız materialı təhvil ver',
      description: 'Kağız tullantılarını təhvil verərək resursları qoru'
    },
    {
      title: '1 ağac əkmək',
      description: 'Təbiətə töhfə ver və bir ağac ək'
    },
    {
      title: '3 şüşə qab təhvil ver',
      description: 'Şüşə qabları resurs kimi təhvil ver'
    },
    {
      title: 'Plastik paket əvəzinə parça çanta istifadə et',
      description: 'Bir həftə ərzində plastik paket istifadə etmə'
    },
    {
      title: '10 metal qab təhvil ver',
      description: 'Metal qabları geri qaytararaq resursları qoru'
    },
    {
      title: 'Bir bitki tanımaq',
      description: 'Bitki tanıma sistemi ilə bir bitki tanıyın'
    },
    {
      title: '5 plastik şüşəni təhvil ver',
      description: 'Plastik şüşələri resurs kimi təhvil ver'
    }
  ],
  en: [
    {
      title: 'Reuse 1 plastic bottle',
      description: 'Contribute to nature by reusing a plastic bottle'
    },
    {
      title: 'Recycle 5 paper materials',
      description: 'Conserve resources by recycling paper waste'
    },
    {
      title: 'Plant 1 tree',
      description: 'Contribute to nature and plant a tree'
    },
    {
      title: 'Recycle 3 glass containers',
      description: 'Turn in glass containers as a resource'
    },
    {
      title: 'Use cloth bag instead of plastic bag',
      description: 'Avoid using plastic bags for a week'
    },
    {
      title: 'Recycle 10 metal containers',
      description: 'Conserve resources by returning metal containers'
    },
    {
      title: 'Identify a plant',
      description: 'Identify a plant using the plant recognition system'
    },
    {
      title: 'Recycle 5 plastic bottles',
      description: 'Turn in plastic bottles as a resource'
    }
  ],
  ru: [
    {
      title: 'Повторно использовать 1 пластиковую бутылку',
      description: 'Внесите вклад в природу, повторно используя пластиковую бутылку'
    },
    {
      title: 'Сдать 5 бумажных материалов',
      description: 'Сохраняйте ресурсы, сдавая бумажные отходы'
    },
    {
      title: 'Посадить 1 дерево',
      description: 'Внесите вклад в природу и посадите дерево'
    },
    {
      title: 'Сдать 3 стеклянные емкости',
      description: 'Сдайте стеклянные емкости в качестве ресурса'
    },
    {
      title: 'Использовать тканевую сумку вместо пластикового пакета',
      description: 'Не используйте пластиковые пакеты в течение недели'
    },
    {
      title: 'Сдать 10 металлических емкостей',
      description: 'Сохраняйте ресурсы, возвращая металлические емкости'
    },
    {
      title: 'Определить растение',
      description: 'Определите растение с помощью системы распознавания растений'
    },
    {
      title: 'Сдать 5 пластиковых бутылок',
      description: 'Сдайте пластиковые бутылки в качестве ресурса'
    }
  ]
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: '1 plastik şüşəni təkrar istifadə et',
    description: 'Plastik şüşəni təkrar istifadə edərək təbiətə töhfə ver',
    points: 10,
    completed: false,
    category: 'reuse'
  },
  {
    id: 2,
    title: '5 kağız materialı təhvil ver',
    description: 'Kağız tullantılarını təhvil verərək resursları qoru',
    points: 15,
    completed: false,
    category: 'recycle'
  },
  {
    id: 3,
    title: '1 ağac əkmək',
    description: 'Təbiətə töhfə ver və bir ağac ək',
    points: 25,
    completed: false,
    category: 'plant'
  },
  {
    id: 4,
    title: '3 şüşə qab təhvil ver',
    description: 'Şüşə qabları resurs kimi təhvil ver',
    points: 12,
    completed: false,
    category: 'recycle'
  },
  {
    id: 5,
    title: 'Plastik paket əvəzinə parça çanta istifadə et',
    description: 'Bir həftə ərzində plastik paket istifadə etmə',
    points: 20,
    completed: false,
    category: 'reduce'
  },
  {
    id: 6,
    title: '10 metal qab təhvil ver',
    description: 'Metal qabları geri qaytararaq resursları qoru',
    points: 18,
    completed: false,
    category: 'recycle'
  },
  {
    id: 7,
    title: 'Bir bitki tanımaq',
    description: 'Bitki tanıma sistemi ilə bir bitki tanıyın',
    points: 8,
    completed: false,
    category: 'plant'
  },
  {
    id: 8,
    title: '5 plastik şüşəni təhvil ver',
    description: 'Plastik şüşələri resurs kimi təhvil ver',
    points: 15,
    completed: false,
    category: 'recycle'
  }
];

const levelTranslations: Record<Language, Array<{title: string}>> = {
  az: [
    { title: 'Bürünc Eko Lider' },
    { title: 'Gümüş Eko Lider' },
    { title: 'Qızıl Eko Lider' }
  ],
  en: [
    { title: 'Bronze Eco Leader' },
    { title: 'Silver Eco Leader' },
    { title: 'Gold Eco Leader' }
  ],
  ru: [
    { title: 'Бронзовый эколидер' },
    { title: 'Серебряный эколидер' },
    { title: 'Золотой эколидер' }
  ]
};

const levels = [
  { title: 'Bürünc Eko Lider', minPoints: 0, maxPoints: 49, color: '#CD7F32' },
  { title: 'Gümüş Eko Lider', minPoints: 50, maxPoints: 149, color: '#C0C0C0' },
  { title: 'Qızıl Eko Lider', minPoints: 150, maxPoints: Infinity, color: '#FFD700' }
];

export function TasksPage({ onPointsEarned, onNavigate, isDarkMode, language }: TasksPageProps) {
  const t = translations[language];
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('ecoTasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [totalPoints, setTotalPoints] = useState(() => {
    const savedPoints = localStorage.getItem('ecoTaskPoints');
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  useEffect(() => {
    localStorage.setItem('ecoTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ecoTaskPoints', totalPoints.toString());
  }, [totalPoints]);

  const currentLevel = levels.find(level => totalPoints >= level.minPoints && totalPoints <= level.maxPoints) || levels[0];
  const currentLevelIndex = levels.indexOf(currentLevel);
  const nextLevel = levels.find(level => level.minPoints > totalPoints);
  const nextLevelIndex = nextLevel ? levels.indexOf(nextLevel) : -1;
  const progressToNext = nextLevel 
    ? ((totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  const handleToggleTask = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          const pointsChange = newCompleted ? task.points : -task.points;
          const tasksChange = newCompleted ? 1 : -1;
          
          setTotalPoints(prev => prev + pointsChange);
          
          // Notify parent component about points change
          if (onPointsEarned) {
            onPointsEarned(pointsChange, tasksChange);
          }
          
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'recycle': return '#00C57A';
      case 'reuse': return '#4A90E2';
      case 'reduce': return '#F5A623';
      case 'plant': return '#7ED321';
      default: return '#00C57A';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'recycle': return language === 'az' ? 'Təkrar Emal' : language === 'en' ? 'Recycle' : 'Переработка';
      case 'reuse': return language === 'az' ? 'Təkrar İstifadə' : language === 'en' ? 'Reuse' : 'Повторное использование';
      case 'reduce': return language === 'az' ? 'Azaltma' : language === 'en' ? 'Reduce' : 'Сокращение';
      case 'plant': return language === 'az' ? 'Əkiləcək' : language === 'en' ? 'Plant' : 'Посадка';
      default: return '';
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className={`min-h-screen pt-8 pb-16 ${isDarkMode ? 'bg-[#101415]' : 'bg-white'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-[120px]">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`} style={{ fontFamily: 'Montserrat' }}>{t.tasksTitle}</h1>
          <p className={isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}>
            {language === 'az' ? 'Tapşırıqları tamamlayaraq bal qazanın və eko lider titulları əldə edin' : language === 'en' ? 'Complete tasks to earn points and achieve eco leader titles' : 'Выполняйте задачи, чтобы заработать очки и получить звания эколидера'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Tasks Section */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  className={`rounded-2xl p-6 border transition-all cursor-pointer ${
                    isDarkMode 
                      ? `bg-[#1A2324] ${task.completed ? 'border-[#00C57A] bg-opacity-50' : 'border-[#2F3B3C] hover:border-[#3F4B4C]'}`
                      : `bg-white border-2 ${task.completed ? 'border-[#00C57A]' : 'border-gray-200 hover:border-gray-300'}`
                  }`}
                  onClick={() => handleToggleTask(task.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="flex-shrink-0 mt-1"
                      animate={task.completed ? { scale: [1, 1.2, 1], rotate: [0, 360] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {task.completed ? (
                        <CheckCircle className="text-[#00C57A]" size={24} />
                      ) : (
                        <Circle className={isDarkMode ? 'text-[#4A5354]' : 'text-gray-400'} size={24} />
                      )}
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`${task.completed ? (isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400') + ' line-through' : isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                          {taskTranslations[language][task.id - 1].title}
                        </h3>
                        <motion.span
                          className="px-3 py-1 rounded-full text-xs"
                          style={{
                            backgroundColor: `${getCategoryColor(task.category)}20`,
                            color: getCategoryColor(task.category)
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {getCategoryLabel(task.category)}
                        </motion.span>
                      </div>
                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>{taskTranslations[language][task.id - 1].description}</p>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#00C57A]" />
                        <span className="text-[#00C57A]">+{task.points} {t.points.toLowerCase()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - Stats & Progress */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Current Level Card */}
            <motion.div 
              className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-white border-2 border-gray-200'}`}
              whileHover={{ y: -5, borderColor: currentLevel.color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Award size={24} style={{ color: currentLevel.color }} />
                </motion.div>
                <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>
                  {language === 'az' ? 'Cari Səviyyə' : language === 'en' ? 'Current Level' : 'Текущий уровень'}
                </h3>
              </div>
              <motion.div
                className="text-center py-6 rounded-xl mb-4"
                style={{ backgroundColor: `${currentLevel.color}20` }}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-2xl mb-2" style={{ color: currentLevel.color, fontFamily: 'Montserrat' }}>
                  {levelTranslations[language][currentLevelIndex].title}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                  {language === 'az' ? 'Səviyyəniz' : language === 'en' ? 'Your Level' : 'Ваш уровень'}
                </p>
              </motion.div>
              
              {nextLevel && (
                <>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}>
                        {language === 'az' ? 'Növbəti səviyyə' : language === 'en' ? 'Next level' : 'Следующий уровень'}
                      </span>
                      <span className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{nextLevelIndex !== -1 ? levelTranslations[language][nextLevelIndex].title : ''}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-full bg-[#00C57A]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToNext}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <p className={`text-xs text-center mt-2 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                    {nextLevel.minPoints - totalPoints} {language === 'az' ? 'bal qalıb' : language === 'en' ? 'points left' : 'очков осталось'}
                  </p>
                </>
              )}
            </motion.div>

            {/* Points Card */}
            <motion.div 
              className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-white border-2 border-gray-200'}`}
              whileHover={{ y: -5, borderColor: '#00C57A' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target size={24} className="text-[#00C57A]" />
                <h3 className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{t.points}</h3>
              </div>
              <div className="text-center py-4">
                <motion.p 
                  className="text-4xl text-[#00C57A] mb-2" 
                  style={{ fontFamily: 'Montserrat' }}
                  key={totalPoints}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  {totalPoints}
                </motion.p>
                <p className={`text-sm ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                  {language === 'az' ? 'Ümumi bal' : language === 'en' ? 'Total points' : 'Всего очков'}
                </p>
              </div>
            </motion.div>

            {/* Progress Card */}
            <motion.div 
              className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-white border-2 border-gray-200'}`}
              whileHover={{ y: -5 }}
            >
              <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                {language === 'az' ? 'Tapşırıq İrəliləyişi' : language === 'en' ? 'Task Progress' : 'Прогресс задач'}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}>
                      {t.completedTasksTitle}
                    </span>
                    <span className={isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}>{completedTasks} / {totalTasks}</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#2F3B3C]' : 'bg-gray-200'}`}>
                    <motion.div
                      className="h-full bg-[#00C57A]"
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${isDarkMode ? 'border-[#2F3B3C]' : 'border-gray-200'}`}>
                  <div className="text-center">
                    <motion.p 
                      className="text-2xl text-[#00C57A] mb-1" 
                      style={{ fontFamily: 'Montserrat' }}
                      key={`completed-${completedTasks}`}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {completedTasks}
                    </motion.p>
                    <p className={`text-xs ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                      {language === 'az' ? 'Tamamlanıb' : language === 'en' ? 'Completed' : 'Завершено'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl mb-1 ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-400'}`} style={{ fontFamily: 'Montserrat' }}>
                      {totalTasks - completedTasks}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                      {language === 'az' ? 'Qalıb' : language === 'en' ? 'Remaining' : 'Осталось'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* All Levels Info */}
            <motion.div 
              className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-[#1A2324] border-[#2F3B3C]' : 'bg-white border-2 border-gray-200'}`}
              whileHover={{ y: -5 }}
            >
              <h3 className={`mb-4 ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>
                {language === 'az' ? 'Bütün Səviyyələr' : language === 'en' ? 'All Levels' : 'Все уровни'}
              </h3>
              <div className="space-y-3">
                {levels.map((level, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-xl border transition-all ${
                      level.title === currentLevel.title
                        ? 'border-[#00C57A] bg-[#00C57A10]'
                        : isDarkMode ? 'border-[#2F3B3C]' : 'border-gray-200'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <div className="flex items-center gap-3">
                      <Award size={20} style={{ color: level.color }} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDarkMode ? 'text-[#E1E1E1]' : 'text-[#101415]'}`}>{levelTranslations[language][index].title}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-[#8A9A9B]' : 'text-gray-600'}`}>
                          {level.minPoints}+ {language === 'az' ? 'bal' : language === 'en' ? 'points' : 'очков'}
                        </p>
                      </div>
                      {level.title === currentLevel.title && (
                        <motion.span 
                          className="text-[#00C57A] text-xs"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {language === 'az' ? 'Cari' : language === 'en' ? 'Current' : 'Текущий'}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
}
