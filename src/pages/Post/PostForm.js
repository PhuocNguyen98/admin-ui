import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import config from '~/config';
import Button from '~/components/Button';
import { addPost, getPostById, editPost } from '~/api/postApi';
import { fetchEditSuccess } from '~/store/actionsType';

const cx = classNames.bind(styles);

function PostForm() {
  const [postItem, setPostItem] = useState(null);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);

  const getPost = async () => {
    const res = await getPostById(postId);
    // console.log(res);
    setPostItem(res);
  };

  const resultPostItem = () => {
    if (postId) {
      getPost();
    }
    return;
  };

  useEffect(() => {
    resultPostItem();
  }, [postId]);

  const changeInput = (name, e) => {
    setPostItem((pre) => ({ ...pre, [name]: e.target.value }));
  };

  const handleAdd = async () => {
    const res = await addPost(postItem);
    console.log(res);
    if (res) {
      setPostItem(null);
    }
  };

  const handleEdit = async (id) => {
    const res = await editPost(id, postItem);
    console.log(res);
    dispatch(fetchEditSuccess(res));
  };

  return (
    <div className={cx('wrapper')}>
      <Container>
        <div className={cx('inner')}>
          <Button
            to={config.routes.post}
            iconLeft={<FontAwesomeIcon icon={faChevronLeft} />}
            className={cx('back-btn')}
          >
            Back
          </Button>

          <form className={cx('form')}>
            <div className={cx('form-gruop')}>
              <span className={cx('form-label')}>Title</span>
              <input
                type="text"
                placeholder="Title"
                value={postItem && postItem.title ? postItem.title : ''}
                onChange={(e) => changeInput('title', e)}
                className={cx('form-controls')}
              />
            </div>
            <div className={cx('form-gruop')}>
              <span className={cx('form-label')}>Description</span>
              <textarea
                rows={10}
                onChange={(e) => changeInput('body', e)}
                value={postItem && postItem.body ? postItem.body : ''}
                placeholder="Description"
                className={cx('form-controls')}
              />
            </div>

            {postId ? (
              <Button
                type="button"
                btnSuccess
                className={cx('form-btn')}
                onClick={() => handleEdit(postId)}
              >
                Cập nhật
              </Button>
            ) : (
              <Button
                type="button"
                btnSuccess
                className={cx('form-btn')}
                onClick={() => handleAdd()}
              >
                Thêm
              </Button>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
}

export default PostForm;
