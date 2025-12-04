import { ArrowLeft, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { useState } from 'react';

interface AutoTradeSettingsProps {
  onBack: () => void;
  onSave: (settings: AutoTradeSettingsData) => void;
  initialSettings?: AutoTradeSettingsData;
}

export interface AutoTradeSettingsData {
  enabled: boolean;
  allocatePercent: number;
  maxTradeSize: number;
  maxTradesPerDay: number;
  maxSlippage: number;
  autoTakeProfit: number;
  autoStopLoss: number;
}

export function AutoTradeSettings({ 
  onBack, 
  onSave,
  initialSettings 
}: AutoTradeSettingsProps) {
  const [settings, setSettings] = useState<AutoTradeSettingsData>(
    initialSettings || {
      enabled: false,
      allocatePercent: 50,
      maxTradeSize: 1.0,
      maxTradesPerDay: 10,
      maxSlippage: 1.0,
      autoTakeProfit: 10.0,
      autoStopLoss: 5.0,
    }
  );

  const handleSave = () => {
    onSave(settings);
  };

  const updateSetting = <K extends keyof AutoTradeSettingsData>(
    key: K,
    value: AutoTradeSettingsData[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white">
            Auto-Trade Configuration
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Configure automatic trading settings for your wallet
          </p>
        </div>

        <div className="space-y-6 pt-4">
          {/* Enable/Disable Toggle */}
          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Auto-Trade</h3>
                <p className="text-slate-400 text-sm">Enable or disable automatic trading</p>
              </div>
              <button
                onClick={() => updateSetting('enabled', !settings.enabled)}
                className="flex items-center gap-2"
              >
                {settings.enabled ? (
                  <ToggleRight className="w-12 h-12 text-butter-400" />
                ) : (
                  <ToggleLeft className="w-12 h-12 text-slate-600" />
                )}
              </button>
            </div>
          </div>

          {/* Settings Fields */}
          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm text-slate-400">
                Allocate % of Wallet
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.allocatePercent}
                  onChange={(e) => updateSetting('allocatePercent', parseFloat(e.target.value))}
                  className="flex-1"
                  disabled={!settings.enabled}
                />
                <span className="text-white font-semibold w-16 text-right">
                  {settings.allocatePercent}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-400">
                Max Trade Size (SOL)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={settings.maxTradeSize}
                onChange={(e) => updateSetting('maxTradeSize', parseFloat(e.target.value))}
                className="w-full py-3 px-4 bg-brown-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-butter-500 transition-colors duration-200"
                disabled={!settings.enabled}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-400">
                Max Trades Per Day
              </label>
              <input
                type="number"
                min="1"
                value={settings.maxTradesPerDay}
                onChange={(e) => updateSetting('maxTradesPerDay', parseInt(e.target.value))}
                className="w-full py-3 px-4 bg-brown-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-butter-500 transition-colors duration-200"
                disabled={!settings.enabled}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-400">
                Max Slippage (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={settings.maxSlippage}
                  onChange={(e) => updateSetting('maxSlippage', parseFloat(e.target.value))}
                  className="flex-1"
                  disabled={!settings.enabled}
                />
                <span className="text-white font-semibold w-16 text-right">
                  {settings.maxSlippage}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-400">
                Auto Take Profit (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={settings.autoTakeProfit}
                  onChange={(e) => updateSetting('autoTakeProfit', parseFloat(e.target.value))}
                  className="flex-1"
                  disabled={!settings.enabled}
                />
                <span className="text-white font-semibold w-16 text-right">
                  {settings.autoTakeProfit}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-slate-400">
                Auto Stop Loss (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={settings.autoStopLoss}
                  onChange={(e) => updateSetting('autoStopLoss', parseFloat(e.target.value))}
                  className="flex-1"
                  disabled={!settings.enabled}
                />
                <span className="text-white font-semibold w-16 text-right">
                  {settings.autoStopLoss}%
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-4 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}



