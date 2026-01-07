import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes/router';
import ToastStack from '@/components/ToastStack';

const App = () => (
  <>
    <RouterProvider router={router} />
    <ToastStack />
  </>
);

export default App;
