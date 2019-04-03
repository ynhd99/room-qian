import React from 'react';
import { Carousel } from 'antd';

const RecordFilter = ({ record }) => {
  const test = 1;
  return (
    <Carousel autoplay style={{ height: '200px' }}>
      <div>
        <img src="images/11.jpg" width="100%" style={{ height: '200px' }} alt="没有显示" />
      </div>
      <div>
        <img src="images/22.jpg" width="100%" alt="没有显示" />
      </div>
      <div>
        <img src="tt.jpg" alt="没有显示" />
      </div>
      <div>
        <h3>4</h3>
      </div>
    </Carousel>
  );
};

export default RecordFilter;
