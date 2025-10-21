import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.alert
Object.defineProperty(window, 'alert', {
  writable: true,
  configurable: true,
  value: vi.fn(),
});
