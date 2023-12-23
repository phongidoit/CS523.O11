import React from 'react';
// import { BinarySearchTree } from './utils/BinarySearchTree';
import { setDelayTime,Treap } from './utils/Treap';
import Tree from './utils/Tree';
import Slider from '@mui/material/Slider'

const T = new Treap();

function App() {
  const [number, setNumber] = React.useState(50);
  // let number;
  const [root, setRoot] = React.useState(null);
  const [chosenNode,setChosenNode] = React.useState(null);
  // const numList = {}
  React.useEffect(() => {
    // T.insert(T.root,2, setChosenNode)
    // T.insert(T.root,1, setChosenNode)
    // T.insert(T.root,3, setChosenNode)
    setRoot((prev) => ({ ...prev, ...T.root }));
  }, []);

  function changeNumber(e) {
    setNumber(Number(e.target.value));
  }

  async function addNumber(e) {
    e.preventDefault();
    await T.insert(T.root,number, setChosenNode);
    console.log(T.root);
    setChosenNode(number);
    setRoot((prev) => ({ ...prev, ...T.root }));
    // setRoot(T.root)
    
  }

  function removeNumber(e) {
    e.preventDefault();
    T.deleteNode(T.root,number)
    setChosenNode(null)
    // console.log(T.root)
    // setRoot(T.root)
    setRoot((prev) => ({ ...prev, ...T.root }));
  }
  
  async function searchNode(e) {
    e.preventDefault();
    let searchedNode =  await T.search(T.root,number,setChosenNode)

    if (!searchedNode)
    {
      setChosenNode(null) 
      alert("NOT FOUND")
      return
    }

    if (number === searchedNode.key ) {
      setChosenNode(number)
      alert("FOUND")
    }
    else {
      setChosenNode(null)
      alert("NOT FOUND")
    }
  } 

  return (
    <div className="container">
      <h1 style={{textAlign:'center'}}>Treap Visualization</h1>
      <form onSubmit={addNumber} className="form-control">
        <input type="number" min="1" name="add" onChange={(e) => { changeNumber(e)}} required />
        <button type="submit" className="input-button">
          Add
        </button>
      </form>
      <form onSubmit={removeNumber} className="form-control">
        <input type="number" min="1" name="remove" onChange={(e) => { changeNumber(e)}} required />
        <button type="submit" className="input-button">
          Remove
        </button>
      </form>
      <form onSubmit={searchNode} className="form-control">
        <input type="number" min="1" name="add" onChange={(e) => { changeNumber(e)}} required />
        <button type="submit" className="input-button">
          Find
        </button>
        <div>
        Animation delay
        </div>
        <Slider size="small" defaultValue={0} aria-label="Small" 
          min={0} max={1000} valueLabelDisplay="auto" style={{width:"10rem"}}
          onChange={(e) => {setDelayTime(e.target.value)}}/>
      </form>
      <div className="tf-tree tf-custom">
        <ul>
          <li>
            <Tree data={root} chosenNode={chosenNode}/>
          </li>
        </ul>
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
