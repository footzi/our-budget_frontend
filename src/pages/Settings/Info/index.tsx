import { Section } from '@/components/Section';
import { EMAIL, INSTRUCTION_VIDEO_LINK } from '@/constants';
import { Typography } from 'antd';
import React from 'react';

export const Info = () => {
  return (
    <Section className="profile__info">
      <Typography.Text>
        По всем вопросам и предложениям: <Typography.Link href={`mailto:${EMAIL}`}>{EMAIL}</Typography.Link>
      </Typography.Text>

      <div className="profile__instruction-link">
        <Typography.Link target="_blank" href={INSTRUCTION_VIDEO_LINK}>
          Как пользоваться Money Hamster?
        </Typography.Link>
      </div>
    </Section>
  );
};
