import React, {Component,cloneElement} from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
//import style from './tabs.scss';
import TabNav from "./TabNav";
import TabContent from "./TabContent";

class Tabs extends Component {
  static propTypes ={
    className: PropTypes.string,
    classPrefix : PropTypes.string,
    children : PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    defaultActiveIndex : PropTypes.number,
    activeIndex : PropTypes.number,
    onChange : PropTypes.func
  };

  static defaultProps ={
    classPrefix : 'tabs',
    onChange: ()=>{}
  };

  constructor(props){
    super(props);

    //对时间方法的绑定
    this.handleTabClick = this.handleTabClick.bind(this);

    const currProps = this.props;

    let activeIndex;
    if('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    }else if('defaultActiveIndex' in currProps){
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      preIndex:activeIndex
    };
  }

  componentWillReceiveProps(nextProps) {

    if('activeIndex' in nextProps){
      this.setState({
        activeIndex : nextProps.activeIndex
      });
    }
  }

  handleTabClick(activeIndex) { 
    const prevIndex = this.state.activeIndex;

    //  如果当前activeIndex 与传入的 activeIndex 不一致，
    //  并且 props 钟存在defaultActiveIndex 时，则更新
    if(this.state.activeIndex !== activeIndex &&
    'defaultActiveIndex' in this.props){
      this.setState({
        activeIndex,
        prevIndex
      });
    }

    //  更新后执行回调函数， 抛出当前索引和上一次索引
    this.props.onChange({activeIndex, prevIndex});
  }

  renderTabNav() {
    const { classPrefix, children } = this.props;
    
    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    )
  }


  renderTabContent() {
    const {classPrefix, children} = this.props;

    return (
      <TabContent
        key="tabcontent"
        classPrefix={classPrefix}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    );
  }


  render() {
    const { className }  = this.props;
    // classnames 用于合并 class
    const classes = classNames(className,'tabs');
    
    return (
      <div className={classes}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    )
  }
}

export default Tabs;
