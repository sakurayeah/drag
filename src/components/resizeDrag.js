import React from 'react';
import './index.less';

class ResizeDrag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 设置 drag 时，是否左右贴边
      // absorb: true,
      absorb: false,
    }

    /** 改变大小 */
    // 开始拖动的鼠标位置
    this.startX = 0;
    this.startY = 0;
    // 最小值
    this.minLeft = 200;
    this.minTop = 200;
    // 判断是否resize开始
    this.startResizeMove = false;
    // 当前拖拽的是谁
    this.target = null;
    // 当前视窗的宽高
    this.clientH = document.documentElement.clientHeight;
    this.clientW = document.documentElement.clientWidth;

    /** 拖拽 */
    // 判断拖动开始
    this.startDragMove = false;
  }

  componentDidMount() {
    // 鼠标放开
    document.addEventListener('mouseup', () => {
      /** resize */
      // reset 
      this.startResizeMove = false;
      this.target = null;
      
      /** drag */
      
      // 拖拽的时候贴边
      if(this.startDragMove && this.state.absorb) {
        if (this.wrap.offsetLeft <= (this.clientW - this.wrapW) / 2) {
          this.wrap.style.left = '0px';
        } else {
          this.wrap.style.left = `${this.clientW - this.wrapW}px`;
        }
      }
      // reset
      this.startDragMove = false;
    })

    // 鼠标移动
    document.addEventListener('mousemove', (e) => {
      // rezise
      if (this.startResizeMove) {
        // 当前移动时wrap的宽高 = 鼠标移动距离 + wrap的原本宽高
        let moveW = e.pageX - this.startX + this.wrapW;
        let moveH = e.pageY - this.startY + this.wrapH;
        // 宽高最小值
        moveW = Math.max(moveW, this.minLeft);
        moveH = Math.max(moveH, this.minTop);
        // 宽高最大值
        moveW = Math.min(moveW, this.clientW - this.wrapL);
        moveH = Math.min(moveH, this.clientH - this.wrapT);
        // 当前按下的是谁，对应变化宽高
        switch (this.target) {
          case this.r: {
            this.wrap.style.width = `${moveW}px`;
            break;
          }
          case this.b: {
            this.wrap.style.height = `${moveH}px`;
            break;
          }
          case this.rb: {
            this.wrap.style.width = `${moveW}px`;
            this.wrap.style.height = `${moveH}px`;
            break;
          }
        }
      }

      // drag
      if (this.startDragMove) {
        // 当前移动距离 = 鼠标移动距离 + 原本的 offset left/right
        let moveX = e.pageX - this.startX + this.wrapL;
        let moveY = e.pageY - this.startY + this.wrapT;
        // 设置移动边界
        moveX = Math.max(moveX, 0);
        moveX = Math.min(moveX, this.clientW - this.wrapW);
        moveY = Math.max(moveY, 0);
        moveY = Math.min(moveY, this.clientH - this.wrapH);
        // 位置改变
        this.wrap.style.left = `${moveX}px`;
        this.wrap.style.top = `${moveY}px`;
      }
    })
  }

  // 改变大小 鼠标按下
  resizeMouseDown(e) {
    // resize 开始
    this.startResizeMove = true;
    const target = e.currentTarget;
    // 鼠标按下时的坐标
    this.startX = e.pageX;
    this.startY = e.pageY;
    // 此时 wrap 的大小
    this.wrapW = this.wrap.offsetWidth;
    this.wrapH = this.wrap.offsetHeight;
    // 此时 wrap 的 offset 值
    this.wrapL = this.wrap.offsetLeft;
    this.wrapT = this.wrap.offsetTop;
    // 当前按下的是谁
    this.target = target;
  }

  // 拖动 鼠标按下
  dragMouseDown(e) {
    // drag 开始
    this.startDragMove = true;
    // 鼠标按下时的坐标
    this.startX = e.pageX;
    this.startY = e.pageY;
    // wrap 的 offset 值
    this.wrapL = this.wrap.offsetLeft;
    this.wrapT = this.wrap.offsetTop;
    // 此时 wrap 的大小
    this.wrapW = this.wrap.offsetWidth;
    this.wrapH = this.wrap.offsetHeight;
  }

  render() {
    return (
      <div className="resize-drag-wrap" ref={r => { this.wrap = r; }}>
        <div 
          className="title"
          onMouseDown={e => this.dragMouseDown(e)}
        >
          resizeDrag
        </div>

        按住title部分 可拖拽窗口位置
        <br />
        按住半透明部分 可以改变窗口大小
        <div
          className="resize-r"
          ref={r => { this.r = r; }}
          onMouseDown={(e) => this.resizeMouseDown(e)}
        />
        <div
          className="resize-b"
          ref={r => { this.b = r; }}
          onMouseDown={(e) => this.resizeMouseDown(e)}
        />
        <div
          className="resize-rb"
          ref={r => { this.rb = r; }}
          onMouseDown={(e) => this.resizeMouseDown(e)}
        />
      </div>
    )
  }
}

export default ResizeDrag;