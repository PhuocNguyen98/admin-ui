import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '~/components/Button';
import { addPost, getPostById, editPost } from '~/api/postApi';
import {
  fetchAddSuccess,
  fetchEditSuccess,
} from '~/store/actionsType/postActions';

const cx = classNames.bind(styles);

const schema = yup
  .object({
    title: yup.string().required('Vui long nhap tieu de bai viet'),
  })
  .required();

function PostForm() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Dung de lay history link

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      body: '',
    },
    resolver: yupResolver(schema),
  });

  const getPost = async () => {
    const res = await getPostById(postId);
    // console.log(res);
    setValue('title', res.title);
    setValue('body', res.body);
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

  const handleAdd = handleSubmit(async (submitedData) => {
    const res = await addPost(submitedData);
    console.log(res);
    if (res) {
      dispatch(fetchAddSuccess(res));
      reset({
        title: '',
        body: '',
      });
    }
  });

  const handleEdit = async (id, submitedData) => {
    const res = await editPost(id, submitedData);
    console.log(res);
    dispatch(fetchEditSuccess(res));
  };

  return (
    <div className={cx('wrapper')}>
      <Container>
        <div className={cx('inner')}>
          <Button
            onClick={() => navigate(-1)}
            iconLeft={<FontAwesomeIcon icon={faChevronLeft} />}
            className={cx('back-btn')}
          >
            Back
          </Button>

          <form className={cx('form')}>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <div className={cx('form-group')}>
                  <span className={cx('form-label')}>Description</span>
                  <input
                    type="text"
                    placeholder="Title"
                    value={value}
                    onChange={onChange}
                    className={cx('form-controls')}
                  />
                  <span className={cx('msg-error')}>
                    {errors.title?.message}
                  </span>
                </div>
              )}
            />

            <Controller
              control={control}
              name="body"
              render={({ field: { onChange, value } }) => (
                <div className={cx('form-group')}>
                  <span className={cx('form-label')}>Title</span>
                  <textarea
                    rows={10}
                    onChange={onChange}
                    value={value}
                    placeholder="Description"
                    className={cx('form-controls')}
                  />
                </div>
              )}
            />

            {postId ? (
              <Button
                type="button"
                btnSuccess
                className={cx('form-btn')}
                onClick={handleSubmit((data) => handleEdit(postId, data))}
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
