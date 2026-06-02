const nJ = require('next/jest.js');
const fn = nJ({ dir: './' });
const confFn = fn({
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
});
confFn().then(c => {
  console.log('has @ mapping:', '^@/(.*)$' in (c.moduleNameMapper || {}));
  const keys = Object.keys(c.moduleNameMapper || {});
  console.log('mmKeys:', keys.join(', '));
  // Show full config
  console.log('transform:', JSON.stringify(c.transform));
}).catch(e => console.error('Error:', e.message));
