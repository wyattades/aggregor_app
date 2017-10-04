import React, { PureComponent } from 'react';
import Drawer from 'react-native-drawer';

import DrawerContent from './Drawer';

class MotionDrawer extends PureComponent {

  close = () => this._drawer.close();

  toggle = () => this._drawer.toggle();
  
  render() {
    const { children, disabled, ...rest } = this.props;

    return (
      <Drawer
        ref={_ => { this._drawer = _; }}
        open={disabled ? false : null}
        disabled={disabled}
        tapToClose
        captureGestures
        type="overlay"
        openDrawerOffset={50}
        panOpenMask={20}
        elevation={4}
        negotiatePan
        tweenHandler={ratio => ({
          mainOverlay: {
            opacity: ratio / 2,
            backgroundColor: '#000',
          },
        })}
        content={<DrawerContent {...rest}/>}
      >
        {children}
      </Drawer>
    );
  }
}

export default MotionDrawer;
