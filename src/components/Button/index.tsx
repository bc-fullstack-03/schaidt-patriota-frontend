import { Slot } from "@radix-ui/react-slot"
import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    asChild?: boolean;
    children: ReactNode;
    className?: string;
}

function Button({ asChild, children, className , ...props}: ButtonProps){
    const Comp =  asChild ? Slot : "button";
    return(
        <Comp 
            className={clsx(
                "py-3 px-4 bg-cyan-500 rounded font-semibold text-black text-sm e-full transition-colors hover:bg-cyan-300", 
                className
            )}
            {...props}
        >{children}</Comp>
    )
}

export default Button;