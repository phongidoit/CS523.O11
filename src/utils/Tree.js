import React from 'react';

export default function Tree(props) {
    const { data, chosenNode = null } = props;
    function renderTree(node) {
      return Object.entries(node).map(function ([key, value]) {
        // console.log(value)
        if (key === 'left' && typeof value === 'object') {
          if (value !== null) {
            return (
              <li key={value.key}>
                <Tree data={value} chosenNode={chosenNode} />
              </li>
            );
          }
          if (value === null) {
            return (null
              // <li key="null">
              //   {/* <Tree data={value} chosenNode={chosenNode} /> */}
              // </li>
            );
          }
        } else if (key === 'right' && typeof value === 'object') {
          if (value !== null) {
            return (
              <li key={value.key}>
                <Tree data={value} chosenNode={chosenNode} />
              </li>
            );
          }
          if (value === null) {
            return (null
              // <li key="null">
              //   {/* <Tree data={value} chosenNode={chosenNode} /> */}
              // </li>
            );
          }
        }
      });
    }
    if (data) {
      if (data.key === chosenNode) {
        return (
          <>
            <span className='tf-nc tf-chosen'>{data.key}({data.priority})</span>
            <ul>{renderTree(data)}</ul>
          </>
        )
      }
      else return (
        <>
          <span className='tf-nc'>{data.key}({data.priority})</span>
          <ul>{renderTree(data)}</ul>
        </>
      )
    }
    else return (
      <>
        <span className='tf-nc'>()</span>
      </>
    );
  }