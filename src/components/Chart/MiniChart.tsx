import { useEffect, useRef } from 'react';
import { createChart, ColorType, type IChartApi, type ISeriesApi } from 'lightweight-charts';

interface MiniChartProps {
  data: Array<{ time: number; value: number }>;
  color?: string;
  height?: number;
}

export function MiniChart({ data, color = '#10b981', height = 96 }: MiniChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null);

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

    console.log('Chart created successfully, adding area series');
      const series = chart.addAreaSeries({
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
    if (seriesRef.current && data.length > 0) {
      try {
        console.log('Setting chart data:', data.length, 'points');
        seriesRef.current.setData(data);
        if (chartRef.current) {
          chartRef.current.timeScale().fitContent();
        }
      } catch (error) {
        console.error('Error setting chart data:', error, data.slice(0, 2));
      }
    } else {
      console.log('Chart not ready or no data:', { hasChart: !!seriesRef.current, dataLength: data.length });
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full" />;
}
