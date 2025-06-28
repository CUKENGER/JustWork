import { Home, NotFound } from '@/pages';

export enum PRIVATE_ROUTES {}

export enum PUBLIC_ROUTES {
  HOME = '/',
  NOT_FOUND = '*',
}

export const privateRoutes = [
  // { path: PRIVATE_ROUTES.ALBUM_EDIT, component: AlbumEdit, exact: true },
];

export const publicRoutes = [
  { path: PUBLIC_ROUTES.NOT_FOUND, component: NotFound, exact: true },
  { path: PUBLIC_ROUTES.HOME, component: Home, exact: true },
];
