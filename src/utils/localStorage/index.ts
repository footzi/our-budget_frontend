import { LOCAL_STORAGE_ITEMS } from '@/constants';

export class LocalStorage {
  static set<T>(key: LOCAL_STORAGE_ITEMS, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      throw new Error('Ошибка при установке в LocalStorage');
    }
  }

  static get<T>(key: LOCAL_STORAGE_ITEMS): T {
    try {
      const value = window.localStorage.getItem(key);

      return value ? JSON.parse(value) : null;
    } catch {
      throw new Error('Ошибка при чтении из LocalStorage');
    }
  }

  static remove(key: LOCAL_STORAGE_ITEMS): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      throw new Error('Ошибка при удалении из LocalStorage');
    }
  }
}
