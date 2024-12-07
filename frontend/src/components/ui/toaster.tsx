import { createToaster } from '@chakra-ui/react';

const toaster = createToaster({
  max: 3,
  placement: 'top-end',
  overlap: true,
  offsets: { left: '20px', top: '20px', right: '20px', bottom: '20px' },
});

export { toaster };
