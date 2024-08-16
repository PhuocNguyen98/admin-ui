import config from '~/config';

import Home from '~/pages/Home';
import Post from '~/pages/Post';
import PostForm from '~/pages/Post/PostForm';
import Login from '~/pages/Auth';
import ContactUs from '~/pages/ContactUs';
import Customer from '~/pages/Customer';
import CustomerForm from '~/pages/Customer/CustomerForm';

// Những routes chỉ khi đăng nhập mới vào được
export const privateRoutes = [];

//Những routes không cần đăng nhập
export const publicRoutes = [
  // Home page
  { path: config.routes.home, component: Home },

  // Post pages
  { path: config.routes.post, component: Post },
  { path: config.pages.addPost, component: PostForm },
  { path: config.pages.editPost, component: PostForm },

  // Login page
  { path: config.routes.login, component: Login, layout: null },

  // Contact us Page
  { path: config.routes.contact, component: ContactUs },

  // Customer pages
  { path: config.routes.customer, component: Customer },
  { path: config.pages.addCustomer, component: CustomerForm },
  { path: config.pages.editCustomer, component: CustomerForm },
];
