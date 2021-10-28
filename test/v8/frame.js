const test = require('ava');
const { isInternalFrame } = require('../../lib/v8');

test('is internal frame', (t) => {
  t.true(isInternalFrame({ call: null, site: { type: 'native' } }));
  t.false(isInternalFrame({ call: null, site: { type: 'file' } }));
});