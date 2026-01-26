import ReactNativeBlobUtil from 'react-native-blob-util';
import { Platform } from 'react-native';

export interface PdfSource {
    uri?: string;
    base64?: string;
    fileName?: string;
}

export class PdfUtils {
    /**
     * Download PDF from URL and save to local storage
     */
    static async downloadPdf(url: string, fileName: string): Promise<string> {
        try {
            const response = await ReactNativeBlobUtil.config({
                fileCache: true,
                appendExt: 'pdf',
            }).fetch('GET', url);

            const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
            // Read the downloaded file and write to new location
            const data = await ReactNativeBlobUtil.fs.readFile(response.path(), 'base64');
            await ReactNativeBlobUtil.fs.writeFile(filePath, data, 'base64');

            return Platform.OS === 'ios' ? filePath : `file://${filePath}`;
        } catch (error) {
            console.error('Error downloading PDF:', error);
            throw error;
        }
    }

    /**
     * Save base64 PDF to local storage
     */
    static async saveBase64Pdf(base64: string, fileName: string): Promise<string> {
        try {
            const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
            await ReactNativeBlobUtil.fs.writeFile(filePath, base64, 'base64');

            return Platform.OS === 'ios' ? filePath : `file://${filePath}`;
        } catch (error) {
            console.error('Error saving base64 PDF:', error);
            throw error;
        }
    }

    /**
     * Get list of saved PDF files
     */
    static async getSavedPdfs(): Promise<string[]> {
        try {
            const files = await ReactNativeBlobUtil.fs.ls(ReactNativeBlobUtil.fs.dirs.DocumentDir);
            return files.filter(file => file.endsWith('.pdf'));
        } catch (error) {
            console.error('Error getting saved PDFs:', error);
            return [];
        }
    }

    /**
     * Delete a saved PDF file
     */
    static async deletePdf(fileName: string): Promise<boolean> {
        try {
            const filePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
            await ReactNativeBlobUtil.fs.unlink(filePath);
            return true;
        } catch (error) {
            console.error('Error deleting PDF:', error);
            return false;
        }
    }

    /**
     * Check if a file exists
     */
    static async fileExists(filePath: string): Promise<boolean> {
        try {
            return await ReactNativeBlobUtil.fs.exists(filePath);
        } catch (error) {
            return false;
        }
    }

    /**
     * Get file size in bytes
     */
    static async getFileSize(filePath: string): Promise<number> {
        try {
            const stats = await ReactNativeBlobUtil.fs.stat(filePath);
            return stats.size;
        } catch (error) {
            console.error('Error getting file size:', error);
            return 0;
        }
    }

    /**
     * Format file size for display
     */
    static formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Validate PDF URL
     */
    static isValidPdfUrl(url: string): boolean {
        // Simple regex check for http/https
        return /^(http|https):\/\/[^ "]+$/.test(url);
    }

    /**
     * Extract filename from URL
     */
    static getFilenameFromUrl(url: string): string {
        try {
            // Basic string parsing to avoid URL type issues
            const pathname = url.split('?')[0]; // Remove query params
            const filename = pathname.split('/').pop();
            return filename && filename.endsWith('.pdf') ? filename : 'document.pdf';
        } catch {
            return 'document.pdf';
        }
    }
}

export default PdfUtils; 