// exports.defaultPlugin = (pluginData) => {
//     return ({
//         ...pluginData,
//         data: {
//             ...pluginData.data,
//             priority: 0.5
//         }
//     });
// };

// exports.validPlugin = (pluginData) => {
//     return !!pluginData && !!pluginData.type && !!pluginData.data;
// };


exports.formatError = _err => {

  if (typeof _err === 'string') {
    return _err;
  }

  let err,
      code;

  if (typeof _err === 'object') {
    if (_err.code) {
      code = _err.code;
    }
    if (typeof _err.data === 'object') {
      if (_err.code) {
        err = `Error ${_err.code}`;
      }
    } else if (typeof _err.data === 'string') {
      err = _err.data;
    }
  }

  return `${err || 'Unknown Error'}: ${code || 0}`;
};

exports.formatPluginTitle = (plg, item) => {
  let label;
  if (plg) {
    label = plg.label;

    const keys = Object.keys(item.data);
    if (keys.length > 0) {

      const getPrefix = key => {

        for (let option of plg.options) {
          if (option.key === key) {
            return option.prefix || '';
          }
        }
        return '';
      };

      label += keys.map(key => {
        const value = item.data[key];
        if (typeof value === 'string' && value.length > 0) {
          return ` ${getPrefix(key)}${item.data[key]}`;
        } else {
          return '';
        }
      }).join('');
      
    }
  } else {
    label = 'Unknown Plugin';
  }

  return label;
};

exports.formatPluginSubtitle = (item) => {
  let subtitle = ' ';
  if (item.error) {
    subtitle = item.error;
  } else {
    subtitle = `Priority: ${item.priority}`;
  }
  return subtitle;
};

exports.username = (str) => {
  if (!/^[a-zA-Z0-9]*$/.test(str)) {
    return 'Username can only contain alphanumeric characters';
  } else if (str.length < 3) {
    return 'Username must be atleast three characters';
  } else {
    return undefined;
  }
};

exports.password = (str) => {
  if (!/^[a-zA-Z0-9]{8,}$/.test(str)) {
    return 'Password must be atleast 8 alphanumeric characters, and contain atleast one number';
  } else {
    return undefined;
  }
};

exports.email = (str) => {
  // eslint-disable-next-line
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)) {
    return 'Please enter a valid email';
  } else {
    return undefined;
  }
};

exports.name = (str) => /^[a-zA-Z-]*$/.test(str);

exports.feedName = (str) => /^[a-zA-Z0-9-_]{1,32}$/.test(str);

