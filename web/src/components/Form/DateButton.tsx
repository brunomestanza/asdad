import { HTMLAttributes } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface DateButtonProps extends HTMLAttributes<HTMLButtonElement>{
  day: string;
  indexValue: string;
  weekDays: string[];
};

export function DateButton({ day, indexValue, weekDays, ...rest }: DateButtonProps) {
  return (
    <ToggleGroup.Item value={indexValue} className={`w-8 h-8 rounded ${weekDays.includes(indexValue) ? 'bg-violet-500' : 'bg-zinc-900'}`} {...rest}>{day}</ToggleGroup.Item>
  );
};