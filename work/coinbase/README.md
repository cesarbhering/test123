# Coinbase Clone

A simplified Coinbase clone built with Next.js and localStorage.

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Usage

Application runs at: http://localhost:3000

The database is automatically initialized with seed data on first load using localStorage.

## Test Login

**Email:** `test@coinbase.com`
**Password:** `password123`

## Routes

- `/` - Landing page
- `/signin` - Sign in page
- `/home` - Dashboard (after login)

## Storage

Data is stored in browser localStorage using a custom storage abstraction layer at `src/lib/storage.ts`.

To reset data, clear your browser's localStorage or use:
```javascript
// In browser console
localStorage.clear()
```
## Notifications

NotificationContext `src/app/context/NotificationContext.tsx`
  - Stores notifications in localStorage for persistence
  - Notification types: `info`, `success`, `warning`, `error`, `price_alert`, `transaction`
  - Each notification has: `id`, `type`, `title`, `message`, `timestamp`, `read`, `optional icon`, `actionUrl`, `metadata`
  - Functions available via `useNotifications()` hook:
    - `addNotification()` - add a new notification
    - `markAsRead(id)` - mark single notification as read
    - `markAllAsRead()` - mark all as read
    - `removeNotification(id)` - delete a notification
    - `clearAllNotifications()` - clear all
    - `notifications` - array of all notifications
    - `unreadCount` - count of unread notifications

### Notification Testing: Browser Console

```javascript
  // Show help
  notify.help()

  // Add notifications by type
  notify.info('Welcome!', 'Thanks for using Coinbase')
  notify.success('Purchase Complete', 'You bought 0.5 BTC')
  notify.warning('Low Balance', 'Your account balance is below $10')
  notify.error('Transaction Failed', 'Unable to process your request')
  notify.priceAlert('BTC Price Alert', 'Bitcoin just hit $100,000!')
  notify.transaction('Received ETH', 'You received 1.5 ETH from 0x1234...')

  // Generic add with type
  notify.add('info', 'Title', 'Message')

  // Clear all notifications
  notify.clear()
  ```
  