import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Container } from 'react-bootstrap';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('wrapper')}>
      <Container className="h-100">
        <div className={cx('inner')}>
          <p className={cx('copy-right')}>Copyright © 2019 PIXINVENT</p>
          <p className={cx('desc')}>Hand-crafted & Made with</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
