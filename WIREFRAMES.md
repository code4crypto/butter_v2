# Butter Terminal - Wireframe Specifications

## 1. Onboarding Flow

### Screen 1: Welcome & Connect External Wallet
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      [Butter Logo]                          │
│                                                             │
│                  Welcome to Butter Terminal                 │
│                                                             │
│        Trade crypto based on community intelligence         │
│                                                             │
│                                                             │
│              ┌─────────────────────────────┐               │
│              │   Connect External Wallet   │               │
│              └─────────────────────────────┘               │
│                                                             │
│              ┌─────────────────────────────┐               │
│              │   Connect via Telegram      │               │
│              └─────────────────────────────┘               │
│                                                             │
│                                                             │
│            [Browse feeds without connecting]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Screen 2: Create Butter Wallet (Trading Account)
```
┌─────────────────────────────────────────────────────────────┐
│                        [← Back]                             │
│                                                             │
│                  Create Your Trading Wallet                 │
│                                                             │
│   Your Butter Wallet is a secure trading balance linked    │
│              to your connected wallet                       │
│                                                             │
│                                                             │
│   Connected: 0x1234...5678                                 │
│                                                             │
│              ┌─────────────────────────────┐               │
│              │  Wallet Name (Optional)     │               │
│              │  [                        ] │               │
│              └─────────────────────────────┘               │
│                                                             │
│              ┌─────────────────────────────┐               │
│              │   Create Trading Wallet     │               │
│              └─────────────────────────────┘               │
│                                                             │
│                                                             │
│                    [Skip for now]                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Screen 3: Fund Account
```
┌─────────────────────────────────────────────────────────────┐
│                        [← Back]                             │
│                                                             │
│                   Fund Your Trading Wallet                  │
│                                                             │
│         Transfer funds to start trading instantly           │
│                                                             │
│                                                             │
│   Butter Wallet Address:                                   │
│   [ButterXXXXXXXXXXXXXXXXXXX]  [Copy]                     │
│                                                             │
│                                                             │
│   Quick Transfer Amounts:                                   │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│   │ 0.1  │ │ 0.5  │ │  1   │ │  5   │                    │
│   │ SOL  │ │ SOL  │ │ SOL  │ │ SOL  │                    │
│   └──────┘ └──────┘ └──────┘ └──────┘                    │
│                                                             │
│              ┌─────────────────────────────┐               │
│              │   Transfer from Wallet      │               │
│              └─────────────────────────────┘               │
│                                                             │
│                                                             │
│              [I'll fund later - Start Trading]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Main Dashboard - Desktop

### Full Layout
```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  Butter Terminal Dashboard                [🟢 Live] Price Data Updated: 29/10/2025     │
│                                                                                         │
│  [🔍 Search tokens...]           [Account ▼] [💰 $1,234.56] [⚙️] [Select Wallet ▼]   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
│                                                                                         │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐  [← →]         │
│  │   All    │  Sauce   │ Alpha DAO│ Degen Grp│ Crypto CT│  + Add   │                │
│  └──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘                │
│                                                                                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                   │
│  │ Don't Even Trip  │  │     CORTEX       │  │  PayNet Protocol │                   │
│  │ Dawg             │  │                  │  │                  │                   │
│  │                  │  │                  │  │                  │                   │
│  │ 🔵 TRIP  1m  ℹ️  │  │ 🔵 CORTEX 1m ℹ️  │  │ 🔵 PAYNET 1m ℹ️  │                   │
│  │ 🌐               │  │ 🌐               │  │ 🌐               │                   │
│  │                  │  │                  │  │                  │                   │
│  │  [Chart Area]    │  │  [Chart Area]    │  │  [Chart Area]    │                   │
│  │                  │  │                  │  │                  │                   │
│  │                  │  │                  │  │                  │                   │
│  │ MCap: $82,936    │  │ MCap: $82,656    │  │ MCap: $53,532    │                   │
│  │ Vol($): $10,504  │  │ Vol($): $4,750   │  │ Vol($): $622.99  │                   │
│  │                  │  │                  │  │                  │                   │
│  │ ⇅  +66.14%       │  │ ⇅  -6.76%        │  │ ⇅  -21.60%       │                   │
│  │                  │  │                  │  │                  │                   │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐  │                   │
│  │  │   Trade    │  │  │  │   Trade    │  │  │  │   Trade    │  │                   │
│  │  └────────────┘  │  │  └────────────┘  │  │  └────────────┘  │                   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘                   │
│                                                                                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐                   │
│  │     LOOTFI       │  │      PAPEG       │  │  Zerox Society   │                   │
│  │                  │  │                  │  │                  │                   │
│  │ 🔵 LOOTFI 1m ℹ️   │  │ 🔵 PAPEG 1m ℹ️   │  │ 🔵 ZEROXS 1m ℹ️  │                   │
│  │ 🌐               │  │ 🌐               │  │ 🌐               │                   │
│  │  [Chart Area]    │  │  [Chart Area]    │  │  [Chart Area]    │                   │
│  │                  │  │                  │  │                  │                   │
│  │ MCap: $91,835    │  │ MCap: $276,341   │  │ MCap: $31,008    │                   │
│  │ Vol($): $487.71  │  │ Vol($): $211.63  │  │ Vol($): $35.7    │                   │
│  │ ⇅  -10.89%       │  │ ⇅  +199.05%      │  │ ⇅  -89.14%       │                   │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐  │                   │
│  │  │   Trade    │  │  │  │   Trade    │  │  │  │   Trade    │  │                   │
│  │  └────────────┘  │  │  └────────────┘  │  │  └────────────┘  │                   │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘                   │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Token Card - Expanded State (Hover/Tap)

### Card with Quick Trade Panel
```
┌──────────────────────────────────────┐
│         PayNet Protocol              │
│                                      │
│ 🔵 PAYNET  1m  ℹ️                    │
│ 🌐                                   │
│                                      │
│        [Chart Area]                  │
│                                      │
│                                      │
│ MCap: $53,532    Vol($): $622.99    │
│                                      │
│ ⇅  -21.60%                           │
│                                      │
├──────────────────────────────────────┤
│      QUICK TRADE                     │
├──────────────────────────────────────┤
│                                      │
│  Amount:                             │
│  ┌────────────────────────────────┐ │
│  │ [Input SOL amount]             │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 0.1  │ │ 0.5  │ │  1   │        │
│  │ SOL  │ │ SOL  │ │ SOL  │        │
│  └──────┘ └──────┘ └──────┘        │
│                                      │
│  You'll receive: ~1,234 PAYNET      │
│  Price Impact: 0.5%                 │
│  Fee: 0.001 SOL                     │
│                                      │
│  Slippage: [1%] [2%] [5%] [Custom] │
│                                      │
│  ┌────────────┐    ┌──────────────┐ │
│  │    BUY     │    │    SELL      │ │
│  └────────────┘    └──────────────┘ │
│                                      │
│  Balance: 2.45 SOL                  │
│                                      │
└──────────────────────────────────────┘
```

---

## 4. Mobile Views

### Mobile Dashboard
```
┌─────────────────────────────┐
│ ☰  Butter Terminal    🔔  ⚙️│
├─────────────────────────────┤
│ [🔍 Search tokens...]       │
├─────────────────────────────┤
│ 💰 $1,234.56   [Wallet ▼]  │
├─────────────────────────────┤
│ ◀ [All][Sauce][Alpha]... ▶ │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ Don't Even Trip Dawg    │ │
│ │                         │ │
│ │ 🔵 TRIP  1m  ℹ️          │ │
│ │ 🌐                      │ │
│ │                         │ │
│ │   [Chart Area]          │ │
│ │                         │ │
│ │ MCap: $82,936           │ │
│ │ Vol($): $10,504         │ │
│ │ ⇅  +66.14%              │ │
│ │                         │ │
│ │   ┌───────────────┐     │ │
│ │   │    Trade      │     │ │
│ │   └───────────────┘     │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │      CORTEX             │ │
│ │                         │ │
│ │ 🔵 CORTEX  1m  ℹ️        │ │
│ │ 🌐                      │ │
│ │   [Chart Area]          │ │
│ │                         │ │
│ │ MCap: $82,656           │ │
│ │ Vol($): $4,750          │ │
│ │ ⇅  -6.76%               │ │
│ │                         │ │
│ │   ┌───────────────┐     │ │
│ │   │    Trade      │     │ │
│ │   └───────────────┘     │ │
│ └─────────────────────────┘ │
│                             │
└─────────────────────────────┘
```

### Mobile Card - Expanded
```
┌─────────────────────────────┐
│      PayNet Protocol        │
│                             │
│ 🔵 PAYNET  1m  ℹ️            │
│ 🌐                          │
│                             │
│     [Chart Area]            │
│                             │
│ MCap: $53,532               │
│ Vol($): $622.99             │
│ ⇅  -21.60%                  │
│                             │
├─────────────────────────────┤
│      QUICK TRADE            │
├─────────────────────────────┤
│                             │
│ Amount (SOL):               │
│ ┌─────────────────────────┐ │
│ │ [Input]                 │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────┐ ┌─────┐ ┌─────┐   │
│ │ 0.1 │ │ 0.5 │ │  1  │   │
│ └─────┘ └─────┘ └─────┘   │
│                             │
│ ~1,234 PAYNET               │
│ Impact: 0.5% | Fee: 0.001  │
│                             │
│ Slippage: [1%][2%][5%]     │
│                             │
│ ┌──────────┐ ┌───────────┐ │
│ │   BUY    │ │   SELL    │ │
│ └──────────┘ └───────────┘ │
│                             │
│ Balance: 2.45 SOL          │
│                             │
└─────────────────────────────┘
```

---

## 5. Header Dropdown Menus

### Account Dropdown
```
┌─────────────────────────┐
│ 0x1234...5678          │
├─────────────────────────┤
│ 💰 Portfolio           │
│ 📊 Open Positions      │
│ 📝 Order History       │
│ ⚙️  Settings           │
│ 🚪 Disconnect          │
└─────────────────────────┘
```

### Wallet Balance Dropdown
```
┌─────────────────────────┐
│ Butter Wallet           │
│ Balance: $1,234.56      │
│                         │
│ ┌─────────────────────┐ │
│ │  Add Funds          │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │  Withdraw           │ │
│ └─────────────────────┘ │
│                         │
│ Recent Transactions:    │
│ • +0.5 SOL  2h ago     │
│ • -0.1 SOL  5h ago     │
└─────────────────────────┘
```

---

## Key Interactions

1. **Feed Tabs**: Click to filter by community, horizontal scroll for more
2. **Search**: Real-time token search across all feeds
3. **Card Hover/Tap**: Expands to show quick trade panel
4. **Trade Button**: Opens quick trade if not expanded, executes if in panel
5. **Info Icon**: Shows token details, contract address, links
6. **Account Menu**: Access portfolio, settings, disconnect
7. **Balance Display**: Click to see funding options and transactions

---

## Responsive Breakpoints

- **Desktop**: 3 columns (>1280px)
- **Tablet**: 2 columns (768px - 1280px)
- **Mobile**: 1 column (<768px)
- **Navigation**: Hamburger menu on mobile
- **Tabs**: Horizontal scroll on all sizes
