import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from './Loading'; // Import your existing Loading component

const LazyLoad = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Load the component only once
    threshold: 0.1,    // Load when 10% of the component is visible
  });

  // The minHeight prevents the layout from collapsing before the component loads
  return (
    <div ref={ref} style={{ minHeight: '400px' }}>
      {/* If the component is in view, we render it inside Suspense.
        The fallback will now be your custom Loading component.
      */}
      {inView ? <Suspense fallback={<Loading />}>{children}</Suspense> : null}
    </div>
  );
};

export default LazyLoad;