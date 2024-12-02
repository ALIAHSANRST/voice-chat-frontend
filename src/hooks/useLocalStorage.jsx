'use client';

import { useState, useEffect } from 'react';

/**
 * A custom React hook that provides persistent storage functionality using localStorage with error handling,
 * cross-tab synchronization, and advanced features.
 * 
 * @param {string} key - The key under which the value will be stored in localStorage
 * @param {*} initialValue - The initial value to use if no value exists in localStorage
 * @param {Object} options - Optional configuration object
 * @param {boolean} options.serialize - Whether to serialize/deserialize values (default: true)
 * @param {boolean} options.syncTabs - Whether to sync across tabs (default: true) 
 * @param {Function} options.onError - Custom error handler function
 * @param {Function} options.transform - Transform function applied before storing
 * @param {number} options.ttl - Time-to-live in milliseconds for stored values
 * 
 * @returns {[
 *   *, 
 *   (value: * | ((prevValue: *) => *)) => void,
 *   () => void,
 *   () => boolean,
 *   {
 *     getTimestamp: () => number,
 *     getRawValue: () => string,
 *     setWithTTL: (value: *, ttl: number) => void,
 *     isExpired: () => boolean,
 *     subscribe: (callback: Function) => Function
 *   }
 * ]} A tuple containing:
 * - The current stored value
 * - A function to update the stored value
 * - A function to clear the stored value
 * - A function to check if the value exists in storage
 * - An object with additional utility functions
 * 
 * @throws {Error} If the key parameter is invalid
 * 
 * @example
 * ```jsx
 * const [user, setUser, clearUser, hasUser, utils] = useLocalStorage('user', null, {
 *   ttl: 24 * 60 * 60 * 1000, // 24 hours
 *   transform: value => ({ ...value, lastModified: Date.now() }),
 *   onError: error => console.log('Storage error:', error)
 * });
 * 
 * // to set value with custom TTL
 * utils.setWithTTL(newUser, 60 * 60 * 1000); // 1 hour TTL
 * 
 * // to subscribe to changes
 * const unsubscribe = utils.subscribe(newValue => {
 *   console.log('Value changed:', newValue);
 * });
 * ```
 */
const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serialize = true,
    syncTabs = true,
    onError = console.error,
    transform = (v) => v,
    ttl = null
  } = options;

  // input validation
  if (!key || typeof key !== 'string') {
    throw new Error('[useLocalStorage] Storage key must be a non-empty string');
  }

  const subscribers = new Set();

  const getStorageValue = () => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      if (item === 'undefined' || item === 'null' || !item) {
        return initialValue;
      }

      const parsed = serialize ? JSON.parse(item) : item;

      if (parsed?._timestamp && parsed?._ttl) {
        if (Date.now() - parsed._timestamp > parsed._ttl) {
          window.localStorage.removeItem(key);
          return initialValue;
        }
        return parsed.value;
      }

      return parsed;
    } catch (error) {
      onError(`[useLocalStorage] Error reading from localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStorageValue);

  const notifySubscribers = (value) => {
    subscribers.forEach(callback => callback(value));
  };

  const setValue = (value) => {
    if (typeof window === 'undefined') {
      onError(`[useLocalStorage] Cannot set value: window is undefined`);
      return;
    }

    try {
      const valueToStore = transform(value instanceof Function ? value(storedValue) : value);
      setStoredValue(valueToStore);

      const storageValue = serialize ? JSON.stringify(valueToStore) : valueToStore;

      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, storageValue);
      }

      if (syncTabs) {
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: storageValue,
          storageArea: localStorage
        }));
      }

      notifySubscribers(valueToStore);
    } catch (error) {
      onError(`[useLocalStorage] Error setting localStorage key "${key}":`, error);
      throw new Error(`Failed to set localStorage value: ${error.message}`);
    }
  };

  const clearValue = () => {
    if (typeof window === 'undefined') {
      onError(`[useLocalStorage] Cannot clear value: window is undefined`);
      return;
    }

    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);

      if (syncTabs) {
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: null,
          storageArea: localStorage
        }));
      }

      notifySubscribers(initialValue);
    } catch (error) {
      onError(`[useLocalStorage] Error clearing localStorage key "${key}":`, error);
      throw new Error(`Failed to clear localStorage value: ${error.message}`);
    }
  };

  const existsInStorage = () => {
    if (typeof window === 'undefined') return false;

    try {
      const item = window.localStorage.getItem(key);
      return item !== null && item !== 'undefined';
    } catch (error) {
      onError(`[useLocalStorage] Error checking localStorage key "${key}":`, error);
      return false;
    }
  };

  const utils = {
    getTimestamp: () => {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item)?._timestamp : null;
    },
    getRawValue: () => window.localStorage.getItem(key),
    setWithTTL: (value, customTTL) => {
      const valueWithMeta = {
        value: transform(value),
        _timestamp: Date.now(),
        _ttl: customTTL || ttl
      };
      setStoredValue(valueWithMeta.value);
      window.localStorage.setItem(key, JSON.stringify(valueWithMeta));
      notifySubscribers(valueWithMeta.value);
    },
    isExpired: () => {
      const item = window.localStorage.getItem(key);
      if (!item) return true;
      const { _timestamp, _ttl } = JSON.parse(item);
      return _ttl && Date.now() - _timestamp > _ttl;
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }
  };

  useEffect(() => {
    if (!syncTabs || typeof window === 'undefined') return;

    const handleStorageChange = (event) => {
      if (event.key === key && event.storageArea === window.localStorage) {
        try {
          const newValue = event.newValue ?
            (serialize ? JSON.parse(event.newValue) : event.newValue) :
            initialValue;
          setStoredValue(newValue);
          notifySubscribers(newValue);
        } catch (error) {
          onError(`[useLocalStorage] Error handling storage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, serialize, syncTabs]);

  return [storedValue, setValue, clearValue, existsInStorage, utils];
};

export default useLocalStorage;