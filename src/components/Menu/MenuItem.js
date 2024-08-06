import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
  const classes = cx('menu-item', {
    separate: data.separate,
  });
  return (
    <Button to={data.to} iconLeft={data.icon} className={classes}>
      {data.title}
    </Button>
  );
}

export default MenuItem;
