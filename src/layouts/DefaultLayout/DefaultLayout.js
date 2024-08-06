import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <Navbar />
      <div className={cx('container')}>
        <div className={cx('container')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
