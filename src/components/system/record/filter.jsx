import React from 'react';
import { Carousel } from 'antd';
import a from '../../../assets/a.jpeg';
import b from '../../../assets/b.jpeg';
import c from '../../../assets/c.jpeg';
import d from '../../../assets/d.jpeg';

const RecordFilter = () => {
  const test = 1;
  return (
    // 添加背景图片
    // <div
    //   style={{
    //     backgroundImage: `url(${logo})`,
    //     height: '150',
    //   }}
    // />
    <div style={{ height: '250' }}>
      <Carousel autoplay>
        <div>
          <img src={a} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
        </div>
        <div>
          <img src={b} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
        </div>
        <div>
          <img src={c} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
        </div>
        <div>
          <img src={d} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
        </div>
      </Carousel>
    </div>
  );
};

export default RecordFilter;
