import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const cx = classNames.bind(styles);

const schema = yup
  .object({
    userName: yup.string().required('Vui long nhap User Name'),
    password: yup.string().required('Vui long nhap Password'),
  })
  .required();

function Auth() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(JSON.stringify(data));

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <h2 className={cx('title')}>Login</h2>
          <span className={cx('label')}>
            Welcom back! Please login to your account
          </span>
        </div>
        <div className={cx('body')}>
          <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="userName"
              render={({ field: { onChange, onBlur, value } }) => (
                <div className={cx('form-group')}>
                  <span className={cx('form-label')}>User Name</span>
                  <input
                    type="text"
                    placeholder="UserName"
                    className={cx('form-controls')}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  <span className={cx('msg-error')}>
                    {errors.userName?.message}
                  </span>
                </div>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <div className={cx('form-group')}>
                  <span className={cx('form-label')}>User Name</span>
                  <input
                    type="text"
                    placeholder="Password"
                    className={cx('form-controls')}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  <span className={cx('msg-error')}>
                    {errors.password?.message}
                  </span>
                </div>
              )}
            />
            <div className={cx('form-aside')}>
              <Controller
                control={control}
                name="rememberLogin"
                render={({ field: { value } }) => (
                  <div className={cx('form-checkbox')}>
                    <input type="checkbox" />
                    <span>Remember Me</span>
                  </div>
                )}
              />
              <Link>Forget Password?</Link>
            </div>
            <button type="submit" className={cx('login-btn')}>
              Login
            </button>
          </form>
        </div>
        <div className={cx('footer')}>
          <span>New User?</span>
          <Link>Sigup</Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
