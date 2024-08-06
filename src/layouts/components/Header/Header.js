import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faGear,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/img';
import Menu from '~/components/Menu';

const cx = classNames.bind(styles);

function Header() {
  const currentUser = true;
  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/profile',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Setting',
      to: '/setting',
    },
    {
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];

  return (
    <Container>
      <header className={cx('wrapper')}>
        <div className={cx('inner')}>
          <Link to="/" className={cx('logo')}>
            <img src={images.logo} alt="Logo" />
            <h3 className={cx('brand-name')}>Modern</h3>
          </Link>
          <div className={cx('search')}>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className={cx('search-input')}
            />
            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className={cx('actions')}>
            <Tippy content="Thông báo">
              <button className={cx('btn', 'notify-btn')}>
                <FontAwesomeIcon icon={faBell} />
              </button>
            </Tippy>
            <Tippy content="Tin nhắn">
              <button className={cx('btn', 'inbox-btn')}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span className={cx('badge')}>10</span>
              </button>
            </Tippy>
            <Menu data={currentUser ? userMenu : ''}>
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faBars} className={cx('icon')} />
                <img
                  src={images.avatar}
                  alt="Avatar"
                  className={cx('avatar')}
                />
              </button>
            </Menu>
          </div>
        </div>
      </header>
    </Container>
  );
}

export default Header;
