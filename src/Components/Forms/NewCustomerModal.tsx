import * as React from 'react';
import { Box, Button, TextField, Typography,Divider } from '@mui/material'
import * as yup from "yup";
import Modal from '@mui/material/Modal';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from "react-hook-form";
import { Customer } from '../../api/models/Customer';
import { addCustomer } from '../../services/CustomerService';
import { FC } from 'react';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const schema = yup.object().shape({
  name: yup.string().max(50).required(),
  email: yup.string().max(50).email().required(),
  phone: yup.string().min(8).max(12).matches(/^[0-9]*$/,"Enter a valid phone number").required(),
  address: yup.string().max(100).required(),
});
interface NewCustomerModalProps {
  openModal: boolean
  onClose: () => void
  onCustomerCreated:(customer:Customer)=>void
}
const NewCustomerModal:FC<NewCustomerModalProps> = ({ openModal, onClose, onCustomerCreated }) => {
  const { register, handleSubmit, formState: { errors }}: any = useForm({
    resolver: yupResolver(schema),
  });
  const { getAccessTokenSilently } = useAuth0();

  const onSubmitHandler = async (data) => {
    const token = await getAccessTokenSilently();
    const responseData = await addCustomer(data, token);
    onCustomerCreated(responseData);
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Seems you are not in our database<br />Please register :)
          </Typography>
          <Divider variant="middle" sx ={{mb:"15px"}} />
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Box style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 25
            }}>
              <TextField
                {...register("name")}
                id="outlined-basic"
                label="Name"
                multiline
                maxRows={4}
                variant="outlined" />
              <Typography variant="caption" component="p" color="red">
                {errors.name?.message}
              </Typography>
              <TextField
                {...register("email")}
                id="outlined-basic"
                label="Email"
                multiline
                maxRows={4}
                variant="outlined" />
              <Typography variant="caption" component="p" color="red">
                {errors.email?.message}
              </Typography>
              <TextField
                {...register("phone")}
                id="outlined-basic"
                label="Phone"
                multiline
                maxRows={4}
                variant="outlined" />
              <Typography variant="caption" component="p" color="red">
                {errors.phone?.message}
              </Typography>
              <TextField
                {...register("address")}
                id="outlined-basic"
                label="Address"
                maxRows={4}
                variant="outlined" />
              <Typography variant="caption" component="p" color="red">
                {errors.address?.message}
              </Typography>
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default NewCustomerModal