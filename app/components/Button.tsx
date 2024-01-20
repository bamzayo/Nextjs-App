"use client";
import React from "react";

type ButtonProps = {
  loading: boolean;
  disabled: boolean;
  title: string;
  type: "warning" | "active";
  handleClick?(event: React.MouseEvent<HTMLButtonElement>): void;
};

const Button = ({
  loading,
  title,
  type,
  disabled,
  handleClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`btn btn-wide ${
        type === "warning" ? "btn-warning" : "btn-active"
      } btn-neutral `}
    >
      {loading ? <span className="loading loading-spinner"></span> : <></>}{" "}
      {title}
    </button>
  );
};

export default Button;
