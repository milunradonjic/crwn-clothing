import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/'>CONTACT</OptionLink>
      {
        currentUser ?
          // BEFORE SAGAS 
          // <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
          <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
          :
          <OptionLink to='/signin'>SIGN IN</OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);