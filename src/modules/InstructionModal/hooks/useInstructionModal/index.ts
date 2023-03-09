import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { LocalStorage } from '@/utils/localStorage';
import { useEffect, useState } from 'react';

export const useInstructionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOk = () => closeModal();
  const handleCancel = () => closeModal();

  const closeModal = () => {
    setIsOpen(false);
    LocalStorage.set(LOCAL_STORAGE_ITEMS.SHOW_INSTRUCTIONS_MODAL, true);
  };

  useEffect(() => {
    const isShowed = LocalStorage.get(LOCAL_STORAGE_ITEMS.SHOW_INSTRUCTIONS_MODAL);

    if (!isShowed) {
      setIsOpen(true);
    }
  }, []);

  return {
    isOpen,
    handleOk,
    handleCancel,
  };
};
