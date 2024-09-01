interface TelegramWebApp {
    ready(): void;
    expand(): void;
    close(): void; 
    onCloseButtonClicked: () => void; 
    onBackdropClick: () => void; 
    onEvent: (event: string, handler: (data: any) => void) => void; 
  
    initData: string; 
    initDataUnsafe: { [key: string]: any }; 
    user: {
      id: number; 
      first_name: string; 
      last_name: string | null; 
      username: string | null; 
      language_code: string;
    };
    chat: {
      id: number; 
      title: string;
      type: string; 
    };
    themeParams: {
      [key: string]: string; 
    };
    viewportHeight: number; 
    viewportWidth: number; 
  
    sendData(data: string): void;
    showAlert(text: string): void; 
    showConfirm(text: string): Promise<boolean>; 
    navigateBack(): void; 
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }