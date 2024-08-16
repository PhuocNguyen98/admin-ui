import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faUser,
  // faGear,
  // faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';

import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

const navbarList = [
  {
    icon: <FontAwesomeIcon icon={faPenToSquare} />,
    title: 'Post',
    to: '/post',
    // submenu: [
    //   {
    //     icon: <FontAwesomeIcon icon={faGear} />,
    //     title: 'Setting',
    //     to: '/setting',
    //   },
    //   {
    //     icon: <FontAwesomeIcon icon={faGear} />,
    //     title: 'Setting',
    //     to: '/setting',
    //   },
    //   {
    //     icon: <FontAwesomeIcon icon={faGear} />,
    //     title: 'Setting',
    //     to: '/setting',
    //   },
    // ],
  },
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Customer',
    to: '/customer',
  },
  // {
  //   icon: <FontAwesomeIcon icon={faRightFromBracket} />,
  //   title: 'Log out',
  //   to: '/logout',
  // },
];

function Navbar() {
  return (
    <nav className={cx('wrapper')}>
      <Container className="h-100">
        <div className={cx('inner')}>
          <ul className={cx('nav-list')}>
            {navbarList.map((item, index) => {
              return <MenuItem key={index} items={item} />;
            })}
          </ul>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
