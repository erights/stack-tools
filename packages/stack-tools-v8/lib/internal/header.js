function parseHeader(header) {
  let name = '';
  let message = header;

  const colonIdx = message.indexOf(': ');
  if (colonIdx >= 0) {
    name = message.slice(0, colonIdx).trim();
    message = message.slice(colonIdx + 2).trim();
  }

  return {
    name: { type: 'ErrorName', name },
    message: { type: 'ErrorMessage', message },
    prefix: undefined,
  };
}

function parseChainedHeader(header) {
  const nlIdx = header.indexOf('\n');
  const headerExtra = nlIdx >= 0 ? header.slice(nlIdx + 1) : '';
  let message = nlIdx >= 0 ? header.slice(0, nlIdx) : header;
  let prefix = '';
  let name = '';

  const colonIdx = message.indexOf(':');
  if (colonIdx >= 0) {
    prefix = message.slice(0, colonIdx);
    message = message.slice(colonIdx + 1).trimLeft();

    const colon2Idx = message.indexOf(':');
    if (colon2Idx >= 0) {
      name = message.slice(0, colon2Idx);
      message = message.slice(colon2Idx + 1).trimLeft();
    } else {
      name = message;
      message = '';
    }
  }

  if (!prefix) {
    throw new Error(
      // eslint-disable-next-line no-template-curly-in-string
      `stack line is neither a frame or a chained error header: \`${header}\``,
    );
  } else if (/^caused by$/i.test(prefix)) {
    prefix = '';
  }

  if (headerExtra) {
    message = `${message}\n${headerExtra}`;
  }

  return {
    name: name ? { type: 'ErrorName', name } : undefined,
    message: message ? { type: 'ErrorMessage', message } : undefined,
    prefix: prefix || undefined,
  };
}

module.exports = {
  parseHeader,
  parseChainedHeader,
};
