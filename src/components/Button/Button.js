import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary,
  outline,
  iconLeft,
  iconRight,
  className,
  children,
  onClick,
  ...props
}) {
  let Comp = 'button';

  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = 'a';
    props.href = href;
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
  });

  return (
    <Comp className={classes} {...props} onClick={onClick}>
      <span className={cx('icon')}>{iconLeft}</span>
      <span className={cx('title')}>{children}</span>
      <span className={cx('icon')}>{iconRight}</span>
    </Comp>
  );
}

export default Button;
