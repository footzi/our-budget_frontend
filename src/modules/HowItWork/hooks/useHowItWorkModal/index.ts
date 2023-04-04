import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { SHOW_HOW_IT_WORK_MODAL_DELAY } from '@/modules/HowItWork/constants';
import { LocalStorage } from '@/utils/localStorage';
import { useEffect, useState } from 'react';

export const useHowItWorkModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    LocalStorage.set(LOCAL_STORAGE_ITEMS.SHOW_HOW_IT_WORK_MODAL, true);
  };

  const openModal = () => setIsOpen(true);

  useEffect(() => {
    const isShowed = LocalStorage.get(LOCAL_STORAGE_ITEMS.SHOW_HOW_IT_WORK_MODAL);

    if (!isShowed) {
      setTimeout(() => {
        setIsOpen(true);
      }, SHOW_HOW_IT_WORK_MODAL_DELAY);
    }
  }, []);

  return {
    isOpen,
    openModal,
    // handleOk,
    closeModal,
  };
};
