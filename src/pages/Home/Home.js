import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Container, Card, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <Container>
        <div className={cx('inner')}>
          <h2>Home page</h2>
        </div>
      </Container>
    </div>
  );
}

export default Home;
