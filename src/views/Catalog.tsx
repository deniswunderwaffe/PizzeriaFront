import React, {useEffect, useState} from 'react';
import {FoodItem} from '../api/models/FoodItem';
import {useAuth0} from "@auth0/auth0-react";
import {getFoodItemsByCategory} from '../services/FoodItemService';
import SiteHeader from '../Components/SiteHeader';
import {Container} from '@mui/material';
import {FoodItemCategories} from '../utils/FoodItemCategories';
import Pizzas from '../Components/FoodItems/Pizzas';
import Drinks from '../Components/FoodItems/Drinks';
import Snacks from '../Components/FoodItems/Snacks';
import CartList from '../Components/Cart/CartList';
import CartDrawer from '../Components/Cart/CartDrawer';
import AddedSnack from '../Components/Cart/AddedSnack';
import Loading from "../Components/Loading";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import OrderForm from './OrderForm';
import {FoodItemExtra} from '../api/models/FoodItemExtra';


interface ICartContext {
  clearCart: () => void,
  addToCart: (foodItem: FoodItem) => void;
  removeFromCart: (id: number) => void;
  decreaseFromCart: (id: number) => void;
  handleExtra: (extra: FoodItemExtra, checked: boolean) => void;
  clearExtras: () => void,
  totalPrice: number;
  discount: number;
  items: FoodItem[];
  addDiscount: (discount: number) => void
  extras: FoodItemExtra[];
  isCartOpen: boolean;
  closeCart: () => void;
  addArrayToCart: (foodItems: FoodItem[]) => void;
}

const defaultState = {
  clearCart: () => { },
  addToCart: (foodItem) => { },
  handleExtra: (extra, checked) => { },
  clearExtras: () => { },
  removeFromCart: (id) => { },
  decreaseFromCart: (id) => { },
  totalPrice: 0,
  discount: 0,
  addDiscount: (discount) => { },
  items: [],
  extras: [],
  isCartOpen: false,
  closeCart: () => { },
  addArrayToCart: (foodItems) => {}
};
export const CartContext = React.createContext<ICartContext>(defaultState);

const Catalog = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [isDataLoading, setDataLoading] = useState(false);
  const [isCodeDisabled, setCodeDisabled] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSnackOpen, setSnackOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [extras, setExtras] = useState<FoodItemExtra[]>([]);
  const [pizzas, setPizzas] = useState<FoodItem[]>([]);
  const [drinks, setDrinks] = useState<FoodItem[]>([]);
  const [snacks, setSnacks] = useState<FoodItem[]>([]);
  let match = useRouteMatch();

  const state = {
    clearCart: () => {
      setCart([]);
      setExtras([]);
    },
    handleExtra: (id, checked) => {
      if (checked) { // not in the cart
        setExtras([...extras, id]);
      }
      else {
        setExtras(extras.filter((x) => x !== id));
      }
    },
    clearExtras: () => {
      setExtras([]);
    },
    addToCart: (foodItem) => {
      const itemIndex = cart.findIndex((x) => x.id === foodItem.id);
      setSnackOpen(true);
      if (itemIndex !== -1) {
        let items = [...cart];
        let item = { ...items[itemIndex] };
        item.quantity++;
        items[itemIndex] = item;
        setCart(items);
      }
      else
        setCart([...cart, foodItem])
    },
    removeFromCart: (id) => {
      setCart(cart.filter((x) => x.id !== id));
    },
    decreaseFromCart: (id) => {
      const itemIndex = cart.findIndex((x) => x.id === id);
      if (itemIndex !== -1) {
        if (cart[itemIndex].quantity === 1) {
          setCart(cart.filter((x) => x.id !== id));
        }
        else {
          let items = [...cart];
          let item = { ...items[itemIndex] };
          item.quantity--;
          items[itemIndex] = item;
          setCart(items);
        }
      }
    },
    items: cart,
    extras: extras,
    isCartOpen: isCartOpen,
    closeCart: () => { setCartOpen(false) },
    discount: discount,
    addDiscount: (discount) => { setDiscount(discount) },
    addArrayToCart: (foodItems) => {
      setCart(foodItems);
    },
    totalPrice: calculateTotalPrice(),

  };
  function calculateTotalPrice(): number {
    const foodTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const extrasTotal = extras.reduce((acc, item) => acc + item.price, 0);
    const totalPrice = (foodTotal + extrasTotal) / 100 * (100 - discount);
    return Number(totalPrice.toFixed(2));
  }
  useEffect(() => {
    const loadAll = async () => {
      setDataLoading(true);
      await getPizzasSecure();
      await getDrinksSecure();
      await getSnaksSecure();
      setDataLoading(false);
    }
    loadAll();
  }, [])
  const getDrinksSecure = async () => {
    try {
      const token = await getAccessTokenSilently();
      const responseData = await getFoodItemsByCategory(token, FoodItemCategories.Drink);
      setDrinks(responseData);
    } catch (error) {
    }
  };
  const getSnaksSecure = async () => {
    try {
      const token = await getAccessTokenSilently();
      const responseData = await getFoodItemsByCategory(token, FoodItemCategories.Snack);
      setSnacks(responseData);
    } catch (error) {
    }
  };
  const getPizzasSecure = async () => {
    try {
      const token = await getAccessTokenSilently();
      const responseData = await getFoodItemsByCategory(token, FoodItemCategories.Pizza);
      setPizzas(responseData);
    } catch (error) {
    }
  };

  return (
    <div>
      <SiteHeader
        itemsCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setCartOpen(true)} />
      <CartContext.Provider value={state}>
        <Switch>
          <Route path={`${match.path}/order`}>
            <OrderForm foodItems={cart} isCodeDisabled={isCodeDisabled} setCodeDisabled={() => setCodeDisabled(true)} />
          </Route>
          <Route path={match.path}>
            <Container
              sx={{ mt: "2rem" }}
            >
              {isDataLoading ? (<Loading />) : (
                <>
                  <Pizzas pizzas={pizzas} />
                  <Snacks snacks={snacks} />
                  <Drinks drinks={drinks} />
                </>
              )}

              <CartList />
            </Container>
            <AddedSnack
              isOpen={isSnackOpen}
              closeHandler={() => setSnackOpen(false)}
            />
            <CartDrawer />
          </Route>
        </Switch>
      </CartContext.Provider>


    </div>
  )
}

export default Catalog
