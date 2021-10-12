import { FC } from 'react'
import { Order } from '../../api/models/Order'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

interface OrderComponentProps {
    order: Order
    onDelete: (id: number) => void
    onPatch: (id: number, statusCodeId: number)=>void
}
const OrderComponent: FC<OrderComponentProps> = ({ order, onDelete, onPatch }) => {
    const deleteOrder = (id: number) => {
        onDelete(id);
    }
    const patchOrder = (id: number,statusCodeId: number) => {
        onPatch(id,statusCodeId);
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <p>{order.orderIdentifier}</p>
            </TableCell>
            <TableCell align="right"><p>{order.desiredDeliveryDateTime}</p></TableCell>
            <TableCell align="right"><p>{order.note}</p></TableCell>
            <TableCell align="right"><p>{order.totalPrice}$</p></TableCell>
            <TableCell align="right"><p>{order.isCash ? "yes" : "no"}</p></TableCell>
            <TableCell align="right"><p>{order.customer.name}<br />{order.customer.address}<br />{order.customer.phone}</p></TableCell>
            <TableCell align="right"><p>{order.promotionalCode?.name}</p></TableCell>
            <TableCell align="right"><p>{order.orderStatus.name}</p></TableCell>
            <TableCell align="right"><Button color="warning" onClick={() => patchOrder(order.id,order.orderStatus.id)}>Patch</Button></TableCell>
            <TableCell align="right"><Button color="error" onClick={() => deleteOrder(order.id)}>Delete</Button></TableCell>
        </TableRow>

    );
}

export default OrderComponent
