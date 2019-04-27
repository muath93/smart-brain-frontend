import React from 'react';

const Navigation = ({ onRouteChange, isSignedin }) => {

  if (isSignedin) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p onClick={() => onRouteChange('signout')}
          className='f3 link black dim pa3 underline pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link black dim pa3 underline pointer'
          onClick={() => onRouteChange('signin')} >Sign In</p>

        <p className='f3 link black dim pa3 underline pointer'
          onClick={() => onRouteChange('rigester')}>Register</p>
      </nav>
    );
  }
}

export default Navigation;
