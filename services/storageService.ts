import { get, set, del, keys, entries, clear } from 'idb-keyval';

interface StorageMetadata {
  timestamp: number;
  size?: number;
  isPersistent?: boolean;
}

interface WrappedValue<T> {
  data: T;
  metadata: StorageMetadata;
}

const QUOTA_THRESHOLD = 0.85; // 85% of total quota
const MIN_EVICTION_COUNT = 5;

/**
 * Enhanced storage service with LRU eviction and quota management
 */
export const storageService = {
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const wrapped = await get<WrappedValue<T>>(key);
      if (wrapped && wrapped.metadata) {
        // Update timestamp for LRU
        const updated = {
          ...wrapped,
          metadata: { ...wrapped.metadata, timestamp: Date.now() }
        };
        // Background update of timestamp, don't wait for it
        set(key, updated).catch(console.error);
        return wrapped.data;
      }
      return wrapped as T; // Fallback for old data without metadata
    } catch (err) {
      console.error(`Storage get error for key ${key}:`, err);
      return undefined;
    }
  },

  async set<T>(key: string, value: T, isPersistent: boolean = false): Promise<void> {
    try {
      await this.verifyQuota();
      const wrapped: WrappedValue<T> = {
        data: value,
        metadata: { 
          timestamp: Date.now(),
          isPersistent 
        }
      };
      await set(key, wrapped);
    } catch (error: any) {
      if (error?.name === 'QuotaExceededError' || error?.message?.includes('NO_SPACE')) {
        console.warn('Storage quota exceeded, clearing space...');
        await this.evict(10); // Evict 10 oldest items
        try {
          // Retry once
          const wrapped: WrappedValue<T> = {
            data: value,
            metadata: { timestamp: Date.now() }
          };
          await set(key, wrapped);
        } catch (retryError) {
          console.error('Failed to set even after eviction:', retryError);
        }
      } else {
        throw error;
      }
    }
  },

  async verifyQuota(): Promise<void> {
    if (navigator.storage && navigator.storage.estimate) {
      const { usage, quota } = await navigator.storage.estimate();
      if (usage !== undefined && quota !== undefined) {
        if (usage > quota * QUOTA_THRESHOLD) {
          console.warn(`Storage usage (${Math.round(usage / 1024 / 1024)}MB) is over ${QUOTA_THRESHOLD * 100}% of quota (${Math.round(quota / 1024 / 1024)}MB). Evicting...`);
          await this.evict(MIN_EVICTION_COUNT);
        }
      }
    }
  },

  async evict(count: number = 5): Promise<void> {
    try {
      const allEntries = await entries();
      if (allEntries.length === 0) return;

      // Filter out persistent items and sort by timestamp
      const sorted = allEntries
        .filter(([_, value]) => !(value as any)?.metadata?.isPersistent)
        .map(([key, value]) => {
          const timestamp = (value as any)?.metadata?.timestamp || 0;
          return { key, timestamp };
        })
        .sort((a, b) => a.timestamp - b.timestamp);

      const toDelete = sorted.slice(0, count);
      console.log(`Evicting ${toDelete.length} oldest items from storage.`);
      
      for (const item of toDelete) {
        await del(item.key);
      }
    } catch (err) {
      console.error('Eviction error:', err);
    }
  },

  async del(key: string): Promise<void> {
    return del(key);
  },

  async clear(): Promise<void> {
    return clear();
  },

  isOnline(): boolean {
    return navigator.onLine;
  },

  async isDownloaded(key: string): Promise<boolean> {
    const wrapped = await get<WrappedValue<any>>(key);
    return !!(wrapped && wrapped.metadata?.isPersistent);
  }
};
