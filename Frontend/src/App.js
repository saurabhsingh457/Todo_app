import React from 'react';
import Post from "./comp/newpost"
const App = () => {
  return (
    <div>
      <h1 > TO-DO APP</h1>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      <Post/>
      </div>
    </div>
  );
};

export default App;