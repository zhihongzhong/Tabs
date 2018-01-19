import React, { Component } from 'react'; 
import Tabs from "./Tabs";
import TabPanel from "./TabPanel";
import "../styles/main.scss";

class App extends Component {
  constructor(props){
    super(props);
    const currProps = this.props;
    let activeIndex = 0;
    if('activeIndex' in currProps){
      activeIndex = currProps.activeIndex;
    }else if('defaultActiveIndex' in currProps){
      activeIndex = currProps.defaultActiveIndex;
    }
    this.state = {
      activeIndex,  
      preIndex : activeIndex
    };
  }
  static defaultProps = {
    activeIndex : 0,
    defaultActiveIndex : 0
  }
  render() {

    return (
      <Tabs calssPrefix={'tabs'} defaultActiveIndex={0}>
        <TabPanel order={0} tab={'Tab 1'}>第一个 Tab 里面的内容</TabPanel>
        <TabPanel order={1} tab={'Tab 2'}>第二个 Tab 里面的内容</TabPanel>
        <TabPanel order={2} tab={'Tab 3'}>第三个 Tab 里面的内容</TabPanel>
        <TabPanel order={3} tab={'Tab 4'}>第四个 Tab 里面的内容</TabPanel>
        <TabPanel order={4} tab={'Tab 5'}>第五个 Tab 里面的内容</TabPanel>
      </Tabs>
    );
  }
}

export default App;
