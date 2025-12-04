import { useEffect, useRef } from 'react';
import { createChart, ColorType, type IChartApi, type ISeriesApi } from 'lightweight-charts';

interface MiniChartProps {
  data?: Array<{ time: number; value: number }>;
  candles?: Array<{ time: number; open: number; high: number; low: number; close: number }>;
  color?: string;
  height?: number;
}

export function MiniChart({ data = [], candles = [], color = '#10b981', height = 96 }: MiniChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Area' | 'Candlestick'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    try {
      console.log('Creating chart with lightweight-charts');
      const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748b',
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: false,
        borderVisible: false,
      },
      handleScroll: false,
      handleScale: false,
    });

    console.log('Chart created successfully, adding series');
      const series = candles.length > 0
        ? chart.addCandlestickSeries({
            upColor: '#10b981', downColor: '#ef4444', borderVisible: false,
            wickUpColor: '#10b981', wickDownColor: '#ef4444',
          })
        : chart.addAreaSeries({
            lineColor: color,
            topColor: color + '40',
            bottomColor: color + '00',
            lineWidth: 2,
            priceLineVisible: false,
            lastValueVisible: false,
          });

    chartRef.current = chart;
    seriesRef.current = series;

      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }, [color, height]);

  useEffect(() => {
    if (!seriesRef.current) return;
    try {
      if (candles.length > 0) {
        // @ts-expect-error candlestick runtime accepts array
        seriesRef.current.setData(candles);
      } else if (data.length > 0) {
        seriesRef.current.setData(data);
      }
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent();
      }
    } catch (error) {
      console.error('Error setting chart data:', error);
    }
  }, [data, candles]);

  return <div ref={chartContainerRef} className="w-full" style={{ height }} />;
}
