import React from 'react';
import './index.less';

// 获取兄弟元素
function getSibilingsNode(ele, num = 0) {
  const parsent = ele.parentNode;//获取元素父元素
  const childrens = parsent.childNodes;//获取兄弟元素
  for (let i = 0; i < childrens.length; i += 1) {
    if (childrens[i] == ele) {
      return childrens[i + num];
    }
  }
}

class SplitPaneDrag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // 判断鼠标拖动方向 horizontal/vertical
    this.direction = null;
    // 鼠标初始化坐标
    this.startX = null;
    this.startY = null;
    // 前一个div
    this.targetPrev = null;
    this.prevW = null;
    this.prevH = null;
    // 后一个div
    this.targetNext = null;
    this.nextW = null;
    this.nextH = null;
  }

  componentDidMount() {
    // 鼠标放开
    document.addEventListener('mouseup', () => {
      // reset
      this.direction = null;
      this.startX = null;
      this.startY = null;
    })

    // 鼠标移动
    document.addEventListener('mousemove', (e) => {
      // 鼠标横向移动
      if (this.direction === 'col') {
        // 左边div宽度
        let prevW = this.prevW + e.pageX - this.startX;
        // 右边div宽度
        let nextW = this.nextW - (e.pageX - this.startX);
        // 设置最小值
        const minW = 15;
        prevW = Math.max(prevW, minW);
        nextW = Math.max(nextW, minW);
        // 设置最大值
        const maxW = this.prevW + this.nextW - minW;
        prevW = Math.min(prevW, maxW);
        nextW = Math.min(nextW, maxW);
        // 设置样式
        this.targetPrev.style.width = `${prevW}px`;
        this.targetNext.style.width = `${nextW}px`
      }

      if (this.direction === 'row') {
        // 上面div高度
        let prevH = this.prevH + e.pageY - this.startY;
        // 下面div高度
        let nextH = this.nextH - (e.pageY - this.startY);
        // 设置最小值
        const minH = 15;
        prevH = Math.max(prevH, minH);
        nextH = Math.max(nextH, minH);
        // 设置最大值
        const maxW = this.prevH + this.nextH - minH;
        prevH = Math.min(prevH, maxW);
        nextH = Math.min(nextH, maxW);
        // 设置样式
        this.targetPrev.style.height = `${prevH}px`;
        this.targetNext.style.height = `${nextH}px`
      }

    })
  }

  // 鼠标按下
  mouseDown(e, direction) {
    const target = e.currentTarget;
    this.direction = direction;
    this.startX = e.pageX;
    this.startY = e.pageY;
    // 前一个div
    this.targetPrev = getSibilingsNode(target, -1);
    this.prevW = this.targetPrev.offsetWidth;
    this.prevH = this.targetPrev.offsetHeight;
    // 后一个div
    this.targetNext = getSibilingsNode(target, 1);
    this.nextW = this.targetNext.offsetWidth;
    this.nextH = this.targetNext.offsetHeight;
  }

  render() {
    return (
      <div className="split-pane-drag-wrap">
        <h2>split pane drag</h2>
        <div className="container">
          <div className="l-col"></div>
          <div className="split-col" onMouseDown={(e) => this.mouseDown(e, 'col')}></div>
          <div className="m-col"></div>
          <div className="split-col" onMouseDown={(e) => this.mouseDown(e, 'col')}></div>
          <div className="r-col">
            <div className="t-row"></div>
            <div className="split-row" onMouseDown={(e) => this.mouseDown(e, 'row')}></div>
            <div className="m-row"></div>
            <div className="split-row" onMouseDown={(e) => this.mouseDown(e, 'row')}></div>
            <div className="b-row"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default SplitPaneDrag;