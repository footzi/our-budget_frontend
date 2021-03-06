import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { CATEGORIES_TYPES, CATEGORIES_TYPES_LIST } from '@/constants';
import { getModalTitle } from '@/pages/Categories/Modal/utils/getModalTitle';
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Select, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { CategoryModalProps } from './interfaces';

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isShow,
  editedCategory,
  type,
  onAdd,
  onUpdate,
  onCancel,
  onDelete,
  isLoading,
  isLoadingDelete,
}) => {
  const [form] = useForm();

  const [isValidForm, setIsValidForm] = useState(false);

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = (form: { name: string; type: CATEGORIES_TYPES; period: [Dayjs, Dayjs] }) => {
    const { name, type: updatedType, period } = form;

    if (isLoading) {
      return;
    }

    if (editedCategory?.id) {
      onUpdate({ name, type: updatedType, period, id: editedCategory.id });
    } else {
      onAdd({ name, type, period });
    }
  };

  const handleClickDelete = async () => {
    if (editedCategory?.id) {
      await onDelete(editedCategory.id);
      onCancel();
    }
  };

  const formValidator = useCallback((name: string, isCustomPeriod: boolean, period?: Dayjs[]): boolean => {
    return (isCustomPeriod ? (period ? period.length > 0 : false) : true) && Boolean(name);
  }, []);

  useEffect(() => {
    if (editedCategory) {
      const { name, type, startDate, endDate } = editedCategory;
      const isCustomPeriod = Boolean(startDate);
      const period = isCustomPeriod ? [dayjs(startDate), dayjs(endDate)] : [];

      form.setFieldsValue({
        name,
        type,
        period,
        isCustomPeriod,
      });

      const isValidForm = formValidator(name, isCustomPeriod, period);
      setIsValidForm(isValidForm);
    }
  }, [editedCategory, form, formValidator]);

  useEffect(() => {
    if (!editedCategory && isShow) {
      form.setFieldsValue({
        type: CATEGORIES_TYPES.EXPENSE,
      });
    }
  }, [isShow, form, editedCategory]);

  const title = getModalTitle(editedCategory, type);

  return (
    <Modal
      visible={isShow}
      onOk={handleOk}
      okButtonProps={{ loading: isLoading, disabled: !isValidForm }}
      onCancel={onCancel}
      title={title}
      okText="??????????????????"
      cancelText="??????????????"
      destroyOnClose>
      <Form layout="vertical" form={form} onFinish={handleSubmit} preserve={false}>
        <Form.Item label="????????????????" name="name" rules={[{ required: true, message: '?????????????? ????????????????' }]}>
          <Input />
        </Form.Item>

        {editedCategory && (
          <Form.Item label="??????" name="type" rules={[{ required: true, message: '???????????????? ??????' }]}>
            <Select>
              {CATEGORIES_TYPES_LIST.map((item) => (
                <Select.Option value={item.type} key={item.type}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item label="?????????????????? ??????????????????" name="isCustomPeriod" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item dependencies={['isCustomPeriod']} noStyle>
          {({ getFieldValue }) => {
            const value = getFieldValue('isCustomPeriod');

            return (
              value && (
                <Form.Item label="????????????" name="period" rules={[{ required: true, message: '???????????????? ????????' }]}>
                  <DatePicker.RangePicker picker="month" format="MM.YYYY" allowClear={false} />
                </Form.Item>
              )
            );
          }}
        </Form.Item>

        <Form.Item hidden dependencies={['name', 'isCustomPeriod', 'period']}>
          {({ getFieldsValue }) => {
            const values = getFieldsValue();
            const { name, isCustomPeriod, period } = values;

            return (
              <SubmitHiddenButton
                onValid={setIsValidForm}
                validator={() => formValidator(name, isCustomPeriod, period)}
              />
            );
          }}
        </Form.Item>

        {editedCategory && (
          <Form.Item>
            <Popconfirm
              okText="????"
              cancelText="????????????"
              title="???? ??????????????, ?????? ???????????? ?????????????? ???????????????????"
              onConfirm={handleClickDelete}>
              <Button danger loading={isLoadingDelete}>
                ??????????????
              </Button>
            </Popconfirm>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
