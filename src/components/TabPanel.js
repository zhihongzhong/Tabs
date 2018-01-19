import React, {Component,cloneElement} from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

class TabPanel extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    order: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool
  };

  render() {
    const { classPrefix, className, isActive, children } = this.props;

    const classes = classNames({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive
    });

    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}>
        {children}
      </div>
    )
  }
}

export default TabPanel;