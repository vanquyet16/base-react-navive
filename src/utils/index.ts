// Utility functions
export const formatCurrency = (amount: number, currency = 'VND') => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency,
    }).format(amount);
};

export const formatDate = (date: Date | string, format = 'dd/MM/yyyy') => {
    const d = typeof date === 'string' ? new Date(date) : date;

    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();

    return format
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', year.toString());
};

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

export const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number,
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}; 