import React, { useState } from 'react';
import styles from './input.module.scss'

interface Props {
  placeholder?: string;
  type: string;
  mode: 'white' | 'black';
  state: 'neutral' | 'disabled' | 'success' | 'warning' | 'error';
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?:boolean
}

export default function Input(props: Props) {
  const { mode, state, type, placeholder, onchange, disabled } = props;
  const inputClassName = `${styles.input} ${styles[mode]} ${styles[state]}`;

  return (
    <div>
    <input
    onChange={props.onchange}
      type={type}
      placeholder={placeholder}
      className={inputClassName}
      disabled={disabled}
    />
    </div>
  );
}