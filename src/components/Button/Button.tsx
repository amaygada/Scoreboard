import { forwardRef } from "react";

import { Spinner } from "../Spinner/Spinner";
import type { ButtonProps } from "./buttonTypes";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      //icons before button text
      leftIcon,
      //icons after button text
      rightIcon,
      // rounded = 'xl',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-offset-2 transform active:scale-95 disabled:transform-none";

    const variants = {
      primary:
        "bg-primary/95 hover:bg-primary text-background group-hover:opacity-90 focus:ring-primary/50 shadow-md cursor-pointer",
      success:
        "bg-accent/95 hover:bg-accent text-background group-hover:opacity-90 focus:ring-accent/50 shadow-md cursor-pointer",
      secondary:
        "bg-text/95 hover:bg-text text-plain group-hover:bg-background/70 focus:ring-text/50 cursor-pointer",
      outline:
        "bg-transparent border-2 border-text text-text group-hover:bg-background focus:ring-text/40 cursor-pointer",
      ghost:
        "bg-transparent text-text group-hover:bg-background focus:ring-text/30 cursor-pointer",
      link: " bg-transparent text-highlight group-hover:bg-background focus:ring-highlight/30 cursor-pointer",
      danger:
        "bg-alert/80 hover:bg-alert text-background group-hover:bg-alert focus:ring-alert/50 shadow-md cursor-pointer",
      accentlite:
        "bg-accent/10 text-accent hover:bg-accent/20 transition cursor-pointer",
      primarylite:
        "bg-primary/10 text-primary hover:bg-primary/20 transition cursor-pointer",
      dangerlite:
        "bg-alert/10 text-alert hover:bg-alert/20 transition cursor-pointer",
      secondarylite:
        "bg-text/10 text-text hover:bg-text/20 transition cursor-pointer",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-sm px-6 py-3",
      lg: "text-base px-8 py-4",
    };

    const variantStyle = variants[variant];
    const sizeStyle = variant === "link" ? "" : sizes[size];

    return (
      <button
        ref={ref}
        className={`
        group
        ${disabled || isLoading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
        ${baseStyles}
        ${variantStyle}
        ${sizeStyle}    
        
       `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
