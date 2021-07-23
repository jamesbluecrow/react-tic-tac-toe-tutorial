import React from "react";

export type Props = {
  value: string;
  onClick(): void;
};

export const Square = (props: Props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
