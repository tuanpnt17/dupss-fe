import { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import Label from './Label';
import { CalenderIcon } from '../../icons';
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: (dates: Date[]) => void;
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const options: flatpickr.Options.Options = {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      locale: Vietnamese,
      dateFormat: mode === "time" ? "H:i" : "Y-m-d",
      defaultDate,
      onChange: (selectedDates) => {
        if (onChange) onChange(selectedDates);
      },
    };
    if (mode === "time") {
      options.enableTime = true;
      options.noCalendar = true;
      options.time_24hr = true;
      options.minTime = "08:00";
      options.maxTime = "17:00";
    }
    const flatPickr = flatpickr(inputRef.current, options);

    return () => {
      flatPickr.destroy();
    };
  }, [mode, onChange, defaultDate]);

  // Controlled value for input
  useEffect(() => {
    if (inputRef.current && defaultDate) {
      if (typeof defaultDate === 'string') {
        inputRef.current.value = defaultDate;
      } else if (defaultDate instanceof Date) {
        inputRef.current.value = defaultDate.toISOString().slice(0, 10);
      } else if (Array.isArray(defaultDate) && defaultDate[0] instanceof Date) {
        inputRef.current.value = defaultDate[0].toISOString().slice(0, 10);
      }
    }
  }, [defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
          autoComplete="off"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
