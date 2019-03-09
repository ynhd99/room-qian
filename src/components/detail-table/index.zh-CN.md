---
category: Components
type: 其它
title: DetailTable
subtitle: 详情表格
cols: 1
---

增删字段后能够自适应排版的详情表格。支持单元格跨列。

## API

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| dataSource | 详情数据 | array | [] |
| columnCount | 表格列数 | number | 6 |
| tableClassName | 表格 CSS 类名 | string | 'kb-detail-table' |
| labelCellClassName | 字段名单元格 CSS 类名 | string | 'kb-detail-table-label' |
| valueCellClassName | 字段值单元格 CSS 类名 | string | 'kb-detail-table-value' |
| emptyCellClassName | 空单元格 CSS 类名 | string | 'kb-detail-table-empty' |

#### dataSource

| 参数      | 说明                                     | 类型 | 默认值 |
|-----------|-----------------------------------------|-----|--------|
| label | 字段名 | string | - |
| value | 字段值 | string\|ReactNode\|array<string\|ReactNode> | - |
| colSpan | 字段值单元格跨的列数 | number | 1 |
| isSkipped | 是否跳过该字段 | boolean | false |

