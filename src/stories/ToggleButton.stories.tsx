import React from "react";
import "./button.css";

interface ToggleButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  label: string;
  onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */

export const ToogleButton = ({
  primary = false,
  backgroundColor,
  label,
  ...props
}: ToggleButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--`, mode].join(" ")}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
