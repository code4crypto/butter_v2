import { useEffect, useState } from 'react';
import { butterWebSocket, type TokenPriceData } from '../services/websocket';

export function useWebSocket(contracts: string[], timeframe: string = '1m') {
  const [data, setData] = useState<Map<string, TokenPriceData>>(new Map());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    butterWebSocket.connect();
    setIsConnected(true);

    const unsubscribe = butterWebSocket.onMessage((tokenData: TokenPriceData) => {
      setData(prev => {
        const newMap = new Map(prev);
        newMap.set(tokenData.contract, tokenData);
        return newMap;
      });
    });

    if (contracts.length > 0) {
      butterWebSocket.subscribe(contracts, timeframe);
    }

    return () => {
      if (contracts.length > 0) {
        butterWebSocket.unsubscribe(contracts, timeframe);
      }
      unsubscribe();
    };
  }, [contracts.join(','), timeframe]);

  return { data, isConnected };
}
