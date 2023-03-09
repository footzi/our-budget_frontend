import { INSTRUCTION_VIDEO_LINK } from '@/constants';
import { Button, Modal } from 'antd';
import React from 'react';

import { useInstructionModal } from './hooks/useInstructionModal';
import './index.less';

const InstructionModal = () => {
  const { isOpen, handleOk, handleCancel } = useInstructionModal();

  return (
    <Modal
      className="instruction-modal"
      title="Как пользоваться Money Hamster"
      open={isOpen}
      onOk={handleOk}
      footer={
        <Button type="primary" onClick={handleCancel}>
          Закрыть
        </Button>
      }
      onCancel={handleCancel}>
      <div className="instruction-modal__container">
        <iframe
          className="instruction-modal__video"
          src={INSTRUCTION_VIDEO_LINK}
          title="Как пользоваться Money Hamster"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
    </Modal>
  );
};

export default InstructionModal;
