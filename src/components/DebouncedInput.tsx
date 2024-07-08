import React, { useEffect } from 'react'

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  props: any;
}

const DebouncedInput = ({ value: initValue, onChange, debounce = 200, ...props }: DebouncedInputProps) => {
  const [value, setValue] = React.useState(initValue)
  useEffect(() => {
    setValue(initValue)
  }, [initValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);


  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  )
}

export default DebouncedInput