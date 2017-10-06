import React, { PureComponent } from 'react';
import Drawer from 'react-sidebar';

import DrawerContent from './Drawer';

const styles = {
  sidebar: {
    display: 'flex',
    right: 50,
  },

  content: {
    display: 'flex',
  },
};

class MotionDrawer extends PureComponent {

  state = {
    open: false,
  }

  _setOpen = open => this.setState({ open });

  close = () => this.setState({ open: false });

  toggle = () => this.setState({ open: !this.state.open });

  render() {
    const { children, disabled, ...rest } = this.props;

    return (
      <Drawer
        sidebar={<DrawerContent {...rest}/>}
        touch={!disabled}
        shadow={this.state.open}
        open={!disabled && this.state.open}
        onSetOpen={this._setOpen}
        styles={styles}
      >
        {children}
      </Drawer>
    );
  }
}

export default MotionDrawer;
