import { Alert } from "@mui/material"
import { Snackbar } from "@mui/material"
import { FC } from "react"

interface SnackProps{
  isOpen:boolean;
  closeHandler: ()=>void
}
const AddedSnack:FC<SnackProps> = ({isOpen, closeHandler}) => {
    return (
        <Snackbar
            open={isOpen}
            onClose={closeHandler}
            autoHideDuration={1500}
            anchorOrigin={{ vertical:"bottom", horizontal:"right" }}
            key={"bottom right"}
        >
            <Alert
                severity="success"
            >Товар добавлен в корзину!</Alert>
        </Snackbar>
    )
}

export default AddedSnack