import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Home | Ecommerce Angular',
  },
  {
    path: 'brands',
    loadComponent: () => import('../pages/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'Brands | Ecommerce Angular',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('../pages/categories/categories.component').then((m) => m.CategoriesComponent),
    title: 'Categories | Ecommerce Angular',
  },
  {
    path: 'shop',
    loadComponent: () => import('../pages/shop/shop.component').then((m) => m.ShopComponent),
    title: 'Shop | Ecommerce Angular',
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('../pages/details/details.component').then((m) => m.DetailsComponent),
    title: 'Details | Ecommerce Angular',
  },
  {
    path: 'orders',
    loadComponent: () => import('../pages/orders/orders.component').then((m) => m.OrdersComponent),
    title: 'Orders | Ecommerce Angular',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('../pages/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    title: 'Wishlist | Ecommerce Angular',
  },
  {
    path: 'cart',
    loadComponent: () => import('../pages/cart/cart.component').then((m) => m.CartComponent),
    title: 'Cart | Ecommerce Angular',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('../pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'Checkout | Ecommerce Angular',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('../pages/profile/profile.component').then((m) => m.ProfileComponent),
    title: 'Profile | Ecommerce Angular',
  },
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login.component').then((m) => m.LoginComponent),
    title: 'Login | Ecommerce Angular',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../pages/register/register.component').then((m) => m.RegisterComponent),
    title: 'Register | Ecommerce Angular',
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('../pages/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent,
      ),
    title: 'Forget Password | Ecommerce Angular',
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('../pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Not Found | Ecommerce Angular',
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
