import React from 'react';
import { List, Icon, Badge, Popconfirm } from 'antd';

const RecordBody = ({ record, mergeData, deleleRecord }) => {
  const recordList = record.recordList;
  return (
    <List
      itemLayout="horizontal"
      dataSource={recordList}
      renderItem={item => (
        <List.Item
          actions={[
            <a
              onClick={() => {
                mergeData({
                  oPty: 'edit',
                  id: item.id,
                  modalVisible: true,
                  title: item.title,
                  content: item.content,
                });
              }}
            >
              编辑
            </a>,
            <Popconfirm
              title="您确定要删除吗？"
              onConfirm={() => {
                deleleRecord({ id: item.id });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>,
          ]}
        >
          <List.Item.Meta
            avatar={
              // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Badge dot>
                <Icon type="notification" />
              </Badge>
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};
export default RecordBody;
