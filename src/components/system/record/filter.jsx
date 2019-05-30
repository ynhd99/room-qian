import React from 'react';
import { Carousel } from 'antd';
import a from '../../../assets/a.jpeg';
import b from '../../../assets/b.jpeg';
import c from '../../../assets/c.jpeg';
import d from '../../../assets/d.jpeg';
import f from '../../../assets/f.jpeg';
import g from '../../../assets/g.jpeg';
import h from '../../../assets/h.jpeg';
import t from '../../../assets/t.jpg';

const RecordFilter = () => (
  <div style={{ height: '250' }}>
    <Carousel autoplay>
      <div>
        <table>
          <tr>
            <td>
              <img src={a} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
            <td>
              <img src={b} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
          </tr>
        </table>
      </div>
      <div>
        <table>
          <tr>
            <td>
              <img src={c} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
            <td>
              <img src={d} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
          </tr>
        </table>
      </div>
      <div>
        <table>
          <tr>
            <td>
              <img src={g} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
            <td>
              <img src={f} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
          </tr>
        </table>
      </div>
      <div>
        <table>
          <tr>
            <td>
              <img src={h} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
            <td>
              <img src={t} alt="没有图片啊" style={{ height: '250', width: '100%' }} />
            </td>
          </tr>
        </table>
      </div>
    </Carousel>
  </div>
  );

export default RecordFilter;
