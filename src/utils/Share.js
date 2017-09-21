import { Platform, Share as NativeShare } from 'react-native';

let Share;
if (Platform.OS === 'web') {

  const share = (content, options) => {
    
    alert(content.message);

    return Promise.resolve();
  };

  Share = {
    share,
  };
} else {
  Share = NativeShare;
}

export default Share;
