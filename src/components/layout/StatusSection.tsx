import React from 'react';
import { Numbers } from '../Numbers';


type StatusSectionProps = {
  onClickNumber: (number: string) => void,
};

export const StatusSection = (props: StatusSectionProps) => {
  return (
    <section className="status">
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
    </section>
  )
}
