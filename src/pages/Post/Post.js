import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrashCan,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import { getPosts } from '~/api/postApi';
import { fetchDataSuccess } from '~/store/actionsType';
import config from '~/config';

const cx = classNames.bind(styles);

function Post() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getData = async () => {
    const res = await getPosts();
    dispatch(fetchDataSuccess(res));
  };

  useEffect(() => {
    getData();
  }, []);

  const renderHeaderTable = () => {
    let header = Object.keys(posts.data[0]);
    header = [...header, 'Actions'];
    return header.map((valua, index) => (
      <th key={index} className="text-center">
        {valua.toUpperCase()}
      </th>
    ));
  };

  const renderTableData = () => {
    return posts.data.map((item) => (
      <tr key={item.id} className="text-center align-middle">
        <td>{item.userId}</td>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.body}</td>
        <td width="20%">
          <Button
            to={`${config.routes.post}/edit/${item.id}`}
            iconLeft={<FontAwesomeIcon icon={faPenToSquare} />}
            btnInfo
            small
          >
            Edit
          </Button>
          <Button
            to="/"
            iconLeft={<FontAwesomeIcon icon={faTrashCan} />}
            btnDanger
            small
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          <div className="header">
            <h2 className={cx('title')}>Post List</h2>
            <Button
              to={config.pages.addPost}
              iconLeft={<FontAwesomeIcon icon={faPlus} />}
            >
              Add Post
            </Button>
          </div>
          <div className={cx('post-list')}>
            <Table striped bordered size="sm">
              <thead>
                <tr>{posts.data ? renderHeaderTable() : ''}</tr>
              </thead>
              <tbody>{posts.data ? renderTableData() : ''}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Post;
