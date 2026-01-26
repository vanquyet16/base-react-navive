// ============================================================================
// PERFORMANCE MONITOR - THEO DÕI HIỆU SUẤT ỨNG DỤNG
// ============================================================================

// Declare global performance to avoid TS errors
declare const performance: any;

import { logger, logPerformance } from '@/shared/utils/logger';

// Interface cho performance metric
interface PerformanceMetric {
    name: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    metadata?: Record<string, any>;
}

// Interface cho performance report
interface PerformanceReport {
    metrics: PerformanceMetric[];
    summary: {
        totalOperations: number;
        averageDuration: number;
        slowestOperation: PerformanceMetric | null;
        fastestOperation: PerformanceMetric | null;
    };
}

// Class Performance Monitor chính
class PerformanceMonitor {
    private static instance: PerformanceMonitor;
    private metrics: Map<string, PerformanceMetric> = new Map();
    private readonly maxMetrics = 1000; // Giới hạn số lượng metrics

    private constructor() { }

    static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }

    // Safe performance.now() helper
    private now(): number {
        if (typeof performance !== 'undefined' && performance.now) {
            return performance.now();
        }
        return Date.now();
    }

    // Bắt đầu đo performance
    startMeasure(name: string, metadata?: Record<string, any>): void {
        const metric: PerformanceMetric = {
            name,
            startTime: this.now(),
            metadata,
        };

        this.metrics.set(name, metric);
    }

    // Kết thúc đo performance
    endMeasure(name: string): number | null {
        const metric = this.metrics.get(name);
        if (!metric) {
            logger.warn(`Performance metric "${name}" not found`);
            return null;
        }

        metric.endTime = this.now();
        metric.duration = metric.endTime - metric.startTime;

        // Log performance nếu quá chậm (> 100ms)
        if (metric.duration > 100) {
            logPerformance(name, metric.duration);
        }

        // Xóa metric để tiết kiệm memory
        this.metrics.delete(name);

        return metric.duration;
    }

    // Đo performance với callback
    async measureAsync<T>(
        name: string,
        operation: () => Promise<T>,
        metadata?: Record<string, any>,
    ): Promise<T> {
        this.startMeasure(name, metadata);

        try {
            const result = await operation();
            this.endMeasure(name);
            return result;
        } catch (error) {
            this.endMeasure(name);
            throw error;
        }
    }

    // Đo performance với sync function
    measureSync<T>(
        name: string,
        operation: () => T,
        metadata?: Record<string, any>,
    ): T {
        this.startMeasure(name, metadata);

        try {
            const result = operation();
            this.endMeasure(name);
            return result;
        } catch (error) {
            this.endMeasure(name);
            throw error;
        }
    }

    // Tạo performance report
    generateReport(): PerformanceReport {
        const completedMetrics = Array.from(this.metrics.values()).filter(
            (metric) => metric.duration !== undefined,
        );

        if (completedMetrics.length === 0) {
            return {
                metrics: [],
                summary: {
                    totalOperations: 0,
                    averageDuration: 0,
                    slowestOperation: null,
                    fastestOperation: null,
                },
            };
        }

        const totalDuration = completedMetrics.reduce((sum, metric) => sum + (metric.duration || 0), 0);
        const averageDuration = totalDuration / completedMetrics.length;

        const slowestOperation = completedMetrics.reduce((slowest, current) =>
            (current.duration || 0) > (slowest.duration || 0) ? current : slowest,
        );

        const fastestOperation = completedMetrics.reduce((fastest, current) =>
            (current.duration || 0) < (fastest.duration || 0) ? current : fastest,
        );

        return {
            metrics: completedMetrics,
            summary: {
                totalOperations: completedMetrics.length,
                averageDuration,
                slowestOperation,
                fastestOperation,
            },
        };
    }

    // Clear tất cả metrics
    clear(): void {
        this.metrics.clear();
    }

    // Lấy metric cụ thể
    getMetric(name: string): PerformanceMetric | undefined {
        return this.metrics.get(name);
    }

    // Kiểm tra xem có metric đang chạy không
    isMeasuring(name: string): boolean {
        return this.metrics.has(name);
    }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// Utility functions
export const startMeasure = (name: string, metadata?: Record<string, any>): void => {
    performanceMonitor.startMeasure(name, metadata);
};

export const endMeasure = (name: string): number | null => {
    return performanceMonitor.endMeasure(name);
};

export const measureAsync = async <T>(
    name: string,
    operation: () => Promise<T>,
    metadata?: Record<string, any>,
): Promise<T> => {
    return performanceMonitor.measureAsync(name, operation, metadata);
};

export const measureSync = <T>(
    name: string,
    operation: () => T,
    metadata?: Record<string, any>,
): T => {
    return performanceMonitor.measureSync(name, operation, metadata);
};

// React Hook cho performance monitoring
export const usePerformanceMonitor = () => {
    return {
        startMeasure,
        endMeasure,
        measureAsync,
        measureSync,
        generateReport: () => performanceMonitor.generateReport(),
        clear: () => performanceMonitor.clear(),
    };
};

// Export types
export type { PerformanceMetric, PerformanceReport };
