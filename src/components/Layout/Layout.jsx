import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOutThunk } from 'redux/auth/auth.reducer';
import { selectAuthenticated, selectUserData } from 'redux/auth/auth.selectors';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const userData = useSelector(selectUserData);

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <div>
      <header>
        <NavLink className="header-link" to="/">
          Home
        </NavLink>
        {authenticated ? (
          <>
            <NavLink className="header-link " to="/posts">
              Posts
            </NavLink>
            <NavLink className="header-link " to="/products">
              Products
            </NavLink>
            <NavLink className="header-link " to="/contacts">
              Contacts
            </NavLink>
            <div>
              <span>Hello {userData.name}</span>
              <button onClick={onLogOut}>Log Out</button>{' '}
            </div>
          </>
        ) : (
          <>
            <NavLink className="header-link " to="/login">
              Login
            </NavLink>
            <NavLink className="header-link " to="/register">
              Register
            </NavLink>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
