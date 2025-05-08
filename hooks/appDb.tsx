'use client'
import { useEffect } from "react";
import { Note } from "@/context/noteContext";

// Define types for the state object
interface AppState {
  id: string;
  userId?: string;
  textInput?: Note;
  colorTheme?: string;
  theme?: string;
  fontTheme?: string;
  fontType?: string;
  selectedTag?: string;
  navId?: number;
  selectedSetting?: number;
  timestamp?: number;
  [key: string]: any; 
}

// Define types for event targets
interface IDBEventTarget extends EventTarget {
  result: IDBDatabase | IDBObjectStore | any;
  error?: Error;
}

interface IDBEvent extends Event {
  target: IDBEventTarget | null;
}

// IndexedDB utility for state persistence
export class AppStateManager {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null;

  constructor(dbName = 'noteAppDB', storeName = 'appState') {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
  }

  // Initialize the database
  async init(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const target = event.target as IDBEventTarget;
        const db = target.result as IDBDatabase;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' });
        }
      };
      
      request.onsuccess = (event: Event) => {
        const target = event.target as IDBEventTarget;
        this.db = target.result as IDBDatabase;
        resolve(this.db);
      };
      
      request.onerror = (event: Event) => {
        const target = event.target as IDBEventTarget;
        console.error(`Database error: ${target.error}`);
        reject(`Database error: ${target.error}`);
      };
    });
  }

  // Save state to IndexedDB
  async saveState(stateObj: Partial<AppState>): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const state: AppState = {
        id: 'appState',
        ...stateObj,
        timestamp: new Date().getTime()
      };
      
      const request = store.put(state);
      
      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => {
        const target = event.target as IDBEventTarget;
        console.error(`Error saving state: ${target.error}`);
        reject(`Error saving state: ${target.error}`);
      };
    });
  }
  async loadState(): Promise<AppState> {
    if (!this.db) await this.init();
    
    return new Promise<AppState>((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const request = store.get('appState');
      
      request.onsuccess = (event: Event) => {
        const target = event.target as IDBEventTarget;
        resolve(target.result as AppState || { id: 'appState' });
      };
      
      request.onerror = (event: Event) => {
        const target = event.target as IDBEventTarget;
        console.error(`Error loading state: ${target.error}`);
        reject(`Error loading state: ${target.error}`);
      };
    });
  }
}

// Define type for state setters
interface StateSetters {
  [key: string]: (value: any) => void;
}

// Custom hook for using IndexedDB state
export function useIndexedDBState(): AppStateManager {
  const stateManager = new AppStateManager();
  
  // Initialize the IndexedDB when the component mounts
  useEffect(() => {
    stateManager.init().catch(error => {
      console.error('Failed to initialize IndexedDB:', error);
    });
    
    return () => {
      // Clean up if needed
    };
  }, []);
  
  return stateManager;
}

// Example usage within your Page component
export function useAppPersistence(initialState: Partial<AppState>, setters: StateSetters) {
  const stateManager = useIndexedDBState();
  
  
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedState = await stateManager.loadState();
        
        // Apply saved state to state variables
        if (savedState) {
          Object.entries(savedState).forEach(([key, value]) => {
            // Skip timestamp and id properties
            if (key !== 'timestamp' && key !== 'id') {
              if (setters[key]) {
                setters[key](value);
              }
            }
          });
        }
      } catch (error) {
        console.error('Failed to load state from IndexedDB:', error);
      }
    };
    
    loadSavedState();
  }, []);
  
  // Save state whenever it changes
  const saveState = async (stateToSave: Partial<AppState>): Promise<void> => {
    try {
      await stateManager.saveState(stateToSave);
    } catch (error) {
      console.error('Failed to save state to IndexedDB:', error);
    }
  };
  
  return { saveState };
}