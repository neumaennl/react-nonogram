import { Metric } from 'web-vitals';

const reportWebVitals = (onReport?: (metric: Metric) => void) => {
  if (onReport && onReport instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onReport);
      onINP(onReport);
      onFCP(onReport);
      onLCP(onReport);
      onTTFB(onReport);
    });
  }
};

export default reportWebVitals;
