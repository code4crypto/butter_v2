export interface OHLCVData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: {
    sol: number;
    dollar: number;
    buy: number;
    sell: number;
  };
  marketCap?: number;
  isComplete: boolean;
  contractAddress: string;
  channelName: string;
  timeframe: string;
}

type MessageHandler = (data: OHLCVData) => void;

export class ButterWebSocket {
  private ws: WebSocket | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();
  private subscribedChannels: Set<string> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private readonly wsUrls = [
    'wss://api.buttertrade.xyz/OHLCV/ws',
    'wss://api.buttertrade.xyz/ws',
  ];
  private currentUrlIndex = 0;

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const url = this.wsUrls[this.currentUrlIndex];
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('✅ WebSocket connected to:', url);
        this.reconnectAttempts = 0;
        this.resubscribeToChannels();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 Raw WS message:', data);
          if (data.action === 'pong' || !data.contractAddress) {
            console.log('⏭️ Skipping message (pong or no contract)');
            return;
          }
          console.log('✅ Processing OHLCV data for:', data.contractAddress);
          this.messageHandlers.forEach(handler => handler(data));
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.currentUrlIndex = (this.currentUrlIndex + 1) % this.wsUrls.length;
      this.reconnectAttempts = 0;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), 30000);

    this.reconnectTimeout = setTimeout(() => {
      console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);
      this.connect();
    }, delay);
  }

  private resubscribeToChannels(): void {
    if (this.subscribedChannels.size === 0) {
      console.log('⚠️ No channels to subscribe');
      return;
    }

    const channels = Array.from(this.subscribedChannels);
    console.log('📡 Subscribing to channels:', channels);
    this.send({
      action: 'subscribeMany',
      channels,
    });
  }

  subscribe(contracts: string[], timeframe: string = '1m'): void {
    const channels = contracts.map(contract => `${contract}:${timeframe}`);
    console.log('🔔 Subscribe called for:', { contracts: contracts.length, channels: channels.slice(0, 3) });

    channels.forEach(channel => this.subscribedChannels.add(channel));

    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('📤 Sending subscription message:', { action: 'subscribeMany', channelCount: channels.length });
      this.send({
        action: 'subscribeMany',
        channels,
      });
    } else {
      console.log('⚠️ WebSocket not open, state:', this.ws?.readyState);
    }
  }

  unsubscribe(contracts: string[], timeframe: string = '1m'): void {
    const channels = contracts.map(contract => `${contract}:${timeframe}`);

    channels.forEach(channel => this.subscribedChannels.delete(channel));

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.send({
        action: 'unsubscribeMany',
        channels,
      });
    }
  }

  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  private send(message: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.messageHandlers.clear();
    this.subscribedChannels.clear();
  }
}

export const butterWebSocket = new ButterWebSocket();
