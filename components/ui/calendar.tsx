'use client';

import * as React from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ showOutsideDays = true, ...props }: CalendarProps) {
  return <DayPicker className="px-4 py-2" showOutsideDays={showOutsideDays} {...props} />;
}
Calendar.displayName = 'Calendar';

export { Calendar };
