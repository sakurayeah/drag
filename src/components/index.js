import { Link } from 'react-router-dom';
import React from 'react';
import TagDrag from './tagDrag';
import ResizeDrag from './resizeDrag';
import SplitPaneDrag from './splitPaneDrag';


function Home(props) {
  return (
    <div>
      {/* 小标签拖拽 */}
      <Link to="/tag">TagDrag</Link>
      <br />
      {/* 窗口缩放和拖拽任意位置 */}
      <Link to="/resize">ResizeDrag</Link>
      <br />
      {/* 窗口分割并且可以调节大小 */}
      <Link to="/splitpane">SplitPaneDrag</Link>
    </div>
  )
}

export default Home;