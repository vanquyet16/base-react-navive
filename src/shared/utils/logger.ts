// ============================================================================
// LOGGER UTILITY - THAY THẾ CONSOLE.LOG VỚI CẤU HÌNH CHUYÊN NGHIỆP
// ============================================================================

import { ENV } from '@/shared/config/app.config';

// Định nghĩa các level log
export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
    VERBOSE = 4,
}

// Cấu hình logger
const LOG_CONFIG = {
    level: ENV.DEV ? LogLevel.DEBUG : LogLevel.ERROR,
    enableConsole: ENV.DEV,
    enableFile: ENV.PROD,
    maxLogSize: 1000, // Số lượng log tối đa lưu trong memory
} as const;

// Interface cho log entry
interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: any;
    stack?: string;
}

// Class Logger chính
class Logger {
    private logs: LogEntry[] = [];
    private readonly context?: string;

    constructor(context?: string) {
        this.context = context;
    }

    // Private method để format log
    private formatMessage(level: LogLevel, message: string, data?: any): string {
        const timestamp = new Date().toISOString();
        const levelName = LogLevel[level];
        const context = this.context ? `[${this.context}]` : '';

        return `${timestamp} ${levelName}${context}: ${message}`;
    }

    // Private method để lưu log
    private saveLog(level: LogLevel, message: string, data?: any, error?: Error): void {
        if (level > LOG_CONFIG.level) return;

        const logEntry: LogEntry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
            stack: error?.stack,
        };

        this.logs.push(logEntry);

        // Giới hạn số lượng log trong memory
        if (this.logs.length > LOG_CONFIG.maxLogSize) {
            this.logs.shift();
        }

        // Hiển thị log nếu được enable
        if (LOG_CONFIG.enableConsole) {
            const formattedMessage = this.formatMessage(level, message, data);

            switch (level) {
                case LogLevel.ERROR:
                    console.error(formattedMessage, data || '');
                    if (error) console.error(error);
                    break;
                case LogLevel.WARN:
                    console.warn(formattedMessage, data || '');
                    break;
                case LogLevel.INFO:
                    console.info(formattedMessage, data || '');
                    break;
                case LogLevel.DEBUG:
                    console.debug(formattedMessage, data || '');
                    break;
                case LogLevel.VERBOSE:
                    console.log(formattedMessage, data || '');
                    break;
            }
        }
    }

    // Public methods
    error(message: string, data?: any, error?: Error): void {
        this.saveLog(LogLevel.ERROR, message, data, error);
    }

    warn(message: string, data?: any): void {
        this.saveLog(LogLevel.WARN, message, data);
    }

    info(message: string, data?: any): void {
        this.saveLog(LogLevel.INFO, message, data);
    }

    debug(message: string, data?: any): void {
        this.saveLog(LogLevel.DEBUG, message, data);
    }

    verbose(message: string, data?: any): void {
        this.saveLog(LogLevel.VERBOSE, message, data);
    }

    // Method để lấy tất cả logs (cho debugging)
    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    // Method để clear logs
    clearLogs(): void {
        this.logs = [];
    }

    // Method để export logs (cho production debugging)
    exportLogs(): string {
        return JSON.stringify(this.logs, null, 2);
    }
}

// Factory function để tạo logger với context
export const createLogger = (context?: string): Logger => {
    return new Logger(context);
};

// Default logger instance
export const logger = createLogger('App');

// Utility functions cho các trường hợp đặc biệt
export const logError = (error: Error, context?: string): void => {
    const contextLogger = context ? createLogger(context) : logger;
    contextLogger.error(error.message, null, error);
};

export const logApiRequest = (method: string, url: string, data?: any): void => {
    logger.debug(`API Request: ${method} ${url}`, data);
};

export const logApiResponse = (status: number, url: string, data?: any): void => {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.DEBUG;
    const message = `API Response: ${status} ${url}`;

    if (level === LogLevel.ERROR) {
        logger.error(message, data);
    } else {
        logger.debug(message, data);
    }
};

export const logPerformance = (operation: string, duration: number): void => {
    logger.debug(`Performance: ${operation} took ${duration}ms`);
};


