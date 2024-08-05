import Home from '~/pages/Home';
import Post from '~/pages/Post';

// Những routes chỉ khi đăng nhập mới vào được
export const privateRoutes = [];

//Những routes không cần đăng nhập
export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/post', component: Post },
];
