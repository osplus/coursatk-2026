
/**
 * إعدادات الاتصال بالسيرفر (Supabase)
 */
export const CONFIG = {
  SUPABASE_URL: 'https://dyynvhprttjnxibcqihp.supabase.co'.trim(),
  
  // اذهب إلى Settings > API في Supabase وانسخ مفتاح (anon public) وضعه هنا
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eW52aHBydHRqbnhpYmNxaWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjA0MjgsImV4cCI6MjA4MjEzNjQyOH0.bDk_lzo2aVDHNzTtHZ1-QAWkpSLZMFi_IFrpcuDAdOE'.trim(),
  
  get API_BASE_URL() {
    return `${this.SUPABASE_URL}/rest/v1`;
  },

  USE_MOCK: false, 
  TIMEOUT: 15000,
};
