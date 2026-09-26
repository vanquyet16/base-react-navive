/**
 * APP INIT HOOK
 * =============
 * Chạy bootstrap một lần khi mount; cho phép thử lại nếu lỗi tạm thời.
 */

import { useCallback, useEffect, useState } from 'react';
import { bootstrap } from '@/app/bootstrap';
import { logger } from '@/shared/utils/logger';

type AppInitState =
    | { status: 'loading'; error: null }
    | { status: 'ready'; error: null }
    | { status: 'error'; error: Error };

export const useAppInit = () => {
    const [state, setState] = useState<AppInitState>({ status: 'loading', error: null });

    const run = useCallback(async () => {
        setState({ status: 'loading', error: null });
        try {
            await bootstrap();
            setState({ status: 'ready', error: null });
        } catch (error) {
            logger.error('[AppInit] Khởi tạo thất bại', error);
            setState({
                status: 'error',
                error: error instanceof Error ? error : new Error('Không thể khởi tạo ứng dụng'),
            });
        }
    }, []);

    useEffect(() => {
        run();
    }, [run]);

    return { ...state, retry: run };
};
