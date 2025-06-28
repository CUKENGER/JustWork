import ReactDOM from 'react-dom/client';
import './index.scss';
import { AppProvider } from './AppProvider';
import BaseLayout from './BaseLayout';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorPage } from './ErrorPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <ErrorBoundary fallback={<ErrorPage />}>
      <BaseLayout />
    </ErrorBoundary>
  </AppProvider>
);
