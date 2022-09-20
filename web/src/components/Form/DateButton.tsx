import { HTMLAttributes } from "react";

interface DateButtonProps extends HTMLAttributes<HTMLButtonElement>{
  day: string;
};

export function DateButton({ day, ...rest }: DateButtonProps) {
  return (
    <button className="w-8 h-8 rounded bg-zinc-9000" {...rest}>{day}</button>
  );
};