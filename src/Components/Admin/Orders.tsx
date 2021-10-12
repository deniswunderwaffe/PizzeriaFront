import { Order } from '../../api/models/Order';
import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { StatusCodes } from '../../utils/StatusCodes';
import { getOrders, deleteOrder, patchOrderStatus } from '../../services/OrderService';
import OrderComponent from './OrderComponent';
import { Divider,Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getPageCount, getPagesArray } from '../../utils/Pages';
import { ButtonGroup, Button, Box } from '@mui/material';

const Orders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pagesMemorized = useMemo(() => getPagesArray(totalPages), [orders]);

  useEffect(() => {
    getOrdersSecureOrdered();
  }, [pageNumber])

  const getOrdersSecureOrdered = async (order?: string) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await getOrders(token, pageSize, pageNumber);
      const totalCount = JSON.parse((response!.headers.get('x-pagination')) as string);
      const pageCount = getPageCount(totalCount.TotalCount, pageSize);
      setTotalPages(pageCount);
      const responseData = await response!.json();
      setOrders(responseData);
    } catch (error) {
    }
  };
  const deleteOrderHandler = async (id: number) => {
    const token = await getAccessTokenSilently();
    await deleteOrder(id, token);
    await getOrdersSecureOrdered();
  }
  const patchOrderStatusHandler = async (id: number, statusCodeId: number) => {
    const token = await getAccessTokenSilently();
    if (statusCodeId === StatusCodes.Delivered) {
      return;
    }
    await patchOrderStatus(id, ++statusCodeId, token);
    await getOrdersSecureOrdered();
  }

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" gutterBottom>
        Orders
      </Typography>
      <Divider variant="middle" sx={{ mb: "15px" }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Order Identifier</TableCell>
              <TableCell align="right">Desired delivery time</TableCell>
              <TableCell align="right">Note</TableCell>
              <TableCell align="right">
                <Button
                  sx={{ background: "none", border: "none" }}
                  onClick={() => getOrdersSecureOrdered("TotalPrice")}>
                  Total Price
                </Button>
              </TableCell>
              <TableCell align="right">Cash</TableCell>
              <TableCell align="right">Customer Data</TableCell>
              <TableCell align="right">Promotional Code</TableCell>
              <TableCell align="right">Order Status</TableCell>
              <TableCell align="right"><p style={{ color: "orange" }}>Patch</p></TableCell>
              <TableCell align="right"><p style={{ color: "red" }}>Delete</p></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderComponent key={order.id} order={order} onDelete={deleteOrderHandler} onPatch={patchOrderStatusHandler} />
            ))}
          </TableBody>
        </Table>
        <Box
          display="flex"
          justifyContent="center">
          <ButtonGroup variant="text" aria-label="text button group" size="small">
            {pagesMemorized.map(x => (
              <Button
                disabled={x === pageNumber}
                key={x}
                onClick={() => setPageNumber(x)}>
                {x}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </TableContainer>
    </React.Fragment>
  )
}

export default Orders
