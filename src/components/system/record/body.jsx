import React from 'react';
import { List, Icon, Badge, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const RecordBody = ({ record, mergeData, deleleRecord }) => {
  const recordList = record.recordList;
  return (
    <List
      itemLayout="horizontal"
      dataSource={recordList}
      renderItem={item => (
        <List.Item
          actions={[
            <Permission path={INVENTORY_PERMISSION.RECORD_LIST.OPTION.code}>
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
              </a>
              <Popconfirm
                title="您确定要删除吗？"
                onConfirm={() => {
                  deleleRecord({ id: item.id });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> | 删除</a>
              </Popconfirm>
            </Permission>
          ]}
        >
          <List.Item.Meta
            avatar={
              // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Badge dot>
                <Icon type="notification" />
              </Badge>
            }
      title={<a href="https://ant.design">{item.title}(发布时间：{item.updateTime})</a>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};
export default RecordBody;
