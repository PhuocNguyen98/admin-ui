import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function DropDownMenu({ submenus, show = false }) {
  // const renderSubmenu = () => {};

  return (
    <div className={cx('wrapper')}>
      <PopperWrapper>
        <ul className={cx('submenu', { show })}>
          {submenus.map((submenu, index) => {
            return (
              <li key={index} className={cx('nav-item')}>
                <Button
                  to={submenu.to}
                  iconLeft={submenu.icon}
                  className={cx('nav-btn')}
                >
                  {submenu.title}
                </Button>
              </li>
            );
          })}
        </ul>
      </PopperWrapper>
    </div>
  );
}

export default DropDownMenu;
