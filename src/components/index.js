import React from 'react';
import TagDrag from './tagDrag';
import ResizegDrag from './resizeDrag';
import SplitPaneDrag from './splitPaneDrag';

const topArr = [
  {
    id: 1,
    text: '1'
  },
  {
    id: 2,
    text: '2'
  },
  {
    id: 3,
    text: '3'
  }
];

const btmArr = [
  {
    id: 4,
    text: '444444'
  },
  {
    id: 5,
    text: '555555'
  },
  {
    id: 6,
    text: '666666'
  },
  {
    id: 7,
    text: '677777'
  },
  {
    id: 8,
    text: '888888'
  }
];

function Home(props) {
  return (
    <div>
      {/* 小标签拖拽 */}
      <TagDrag topArr={topArr} btmArr={btmArr} />
      <br />
      <hr />
      {/* 窗口缩放和拖拽任意位置 */}
      <ResizegDrag />
      {/* 窗口分割并且可以调节大小 */}
      <br />
      <SplitPaneDrag />
    </div>
  )
}

export default Home;