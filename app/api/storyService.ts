// Use the production URL or fall back to localhost
const API_BASE_URL = 'http://iog84s80skogo8cwk4wscgwc.160.191.163.32.sslip.io';

interface GenerateResponse {
    success: boolean;
    message: string;
    video_url: string;
}

export const storyService = {
    async generateStory(data: {
        headline: string;
        target_duration: string;
        voice_type: string;
    }): Promise<string> {
        try {
            console.log('Making request to:', `${API_BASE_URL}/generate`);
            const response = await fetch(`${API_BASE_URL}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result: GenerateResponse = await response.json();
            
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to generate video');
            }
            
            return result.video_url;
        } catch (error) {
            console.error('Error generating story:', error);
            throw error;
        }
    }
};
