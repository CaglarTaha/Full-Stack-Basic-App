import { Card as AntdCard, CardProps } from "antd";
import { ReactNode } from "react";

import "./style.css";

type Props = { children: ReactNode } & CardProps;

const CardNew = ({ children, ...others }: Props) => {
  return (
    <AntdCard className="card" {...others}>
      {children}
    </AntdCard>
  );
};

export default CardNew;