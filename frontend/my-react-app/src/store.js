import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  deliveryService: null,
  company: null,
  setDeliveryService: (to) =>
    set(() => ({
      deliveryService: to,
    })),
  setCompany: (to) => set(() => ({ company: to })),
}));
