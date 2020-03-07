import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
  CartDropdownContainer,
  CartItemsContainer,
  CartDropdownButton,
  EmptyMessageContainer,
} from './cart-dropdown.styles';


const CartDropdown = ({ items, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        items.length ?
          items.map(item => <CartItem key={item.id} item={item} />) :
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      }
    </CartItemsContainer>
    <CartDropdownButton
      inverted
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}>GO TO CHECKOUT</CartDropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  items: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));