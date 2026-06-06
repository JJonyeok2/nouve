import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './router/routes';

const router = createAppRouter();

export function App() {
  return <RouterProvider router={router} />;
}
