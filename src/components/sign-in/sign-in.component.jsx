import React from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

// BEFORE SAGAS. We used firebase listner for signing in.
// Now saga middleware is responsible for dispatching correct actions
// import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
// import { auth } from '../../firebase/firebase.utils';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    emailSignInStart(email, password);
    // SAGAS will take care of state
    // try {
    //   auth.signInWithEmailAndPassword(email, password);
    //   this.setState({ email: '', password: '' });
    // } catch (error) {
    //   console.error(error);
    // }

  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form className='sign-in-form' onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />

          <div className="buttons">
            <CustomButton type='submit'>Sign In</CustomButton>
            {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton> */}
            {/* We have to set type as button, because it's part of a form it will trigger submit. 
                So we have to say it's a button */}
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);