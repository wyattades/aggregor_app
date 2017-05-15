// import validUrl from 'valid-url';

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

// exports.validURL = (str) => {
//     return validUrl.isWebUri(str);
// };

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
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)) {
    return 'Please enter a valid email';
  } else {
    return undefined;
  }
};

exports.name = (str) => {
  return /^[a-zA-Z-]*$/.test(str);
};

exports.feedName = (str) => {
  return /^[a-zA-Z0-9-_]{1,32}$/.test(str);
};

