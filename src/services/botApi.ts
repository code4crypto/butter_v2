const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface InstallationStatus {
  verified: boolean;
  groupId?: string;
  groupName?: string;
  status?: 'pending' | 'verified' | 'active';
  installedAt?: string;
  verifiedAt?: string;
}

export interface TelegramGroup {
  id: string;
  title: string;
  type: 'group' | 'supergroup' | 'channel';
  memberCount?: number;
  isAdmin: boolean;
  isCreator: boolean;
}

export interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

/**
 * Get the Telegram bot invite link for a specific group
 */
export async function getInviteLink(groupId?: string): Promise<string> {
  try {
    if (groupId) {
      // Group-specific link (will be handled by backend later)
      return `https://t.me/buttercrawlbot?startgroup=true`;
    }
    return `https://t.me/buttercrawlbot?startgroup=true`;
    
    // When backend is ready:
    // const response = await fetch(`${API_BASE_URL}/api/bot/invite-link${groupId ? `?group_id=${groupId}` : ''}`);
    // const data = await response.json();
    // return data.inviteLink;
  } catch (error) {
    console.error('Error getting invite link:', error);
    return `https://t.me/buttercrawlbot?startgroup=true`;
  }
}

/**
 * Get user's Telegram groups (where they are admin/creator)
 * Requires user to be authenticated via Telegram Login Widget
 */
export async function getUserGroups(telegramAuthData: any): Promise<TelegramGroup[]> {
  try {
    // When backend is ready:
    // const response = await fetch(`${API_BASE_URL}/api/bot/user-groups`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(telegramAuthData)
    // });
    // if (!response.ok) throw new Error('Failed to fetch groups');
    // return await response.json();

    // For now, return empty - will be populated by backend
    return [];
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return [];
  }
}

/**
 * Check installation status for a group
 */
export async function checkInstallationStatus(groupId?: string): Promise<InstallationStatus | null> {
  try {
    if (!groupId) {
      return null;
    }
    
    // When backend is ready:
    // const response = await fetch(`${API_BASE_URL}/api/bot/installation-status/${groupId}`);
    // if (!response.ok) return null;
    // return await response.json();
    
    return null;
  } catch (error) {
    console.error('Error checking installation status:', error);
    return null;
  }
}

/**
 * Poll installation status
 */
export async function pollInstallationStatus(groupId: string): Promise<InstallationStatus | null> {
  try {
    return await checkInstallationStatus(groupId);
  } catch (error) {
    console.error('Error polling installation status:', error);
    return null;
  }
}
