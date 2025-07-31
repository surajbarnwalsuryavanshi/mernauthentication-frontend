import { Link, Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { isAuth, signout } from '../auth/Helpers';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = isAuth();
  const matchHome = useMatch('/');
  const matchSignin = useMatch('/signin');
  const matchSignup = useMatch('/signup');
  const isActive = (match) => (match ? { color: '#000' } : { color: '#fff' });

  return (
    <>
      <ul className="nav nav-tabs bg-success">
        <li className="nav-item">
          <Link to="/" className="nav-link" style={isActive(matchHome)}>
            Home
          </Link>
        </li>

        {!user && (
          <>
            <li className="nav-item">
              <Link to="/signin" className="nav-link" style={isActive(matchSignin)}>
                Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link" style={isActive(matchSignup)}>
                Signup
              </Link>
            </li>
          </>
        )}

        {/* {user && (
          <>
            <li className='nav-item'>
              <span className='nav-link' style={{color: "black"}}>{isAuth().name}</span>
            </li>
          </>
        )} */}

        {user && user.role === 'admin' && (
          <li className='nav-item'>
            <Link className='nav-link' style={isActive('/admin')} to="/admin">
              {user.name}
            </Link>
          </li>
        )}

        {user && user.role === 'subscriber' && (
          <li className='nav-item'>
            <Link className='nav-link' style={isActive('/private')} to="/private">
              {user.name}
            </Link>
          </li>
        )}

        {user && (
          <>
            <li className='nav-item'>
              <span className='nav-link' style={{cursor: 'pointer', color: '#fff'}} onClick={() => {
                signout(() => {
                  navigate('/')
                })
              }}>
                SignOut
              </span>
            </li>
          </>
        )}
      </ul>
      <Outlet />
    </>
  );
};

export default Layout;