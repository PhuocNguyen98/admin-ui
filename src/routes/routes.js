import config from '~/config';

import Home from '~/pages/Home';
import Post from '~/pages/Post';
import PostForm from '~/pages/Post/PostForm';
import Login from '~/pages/Auth';

// Những routes chỉ khi đăng nhập mới vào được
export const privateRoutes = [];

//Những routes không cần đăng nhập
export const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.post, component: Post },
  { path: config.pages.addPost, component: PostForm },
  { path: config.pages.editPost, component: PostForm },
  { path: config.routes.login, component: Login, layout: null },
];
