// Helper functions for theme styling

export const getTextClass = (isDarkMode: boolean, variant: 'primary' | 'secondary' | 'muted' = 'primary') => {
  if (variant === 'primary') {
    return isDarkMode ? 'text-[#E1E1E1]' : 'text-gray-900';
  } else if (variant === 'secondary') {
    return isDarkMode ? 'text-[#E1E1E1] opacity-80' : 'text-gray-700';
  } else {
    return isDarkMode ? 'text-[#E1E1E1] opacity-70' : 'text-gray-600';
  }
};

export const getBgClass = (isDarkMode: boolean, variant: 'primary' | 'secondary' | 'card' = 'primary') => {
  if (variant === 'primary') {
    return isDarkMode ? 'bg-[#101415]' : 'bg-white';
  } else if (variant === 'secondary') {
    return isDarkMode ? 'bg-[#1A2324]' : 'bg-gray-50';
  } else {
    return isDarkMode ? 'bg-[#1A2324]' : 'bg-white border border-gray-200';
  }
};

export const getInputClass = (isDarkMode: boolean) => {
  return `w-full px-4 py-3 rounded-[12px] transition-all ${
    isDarkMode
      ? 'bg-[#2F3B3C] text-[#E1E1E1] border border-[#2F3B3C] focus:border-[#00C57A] focus:outline-none'
      : 'bg-white text-gray-900 border border-gray-300 focus:border-[#00C57A] focus:outline-none'
  }`;
};

export const getCardClass = (isDarkMode: boolean) => {
  return `rounded-[16px] p-6 md:p-8 ${
    isDarkMode
      ? 'bg-[#1A2324]'
      : 'bg-white border border-gray-200'
  }`;
};

export const getButtonClass = (isDarkMode: boolean, variant: 'primary' | 'outline' = 'primary') => {
  if (variant === 'primary') {
    return 'px-6 py-3 bg-[#00C57A] text-white rounded-[12px] hover:bg-[#7DF2C6] transition-all';
  } else {
    return `px-6 py-3 border-2 border-[#00C57A] text-[#00C57A] rounded-[12px] transition-all ${
      isDarkMode ? 'hover:bg-[#00C57A] hover:text-[#101415]' : 'hover:bg-[#00C57A] hover:text-white'
    }`;
  }
};
