import { Container} from '@mui/material'
import React from 'react'
import AdminHeader from '../Components/Admin/AdminHeader'
import Orders from '../Components/Admin/Orders'
import FoodItemForm from '../Components/Admin/FoodItemForm'



const Admin = () => {
    return (
        <React.Fragment>
            <AdminHeader/>
            <Container sx={{ mt: "2rem" }}>
                <Orders/>
                <FoodItemForm />
            </Container>
        </React.Fragment>
    )
}
export default Admin
