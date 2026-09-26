/* eslint-disable no-console */
/**
 * LOGGER
 * ======
 * - Bundle debug: in ra console với mức DEBUG.
 * - Bundle release: KHÔNG in console (tránh lộ dữ liệu qua logcat/Console.app); chỉ chuyển
 *   WARN/ERROR tới `sink` (Sentry/Crashlytics) nếu đã đăng ký qua `setLogSink`.
 * - Mọi `data` đều được che các trường nhạy cảm (token, mật khẩu, CCCD…) trước khi ghi.
 */

export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
}

export type LogSink = (level: LogLevel, message: string, data?: unknown) => void;

const MIN_LEVEL = __DEV__ ? LogLevel.DEBUG : LogLevel.WARN;

const SENSITIVE_KEY = /pass(word)?|token|authorization|cookie|secret|cccd|otp|pin|deviceid/i;
const MAX_DEPTH = 5;

/** Che giá trị của các khoá nhạy cảm (đệ quy, có giới hạn độ sâu) */
export const redact = (value: unknown, depth = 0): unknown => {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (depth >= MAX_DEPTH) {
        return '[…]';
    }
    if (value instanceof Error) {
        return { name: value.name, message: value.message };
    }
    if (Array.isArray(value)) {
        return value.map(item => redact(item, depth + 1));
    }
    return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, item]) => [
            key,
            SENSITIVE_KEY.test(key) ? '[REDACTED]' : redact(item, depth + 1),
        ]),
    );
};

let sink: LogSink | null = null;

/** Đăng ký nơi nhận log ở release (crash reporter). Gọi một lần trong bootstrap. */
export const setLogSink = (next: LogSink | null): void => {
    sink = next;
};

const CONSOLE_METHOD: Record<LogLevel, 'error' | 'warn' | 'info' | 'debug'> = {
    [LogLevel.ERROR]: 'error',
    [LogLevel.WARN]: 'warn',
    [LogLevel.INFO]: 'info',
    [LogLevel.DEBUG]: 'debug',
};

class Logger {
    constructor(private readonly context?: string) {}

    error(message: string, data?: unknown): void {
        this.write(LogLevel.ERROR, message, data);
    }

    warn(message: string, data?: unknown): void {
        this.write(LogLevel.WARN, message, data);
    }

    info(message: string, data?: unknown): void {
        this.write(LogLevel.INFO, message, data);
    }

    debug(message: string, data?: unknown): void {
        this.write(LogLevel.DEBUG, message, data);
    }

    private write(level: LogLevel, message: string, data?: unknown): void {
        if (level > MIN_LEVEL) {
            return;
        }
        const text = this.context ? `[${this.context}] ${message}` : message;
        const safeData = data === undefined ? undefined : redact(data);

        if (__DEV__) {
            if (safeData === undefined) {
                console[CONSOLE_METHOD[level]](text);
            } else {
                console[CONSOLE_METHOD[level]](text, safeData);
            }
        }
        sink?.(level, text, safeData);
    }
}

export const createLogger = (context?: string): Logger => new Logger(context);

export const logger = createLogger('App');

export const logError = (error: unknown, context?: string): void => {
    (context ? createLogger(context) : logger).error(
        error instanceof Error ? error.message : 'Unknown error',
        error,
    );
};
