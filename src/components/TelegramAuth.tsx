import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface TelegramAuthProps {
  botName: string;
  onAuth: (authData: any) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
      };
      Login?: {
        auth: (
          options: {
            bot_id: string;
            request_access?: boolean;
            lang?: string;
          },
          callback: (dataOrFalse: any) => void
        ) => void;
      };
    };
  }
}

export function TelegramAuth({ botName, onAuth, onError }: TelegramAuthProps) {
  const scriptLoaded = useRef(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Telegram Widget script
    if (scriptLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-radius', '10');
    script.async = true;

    script.onload = () => {
      scriptLoaded.current = true;
      
      // Listen for auth callback
      (window as any).onTelegramAuth = (user: any) => {
        if (user && user.id) {
          onAuth(user);
        } else {
          onError?.('Authentication failed');
        }
      };
    };

    script.onerror = () => {
      onError?.('Failed to load Telegram widget');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [botName, onAuth, onError]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Connect Telegram</h3>
        <p className="text-brown-300 text-sm">
          Sign in with Telegram to see your groups
        </p>
      </div>
      
      <div 
        ref={widgetRef}
        id="telegram-login-container"
        className="flex justify-center"
      >
        {!scriptLoaded.current && (
          <div className="flex items-center gap-2 text-brown-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading Telegram login...</span>
          </div>
        )}
      </div>
      
      <p className="text-xs text-brown-500 text-center max-w-md">
        We'll only access groups where you're an administrator to show you installation options.
      </p>
    </div>
  );
}








