# API Endpoints for Wallet Management System

## Authentication & Wallet Creation

### 1. Create New Wallet
- **POST** `/api/wallets/create`
- **Body:**
  ```json
  {
    "walletName": "string (optional)",
    "securityType": "seed_phrase" | "email_passkey",
    "email": "string (if email_passkey)",
    "passkey": "string (if email_passkey)"
  }
  ```
- **Response:**
  ```json
  {
    "walletId": "string",
    "walletAddress": "string",
    "seedPhrase": ["word1", "word2", ...] (only if seed_phrase),
    "createdAt": "ISO8601"
  }
  ```

### 2. Import Existing Wallet
- **POST** `/api/wallets/import`
- **Body:**
  ```json
  {
    "seedPhrase": ["word1", "word2", ...],
    "walletName": "string (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "walletId": "string",
    "walletAddress": "string",
    "importedAt": "ISO8601"
  }
  ```

### 3. Verify Seed Phrase Backup
- **POST** `/api/wallets/verify-seed`
- **Body:**
  ```json
  {
    "walletId": "string",
    "seedPhrase": ["word1", "word2", ...]
  }
  ```
- **Response:**
  ```json
  {
    "verified": true
  }
  ```

## Wallet Information

### 4. Get Wallet Details
- **GET** `/api/wallets/:walletId`
- **Response:**
  ```json
  {
    "walletId": "string",
    "walletAddress": "string",
    "walletName": "string",
    "totalBalance": "number (SOL)",
    "availableBalance": "number (SOL)",
    "securityType": "seed_phrase" | "email_passkey",
    "createdAt": "ISO8601"
  }
  ```

### 5. Get All User Wallets
- **GET** `/api/wallets`
- **Response:**
  ```json
  {
    "wallets": [
      {
        "walletId": "string",
        "walletAddress": "string",
        "walletName": "string",
        "totalBalance": "number",
        "type": "trading" | "royalty",
        "createdAt": "ISO8601"
      }
    ]
  }
  ```

### 6. Get Wallet Balance
- **GET** `/api/wallets/:walletId/balance`
- **Response:**
  ```json
  {
    "totalBalance": "number (SOL)",
    "availableBalance": "number (SOL)",
    "lockedBalance": "number (SOL)",
    "usdValue": "number"
  }
  ```

## Portfolio & Performance

### 7. Get Portfolio Performance
- **GET** `/api/wallets/:walletId/performance`
- **Query Params:** `?timeframe=1D|7D|30D|MAX`
- **Response:**
  ```json
  {
    "unrealizedPnl": "number (SOL)",
    "realizedPnl": "number (SOL)",
    "winRate": "number (0-100)",
    "totalTrades": "number",
    "timeframe": "1D|7D|30D|MAX",
    "pnlHistory": [
      {
        "date": "ISO8601",
        "value": "number"
      }
    ]
  }
  ```

### 8. Get Active Positions
- **GET** `/api/wallets/:walletId/positions/active`
- **Response:**
  ```json
  {
    "positions": [
      {
        "positionId": "string",
        "tokenMint": "string",
        "tokenSymbol": "string",
        "quantity": "number",
        "entryPrice": "number",
        "currentPrice": "number",
        "unrealizedPnl": "number (SOL)",
        "entryTime": "ISO8601"
      }
    ]
  }
  ```

### 9. Get Position Details
- **GET** `/api/positions/:positionId`
- **Response:**
  ```json
  {
    "positionId": "string",
    "tokenMint": "string",
    "tokenSymbol": "string",
    "quantity": "number",
    "entryPrice": "number",
    "currentPrice": "number",
    "unrealizedPnl": "number (SOL)",
    "realizedPnl": "number (SOL)",
    "avgHoldTime": "number (seconds)",
    "autoTradeEnabled": "boolean",
    "entryTime": "ISO8601",
    "lastUpdate": "ISO8601"
  }
  ```

### 10. Get Top 100 Holdings
- **GET** `/api/wallets/:walletId/positions/top100`
- **Response:**
  ```json
  {
    "holdings": [
      {
        "tokenMint": "string",
        "tokenSymbol": "string",
        "quantity": "number",
        "value": "number (SOL)",
        "rank": "number"
      }
    ]
  }
  ```

## Transactions & History

### 11. Get Transaction History
- **GET** `/api/wallets/:walletId/history`
- **Query Params:** `?type=all|trades|deposits|withdrawals|royalties&limit=50&offset=0`
- **Response:**
  ```json
  {
    "transactions": [
      {
        "transactionId": "string",
        "type": "trade" | "deposit" | "withdrawal" | "royalty",
        "tokenMint": "string (if applicable)",
        "tokenSymbol": "string (if applicable)",
        "amount": "number",
        "pnl": "number (if trade)",
        "fee": "number",
        "txHash": "string",
        "timestamp": "ISO8601"
      }
    ],
    "total": "number",
    "limit": "number",
    "offset": "number"
  }
  ```

## Deposits

### 12. Get Deposit Address
- **GET** `/api/wallets/:walletId/deposit/address`
- **Response:**
  ```json
  {
    "address": "string",
    "qrCode": "string (base64 encoded QR image)"
  }
  ```

### 13. Request Deposit Link (QR)
- **GET** `/api/wallets/:walletId/deposit/qr`
- **Response:**
  ```json
  {
    "qrCode": "string (base64 encoded QR image)",
    "solanaUri": "solana:address?amount=..."
  }
  ```

### 14. Check Deposit Status
- **GET** `/api/wallets/:walletId/deposit/status/:txHash`
- **Response:**
  ```json
  {
    "status": "pending" | "confirmed" | "failed",
    "confirmations": "number",
    "amount": "number"
  }
  ```

## Withdrawals

### 15. Initiate Withdrawal
- **POST** `/api/wallets/:walletId/withdraw`
- **Body:**
  ```json
  {
    "destinationAddress": "string",
    "amount": "number (SOL)",
    "networkFee": "number (SOL, optional)"
  }
  ```
- **Response:**
  ```json
  {
    "withdrawalId": "string",
    "txHash": "string",
    "status": "pending",
    "estimatedCompletion": "ISO8601"
  }
  ```

### 16. Get Withdrawal Status
- **GET** `/api/withdrawals/:withdrawalId`
- **Response:**
  ```json
  {
    "withdrawalId": "string",
    "status": "pending" | "processing" | "completed" | "failed",
    "txHash": "string",
    "amount": "number",
    "fee": "number",
    "destinationAddress": "string"
  }
  ```

## Royalty Wallet (Group Owners)

### 17. Get Royalty Wallet
- **GET** `/api/wallets/royalty`
- **Response:**
  ```json
  {
    "walletId": "string",
    "walletAddress": "string",
    "balance": "number (SOL)",
    "totalEarnings": "number (SOL)",
    "latestEarnings": [
      {
        "source": "string (group name)",
        "amount": "number (SOL)",
        "timestamp": "ISO8601"
      }
    ]
  }
  ```

### 18. Withdraw from Royalty Wallet
- **POST** `/api/wallets/royalty/withdraw`
- **Body:**
  ```json
  {
    "destinationType": "trading_wallet" | "external_wallet",
    "destinationAddress": "string (if external_wallet)",
    "amount": "number (SOL)"
  }
  ```
- **Response:**
  ```json
  {
    "withdrawalId": "string",
    "txHash": "string",
    "status": "pending"
  }
  ```

### 19. Configure Auto-Transfer
- **PUT** `/api/wallets/royalty/auto-transfer`
- **Body:**
  ```json
  {
    "enabled": "boolean",
    "frequency": "weekly" | "monthly",
    "destination": "trading_wallet" | "external_wallet",
    "destinationAddress": "string (if external_wallet)"
  }
  ```
- **Response:**
  ```json
  {
    "autoTransfer": {
      "enabled": "boolean",
      "frequency": "string",
      "nextTransfer": "ISO8601"
    }
  }
  ```

## Account Linking

### 20. Link Telegram Account
- **POST** `/api/accounts/link/telegram`
- **Body:**
  ```json
  {
    "telegramUserId": "string",
    "telegramUsername": "string",
    "authToken": "string"
  }
  ```
- **Response:**
  ```json
  {
    "linked": true,
    "groups": [
      {
        "groupId": "string",
        "groupName": "string",
        "role": "owner" | "member",
        "linkedAt": "ISO8601"
      }
    ]
  }
  ```

### 21. Link Discord Account
- **POST** `/api/accounts/link/discord`
- **Body:**
  ```json
  {
    "discordUserId": "string",
    "discordUsername": "string",
    "authToken": "string"
  }
  ```
- **Response:**
  ```json
  {
    "linked": true,
    "servers": [
      {
        "serverId": "string",
        "serverName": "string",
        "role": "owner" | "member",
        "linkedAt": "ISO8601"
      }
    ]
  }
  ```

### 22. Get Linked Accounts
- **GET** `/api/accounts/linked`
- **Response:**
  ```json
  {
    "telegram": {
      "linked": "boolean",
      "userId": "string",
      "username": "string",
      "groups": []
    },
    "discord": {
      "linked": "boolean",
      "userId": "string",
      "username": "string",
      "servers": []
    }
  }
  ```

### 23. Unlink Account
- **DELETE** `/api/accounts/link/:platform` (telegram|discord)
- **Response:**
  ```json
  {
    "unlinked": true
  }
  ```

## Auto-Trade Settings

### 24. Get Auto-Trade Settings
- **GET** `/api/wallets/:walletId/auto-trade/settings`
- **Response:**
  ```json
  {
    "enabled": "boolean",
    "allocatePercent": "number (0-100)",
    "maxTradeSize": "number (SOL)",
    "maxTradesPerDay": "number",
    "maxSlippage": "number (0-100)",
    "autoTakeProfit": "number (0-100)",
    "autoStopLoss": "number (0-100)",
    "updatedAt": "ISO8601"
  }
  ```

### 25. Update Auto-Trade Settings
- **PUT** `/api/wallets/:walletId/auto-trade/settings`
- **Body:**
  ```json
  {
    "enabled": "boolean",
    "allocatePercent": "number (0-100)",
    "maxTradeSize": "number (SOL)",
    "maxTradesPerDay": "number",
    "maxSlippage": "number (0-100)",
    "autoTakeProfit": "number (0-100)",
    "autoStopLoss": "number (0-100)"
  }
  ```
- **Response:**
  ```json
  {
    "settings": {
      "enabled": "boolean",
      "allocatePercent": "number",
      "maxTradeSize": "number",
      "maxTradesPerDay": "number",
      "maxSlippage": "number",
      "autoTakeProfit": "number",
      "autoStopLoss": "number",
      "updatedAt": "ISO8601"
    }
  }
  ```

## Position Management

### 26. Buy More (Add to Position)
- **POST** `/api/positions/:positionId/buy`
- **Body:**
  ```json
  {
    "amount": "number (SOL)",
    "slippage": "number (0-100, optional)"
  }
  ```
- **Response:**
  ```json
  {
    "transactionId": "string",
    "txHash": "string",
    "newQuantity": "number",
    "avgEntryPrice": "number"
  }
  ```

### 27. Sell Position
- **POST** `/api/positions/:positionId/sell`
- **Body:**
  ```json
  {
    "quantity": "number (optional, if not provided sells all)",
    "slippage": "number (0-100, optional)"
  }
  ```
- **Response:**
  ```json
  {
    "transactionId": "string",
    "txHash": "string",
    "realizedPnl": "number (SOL)",
    "quantitySold": "number"
  }
  ```

### 28. Set Take Profit / Stop Loss
- **PUT** `/api/positions/:positionId/tp-sl`
- **Body:**
  ```json
  {
    "takeProfit": "number (optional)",
    "stopLoss": "number (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "positionId": "string",
    "takeProfit": "number",
    "stopLoss": "number",
    "updatedAt": "ISO8601"
  }
  ```

## Wallet Management

### 29. Update Wallet Name
- **PUT** `/api/wallets/:walletId/name`
- **Body:**
  ```json
  {
    "walletName": "string"
  }
  ```
- **Response:**
  ```json
  {
    "walletId": "string",
    "walletName": "string",
    "updatedAt": "ISO8601"
  }
  ```

### 30. Delete Wallet
- **DELETE** `/api/wallets/:walletId`
- **Response:**
  ```json
  {
    "deleted": true
  }
  ```

## External Wallet Integration

### 31. Connect External Wallet (Phantom/Solflare)
- **POST** `/api/wallets/connect-external`
- **Body:**
  ```json
  {
    "walletType": "phantom" | "solflare",
    "publicKey": "string",
    "signature": "string"
  }
  ```
- **Response:**
  ```json
  {
    "connected": true,
    "walletAddress": "string",
    "linkedAt": "ISO8601"
  }
  ```

### 32. Get Connected External Wallets
- **GET** `/api/wallets/external`
- **Response:**
  ```json
  {
    "wallets": [
      {
        "walletType": "phantom" | "solflare",
        "publicKey": "string",
        "connectedAt": "ISO8601"
      }
    ]
  }
  ```

## Notes

- All endpoints require authentication (JWT token in Authorization header)
- All SOL amounts are in native SOL units (not lamports)
- All timestamps are in ISO8601 format
- Error responses follow standard format:
  ```json
  {
    "error": "string",
    "message": "string",
    "code": "string"
  }
  ```



