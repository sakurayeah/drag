import React from 'react';
import './index.less';

class TagDrag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topArr: [],
      btmArr: [],
    }
    this.arrNewId = 0;
    this.dragStartInfo = {};
    this.dragEnterInfo = {};
    this.timer = null;
  }

  componentDidMount() {
    const { btmArr = [], topArr = [] } = this.props;

    // 给 btm 的每项添加 arrId
    btmArr.forEach(v => {
      this.arrNewId += 1;
      v.arrId = this.arrNewId;
    });

    this.setState({
      btmArr,
      topArr,
    })
  }

  // 拖拽时，对 btm 里的标签做换顺序处理
  btmArrSort(btmArr = [], target) {
    const arrId = this.dragStartInfo.arrId;
    let arr = [...btmArr];
    // 获取 index
    const index = target.getAttribute('index');
    if (index) {
      arr = [];
      let currentIndex;
      btmArr.forEach((v, i) => {
        if (v.arrId !== arrId) { // 将当天target从数组中剔除
          arr.push(v)
        } else { // 获取当天target的位置
          currentIndex = i;
        }
      });
      // 将当前target再插入到原数组指定位置中
      arr.splice(index, 0, this.dragStartInfo);
    }
    return arr;
  }


  // 开始拖拽
  dragStart(e, v) {
    const { btmArr } = this.state;
    // 判断当前拖动的属于 top 还是 btm
    const isTop = btmArr.every(t => t.arrId !== v.arrId);
    if (isTop) { // 拖拽的是 top 的
      this.arrNewId += 1;
      this.dragStartInfo = {
        ...v,
        arrId: this.arrNewId,
      };
    } else { // 拖拽的是 btm 的
      this.dragStartInfo = v;
    }

    console.log('dragStart dragStartInfo isTop', this.dragStartInfo, isTop)
  }

  // 进入目标容器
  dragEnter(e, v) {
    e.preventDefault();
    const target = e.target;
    // 防抖动
    // clearTimeout(this.timer);
    // this.timer = setTimeout(() => {

      // 进入目标容器
      // if (target === this.dropContainer) { // 当前 target 是 btm 容器
        this.dragEnterInfo = this.dragStartInfo;
      // } 
      

      const { btmArr } = this.state;

      // 判断当前拖动的属于 top 还是 btm
      const isTop = btmArr.every(t => t.arrId !== this.dragStartInfo.arrId);

      if (isTop) { // 从 top 拖拽下来的，进入 btm 容器时默认插入到最后一个
        this.setState({
          btmArr: [...btmArr, this.dragStartInfo],
        })

      } else { // 在 btm 容器内拖拽的
        this.setState({
          btmArr: this.btmArrSort(btmArr, target),
        })
      }

      // if (target === this.dropContainer) { // 当前 target 是 btm 容器
      // } else { // 当前 target 是 小标签
      // }
    // }, 100);
  }

  // 拖拽结束
  dragEnd() {

  }

  // 删除标签
  delBtmDrag(v) {
    const { btmArr } = this.state;
    const arr = btmArr.filter(t => t.arrId !== v.arrId);
    this.setState({
      btmArr: arr,
    })
  }

  // 进入垃圾桶
  recycleEnter() {
    const { btmArr } = this.state
    const arrId = this.dragEnterInfo.arrId;
    this.setState({
      btmArr: btmArr.filter(t => t.arrId !== arrId),
    })
  }

  // 添加 btm 的标签
  btmAddDrag() {
    const { btmArr } = this.state;
    this.arrNewId += 1;

    const obj = {
      arrId: this.arrNewId,
      text: this.ipt.value
    }

    this.setState({
      btmArr: [...btmArr, obj],
    })
  }

  render() {
    const { topArr, btmArr } = this.state;
    return (
      <div className="tag-drag-wrap">
        <h2>tag drag</h2>
        <div className="top-arr">
          {
            topArr.map((v, i) => (
              <div
                className="list"
                key={i}
                draggable="true"
                data={v}
                onDragStart={e => this.dragStart(e, v)}
                onDragEnd={e => this.dragEnd(e)}
              >
                {v.text}
              </div>
            ))
          }
        </div>
        <div
          className="btm-arr"
          ref={(r) => { this.dropContainer = r; }}
          onDragEnter={e => this.dragEnter(e)}
        >
          {
            btmArr.map((v, i) => (
              <div
                className="list"
                key={i}
                index={i}
                draggable="true"
                data={v}
                onDragStart={e => this.dragStart(e, v)}
                onDragEnd={e => this.dragEnd(e)}
              >
                <p className="close" onClick={() => this.delBtmDrag(v)} />
                {v.text}
              </div>
            ))
          }
        </div>
        <div className="recycle-bin" onDragEnter={e => this.recycleEnter(e)}>
          垃圾桶
        </div>
        <input placeholder="输入内容" ref={r => { this.ipt = r; }} />
        <button onClick={() => this.btmAddDrag()}>add</button>
      </div>
    )
  }
}

export default TagDrag;