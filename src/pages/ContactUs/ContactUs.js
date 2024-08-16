import classNames from 'classnames/bind';
import styles from './ContactUs.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

const schema = yup
  .object()
  .shape({
    formList: yup.array(
      yup.object({
        firstName: yup.string().required('Vui long nhap First Name'),
        lastName: yup.string().required('Vui long nhap Last Name'),
        email: yup.string().email().required('Vui long nhap Email'),
        phone: yup
          .number()
          .typeError('Vui long nhap so dien thoai')
          .required()
          .positive('Gia tri phai la so duong')
          .integer('Gia tri khong duoc la so thap phan'),
        company: yup.string(),
        job: yup.string(),
        street: yup.string(),
        city: yup.string(),
        province: yup.string(),
        country: yup.string(),
        zipCode: yup.number(),
        topic: yup.string(),
      }),
    ),
  })
  .required();

function ContactUs() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      formList: [
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          job: '',
          street: '',
          city: '',
          province: '',
          zipCode: '',
          country: '',
          topic: '',
        },
      ],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'formList',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleAdd = () => {
    append({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      job: '',
      street: '',
      city: '',
      province: '',
      zipCode: '',
      country: '',
      topic: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  console.log(fields);
  return (
    <div className={cx('wrapper')}>
      <Container>
        <div className={cx('inner')}>
          <div className={cx('header', 'pt-5')}>
            <h2 className={cx('title')}>Contact Us</h2>
            <Button type="button" btnSuccess onClick={() => onSubmit()}>
              Submit
            </Button>
          </div>
          <form className={cx('form', 'pt-5 pb-5')}>
            {fields.map((item, index) => {
              // console.log(item);
              return (
                <>
                  <p className={cx('form-title')}>
                    Form {index + 1}
                    {index !== 0 && (
                      <button
                        className={cx('icon-remmove')}
                        onClick={() => handleRemove(index)}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                    )}
                  </p>
                  <Row key={index} className="g-5">
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.firstName`}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <div className={cx('form-group')}>
                            <label
                              htmlFor="firstName"
                              className={cx('form-label')}
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              placeholder="First Name"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                            <span className={cx('msg-error')}>
                              {error?.message}
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.lastName`}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <div className={cx('form-group')}>
                            <label
                              htmlFor="lastName"
                              className={cx('form-label')}
                            >
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              placeholder="Last Name"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                            <span className={cx('msg-error')}>
                              {error?.message}
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                    {/* <Col lg={12}>
                      <Controller
                        control={control}
                        name="agree"
                        render={({ field: { onChange, value } }) => (
                          <div>
                            <input
                              id="agree"
                              type="checkbox"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                            <label htmlFor="agree">&nbsp;Ban co dong y</label>
                          </div>
                        )}
                      />
                    </Col> */}
                    {/* <Col lg={12}>
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                          <fieldset
                            id="gender"
                            onChange={onChange}
                            value={value}
                          >
                            <input type="radio" value="Female" name="gender" />
                            Female
                            <input type="radio" value="Male" name="gender" />
                            Male
                          </fieldset>
                        )}
                      />
                    </Col> */}
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.email`}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <div className={cx('form-group')}>
                            <label htmlFor="email" className={cx('form-label')}>
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Email"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                            <span className={cx('msg-error')}>
                              {error?.message}
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.phone`}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <div className={cx('form-group')}>
                            <label htmlFor="phone" className={cx('form-label')}>
                              Phone
                            </label>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                            <span className={cx('msg-error')}>
                              {error?.message}
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.company`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label
                              htmlFor="company"
                              className={cx('form-label')}
                            >
                              Company
                            </label>
                            <input
                              id="company"
                              type="text"
                              placeholder="Company"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.job`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label htmlFor="job" className={cx('form-label')}>
                              Job Title
                            </label>
                            <input
                              id="job"
                              type="text"
                              placeholder="Job Title"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={12}>
                      <Controller
                        control={control}
                        name={`formList.${index}.street`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label
                              htmlFor="street"
                              className={cx('form-label')}
                            >
                              Street
                            </label>
                            <input
                              id="street"
                              type="text"
                              placeholder="Street"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.city`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label htmlFor="city" className={cx('form-label')}>
                              City
                            </label>
                            <select
                              id="city"
                              value={value}
                              onChange={onChange}
                              className={cx('form-controls')}
                            >
                              <option value="hanoi">Ha Noi</option>
                              <option value="hue">Hue</option>
                              <option value="tphcm">TP.HCM</option>
                              <option value="cantho">Can Tho</option>
                            </select>
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.province`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label
                              htmlFor="province"
                              className={cx('form-label')}
                            >
                              Province
                            </label>
                            <input
                              id="province"
                              type="text"
                              placeholder="Province"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.zipCode`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label
                              htmlFor="zipCode"
                              className={cx('form-label')}
                            >
                              Zip Code
                            </label>
                            <input
                              id="zipCode"
                              type="text"
                              placeholder="Zip Code"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                            <span className={cx('msg-error')}>
                              {errors.zipCode?.message}
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={6}>
                      <Controller
                        control={control}
                        name={`formList.${index}.country`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label
                              htmlFor="country"
                              className={cx('form-label')}
                            >
                              Country
                            </label>
                            <input
                              id="country"
                              type="text"
                              placeholder="Country"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                          </div>
                        )}
                      />
                    </Col>
                    <Col lg={12}>
                      <Controller
                        control={control}
                        name={`formList.${index}.topic`}
                        render={({ field: { onChange, value } }) => (
                          <div className={cx('form-group')}>
                            <label htmlFor="topic" className={cx('form-label')}>
                              Topic
                            </label>
                            <input
                              id="topic"
                              type="text"
                              placeholder="Topic"
                              className={cx('form-controls')}
                              onChange={onChange}
                              value={value}
                            />
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                </>
              );
            })}
            <Button
              type="button"
              btnSuccess
              small
              className="mt-5"
              onClick={() => handleAdd()}
            >
              Them Form
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ContactUs;
