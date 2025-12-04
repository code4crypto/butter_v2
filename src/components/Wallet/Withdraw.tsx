import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface WithdrawProps {
  onBack: () => void;
  availableBalance: number;
  onConfirm: (destinationAddress: string, amount: number) => void;
}

export function Withdraw({ onBack, availableBalance, onConfirm }: WithdrawProps) {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [networkFee] = useState(0.000005); // Mock fee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (amountNum > 0 && amountNum <= availableBalance && destinationAddress) {
      onConfirm(destinationAddress, amountNum);
    }
  };

  const totalAmount = parseFloat(amount) + networkFee;
  const isValid = parseFloat(amount) > 0 && 
                  parseFloat(amount) <= availableBalance && 
                  destinationAddress.length > 0;

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
            Withdraw
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Transfer funds to an external wallet
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-1">Available Balance</p>
            <p className="text-white text-2xl font-bold">{availableBalance.toFixed(4)} SOL</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-400">
              Destination Address
            </label>
            <input
              type="text"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              placeholder="Enter Solana wallet address"
              className="w-full py-3 px-4 bg-brown-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-butter-500 transition-colors duration-200 font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-slate-400">
              Amount (SOL)
            </label>
            <input
              type="number"
              step="0.0001"
              min="0"
              max={availableBalance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0000"
              className="w-full py-3 px-4 bg-brown-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-butter-500 transition-colors duration-200"
            />
            {parseFloat(amount) > availableBalance && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Amount exceeds available balance
              </p>
            )}
          </div>

          <div className="bg-brown-800/50 border border-slate-700 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Network Fee</span>
              <span>{networkFee.toFixed(6)} SOL</span>
            </div>
            <div className="flex justify-between text-white font-semibold pt-2 border-t border-slate-700">
              <span>Total</span>
              <span>{totalAmount.toFixed(6)} SOL</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-4 px-6 bg-butter-400 hover:bg-butter-500 text-yellow-800 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
}



