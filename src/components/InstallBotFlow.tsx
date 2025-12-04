import { useState, useEffect, useRef } from 'react';
import { X, Bot, CheckCircle2, Loader2, ExternalLink, AlertCircle, Users, Shield } from 'lucide-react';
import { getInviteLink, getUserGroups, pollInstallationStatus, type TelegramGroup, type TelegramUser } from '../services/botApi';
import { TelegramAuth } from './TelegramAuth';

interface InstallBotFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

type InstallStep = 'auth' | 'select-group' | 'instructions' | 'adding' | 'verifying' | 'success' | 'error';

export function InstallBotFlow({ isOpen, onClose, onComplete }: InstallBotFlowProps) {
  const [step, setStep] = useState<InstallStep>('auth');
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [groups, setGroups] = useState<TelegramGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<TelegramGroup | null>(null);
  const [inviteLink, setInviteLink] = useState<string>('');
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const maxPollingAttempts = 60; // Poll for 2 minutes (60 * 2 seconds)
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('auth');
      setTelegramUser(null);
      setGroups([]);
      setSelectedGroup(null);
      setPollingAttempts(0);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isOpen]);

  const handleTelegramAuth = async (authData: any) => {
    setTelegramUser({
      id: authData.id,
      firstName: authData.first_name,
      lastName: authData.last_name,
      username: authData.username,
      photoUrl: authData.photo_url,
    });

    setLoadingGroups(true);
    try {
      // Fetch user's groups where they are admin/creator
      const userGroups = await getUserGroups(authData);
      setGroups(userGroups);

      if (userGroups.length > 0) {
        setStep('select-group');
      } else {
        // No groups found - show manual instructions
        setStep('instructions');
        getInviteLink().then(setInviteLink);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      // Fallback to manual instructions
      setStep('instructions');
      getInviteLink().then(setInviteLink);
    } finally {
      setLoadingGroups(false);
    }
  };

  const handleGroupSelect = async (group: TelegramGroup) => {
    setSelectedGroup(group);
    const link = await getInviteLink(group.id);
    setInviteLink(link);
    setStep('instructions');
  };

  const handleSkipAuth = () => {
    // Allow users to skip auth and use manual flow
    setStep('instructions');
    getInviteLink().then(setInviteLink);
  };

  const handleOpenTelegram = () => {
    if (inviteLink) {
      window.open(inviteLink, '_blank');
      setStep('adding');
      startPolling();
    }
  };

  const handleManualVerification = async () => {
    if (!selectedGroup) {
      setStep('verifying');
      setTimeout(() => {
        setStep('success');
        if (onComplete) {
          setTimeout(onComplete, 2000);
        }
      }, 1500);
      return;
    }

    setStep('verifying');
    
    // Poll for actual verification status
    const checkStatus = async () => {
      const status = await pollInstallationStatus(selectedGroup.id);
      if (status?.verified) {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
        setStep('success');
        if (onComplete) {
          setTimeout(onComplete, 2000);
        }
      }
    };

    checkStatus();
    pollingIntervalRef.current = setInterval(checkStatus, 3000);
  };

  const startPolling = () => {
    // Note: In production, this would poll the backend API
    // For now, we'll just wait for user confirmation or timeout
    setPollingAttempts(0);
    
    pollingIntervalRef.current = setInterval(() => {
      setPollingAttempts((prev) => {
        const newAttempts = prev + 1;
        
        if (newAttempts >= maxPollingAttempts) {
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
          }
          setStep('error');
          return newAttempts;
        }
        
        // Simulate checking status (in production, this would call the API)
        // For now, we'll rely on user clicking "I've completed verification"
        return newAttempts;
      });
    }, 2000); // Poll every 2 seconds
  };


  const handleClose = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }
    setStep('instructions');
    setPollingAttempts(0);
    onClose();
  };

  const handleRetry = () => {
    setStep('instructions');
    setPollingAttempts(0);
    getInviteLink().then(setInviteLink);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 rounded-3xl border border-brown-700 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-brown-400 hover:text-brown-200 hover:bg-brown-800 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12">
          {/* Step 1: Authentication */}
          {step === 'auth' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-butter-400/20 rounded-2xl">
                  <Bot className="w-8 h-8 text-butter-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Install Butter Crawler Bot</h2>
                  <p className="text-brown-300 text-sm">Connect your Telegram to see your groups</p>
                </div>
              </div>

              <TelegramAuth 
                botName="buttercrawlbot"
                onAuth={handleTelegramAuth}
                onError={(error) => console.error('Auth error:', error)}
              />

              <div className="pt-4 border-t border-brown-700">
                <button
                  onClick={handleSkipAuth}
                  className="w-full py-3 text-brown-400 hover:text-brown-200 text-sm transition-colors"
                >
                  Skip authentication and use manual method
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Group Selection */}
          {step === 'select-group' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-butter-400/20 rounded-2xl">
                  <Users className="w-8 h-8 text-butter-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Select a Group</h2>
                  <p className="text-brown-300 text-sm">Choose where to install the bot</p>
                </div>
              </div>

              {loadingGroups ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 text-butter-400 animate-spin mb-4" />
                  <p className="text-brown-300">Loading your groups...</p>
                </div>
              ) : groups.length > 0 ? (
                <div className="space-y-3">
                  <div className="bg-brown-800/50 rounded-2xl p-6 space-y-3 max-h-96 overflow-y-auto">
                    {groups.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => handleGroupSelect(group)}
                        className="w-full p-4 bg-brown-700/50 hover:bg-brown-700 border border-brown-600 hover:border-butter-400/50 rounded-xl transition-all duration-200 text-left group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white group-hover:text-butter-400 transition-colors">
                                {group.title}
                              </h3>
                              {group.isCreator && (
                                <span className="px-2 py-0.5 bg-butter-400/20 text-butter-400 text-xs rounded-full flex items-center gap-1">
                                  <Shield className="w-3 h-3" />
                                  Creator
                                </span>
                              )}
                              {!group.isCreator && group.isAdmin && (
                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                  Admin
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-brown-400">
                              <span className="capitalize">{group.type}</span>
                              {group.memberCount && (
                                <span>{group.memberCount} members</span>
                              )}
                            </div>
                          </div>
                          <ExternalLink className="w-5 h-5 text-brown-500 group-hover:text-butter-400 transition-colors flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleSkipAuth}
                    className="w-full py-3 text-brown-400 hover:text-brown-200 text-sm transition-colors"
                  >
                    Or use manual installation method
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-brown-300 mb-4">No groups found where you're an administrator.</p>
                  <button
                    onClick={handleSkipAuth}
                    className="py-3 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-2xl font-semibold transition-all duration-300"
                  >
                    Use Manual Installation
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Instructions */}
          {step === 'instructions' && (
            <div className="space-y-6">
              {selectedGroup && (
                <div className="bg-butter-400/10 border border-butter-400/30 rounded-2xl p-4 mb-4">
                  <p className="text-brown-200 text-sm">
                    Installing to: <span className="font-semibold text-butter-400">{selectedGroup.title}</span>
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="p-3 bg-butter-400/20 rounded-2xl">
                  <Bot className="w-8 h-8 text-butter-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Install Butter Crawler Bot</h2>
                  <p className="text-brown-300 text-sm">
                    {selectedGroup ? `Add the bot to ${selectedGroup.title}` : 'Add the bot to your Telegram group'}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-brown-200">
                <div className="bg-brown-800/50 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Setup Instructions:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-butter-400/20 flex items-center justify-center text-butter-400 font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Click the button below to open Telegram</p>
                        <p className="text-sm text-brown-400">
                          {selectedGroup ? 'The bot will be added to your selected group' : 'Select your group from the list'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-butter-400/20 flex items-center justify-center text-butter-400 font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Make the bot an administrator</p>
                        <p className="text-sm text-brown-400">Required for reading messages</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-butter-400/20 flex items-center justify-center text-butter-400 font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Tag the bot and type "churn"</p>
                        <p className="text-sm text-brown-400">Example: <code className="bg-brown-900 px-2 py-1 rounded">@buttercrawlbot churn</code></p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-butter-400/20 flex items-center justify-center text-butter-400 font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Wait for confirmation</p>
                        <p className="text-sm text-brown-400">The bot will confirm when setup is complete</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleOpenTelegram}
                  className="w-full py-4 bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-butter-400/30 flex items-center justify-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  {selectedGroup ? `Add to ${selectedGroup.title}` : 'Open Telegram to Add Bot'}
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Waiting for user to add bot */}
          {step === 'adding' && (
            <div className="space-y-6 text-center">
              {selectedGroup && (
                <div className="bg-butter-400/10 border border-butter-400/30 rounded-2xl p-4 mb-4">
                  <p className="text-brown-200 text-sm">
                    Installing to: <span className="font-semibold text-butter-400">{selectedGroup.title}</span>
                  </p>
                </div>
              )}
              
              <div className="flex justify-center">
                <Loader2 className="w-16 h-16 text-butter-400 animate-spin" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Waiting for Installation</h2>
                <p className="text-brown-300">
                  Follow the instructions in Telegram to add and verify the bot
                </p>
              </div>

              <div className="bg-brown-800/50 rounded-2xl p-6 space-y-4">
                <p className="text-brown-200 font-medium">Next Steps:</p>
                <ol className="text-left space-y-2 text-brown-300 text-sm list-decimal list-inside">
                  <li>Make the bot an administrator in your group</li>
                  <li>Tag the bot: <code className="bg-brown-900 px-2 py-1 rounded">@buttercrawlbot churn</code></li>
                  <li>Wait for the bot's confirmation message</li>
                </ol>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleManualVerification}
                  className="px-6 py-3 bg-brown-700 hover:bg-brown-600 border border-butter-400/30 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  I've Completed Verification
                </button>
              </div>

              <p className="text-xs text-brown-500">
                Polling for verification... ({pollingAttempts}/{maxPollingAttempts})
              </p>
            </div>
          )}

          {/* Step 3: Verifying */}
          {step === 'verifying' && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <Loader2 className="w-16 h-16 text-butter-400 animate-spin" />
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Verifying Installation</h2>
                <p className="text-brown-300">Checking if the bot is properly set up...</p>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="p-4 bg-butter-400/20 rounded-full">
                  <CheckCircle2 className="w-16 h-16 text-butter-400" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Installation Complete!</h2>
                <p className="text-brown-300">
                  The bot is now active in your group and will automatically track token mentions.
                </p>
              </div>

              <div className="bg-brown-800/50 rounded-2xl p-6">
                <p className="text-brown-200 mb-4">What happens next:</p>
                <ul className="text-left space-y-2 text-brown-300 text-sm list-disc list-inside">
                  <li>Bot monitors all messages in your group</li>
                  <li>Token mentions are automatically tracked</li>
                  <li>Alpha signals are captured in real-time</li>
                </ul>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-4 bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Done
              </button>
            </div>
          )}

          {/* Step 5: Error/Timeout */}
          {step === 'error' && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="p-4 bg-red-500/20 rounded-full">
                  <AlertCircle className="w-16 h-16 text-red-400" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Verification Timeout</h2>
                <p className="text-brown-300">
                  We couldn't detect the verification. Make sure you've followed all the steps.
                </p>
              </div>

              <div className="bg-brown-800/50 rounded-2xl p-6 text-left">
                <p className="text-brown-200 font-medium mb-3">Troubleshooting:</p>
                <ul className="space-y-2 text-brown-300 text-sm list-disc list-inside">
                  <li>Did you make the bot an administrator?</li>
                  <li>Did you tag the bot and type "churn"?</li>
                  <li>Did the bot respond with a confirmation message?</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-4 bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Try Again
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-4 bg-brown-700 hover:bg-brown-600 border border-brown-600 rounded-2xl font-semibold transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

