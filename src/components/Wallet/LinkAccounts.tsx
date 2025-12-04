import { ArrowLeft, MessageCircle, Users, Check, X } from 'lucide-react';
import { useState } from 'react';

interface LinkAccountsProps {
  onBack: () => void;
  telegramLinked?: boolean;
  discordLinked?: boolean;
  onLinkTelegram: () => void;
  onLinkDiscord: () => void;
  onUnlinkTelegram?: () => void;
  onUnlinkDiscord?: () => void;
}

export function LinkAccounts({
  onBack,
  telegramLinked = false,
  discordLinked = false,
  onLinkTelegram,
  onLinkDiscord,
  onUnlinkTelegram,
  onUnlinkDiscord,
}: LinkAccountsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-white">
            Connect Telegram or Discord
          </h1>
          <p className="text-slate-400 leading-relaxed">
            System auto-detects group membership and role
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Telegram</h3>
                  <p className="text-slate-400 text-sm">
                    {telegramLinked ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              {telegramLinked ? (
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  {onUnlinkTelegram && (
                    <button
                      onClick={onUnlinkTelegram}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLinkTelegram}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  Link
                </button>
              )}
            </div>
          </div>

          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Discord</h3>
                  <p className="text-slate-400 text-sm">
                    {discordLinked ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              {discordLinked ? (
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  {onUnlinkDiscord && (
                    <button
                      onClick={onUnlinkDiscord}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLinkDiscord}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
                >
                  Link
                </button>
              )}
            </div>
          </div>

          <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-4">
            <p className="text-blue-400 text-sm">
              💡 Once linked, the system will automatically detect your group memberships and roles (owner/member) to enable relevant features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



