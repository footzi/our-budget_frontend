import { LocalStorageItems } from '@/constants';

export class LocalStorage {
  static set<T>(key: LocalStorageItems, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      throw new Error('Ошибка при установке в LocalStorage');
    }
  }

  static get<T>(key: LocalStorageItems): T {
    try {
      const value = window.localStorage.getItem(key);

      return value ? JSON.parse(value) : null;
    } catch {
      throw new Error('Ошибка при чтении из LocalStorage');
    }
  }

  static remove(key: LocalStorageItems): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      throw new Error('Ошибка при удалении из LocalStorage');
    }
  }
}
