import React from 'react';
import { Link } from 'react-router-dom';
import '../../../App.css';

type ButtonProps = {
  to?: string,
  exact?: string,
  danger?: boolean,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void,
  disabled?: boolean,
  className?: string,
  children: string
}

const Button = (props: ButtonProps) => {
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button ${props.danger && 'button--danger'}`}
      />
    );
  }

  return (
    <button
      className={`button ${props.danger && 'button--danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}>
        {props.children}
    </button>
  );
}

export default Button
