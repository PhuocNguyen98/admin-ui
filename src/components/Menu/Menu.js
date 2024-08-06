import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import TippyHeadLess from '@tippyjs/react/headless';

import { PopperWrapper } from '../Popper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, data }) {
  const renderMenu = (attrs) => {
    return (
      <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
        <PopperWrapper>
          <div className={cx('menu-body')}>
            {data.map((item, index) => (
              <MenuItem key={index} data={item} />
            ))}
          </div>
        </PopperWrapper>
      </div>
    );
  };

  return (
    <div>
      <TippyHeadLess
        interactive
        placement="bottom"
        offset={[-30, 10]}
        delay={[0, 200]}
        hideOnClick="toggle"
        render={renderMenu}
      >
        {children}
      </TippyHeadLess>
    </div>
  );
}

export default Menu;
