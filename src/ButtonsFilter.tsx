import {Button} from "@mui/material";
import React, {memo} from "react";

type variantType = "text" | "outlined" | "contained"
type colorType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
type ButtonPropsType = {
    title: string
    colorB: colorType
    variant: variantType
    callback: () => void
}


export const ButtonsFilter: React.FC<ButtonPropsType> = memo((
    {
        variant,
        callback,
        colorB,
        title
    }) => {

    return <Button variant={variant}
                   onClick={callback}
                   color={colorB}
    >{title} </Button>
})