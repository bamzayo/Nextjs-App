"use client";
import React from "react";

type TextInputProps = {
  required: boolean;
  disabled?: boolean;
  title: string;
  form: any;
  id: string;
  type: "text" | "password" | "number";
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  required,
  title,
  form,
  handleChange,
  id,
  disabled,
  type,
}: TextInputProps) => {
  const onChange = handleChange
    ? handleChange
    : (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldValue(
          id,
          type === "number" ? Number(e.target.value) : e.target.value
        );
      };
  return (
    <label className="form-control w-full mb-2 max-w-xs">
      <div className="label">
        <span className="label-text text-base ">{title}</span>
      </div>
      <input
        disabled={disabled}
        type={type}
        onChange={onChange}
        value={form.values[id]}
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
      <div className="label">
        {required && form.errors[id] ? (
          <span className="label-text-alt text-red-500">{form.errors[id]}</span>
        ) : (
          <></>
        )}
      </div>
    </label>
  );
};

export default TextInput;
