import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import Button from '~/components/Button';
import DropDownMenu from './DropDownMenu';

const cx = classNames.bind(styles);

function MenuItem({ items }) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <li className={cx('nav-item')}>
      {items.submenu ? (
        <>
          <Button
            iconLeft={items.icon}
            iconRight={<FontAwesomeIcon icon={faChevronDown} />}
            className={cx('nav-btn')}
            onClick={handleSubmenu}
          >
            {items.title}
          </Button>
          <DropDownMenu submenus={items.submenu} show={showSubmenu} />
        </>
      ) : (
        <Button to={items.to} iconLeft={items.icon} className={cx('nav-btn')}>
          {items.title}
        </Button>
      )}
    </li>
  );
}

export default MenuItem;
