import React from "react";

// 函数组件
const MethodComponent1 = () => {
  return <div>i am a div method component 1</div>
}
// or
function MethodComponent2() {
  return <div>i am a div method component 2</div>
}

// 类组件
class ClassComponent extends React.Component {
  state = {
    counter: 0,
    names: ["刘德华", "张学友", "郭富城"],
  }

  addOne = () => {
    this.setState(
      {
        counter: this.state.counter + 1
      }
    )
  }
  
  render() {
    return (
      <>
        <div>i am a div class component</div>
        <button onClick={this.addOne}>按钮:{this.state.counter}</button>
        <ul>
          {
            this.state.names.map(({name, index}) => (
              <li key={index}>{name}</li>
            ))
          }
        </ul>
      </>
    )
  }
}




function App() {
  return (
    <div className="App">
      <MethodComponent1/>
      <MethodComponent2/>
      <ClassComponent/>
    </div>
  );
}
export default App;
