module.exports = {
  SUB0: {
    code: '610000',
    description: '系统设置',
  },
  SUB1: {
    code: '611000',
    description: '宿舍管理',
  },
  SUB2: {
    code: '612000',
    description: '公共财产管理',
  },
  SUB3: {
    code: '613000',
    description: '外来人员管理',
  },
  SUB4: {
    code: '614000',
    description: '卫生管理',
  },
  PRICE_LIST: {
    PAGE: { code: '615012', description: '配送售价单' },
    VIEW: { code: '61501201', description: '配送售价单_查看' },
    EDIT: { code: '61501202', description: '配送售价单_编辑' },
    ABOLISH: { code: '61501206', description: '配送售价单_整单作废' },
    DELETE: { code: '61501202', description: '配送售价单_删除' },
    CREATE: { code: '61501202', description: '配送售价单_新增' },
    VERIFY: { code: '61501206', description: '配送售价单_审核' },
  },
  COSTS_LIST: {
    PAGE: { code: '613003', description: '供应商定价单' },
    VIEW: { code: '61501201', description: '供应商定价单_查看' },
    EDIT: { code: '61501202', description: '供应商定价单_编辑' },
    ABOLISH: { code: '61501206', description: '供应商定价单_整单作废' },
    DELETE: { code: '61501202', description: '供应商定价单_删除' },
    CREATE: { code: '61501202', description: '供应商定价单_新增' },
    VERIFY: { code: '61501206', description: '供应商定价单_审核' },
    EXPORT: { code: '61501206', description: '供应商定价单_导出' },
  },
  DEPOT_RELATION: {
    PAGE: { code: '611005', description: '仓库配送关系设置' },
    CREATE: { code: '61100501', description: '仓库配送关系设置_新增' },
    BATCH_DELETE: { code: '61100501', description: '仓库配送关系设置_批量删除' },
    DELETE: { code: '61100501', description: '仓库配送关系设置_删除' },
  },
  SUPPLIER_TYPE: {
    PAGE: { code: '611006', description: '供应商类型' },
    CREATE: { code: '61100601', description: '供应商类型_添加' },
    EDIT: { code: '61100602', description: '供应商类型_编辑' },
    DELETE: { code: '61100603', description: '供应商类型_删除' },
  },
  DISPATCH_CHECK: {
    PAGE: { code: '614013', description: '配送验收' },
    VIEW: { code: '61401300', description: '配送验收_查看' },
    CHECK: { code: '61401301', description: '配送验收_验收' },
  },
  DISPATCH_ORDERS: {
    PAGE: { code: '615010', description: '配送订单' },
    VIEW: { code: '61501000', description: '配送订单_查看' },
    EXPORT: { code: '61501000', description: '配送订单_导出' },
    EDIT: { code: '61501003', description: '配送订单_编辑' },
    CLOSE: { code: '61501003', description: '配送订单_关闭' },
    SUBMIT: { code: '61501003', description: '配送订单_提交' },
    PRINT: { code: '61501003', description: '配送订单_打印' },
    CREATE: { code: '61501005', description: '配送订单_生成备货分拣单' },
    REVERSED: { code: '61501006', description: '配送订单_反审核' },
  },
  DISPATCH_OUT: {
    PAGE: { code: '615011', description: '配送出库' },
    VIEW: { code: '61501100', description: '配送出库_查看' },
    EXPORT: { code: '61501100', description: '配送出库_导出' },
    OUT: { code: '61501103', description: '配送出库_出库' },
  },
  STOCK_OFFICIAL_INVOICING_IN: {
    PAGE: { code: '615029', description: '库存管理' },
  },
  STOCK_PURCHASE_TEMPLATE_TYPE: {
    PAGE: { code: '619002', description: '模板管理' },
  },
  DELIVERY_PRICE_LIST: {
    PAGE: { code: '615013', description: '配送售价综合查询' },
    ABOLISH: { code: '61501301', description: '配送售价综合查询_作废' },
  },
  GLOBAL_INOUT_DETAILS: {
    PAGE: { code: '615014', description: '进销存明细报表' }, // 确认作废
    EXPORT: { code: '61501401', description: '进销存明细报表_导出表格', ignore: true }, // 确认作废
  },
  CHECK_INOUT_DETAILS: {
    PAGE: { code: '615015', description: '盘存明细表' }, // 确认作废
    EXPORT: { code: '61501501', description: '盘存明细表_导出表格', ignore: true }, // 确认作废
  },
  // DISTRIBUTION_DETAILS: {
  //   PAGE: { code: '615016', description: '配送出库明细报表' },
  //   EXPORT: { code: '61501601', description: '配送明细报表_导出表格', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  // PURCHASE_DETAILS: {
  //   PAGE: { code: '615017', description: '采购明细报表' },
  //   EXPORT: { code: '61501701', description: '采购明细报表_导出表格', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  CANN_MANAGE: {
    PAGE: { code: '615005', description: '总部调拨管理' },
    ADD: { code: '61500501', description: '总部调拨管理_新增调拨单' },
    DELETE: { code: '61500501', description: '总部调拨管理_删除' },
    SUBMIT: { code: '61500501', description: '总部调拨管理_编辑' },
    VIEW: { code: '61500500', description: '总部调拨管理_查看' },
    EXPORT: { code: '61500500', description: '总部调拨管理_导出' },
  },
  MATERIAL_OUT_GOING_PRODUCTION: {
    PAGE: { code: '615059', description: '领料出库' },
    ABOLISH: { code: '61505902', description: '领料出库_作废' },
    OUT: { code: '61505901', description: '领料出库_出库' },
    VIEW: { code: '61505900', description: '领料出库_查看' },
  },
  PARAMETER_SETTING: {
    PAGE: { code: '611014', description: '参数设置' },
    SAVE: { code: '61101401', description: '参数设置_保存' },
  },
  CLEAN_DATA: {
    PAGE: { code: '611015', description: '数据清理' },
    CLEAN: { code: '61101501', description: '数据清理_清理' },
  },
  TAX_RATE: {
    PAGE: { code: '611001', description: '税率设置' },
    VIEW: { code: '61100100', description: '税率设置_查看' },
    CREATE: { code: '61100101', description: '税率设置_添加' },
    EDIT: { code: '61100101', description: '税率设置_编辑' },
    DELETE: { code: '61100101', description: '税率设置_删除' },
  },
  SUPPLY_RELATION: {
    PAGE: { code: '611002', description: '采购关系设置' },
    CREATE: { code: '61100201', description: '供货关系设置_新增供货关系' },
    PRIORITY: { code: '61100202', description: '供货关系设置_设置供货优先级' },
    PRIORITY_ONE: { code: '61100202', description: '采购关系设置_设置单个物品的优先级' },
    EDIT: { code: '61100201', description: '供货关系设置_修改' },
    DELETE: { code: '61100201', description: '供货关系设置_删除' },
  },
  UNIT: {
    PAGE: { code: '611003', description: '单位管理' },
    CREATE: { code: '61100301', description: '单位管理_新增' },
    EDIT: { code: '61100301', description: '单位管理_编辑' },
    DELETE: { code: '61100301', description: '单位管理_删除' },
  },
  DEPOT: {
    PAGE: { code: '611004', description: '仓库档案' },
    CREATE: { code: '61100401', description: '仓库档案_新增' },
    EDIT: { code: '61100401', description: '仓库档案_编辑' },
    DELETE: { code: '61100401', description: '仓库档案_删除' },
    WRITE_DOWNS: { code: '61100401', description: '仓库档案_设置冲减物品' },
    DEFAULT: { code: '61100401', description: '仓库档案_默认仓库' },
  },
  GOODS_RELATION: {
    PAGE: { code: '61100708', description: '物品关系设置' },
    CREATE: { code: '6110070801', description: '物品关系设置_添加物品' },
    DELETE_ALL: { code: '6110070801', description: '物品关系设置_批量删除' },
    GOODS_COPY: { code: '6110070801', description: '物品关系设置_添加物品关系' },
    STALL_COPY: { code: '6110070801', description: '物品关系设置_复制物品关系' },
  },
  DISH_RELATION: {
    PAGE: { code: '61100705', description: '基本设置_档口管理_菜品关系设置_查看' },
    ADD: { code: '6110070501', description: '基本设置_档口管理_菜品关系设置_添加' },
    COPY: { code: '6110070501', description: '基本设置_档口管理_菜品菜品关系_复制' },
  },
  ITEM_TYPE: {
    PAGE: { code: '612001', description: '物品管理物品类别' },
    CREATE: { code: '61200101', description: '物品管理物品类别_新增类别' },
    EDIT: { code: '61200101', description: '物品管理物品类别_编辑' },
    DELETE: { code: '61200101', description: '物品管理物品类别_删除' },
  },
  ITEM_LIST: {
    PAGE: { code: '612002', description: '物品管理物品档案' },
    CREATE: { code: '61200201', description: '物品管理物品档案_新增物品' },
    IMPORT: { code: '61200201', description: '物品管理物品档案_批量导入' },
    EDIT: { code: '61200201', description: '物品管理物品档案_编辑' },
    DELETE: { code: '61200201', description: '物品管理物品档案_删除' },
    TEMPLATE: { code: '61200201', description: '物品管理物品档案_模板下载' },
  },
  FINISHED_PRODUCT_MANAGE: {
    PAGE: { code: '612003', description: '加工品管理' },
    MODIFY: { code: '61200300', description: '加工品管理_修改/批量修改' },
  },
  SUPPLIER: {
    PAGE: { code: '613001', description: '供应商档案' },
    VIEW: { code: '61300100', description: '供应商档案_查看' },
    CREATE: { code: '61300101', description: '供应商档案_添加' },
    EDIT: { code: '61300101', description: '供应商档案_编辑' },
    DELETE: { code: '61300101', description: '供应商档案_删除/停用/启用' },
    PLATFORM: { code: '61300102', description: '供应商档案_绑定/解绑/批量绑定/批量解绑/同步' },
  },
  REQUISITION: {
    PAGE: { code: '614001', description: '门店请购单' },
    CREATE: { code: '61400101', description: '门店进销存管理门店请购_新增请购单' },
    VIEW: { code: '61400100', description: '门店进销存管理门店请购_查看' },
    EXPORT: { code: '61400100', description: '门店进销存管理门店请购_导出' },
    EDIT: { code: '61400101', description: '门店进销存管理门店请购_编辑' },
    DELETE: { code: '61400101', description: '门店进销存管理门店请购_删除' },
  },
  STOCK_PURCHASE: {
    PAGE: { code: '614033', description: '门店进销存管理门店自采单' },
    VIEW: { code: '61403300', description: '门店进销存管理门店自采单_查看' },
    EXPORT: { code: '61403300', description: '门店进销存管理门店自采单_导出' },
    CREATE: { code: '61403302', description: '门店进销存管理门店自采单_新增采购单' },
    CHECK: { code: '61403303', description: '门店进销存管理门店自采单_审核' },
    EDIT: { code: '61403303', description: '门店进销存管理门店自采单_编辑' },
    DELETE: { code: '61403303', description: '门店进销存管理门店自采单_删除' },
    REVERSED: { code: '61403304', description: '门店进销存管理门店自采单_反审核' },
    REVERSED_ALL: { code: '61403308', description: '门店进销存管理门店自采单_批量反审核' },
    ABOLISH_ALL: { code: '61403305', description: '门店进销存管理门店自采单_批量作废' },
    CLOSE_ALL: { code: '61403306', description: '门店进销存管理门店自采单_批量关单' },
    RECLOSE_ALL: { code: '61403307', description: '门店进销存管理门店自采单_批量反关单' },
  },
  STOCK_DISPATCH_CHECK: {
    PAGE: { code: '614024', description: '验收管理' },
  },
  PURCHASE_CHECK: {
    PAGE: { code: '614025', description: '自采验收' },
    VIEW: { code: '61402500', description: '门店进销存管理自采验收_查看' },
    VERIFY: { code: '61402501', description: '门店进销存管理采购验收_验收' },
    NO_DIFF_VERIFY: { code: '61402501', description: '门店进销存管理采购验收_无差异验收' },
  },
  DIRECT_CHECK: {
    PAGE: { code: '614002', description: '门店进销存管理直运验收_查看' },
    VERIFY: { code: '61400201', description: '门店进销存管理直运验收_验收' },
    VIEW: { code: '61400200', description: '门店进销存管理直运验收_查看' },
  },
  STOCK_IN: {
    PAGE: { code: '614004', description: '门店进销存管理入库管理' },
    CREATE: { code: '61400301', description: '门店进销存管理入库管理_新增入库单' },
    VIEW: { code: '61400300', description: '门店进销存管理入库管理_查看' },
    EXPORT: { code: '61400300', description: '门店进销存管理入库管理_导出' },
    EDIT: { code: '61400301', description: '门店进销存管理入库管理_编辑' },
    DELETE: { code: '61400301', description: '门店进销存管理入库管理_删除' },
    ANTI_VERIFY: { code: '61400306', description: '门店进销存管理入库管理_反审核' },
    TRANSFER: { code: '61400301', description: '门店进销存管理入库管理_编辑' },
    IN_DEPOT: { code: '61400301', description: '门店进销存管理入库管理_入库' },
  },
  STOCK_OUT: {
    PAGE: { code: '614005', description: '门店进销存管理出库管理' },
    CREATE: { code: '61400401', description: '门店进销存管理出库管理_新增出库单' },
    VIEW: { code: '61400400', description: '门店进销存管理出库管理_查看' },
    TRANSFER: { code: '61400401', description: '门店进销存管理出库管理_编辑' },
    ANTI_VERIFY: { code: '61400404', description: '门店进销存管理出库管理_反审核' },
    DELETE: { code: '61400401', description: '门店进销存管理出库管理_删除' },
    EXPORT: { code: '61400400', description: '门店进销存管理出库管理_导出' },
    TEMPORARY_SAVE: { code: '61400401', description: '门店进销存管理出库管理_暂存' },
  },
  STOCK_TRANSFER: {
    PAGE: { code: '614027', description: '门店进销存管理调拨管理_店内调拨' },
    CREATE: { code: '61400501', description: '门店进销存管理调拨管理_新增调拨单' },
    VIEW: { code: '61400500', description: '门店进销存管理调拨管理_查看' },
    TRANSFER: { code: '61400501', description: '门店进销存管理调拨管理_编辑' },
    DELETE: { code: '61400501', description: '门店进销存管理调拨管理_删除' },
    EXPORT: { code: '61400500', description: '门店进销存管理调拨管理_导出' },
    ALLOT: { code: '61400501', description: '门店进销存管理调拨管理_调拨' },
  },
  STOCK_CHECK: {
    PAGE: { code: '614007', description: '门店进销存管理盘点管理' },
    CREATE: { code: '61400601', description: '门店进销存管理盘点管理_新增盘点单' },
    VIEW: { code: '61400600', description: '门店进销存管理盘点管理_查看' },
    TRANSFER: { code: '61400601', description: '门店进销存管理盘点管理_编辑' },
    DELETE: { code: '61400601', description: '门店进销存管理盘点管理_删除' },
    EXPORT: { code: '61400600', description: '门店进销存管理盘点管理_导出' },
    EDIT: { code: '61400601', description: '门店进销存管理盘点管理_编辑' },
  },
  PURCHANSE_RETURN: {
    PAGE: { code: '', description: '门店进销存管理_采购退货', ignore: true },
    EDIT: { code: '', description: '门店进销存管理_采购退货_编辑', ignore: true },
    EXPORT: { code: '', description: '门店进销存管理_采购退货_导出', ignore: true },
    CHECK: { code: '', description: '门店进销存管理_采购退货_审核', ignore: true },
    ADD: { code: '', description: '门店进销存管理_采购退货_新增退货', ignore: true },
    DELETE: { code: '', description: '门店进销存管理_采购退货_删除', ignore: true },
    VIEW: { code: '', description: '门店进销存管理_采购退货_查看', ignore: true },
    CLOSE: { code: '', description: '门店进销存管理_采购退货_关闭', ignore: true },
  },
  INTERBRANCH_ALLOT: {
    PAGE: { code: '614028', description: '门店进销存管理店间调拨' },
    EDIT: { code: '61402801', description: '门店进销存管理_店间调拨_编辑' },
    EXPORT: { code: '61402800', description: '门店进销存管理_店间调拨_导出' },
    CHECK: { code: '61402806', description: '门店进销存管理_店间调拨_审核' },
    ADD: { code: '61402801', description: '门店进销存管理_店间调拨_新增调拨' },
    DELETE: { code: '61402801', description: '门店进销存管理_店间调拨_删除' },
    VIEW: { code: '61402800', description: '门店进销存管理_店间调拨_查看' },
  },
  TRANSFER_CHECK: {
    PAGE: { code: '614026', description: '门店进销存管理调拨验收' },
    VIEW: { code: '61402600', description: '门店进销存管理调拨验收_查看' },
    VERIFY: { code: '61402601', description: '门店进销存管理调拨验收_验收' },
    NO_DIFF_VERIFY: { code: '61402601', description: '门店进销存管理调拨验收_无差异验收' },
  },
  STOCK_DISPATCH_SALES_RETURN: {
    PAGE: { code: '614031', description: '退货管理' },
  },
  STOCK_STORE_STOCK_IN: {
    PAGE: { code: '620000', description: '库存管理' },
  },
  ALLOT_DIFF_TREAT: {
    PAGE: { code: '614029', description: '门店进销存管理调拨差异处理' },
    VIEW: { code: '61402600', description: '门店进销存管理调拨验收_查看' },
    EXPORT: { code: '61402900', description: '门店进销存管理_调拨差异处理_导出' },
    CHECK: { code: '61402900', description: '门店进销存管理_调拨差异处理_验收' },
    VERIFY: { code: '61402601', description: '门店进销存管理调拨差异处理_处理' },
  },
  ALLOT_REPORT: {
    PAGE: { code: '', description: '门店进销存管理调拨明细报表', ignore: true },
    EXPORT: { code: '', description: '门店进销存管理_调拨明细报表_导出', ignore: true },
  },
  STORE_STOCK_MONTH_CHECK: {
    PAGE: { code: '614008', description: '门店进销存管理门店月结' },
    VIEW: { code: '61400800', description: '门店进销存管理门店月结_查看' },
    EXPORT: { code: '61400800', description: '门店进销存管理门店月结_导出' },
    MONTH_CHECK: { code: '61400801', description: '门店进销存管理门店月结_月结' },
  },
  STOCK_MONTH_CHECK: {
    PAGE: { code: '615007', description: '物流管理管理总部月结' },
    VIEW: { code: '61500700', description: '物流管理管理总部月结_查看' },
    EXPORT: { code: '61500700', description: '物流管理管理总部月结_导出' },
    MONTH_CHECK: { code: '61500701', description: '物流管理管理总部月结_月结' },
  },
  // STOCK_REPORT: {
  //   PAGE: { code: '614009', description: '库存余量表' },
  //   EXPORT: { code: '61400901', description: '门店进销存管理库存报表_导出表格', ignore: true }, // 确认作废
  // }, 移动到门店报表中心
  // STOCK_INOUT_SUMMARY: {
  //   PAGE: { code: '614010', description: '门店进销存管理进销存汇总表' },
  //   EXPORT: { code: '61401001', description: '门店进销存管理进销存汇总表_导出表格', ignore: true }, // 确认作废
  // },移动到门店报表中心
  // STOCK_INOUT_DETAIL: {
  //   PAGE: { code: '614011', description: '门店进销存管理进销存明细' },
  //   EXPORT: { code: '61401101', description: '门店进销存管理进销存明细_导出表格', ignore: true }, // 确认作废
  // },移动到门店报表中心
  // STOCK_CHECK_DETAIL: {
  //   PAGE: { code: '614012', description: '门店进销存管理盘存明细表' },
  //   EXPORT: { code: '61401201', description: '门店进销存管理盘存明细表_导出表格', ignore: true }, // 确认作废
  // }, 移动到门店报表中心
  ORDER_LIB: {
    PAGE: { code: '615001', description: '订单中心' },
    GENERATE: { code: '61500101', description: '订单中心_一键生成订单' },
    VIEW: { code: '61500100', description: '订单中心_查看' },
    ROLL_BACK: { code: '61500103', description: '订单中心_退回', ignore: true }, // 确认作废
    EXPORT: { code: '61500104', description: '订单中心_导出', ignore: true }, // 确认作废
  },
  STOCK_SUPPLY_ORDER: {
    PAGE: { code: '615026', description: '采购管理' },
  },
  PREVIOUS_DISTRIBUTION_PROCUREMENT: {
    PAGE: { code: '614032', description: '采购需求单' },
    ADD: { code: '61403201', description: '采购需求单_新增' },
    EDIT: { code: '61403201', description: '采购需求单_编辑' },
    DELETE: { code: '61403201', description: '采购需求单_删除' },
    COMMIT: { code: '61403202', description: '采购需求单_合并提交' },
    VIEW: { code: '61403200', description: '采购需求单_查看' },
    EXPORT: { code: '61403200', description: '采购需求单_导出' },
  },
  STOCK_DISPATCH_ORDERS: {
    PAGE: { code: '615030', description: '配送管理' },
  },
  HEAD_QUARTER_DISTRIBUTION_DIFFERENCE: {
    PAGE: { code: '615020', description: '配送差异处理' },
    VIEW: { code: '615020', description: '配送差异处理_查看' },
    EXPORT: { code: '615020', description: '配送差异处理_导出' },
    HANDLE: { code: '615020', description: '配送差异处理_处理按钮' },
  },
  STOCK_STORE_RETURN_MANAGE: {
    PAGE: { code: '615031', description: '退货管理' },
  },
  SUPPLY_ORDER: {
    PAGE: { code: '615002', description: '直运采购' },
    CREATE: { code: '61500201', description: '直运采购_新增直运订单' },
    VIEW: { code: '61500200', description: '直运采购_查看' },
    EXPORT: { code: '61500200', description: '直运采购_导出' },
    EDIT: { code: '61500201', description: '直运采购_新增直运订单' },
    CLOSE: { code: '61500201', description: '直运采购_关闭' },
    REVERSED: { code: '61500202', description: '直运采购_反审核' },
    REVERSED_ALL: { code: '61500206', description: '直运采购_批量反审核' },
    ABOLISH_ALL: { code: '61500203', description: '直运采购_批量作废' },
    CLOSE_ALL: { code: '61500204', description: '直运采购_批量关单' },
    RECLOSE_ALL: { code: '61500205', description: '直运采购_批量反关单' },
  },
  OFFICIAL_IN: {
    PAGE: { code: '615003', description: '物流管理_入库管理' },
    CREATE: { code: '61500301', description: '入库管理_新增入库单' },
    VIEW: { code: '61500300', description: '入库管理_查看' },
    ANTI_VERIFY: { code: '61500303', description: '入库管理_反审核' },
    EXPORT: { code: '61500300', description: '入库管理_导出' },
    EDIT: { code: '61500301', description: '入库管理_编辑' },
    DELETE: { code: '61500301', description: '入库管理_删除' },
    IN: { code: '61500301', description: '入库管理_入库' },
  },
  OFFICIAL_OUT: {
    PAGE: { code: '615004', description: '出库管理' },
    CREATE: { code: '61500401', description: '出库管理_新增' },
    SAVE: { code: '61500401', description: '出库管理_暂存' },
    OUT: { code: '61500401', description: '出库管理_出库' },
    VIEW: { code: '61500400', description: '出库管理_查看' },
    ANTI_VERIFY: { code: '61500403', description: '出库管理_反审核' },
    EXPORT: { code: '61500400', description: '出库管理_导出' },
    DELETE: { code: '61500405', description: '出库管理_删除' },
    TRANSFER: { code: '61500401', description: '出库管理_编辑（编辑）' },
    PRINT: { code: '61500400', description: '出库管理_打印' },
  },
  OFFICIAL_CHECK: {
    PAGE: { code: '615006', description: '盘点管理' },
    CREATE: { code: '61500601', description: '盘点管理_新增盘点单' },
    VIEW: { code: '61500600', description: '盘点管理_查看' },
    EXPORT: { code: '61500600', description: '盘点管理_导出' },
    EDIT: { code: '61500601', description: '盘点管理_编辑' },
    DELETE: { code: '61500601', description: '盘点管理_删除' },
    INVENTORY: { code: '61500601', description: '盘点管理_盘点', ignore: true },
  },
  // OFFICIAL_INVOICING_CHECK: {
  //   PAGE: { code: '615006', description: '结算管理' },
  //   ADD: { code: '61500601', description: '结算管理_新增' },
  //   EDIT: { code: '61500601', description: '结算管理_编辑' },
  //   EXPORT: { code: '61500600', description: '结算管理_导出' },
  //   VIEW: { code: '61500600', description: '结算管理_查看' },
  //   DELETE: { code: '61500601', description: '结算管理_删除' },
  // },
  STOCK_SETTLEMENT_FROM_STORE: {
    PAGE: { code: '614050', description: '结算管理' },
  },
  SUPPLIER_COSTS_LIST: {
    PAGE: { code: '619001', description: '价格管理' },
  },
  OFFICIAL_MONTH_CHECK: {
    PAGE: { code: '615007', description: '总部月结' },
    VIEW: { code: '61500700', description: '总部月结_查看' },
    EXPORT: { code: '61500700', description: '总部月结_导出' },
    MONTH_CHECK: { code: '61500701', description: '总部月结_月结' },
  },
  OFFICIAL_INOUT_SUMMARY: {
    PAGE: { code: '61500900', description: '进销存汇总表', ignore: true }, // 确认作废
    EXPORT: { code: '61500901', description: '进销存汇总表_导出表格', ignore: true }, // 确认作废
  },
  /*   UTILITIES: {
      PAGE: { code: '616001', description: '水电气设置' },
      CREATE: { code: '61600101', description: '水电气设置_添加' },
      DETAILS: { code: '61600102', description: '水电气设置_详情' },
      EDIT: { code: '61600103', description: '水电气设置_编辑' },
      DELETE: { code: '61600104', description: '水电气设置_删除' },
    },
    CUT: {
      PAGE: { code: '616002', description: '核减明细查询' },
      EXPORT: { code: '61600202', description: '核减明细查询_导出核减明细' },
    },
    REPORT_DIFF: {
      PAGE: { code: '616004', description: '物资差异分析' },
      EXPORT: { code: '61600401', description: '物资差异分析_导出差异分析' },
    },
    REPORT_DISH: {
      PAGE: { code: '616005', description: '单菜毛利分析' },
      EXPORT: { code: '61600501', description: '单菜毛利分析_导出' },
    }, */
  FORECAST: {
    PAGE: { code: '617001', description: '营业预估' },
    EXPORT: { code: '61700101', description: '营业预估_导出营业预估' },
    CREATE: { code: '61700102', description: '营业预估_添加' },
    EDIT: { code: '61700103', description: '营业预估_编辑' },
  },
  DISH_RATES: {
    PAGE: { code: '617002', description: '菜品点击率' },
    EXPORT: { code: '61700201', description: '菜品点击率_导出菜品点击率' },
    COMPUTE: { code: '61700202', description: '菜品点击率_计算' },
    EDIT: { code: '61700203', description: '菜品点击率_编辑' },
  },
  POS_PLANS: {
    PAGE: { code: '617003', description: '菜品销售计划' },
    EXPORT: { code: '61700301', description: '菜品销售计划_导出销售计划' },
    COMPUTE: { code: '61700302', description: '菜品销售计划_计算' },
    EDIT: { code: '61700303', description: '菜品销售计划_编辑' },
  },
  SUPPLY_PRICE_QUERY: {
    PAGE: { code: '613002', description: '供应商定价综合查询' },
    ABOLISH: { code: '61300201', description: '价格管理_供应商定价综合查询_作废价目表' },
    ABOLISH_ALL: { code: '61300201', description: '价格管理_供应商定价综合查询_批量作废价目表' },
    EXPORT: { code: '61300201', description: '价格管理_供应商定价综合查询_导出价目表' },
  },
  SUPPLY_PRICE_LIST: {
    PAGE: { code: '61300300', description: '供应商定价单' },
    VERIFY: { code: '61300301', description: '供应商定价单_审核' },
    EDIT: { code: '61300302', description: '供应商定价单_编辑' },
    DELETE: { code: '61300302', description: '供应商定价单_删除' },
    EXPORT: { code: '61300300', description: '供应商定价单_导出' },
    ABOLISH_ALL: { code: '61300301', description: '供应商定价单_整单作废' },
    CREATE: { code: '61300302', description: '供应商定价单_直运新增供应商定价单' },
    DELETE_ALL: { code: '61300302', description: '供应商定价单_批量删除' },
    TIME: { code: '61300302', description: '供应商定价单_批量执行删除时间' },
    CREATE_VERIFY: { code: '61300301', description: '供应商定价单_审核' },
  },
  STORE_RETURN: {
    PAGE: { code: '615019', description: '集团总部管理_门店退货管理' },
    VIEW: { code: '61501900', description: '集团总部管理_门店退货管理' },
    CHECK: { code: '61501901', description: '集团总部管理_门店退货管理_审核' },
    EXPORT: { code: '61501900', description: '集团总部管理_门店退货管理_导出' },
    PASS: { code: '61501901', description: '集团总部管理_门店退货管理_通过' },
    RETURN: { code: '61501901', description: '集团总部管理_门店退货管理_驳回' },
    PRINT: { code: '61501900', description: '集团总部管理_门店退货管理_打印' },
  },
  DIFF_DB: {
    PAGE: { code: '615020', description: '集团总部管理_配送差异管理' },
    VIEW: { code: '61502000', description: '集团总部管理_配送差异管理_查看' },
    EDIT: { code: '61502001', description: '集团总部管理_配送差异管理_处理' },
    EXPORT: { code: '61502000', description: '集团总部管理_配送差异管理_导出' },
    PASS: { code: '61502001', description: '集团总部管理_配送差异管理_确定' },
    BACK: { code: '61502001', description: '集团总部管理_配送差异管理_返回' },
  },
  PRO_DB: {
    PAGE: { code: '615021', description: '集团总部管理_配送中心采购', ignore: true },
    EDIT: { code: '61502101', description: '集团总部管理_配送中心采购_编辑', ignore: true },
    EXPORT: { code: '61502102', description: '集团总部管理_配送中心采购_导出', ignore: true },
    DELETE: { code: '61502103', description: '集团总部管理_配送中心采购_删除', ignore: true },
    SAVE: { code: '61502104', description: '集团总部管理_配送中心采购_保存', ignore: true },
    CHECK: { code: '61502105', description: '集团总部管理_配送中心采购_审核', ignore: true },
    ADD: { code: '61502106', description: '集团总部管理_配送中心采购_新增采购单', ignore: true },
  },
  PURC_RETURN: {
    PAGE: { code: '615023', description: '集团总部管理_供应商退货' },
    VIEW: { code: '61502300', description: '集团总部管理_供应商退货' },
    EDIT: { code: '61502301', description: '集团总部管理_采购退货_编辑' },
    DELETE: { code: '61502301', description: '集团总部管理_采购退货_删除' },
    EXPORT: { code: '61502300', description: '集团总部管理_采购退货_导出' },
    CHECK: { code: '61502303', description: '集团总部管理_采购退货_审核' },
    CLOSE: { code: '61502304', description: '集团总部管理_采购退货_关闭' },
    ADD: { code: '61502301', description: '集团总部管理_采购退货_新增退货' },
    SAVE: { code: '61502301', description: '集团总部管理_采购退货_新增退货' },
    RETURN_CHECK: { code: '61502301', description: '集团总部管理_采购退货_退货审核' },
    BACK: { code: '61502301', description: '集团总部管理_采购退货_驳回' },
    EDIT2: { code: '61502301', description: '集团总部管理_采购退货_编辑(?确认)' },
  },
  PURC_TEM: {
    PAGE: { code: '615024', description: '运营管理_模板类型_添加' },
    ADD: { code: '61502401', description: '集团总部管理_请购模板类型_新增模板类别' },
    EDIT: { code: '61502401', description: '集团总部管理_请购模板类型_编辑' },
    DELETE: { code: '61502401', description: '集团总部管理_请购模板类型_删除' },
  },
  REQ_TEM: {
    PAGE: { code: '615025', description: '运营管理_请购模板_查看' },
    ADD: { code: '61502501', description: '集团总部管理_请购模板_新增请购模板' },
    EDIT: { code: '61502501', description: '集团总部管理_请购模板_编辑' },
    DELETE: { code: '61502501', description: '集团总部管理_请购模板_删除' },
    SAVE: { code: '61502501', description: '集团总部管理_请购模板_保存' },
    STOP: { code: '61502505', description: '集团总部管理_请购模板_模板状态启用/停用' },
    DIY: { code: '61502506', description: '集团总部管理_请购模板_定义门店权限' },
  },
  TEMPLATES_MANAGE: {
    PAGE: { code: '614020', description: '门店进销存管理_模板管理_查看' },
    VIEW: { code: '614020', description: '门店进销存管理_模板管理_查看' },
    EDIT: { code: '61402003', description: '门店进销存管理_模板管理_编辑' },
    DELETE: { code: '61402003', description: '门店进销存管理_模板管理_删除' },
    CREATE: { code: '61402003', description: '门店进销存管理_模板管理_新增请购模板' },
  },
  STOCK_REQUISITION: {
    PAGE: { code: '614003', description: '采购管理' },
  },
  DISPATCH_SALES_RETURN: {
    PAGE: { code: '61403101', description: '门店进销存管理_总部退货' },
    VIEW: { code: '6140310100', description: '门店进销存管理_总部退货' },
    EXPORT: { code: '6140310100', description: '门店进销存管理_总部退货_导出' },
    EDIT: { code: '6140310105', description: '门店进销存管理_总部退货_编辑' },
    SUBMIT: { code: '6140310103', description: '门店进销存管理_总部退货_审核' },
    DELETE: { code: '6140310105', description: '门店进销存管理_总部退货_删除' },
    CREATE_DETAILS: { code: '6140310105', description: '门店进销存管理_总部退货_新增退货单' },
    RECALL: { code: '6140310103', description: '门店进销存管理_总部退货_撤回' },
  },
  DISTRIBUTION_DIFFERENCE: {
    PAGE: { code: '614023', description: '门店进销存管理_库存管理_配送差异管理_查看' },
    EXPORT: { code: '61502001', description: '门店进销存管理_配送差异管理_导出', ignore: true }, // 确定作废
  },
  STOCK_STOCK_TRANSFER_LIST: {
    PAGE: { code: '614006', description: '调拨管理' },
  },
  STOCK_STOCK_REPORT: {
    PAGE: { code: '614030', description: '报表管理' },
  },
  // ----北京新添加---
  // STORE_SUPPLIER_MATERIAL: {
  //   PAGE: { code: '614014', description: '门店进销存管理_供应商供货情况表' },
  // }, 调整到门店报表中心
  // STORE_ALLOCATION: {
  //   PAGE: { code: '614015', description: '门店进销存管理_店内调拨情况表' },
  //   EXPORT: { code: '61401501', description: '门店进销存管理_店内调拨情况查询_导出', ignore: true }, // 确定作废
  // },调整到门店报表中心
  STORE_SUPPLIER_INVOICE: {
    PAGE: { code: '614016', description: '门店进销存管理_供应商发票记录表' },
    ADD: { code: '61401601', description: '门店进销存管理_供应商发票记录表_新增' },
    EDIT: { code: '61401601', description: '门店进销存管理_供应商发票记录表_修改' },
    DELETE: { code: '61401601', description: '门店进销存管理_供应商发票记录表_删除' },
  },
  STORE_SUMMARY_PAYMENT: {
    PAGE: { code: '614017', description: '门店进销存管理_应付款汇总' },
    EXPORT: { code: '61401701', description: '门店进销存管理_应付款汇总_导出', ignore: true }, // 确认删除
  },
  STORE_GROUP_SETTLEMENT: {
    PAGE: { code: '614018', description: '门店进销存管理_总部结算' },
    PASS: { code: '61401801', description: '门店进销存管理_总部结算_确认' },
    VIEW: { code: '61401800', description: '门店进销存管理_总部结算_查看' },
    EXPORT: { code: '61401800', description: '门店进销存管理_总部结算_导出', ignore: true }, // 确定作废此权限
    BACK: { code: '61401803', description: '门店进销存管理_总部结算_退回' },
  },
  STORE_SUPPLIER_SETTLEMENT: {
    PAGE: { code: '614019', description: '门店进销存管理_供应商结算' },
    ADD: { code: '61401901', description: '门店进销存管理_供应商结算_新增' },
    VIEW: { code: '61401900', description: '门店进销存管理_供应商结算_查看' },
    EXPORT: { code: '61401900', description: '门店进销存管理_供应商结算_导出' },
    PAYMENT: { code: '61401903', description: '门店进销存管理_供应商结算_付款' },
    CHECKOUT: { code: '61401904', description: '门店进销存管理_供应商结算_结账' },
    ABOLISH: { code: '61401905', description: '门店进销存管理_供应商结算_作废' },
    VERIFY: { code: '61401906', description: '门店进销存管理_供应商结算_审核' },
    DELETE: { code: '61401901', description: '门店进销存管理_供应商结算_删除' },
    EDIT: { code: '61401901', description: '门店进销存管理_供应商结算_编辑' },
  },
  GROUP_SUPPLIER_INVOICE: {
    PAGE: { code: '615018', description: '供应商结算_供应商发票记录表' },
    ADD: { code: '61501801', description: '集团总部管理_供应商发票记录表_新增' },
    EDIT: { code: '61501801', description: '集团总部管理_供应商发票记录表_修改' },
    DELETE: { code: '61501801', description: '集团总部管理_供应商发票记录表_删除' },
  },
  GROUP_SUMMARY_PAYMENT: {
    PAGE: { code: '619019', description: '供应商结算_应付款汇总' }, // 新修改
    EXPORT: { code: '61901901', description: '供应商结算_应付款汇总_导出', ignore: true }, // 确认删除
  },
  GROUP_PURCHASE_PRICE: {
    PAGE: { code: '619020', description: '集团总部管理_采购价格分析', ignore: true },
    EXPORT: { code: '61902001', description: '集团总部管理_采购价格分析_导出', ignore: true },
  },
  GROUP_DISTRIBUTION_DIFFERENCE_ANALYSIS: {
    PAGE: { code: '619021', description: '集团总部管理_配送差异分析报表', ignore: true },
    EXPORT: { code: '61902102', description: '集团总部管理_配送差异分析报表_导出', ignore: true },
  },
  GROUP_COLLECTION_RECEIVABLES: {
    PAGE: { code: '619022', description: '集团总部管理_应收款汇总' }, // 新修改
    EXPORT: { code: '61902203', description: '集团总部管理_应收款汇总_导出', ignore: true }, // 确认作废
  },
  GROUP_STORE_SETTLEMENT: {
    PAGE: { code: '619023', description: '供应商结算_门店结算' },
    ADD: { code: '61902301', description: '集团总部管理_门店结算_新增' },
    VIEW: { code: '61902300', description: '集团总部管理_门店结算_查看' },
    EXPORT: { code: '61902300', description: '集团总部管理_门店结算_导出' },
    PAYMENT: { code: '61902303', description: '集团总部管理_门店结算_付款' },
    CHECKOUT: { code: '61902303', description: '集团总部管理_门店结算_结账' },
    ABOLISH: { code: '61902306', description: '集团总部管理_门店结算_作废' },
    VERIFY: { code: '61902306', description: '集团总部管理_门店结算_审核' },
    DELETE: { code: '61902301', description: '集团总部管理_门店结算_删除' },
    EDIT: { code: '61902301', description: '集团总部管理_门店结算_编辑' },
  },
  GROUP_SUPPLIER_SETTLEMENT: {
    CANCEL: { code: '61902406', description: '供应商结算_结算单_作废' },
    PAGE: { code: '619024', description: '供应商结算_供应商结算' },
    VIEW: { code: '61902400', description: '供应商结算_供应商结算_查看' },
    ADD: { code: '61902401', description: '集团总部管理_供应商结算_新增' },
    EXPORT: { code: '61902400', description: '集团总部管理_供应商结算_导出' },
    PAYMENT: { code: '61902403', description: '集团总部管理_供应商结算_付款' },
    CHECKOUT: { code: '61902404', description: '集团总部管理_供应商结算_结账' },
    ABOLISH: { code: '61902406', description: '集团总部管理_供应商结算_作废' },
    VERIFY: { code: '61902406', description: '集团总部管理_供应商结算_审核' },
    DELETE: { code: '61902401', description: '集团总部管理_供应商结算_删除' },
    EDIT: { code: '61902401', description: '集团总部管理_供应商结算_编辑' },
  },
  STOCK_STALL_MANAGE: {
    PAGE: { code: '611007', description: '档口管理' },
  },
  STALL_MANAGE: {
    PAGE: { code: '61100701', description: '档口设置' },
    ADD: { code: '6110070102', description: '档口设置_添加档口' },
    STOP: { code: '6110070103', description: '档口设置_停用启用' },
    COPY: { code: '6110070102', description: '档口设置_复制档口' },
  },
  BUSINESS_BEGINNING: {
    PAGE: { code: '611008', description: '基本设置_期初' },
    VIEW: { code: '61100800', description: '基本设置--期初-查看' },
    IMPORT: { code: '61100801', description: '基本设置--期初-导入期初/确认期初' },
  },
  BOM_SETTINGS: {
    PAGE: { code: '611009', description: '基本设置_BOM设置' },
    VERIFY: { code: '61100902', description: '基本设置_BOM设置' },
    IMPORT: { code: '61100904', description: 'BOM设置_导入BOM' },
    EXPORT: { code: '61100900', description: '基本设置_BOM设置_导出BOM' },
    VIEW: { code: '61100900', description: '基本设置-BOM设置-查看bom详情' },
    ADD: { code: '61100904', description: '添加bom' },
    REPLACE: { code: '61100904', description: '批量替换物品' },
  },
  STORE_MANAGE: {
    PAGE: { code: '611010', description: '基本设置_门店管理' },
    VIEW: { code: '61101000', description: '基本设置_门店管理_查看' },
    PARAM: { code: '61101009', description: '基本设置_门店管理_批量设置预估参考参数' },
    REF_ELEMENT: { code: '61101001', description: '基本设置_门店管理_批量关联因素方案' },
    REF_STORE: { code: '61101002', description: '基本设置_门店管理_批量关联配送中心' },
    REF_BOM: { code: '61101003', description: '基本设置_门店管理_批量关联BOM方案' },
    EDIT: { code: '61101004', description: '基本设置_门店管理_编辑' },
    SEL_BOM: { code: '61101005', description: '基本设置_门店管理_编辑_选择BOM方案' },
    SEL_ELEMENT: { code: '61101006', description: '基本设置_门店管理_编辑_选择因素方案' },
    SEL_STORE: { code: '61101007', description: '基本设置_门店管理_编辑_选择配送中心' },
    SEL_REFER: { code: '61101008', description: '基本设置_门店管理_编辑_选择预估参考参数' },
  },
  BOM_SCHEME: {
    PAGE: { code: '611011', description: '基本设置_BOM方案' },
    ADD: { code: '61101101', description: '基本设置_添加BOM方案' },
    EDIT: { code: '61101101', description: '基本设置_编辑BOM方案' },
    DELETE: { code: '61101101', description: '基本设置_删除BOM方案' },
    REF_STORE: { code: '61101102', description: '基本设置_BOM方案' },
  },
  DISTRIBUTION_CENTER_SETTING: {
    PAGE: { code: '611012', description: '基本设置_配送中心设置' },
    ADD_REPOS: { code: '61101202', description: '基本设置_配送中心设置_添加仓库' },
    REF_STORE: { code: '61101202', description: '基本设置_配送中心设置_关联门店' },
  },
  FROM_HEAD_SUPPLIER_SETTLEMENT: {
    PAGE: { code: '619024', description: '供应商结算_结算单' },
  },
  DISTRIBUTION_PROCUREMENT: {
    PAGE: { code: '615027', description: '采购管理_采购订单' },
    VIEW: { code: '61502700', description: '采购管理_查看' },
    EXPORT: { code: '61502700', description: '采购管理_导出' },
    CREATE: { code: '61502702', description: '采购管理_新增' },
    EDIT: { code: '61502702', description: '采购管理_编辑' },
    DELETE: { code: '61502702', description: '采购管理_删除' },
    CHECK: { code: '61502707', description: '采购管理_审核' },
    REVERSED: { code: '61502708', description: '采购管理_反审核' },
    REVERSED_ALL: { code: '61502712', description: '采购管理_批量反审核' },
    ABOLISH_ALL: { code: '61502709', description: '采购管理_批量作废' },
    CLOSE_ALL: { code: '61502710', description: '采购管理_批量关单' },
    RECLOSE_ALL: { code: '61502711', description: '采购管理_批量反关单' },
  },
  PURCHANSE_ACCEPT: {
    PAGE: { code: '615028', description: '采购验收' },
    VIEW: { code: '61502801', description: '采购验收_查看' },
    CHECK: { code: '61502801', description: '采购验收_验收' },
    MODIFY: { code: '61502803', description: '采购验收_抹零' },
  },
  // BUY_PRICE: {
  //   PAGE: { code: '615050', description: '采购价格分析表' },
  //   EXPORT: { code: '615050', description: '采购价格分析表_导出', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  // DISPATCH_DIFF: {
  //   PAGE: { code: '615051', description: '配送差异分析报表' },
  //   EXPORT: { code: '615051', description: '配送差异分析报表_导出', ignore: true },
  // }, 移动到总部报表中心
  // PROCUREMENT_REPORT: {
  //   PAGE: { code: '615052', description: '采购汇总表' },
  //   EXPORT: { code: '615052', description: '采购汇总表', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  // PURCHASE_REPORTS: {
  //   PAGE: { code: '615053', description: '采购退货汇总报表' },
  //   EXPORT: { code: '615053', description: '采购退货汇总报表_导出', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  // PURCHASE_DETIALREPORT: {
  //   PAGE: { code: '615054', description: '采购退货明细报表' },
  //   EXPORT: { code: '615054', description: '采购退货明细报表_导出', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  // DISTRIBUTION_SUMMARY_REPORT: {
  //   PAGE: { code: '615055', description: '配送出库汇总报表' },
  //   EXPORT: { code: '615055', description: '配送出库汇总报表_导出', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  DISTRIBUTION_SUMMARY_DETIAL_REPORT: {
    PAGE: { code: '615055', description: '配送出库明细报表' },
  },
  STOCK_GLOBAL_IN_OUT_SUMMARY: {
    PAGE: { code: '615009', description: '进销存汇总表' },
  },
  // DB_RSR: {
  //   PAGE: { code: '615057', description: '配送退货汇总报表' },
  //   EXPORT: { code: '615057', description: '配送退货汇总报表_导出', ignore: true }, // 确认作废
  // }, 移动到总部报表中心
  // DS_DETAIL_REPORT: {
  //   PAGE: { code: '615058', description: '配送退货明细' },
  //   EXPORT: { code: '615058', description: '配送退货明细_导出', ignore: true },
  // }, 移动到总部报表中心
  BOM_GROSS_PROFIT: {
    PAGE: { code: '61502101', description: '菜品毛利分析' },
  },
  GROUP_GROSS_PROFIT: {
    PAGE: { code: '61502102', description: '集团毛利分析' },
  },
  COST_VARIANCE_YIELD: {
    PAGE: { code: '61502201', description: '物品成本差异&应产率' },
  },
  TEN_THOUSAND_CONSUMPTION: {
    PAGE: { code: '61502202', description: '物品万元用量' },
  },
  STOCK_COST_VARIANCE_YIELD: {
    PAGE: { code: '615022', description: '物品成本' },
  },
  STOCK_BOM_GROSS_PROFIT_ANALYSIS: {
    PAGE: { code: '615021', description: '菜品成本' },
  },
  PRODUCTION_REPORT_MANAGEMENT: {
    PAGE: { code: '624007', description: '报表管理' },
  },
  DIRECT_REFUNDS: {
    PAGE: { code: '6140310105', description: '门店进销存管理_退货管理' },
    VIEW: { code: '6140310200', description: '门店进销存管理_退货管理_供应商退货' },
    EXPORT: { code: '6140310200', description: '门店进销存管理_退货管理_供应商退货_导出' },
    EDIT: { code: '6140310205', description: '门店进销存管理_退货管理_供应商退货_编辑' },
    CHECK: { code: '6140310203', description: '门店进销存管理_退货管理_供应商退货_审核' },
    DELETE: { code: '6140310205', description: '门店进销存管理_退货管理_供应商退货_删除' },
    CREATE_DETAILS: { code: '6140310205', description: '门店进销存管理_退货管理_供应商退货_新增' },
    CHECK_DETAILS: { code: '6140310203', description: '门店进销存管理_直运退货_审核退货单' },
    REJECT: { code: '6140310203', description: '门店进销存管理_退货管理_供应商退货_驳回' },
    POST: { code: '6140310203', description: '门店进销存管理_直运退货_通过' },
  },
  SAFETY_STOCK: {
    PAGE: { code: '611013', description: '基本设置-安全库存设置' },
    VIEW: { code: '61101300', description: '基本设置-安全库存设置-查看' },
    SUBMIT: { code: '61101301', description: '基本设置-安全库存设置-提交' },
  },
  MATERIAL_OUT_PTODUCTION: {
    PAGE: { code: '615059', description: '物流管理-领料出库' },
    VIEW: { code: '61505900', description: '物流管理-领料出库-查看' },
    OUTDEPOT: { code: '61505901', description: '物流管理-领料出库-出库' },
    INVALID: { code: '61505902', description: '物流管理-领料出库-作废' },
  },
  FINISHED_PRODUCT: {
    PAGE: { code: '612003', description: '物品管理_加工品管理' },
    EDIT: { code: '61200300', description: '物品管理_加工品管理_修改加工间' },
  },
  PRODUCT_SPECIFICATION: {
    PAGE: { code: '624002', description: '生产加工_生产规格管理' },
    CHANGE: { code: '62400206', description: '生产加工_生产规格管理_批量替换物品' },
    AUDIT: { code: '62400201', description: '生产加工_生产规格管理_批量审核BOM/审核BOM/作废' },
    SETTING: { code: '62400202', description: '生产加工_生产规格管理_设置加工品规格' },
    CREATE: { code: '62400203', description: '生产加工_生产规格管理_新增生产规格/编辑生产规格' },
    ADDBOOM: { code: '62400204', description: '生产加工_生产规格管理_添加BOM/编辑BOM/删除' },
    VIEW: { code: '62400200', description: '生产加工_生产规格管理_查看' },
  },
  REQUIRE_MANAGE: {
    PAGE: { code: '624003', description: '生产加工_请购需求管理' },
    ADD: { code: '62400301', description: '生产加工_请购需求管理_加入生产需求' },
    VIEW: { code: '62400300', description: '生产加工_请购需求管理_查看' },
  },
  PROCESSING_ROOM: {
    PAGE: { code: '624001', description: '生产加工_加工间管理' },
    VIEW: { code: '62400100', description: '生产加工_加工间管理_查看' },
    CONTEXT: { code: '62400101', description: '生产加工_加工间管理_绑定配送中心' },
  },
  PRODUCT_DEMAND: {
    PAGE: { code: '624004', description: '生产加工_生产需求单管理' },
    ADD: { code: '62400402', description: '生产加工_生产需求单管理_新增需求单' },
    EDIT: { code: '62400402', description: '生产加工_生产需求单管理_编辑' },
    AUDIT: { code: '62400401', description: '生产加工_生产需求单管理_审核/作废/驳回' },
    VIEW: { code: '62400400', description: '生产加工_生产需求单管理_查看' },
  },
  PRODUCT_PLAN_MANAGE: {
    PAGE: { code: '624005', description: '生产加工_生产订单管理' },
    VIEW: { code: '62400500', description: '生产加工_生产订单管理_查看' },
    EDIT: { code: '62400501', description: '生产加工_生产订单管理_编辑' },
    PICKING: { code: '62400502', description: '生产加工_生产订单管理_领料' },
    INDEPOT: { code: '62400503', description: '生产加工_生产订单管理_入库' },
    FINISH: { code: '62400504', description: '生产加工_生产订单管理_结束生产' },
    INVALID: { code: '62400505', description: '生产加工_生产订单管理_作废' },
    ADD: { code: '62400505', description: '生产加工_生产订单管理_新增' },
  },
  MATERIAL_REQUISITION: {
    PAGE: { code: '624006', description: '生产加工_领料单管理' },
    ADD: { code: '62400604', description: '生产加工_领料单管理_新增领料单' },
    EDIT: { code: '62400604', description: '生产加工_领料单管理_编辑' },
    VIEW: { code: '62400600', description: '生产加工_领料单管理_查看' },
    EXPORT: { code: '62400601', description: '生产加工_领料单管理_导出/打印' },
    PICKING: { code: '62400602', description: '生产加工_领料单管理_领料' },
    INVALID: { code: '62400603', description: '生产加工_领料单管理_作废' },
  },
  PRODUCT_RETURN_ORDER_MANAGE: {
    PAGE: { code: '624016', description: '生产加工_生产退料单管理' },
    VIEW: { code: '62401600', description: '生产加工_生产退料单管理_查看' },
    ADD: { code: '62401601', description: '生产加工_生产订单管理_新增' },
    EDIT: { code: '62401602', description: '生产加工_生产退料单管理_编辑' },
    DELETE: { code: '62401603', description: '生产加工_生产退料单管理_删除' },
  },
  INTERWORKING: {
    PAGE: { code: '624014', description: '生产加工_加工间盘点' },
    ADD: { code: '62401403', description: '生产加工_加工间盘点_新增' },
    DELETE: { code: '62401402', description: '生产加工_加工间盘点_删除' },
    EDIT: { code: '62401401', description: '生产加工_加工间盘点_编辑' },
    VIEW: { code: '62401400', description: '生产加工_加工间盘点_查看' },
  },
  DISTRIBUT_CENTER_DEPOT: {
    PAGE: { code: '612004', description: '物品管理_配送中心默认仓库' },
    CREATE: {
      code: '61200400',
      description: '物品管理_配送中心默认仓库_添加物品默认仓库/批量修改默认仓库',
    },
  },
  // OFFICIAL_STOCK_BALANCE: {
  //   PAGE: { code: '615008', description: '库存余量' },
  // }, 移动到总部报表中心
  OFFICIAL_STOCK_REPORT: {
    PAGE: { code: '61500800', description: '库存余量表' },
    EXPORT: { code: '61500800', description: '库存报表_导出表格' }, // 确认作废
  },
  // OFFICIAL_BATCH_STOCK_REPORT: {
  //   PAGE: { code: '61500801', description: '批次库存余量表' },
  // }, 移动到总部报表中心
  // OFFICIAL_BATCH_QUERY: {
  //   PAGE: { code: '615032', description: '批次查询' },
  // }, 移动到总部报表中心
  PREDICT_GOODS_CATEGORY: {
    PAGE: { code: '612005', description: '物品管理_报货类别' },
    VIEW: { code: '61200500', description: '预估管理_报货类别_查看' },
    ADD: { code: '61200502', description: '预估管理_报货类别_添加报货类别' },
    SET_ALL: { code: '61200501', description: '预估管理_报货类别_批量设置报货方式' },
  },
  DISH_SALES_PLAN: {
    PAGE: { code: '625002', description: '预估管理_报货向导_菜品销售计划' },
  },
  THOUSAND_USAGE: {
    PAGE: { code: '625002', description: '预估管理_报货向导_千元用量' },
  },
  INFLUENCE_FACTORS: {
    PAGE: { code: '625001', description: '预估管理_影响因素' },
  },
  //
  ELEMENT_TYPE_CALENDAR: {
    PAGE: { code: '615060', description: '运营管理_因素情况日期表' },
  },
  ELEMENT_TYPE: {
    PAGE: { code: '615061', description: '运营管理_因素类型' },
    VIEW: { code: '61506100', description: '运营管理_因素类型_查看因素' },
    EDIT: { code: '61506101', description: '运营管理_因素类型_编辑因素' },
    ADD: { code: '61506101', description: '运营管理_因素类型_添加因素' },
  },
  SCHEME_SETTING: {
    PAGE: { code: '615064', description: '运营管理_预估因素设置_方案设置' },
    VIEW: { code: '61506200', description: '运营管理_预估因素设置_查看' },
    SET: { code: '61506204', description: '运营管理_预估因素设置_方案设置_添加因素方案/编辑/删除' },
    TOGGLE: { code: '61506201', description: '运营管理_预估因素设置_方案设置_启用/停用' },
    LINK_STORE: { code: '61506202', description: '运营管理_预估因素设置_方案设置_关联门店' },
    SCHEME_FACTOR: { code: '61506203', description: '运营管理_预估因素设置_方案设置_方案因素' },
  },
  FACTOR_SETTING: {
    PAGE: { code: '615063', description: '运营管理_预估因素设置_方案因素' },
    ADD: { code: '61506302', description: '运营管理_预估因素设置_方案因素_添加因素' },
    VIEW: { code: '61506300', description: '运营管理_预估因素设置_方案因素_查看' },
    EDIT: { code: '61506302', description: '运营管理_预估因素设置_方案因素_编辑' },
    ABOLISH: { code: '61506301', description: '运营管理_预估因素设置_方案因素_作废' },
  },
  CHECK_RESULT: {
    PAGE: { code: '615068', description: '运营管理_核减结果查询' },
  },
  ESTIMATED_GUIDE: {
    PAGE: { code: '625002', description: '预估管理_预估向导' },
  },
  PREDICT_ELEMENT_SETTING: {
    PAGE: { code: '615062', description: '预估因素设置' },
  },
  CONSUMPTION_ANALYSIS: {
    PAGE: { code: '624008', description: '生产加工_报表管理_物品耗用分析' },
  },
  PRODUCTION_COSTS: {
    PAGE: { code: '624009', description: '生产加工_报表管理_生产成本分析' },
  },
  PRODUCTION_PLAN_ANALYSIS: {
    PAGE: { code: '624010', description: '生产加工_报表管理_生产计划分析' },
  },
  YIELD_ANALYSIS: {
    PAGE: { code: '624011', description: '生产加工_报表管理_应产率分析' },
  },
  PROCESSING_IN_DETAILS: {
    PAGE: { code: '624012', description: '生产加工_报表管理_加工品入库明细' },
  },
  PROCESSING_IN_SUN: {
    PAGE: { code: '624013', description: '生产加工_报表管理_加工品入库汇总' },
  },
  COMPANY_ANNOUNCEMENT: {
    PAGE: { code: '611006', description: '企业公告' },
    VIEW: { code: '61100600', description: '企业公告_查看' },
    OPERATE: {
      code: '61100601',
      description: '企业公告_添加公告/批量删除/批量停用/批量启用/编辑/删除/发布/启用/停用',
    },
  },
  SUPPLIER_CLASSIFY: {
    PAGE: { code: '611016', description: '供应商分类' },
    VIEW: { code: '61101600', description: '供应商分类-查看' },
    OPERATE: { code: '61101601', description: '供应商分类-编辑、删除、停用、启用' },
  },
  PICKING_LIST: {
    PAGE: { code: '615034', description: '物流管理_备货单' },
    VIEW: { code: '61503401', description: '物流管理_备货单_查看/导出/打印' },
    FINISH: { code: '61503402', description: '物流管理_备货单_备货完成' },
  },
  SORTING_LIST: {
    PAGE: { code: '615035', description: '物流管理_分拣单' },
    FINISH: { code: '61503501', description: '物流管理_分拣单_批量分拣完成' },
    PRINT_SORT: { code: '61503502', description: '物流管理_分拣单_打印分拣单' },
    PRINT: { code: '61503503', description: '物流管理_分拣单_打印发货单' },
    VIEW: { code: '61503504', description: '物流管理_分拣单_查看/导出/打印' },
    EDIT: { code: '615035045', description: '物流管理_分拣单_编辑/提交/暂存/取消' },
  },
  PRODUCTION_STORATION: {
    PAGE: { code: '624017', description: '生产加工_生产入库单管理' },
    VIEW: { code: '62401700', description: '生产加工_生产入库单管理_查看' },
    ADD: { code: '62401701', description: '生产加工_生产入库单管理_新增' },
    EDIT: { code: '62401702', description: '生产加工_生产入库单管理_编辑' },
    DELETE: { code: '62401703', description: '生产加工_生产入库单管理_删除' },
    PRODUCT: { code: '62401704', description: '生产加工_生产入库单管理_生产领料' },
  },
  PRODUCTION_MATERIAL_MANAGEMENT: {
    PAGE: { code: '624015', description: '生产领料单管理' },
    VIEW: { code: '62401500', description: '生产领料单管理_查看' },
    ADD: { code: '62401501', description: '生产领料单管理_新增生产领料' },
    EDIT: { code: '62401502', description: '生产领料单管理_编辑' },
    DELETE: { code: '62401503', description: '生产领料单管理_删除' },
  },
  YEAR_END: {
    PAGE: { code: '615036', description: '物流管理_年结' },
    FINISH: { code: '61503600', description: '物流管理_年结_年结' },
  },
  /**
   * 门店报表中心616000
   */
  // 采购业务查询
  STORE_PROCUREMENT_ENQUIRY: {
    PAGE: { code: '616007', description: '门店报表中心-采购业务查询', ignore: false },
  },
  // 采购业务查询-请购汇总表
  STORE_PURCHASE_SUMMARY: {
    PAGE: { code: '61600700', description: '门店报表中心-采购业务查询-请购汇总表', ignore: false },
  },
  // 采购业务查询-请购明细表
  STORE_PURCHASE_DETAIL: {
    PAGE: { code: '61600701', description: '门店报表中心-采购业务查询-请购明细表', ignore: false },
  },
  // 入库业务查询
  STORE_INBOUND_BUSINESS_QUERY: {
    PAGE: { code: '616001', description: '门店报表中心-入库业务查询', ignore: false },
  },
  // 入库业务查询-门店入库汇总表(按日期) 报表1期
  STORE_WAREHOUSING_SUMMARY_DATETIME: {
    PAGE: {
      code: '61600100',
      description: '门店报表中心-入库业务查询-门店入库汇总表(按日期)',
      ignore: false,
    },
  },
  // 入库业务查询-门店入库汇总表(按类别) 报表1期
  STORE_WAREHOUSING_SUMMARY_CATEGORY: {
    PAGE: {
      code: '61600101',
      description: '门店报表中心-入库业务查询-门店入库汇总表(按类别)',
      ignore: false,
    },
  },
  // 入库业务查询-门店入库明细表 报表1期
  STORE_WAREHOUSING_DETAIL: {
    PAGE: {
      code: '61600102',
      description: '门店报表中心-入库业务查询-门店入库明细表',
      ignore: false,
    },
  },
  // 出库业务查询
  STORE_OUTBOUND_BUSINESS_QUERY: {
    PAGE: { code: '616002', description: '门店报表中心-出库业务查询', ignore: false },
  },
  // 出库业务查询-门店出库汇总表(按日期) 报表1期
  STORE_OUTBOUND_SUMMARY_DATETIME: {
    PAGE: {
      code: '61600200',
      description: '门店报表中心-出库业务查询-门店出库汇总表(按日期)',
      ignore: false,
    },
  },
  // 出库业务查询-门店出库汇总表(按类别) 报表1期
  STORE_OUTBOUND_SUMMARY_CATEGORY: {
    PAGE: {
      code: '61600201',
      description: '门店报表中心-出库业务查询-门店出库汇总表(按类别)',
      ignore: false,
    },
  },
  // 出库业务查询-门店出库明细表 报表1期
  STORE_OUTBOUND_DETAIL: {
    PAGE: {
      code: '61600202',
      description: '门店报表中心-出库业务查询-门店出库明细表',
      ignore: false,
    },
  },
  // 供应商报表
  STORE_SUPPLIER_REPORT: {
    PAGE: { code: '616003', description: '门店报表中心-供应商报表', ignore: false },
  },
  // 供应商报表-供应商供货情况表
  STORE_SUPPLIER_MATERIAL: {
    PAGE: {
      code: '61600300',
      description: '门店报表中心-供应商报表-供应商供货情况表',
      ignore: false,
    },
  },
  // 供应商报表-门店供应商类别汇总 报表2期
  STORE_SUPPLIERS_CATEGORY_SUMMARY: {
    PAGE: {
      code: '61600301',
      description: '门店报表中心-供应商报表-门店供应商类别汇总',
      ignore: false,
    },
  },
  // 供应商报表-门店类别供应商汇总 报表2期
  STORE_CATEGORY_SUPPLIERS_SUMMARY: {
    PAGE: {
      code: '61600302',
      description: '门店报表中心-供应商报表-门店类别供应商汇总',
      ignore: false,
    },
  },
  // 供应商报表-采购结算进度表 报表2期
  PURCHASING_SETTLEMENT_SCHEDULE: {
    PAGE: {
      code: '61600303',
      description: '报表中心(集团)-供应商报表-采购结算进度表',
      ignore: false,
    },
  },
  // 库内业务查询
  STORE_WAREHOUSE_BUSINESS_QUERY: {
    PAGE: { code: '616004', description: '门店报表中心-库内业务查询', ignore: false },
  },
  // 库内业务查询-盘点明细表
  STORE_STOCKTAKING_DETAIL: {
    PAGE: { code: '61600400', description: '门店报表中心-库内业务查询-盘点明细表', ignore: false },
  },
  // 库内业务查询-店内调拨情况表
  STORE_ALLOCATION: {
    PAGE: {
      code: '61600401',
      description: '门店报表中心-库内业务查询-店内调拨情况表',
      ignore: false,
    },
  },
  // 库内业务查询-门店盘点明细表(按单) 报表1期
  STORE_STOCKTAKING_DETAIL_BILL: {
    PAGE: {
      code: '61600402',
      description: '门店报表中心-库内业务查询-门店盘点明细表(按单)',
      ignore: false,
    },
  },
  // 库存统计查询
  STORE_STOCK_STATISTICS_QUERY: {
    PAGE: { code: '616005', description: '门店报表中心-库存统计查询', ignore: false },
  },
  // 库存统计查询-库存余量表
  STOCK_REPORT: {
    PAGE: { code: '61600500', description: '门店报表中心-库存统计查询-库存余量表', ignore: false },
  },
  // 综合查询
  STORE_GENERAL_QUERY: {
    PAGE: { code: '616006', description: '门店报表中心-综合查询', ignore: false },
  },
  // 综合查询-进销存汇总表
  STORE_STOCK_INOUT_SUMMARY: {
    PAGE: { code: '61600600', description: '门店报表中心-综合查询-进销存汇总表', ignore: false },
  },
  // 综合查询-进销存明细表
  STORE_STOCK_INOUT_DETAIL: {
    PAGE: { code: '61600601', description: '门店报表中心-综合查询-进销存明细表', ignore: false },
  },

  /**
   * 总部报表中心623000
   */
  // 采购查询报表
  PURCHASE_QUERY_REPORT: {
    PAGE: { code: '62300001', description: '报表中心(集团)-采购查询报表', ignore: false },
  },
  // 采购查询报表-采购汇总表
  PROCUREMENT_REPORT: {
    PAGE: {
      code: '6230000100',
      description: '报表中心(集团)-采购查询报表-采购汇总表',
      ignore: false,
    },
  },
  // 采购查询报表-采购明细报表
  PURCHASE_DETAILS: {
    PAGE: {
      code: '6230000101',
      description: '报表中心(集团)-采购查询报表-采购明细报表',
      ignore: false,
    },
  },
  // 采购查询报表-采购退货汇总报表
  PURCHASE_REPORTS: {
    PAGE: {
      code: '6230000102',
      description: '报表中心(集团)-采购查询报表-采购退货汇总报表',
      ignore: false,
    },
  },
  // 采购查询报表-采购退货明细报表
  PURCHASE_DETIALREPORT: {
    PAGE: {
      code: '6230000103',
      description: '报表中心(集团)-采购查询报表-采购退货明细报表',
      ignore: false,
    },
  },
  // 采购查询报表-采购进退货明细报表 优化5.4.3
  PURCHASE_REPLENISH_RETURN_DETAILS: {
    PAGE: {
      code: '6230000105',
      description: '报表中心(集团)-采购查询报表-采购进/退货明细报表',
      ignore: true,
    },
  },
  // 采购查询报表-日采购汇总表
  DAY_PURCHASE_REPORT: {
    PAGE: {
      code: '6230000104',
      description: '报表中心(集团)-采购查询报表-日采购汇总表',
      ignore: false,
    },
  },
  // 配送查询报表
  DISTRIBUTION_QUERY_REPORT: {
    PAGE: {
      code: '62300002',
      description: '报表中心(集团)-报表中心(集团)-配送查询报表',
      ignore: false,
    },
  },
  // 配送查询报表-配送差异分析报表
  DISPATCH_DIFF: {
    PAGE: {
      code: '6230000200',
      description: '报表中心(集团)-配送查询报表-配送差异分析报表',
      ignore: false,
    },
  },
  // 配送查询报表-配送出库汇总报表
  DISTRIBUTION_SUMMARY_REPORT: {
    PAGE: {
      code: '6230000201',
      description: '报表中心(集团)-配送查询报表-配送出库汇总报表',
      ignore: false,
    },
  },
  // 配送查询报表-日配送出库汇总报表 优化5.4.3
  DAY_DELIVERY_OUTBOUND_SUMMARY: {
    PAGE: {
      code: '6230000203',
      description: '报表中心(集团)-配送查询报表-日配送出库汇总报表',
      ignore: true,
    },
  },
  // 配送查询报表-配送出库明细报表
  DISTRIBUTION_DETAILS: {
    PAGE: {
      code: '6230000202',
      description: '报表中心(集团)-配送查询报表-配送出库明细报表',
      ignore: false,
    },
  },
  // 配送查询报表-配送出库汇总表(按门店) 报表1期 暂时去掉
  /* DELIVERY_OUTBOUND_SUMMARY_ORGANIZATION: {
      PAGE: { code: '6230000203', description: '报表中心(集团)-配送查询报表-配送出库汇总表(按门店)', ignore: false },
    }, */
  // 配送查询报表-配送出库汇总表(按类别) 报表1期
  DELIVERY_OUTBOUND_SUMMARY_CATEGORY: {
    PAGE: {
      code: '6230000204',
      description: '报表中心(集团)-配送查询报表-配送出库汇总表(按类别)',
      ignore: false,
    },
  },
  // 配送查询报表-配送出库明细表 报表1期 暂时去掉
  /* DELIVERY_OUTBOUND_DETAIL: {
      PAGE: { code: '6230000205', description: '报表中心(集团)-配送查询报表-配送出库明细表', ignore: false },
    }, */
  // 配送查询报表-配送退货汇总报表
  DB_RSR: {
    PAGE: {
      code: '6230000206',
      description: '报表中心(集团)-配送查询报表-配送退货汇总报表',
      ignore: false,
    },
  },
  // 配送查询报表-配送退货明细
  DS_DETAIL_REPORT: {
    PAGE: {
      code: '6230000207',
      description: '报表中心(集团)-配送查询报表-配送退货明细',
      ignore: false,
    },
  },
  // 配送查询报表-配送验货查询 报表1期
  DELIVERY_INSPECTION_QUERY: {
    PAGE: {
      code: '6230000208',
      description: '报表中心(集团)-配送查询报表-配送验货查询',
      ignore: false,
    },
  },
  // 入库业务查询
  INBOUND_BUSINESS_QUERY: {
    PAGE: { code: '62300003', description: '报表中心(集团)-入库业务查询', ignore: false },
  },
  // 入库业务查询-入库汇总表(按日期) 报表1期
  WAREHOUSING_SUMMARY_DATETIME: {
    PAGE: {
      code: '6230000300',
      description: '报表中心(集团)-入库业务查询-入库汇总表(按日期)',
      ignore: false,
    },
  },
  // 入库业务查询-入库汇总表(按类别) 报表1期
  WAREHOUSING_SUMMARY_CATEGORY: {
    PAGE: {
      code: '6230000301',
      description: '报表中心(集团)-入库业务查询-入库汇总表(按类别)',
      ignore: false,
    },
  },
  // 入库业务查询-入库明细表 报表1期
  WAREHOUSING_DETAIL: {
    PAGE: {
      code: '6230000302',
      description: '报表中心(集团)-入库业务查询-入库明细表',
      ignore: false,
    },
  },
  // 出库业务查询
  OUTBOUND_BUSINESS_QUERY: {
    PAGE: { code: '62300004', description: '报表中心(集团)-出库业务查询', ignore: false },
  },
  // 出库业务查询-出库汇总表(按日期) 报表1期
  OUTBOUND_SUMMARY_DATETIME: {
    PAGE: {
      code: '6230000400',
      description: '报表中心(集团)-出库业务查询-出库汇总表(按日期)',
      ignore: false,
    },
  },
  // 出库业务查询-出库汇总表(按类别) 报表1期
  OUTBOUND_SUMMARY_CATEGORY: {
    PAGE: {
      code: '6230000401',
      description: '报表中心(集团)-出库业务查询-出库汇总表(按类别)',
      ignore: false,
    },
  },
  // 出库业务查询-出库日期汇总(按天) 报表2期
  OUTBOUND_DATETIME_SUMMARY_DAY: {
    PAGE: {
      code: '6230000402',
      description: '报表中心(集团)-出库业务查询-出库日期汇总(按天)',
      ignore: false,
    },
  },
  // 出库业务查询-出库日期汇总(按门店) 报表2期
  OUTBOUND_DATETIME_SUMMARY_ORG: {
    PAGE: {
      code: '6230000403',
      description: '报表中心(集团)-出库业务查询-出库日期汇总(按门店)',
      ignore: false,
    },
  },
  // 出库业务查询-出库明细表 报表1期
  OUTBOUND_DETAIL: {
    PAGE: {
      code: '6230000404',
      description: '报表中心(集团)-出库业务查询-出库明细表',
      ignore: false,
    },
  },
  // 库内业务查询
  WAREHOUSE_BUSINESS_QUERY: {
    PAGE: { code: '62300005', description: '报表中心(集团)-库内业务查询', ignore: false },
  },
  // 库内业务查询-盘点明细表
  STOCKTAKING_DETAIL: {
    PAGE: {
      code: '6230000500',
      description: '报表中心(集团)-库内业务查询-盘点明细表',
      ignore: false,
    },
  },
  // 库内业务查询-盘点明细表 按单 报表1期
  STOCKTAKING_DETAIL_BILL: {
    PAGE: {
      code: '6230000501',
      description: '报表中心(集团)-库内业务查询-盘点明细表(按单)',
      ignore: false,
    },
  },
  // 库内业务查询-调拨汇总查询(机构内) 报表1期
  TRANSFERS_IN_ORG_SUMMARY: {
    PAGE: {
      code: '6230000502',
      description: '报表中心(集团)-库内业务查询-调拨汇总查询(机构内)',
      ignore: false,
    },
  },
  // 库内业务查询-调拨明细查询(机构内) 报表1期
  TRANSFERS_IN_ORG_DETAIL: {
    PAGE: {
      code: '6230000503',
      description: '报表中心(集团)-库内业务查询-调拨明细查询(机构内)',
      ignore: false,
    },
  },
  // 库内业务查询-调拨汇总查询(机构间) 报表1期
  TRANSFERS_BETWEEN_ORG_SUMMARY: {
    PAGE: {
      code: '6230000504',
      description: '报表中心(集团)-库内业务查询-调拨汇总查询(机构间)',
      ignore: false,
    },
  },
  // 库内业务查询-调拨明细查询(机构间) 报表1期
  TRANSFERS_BETWEEN_ORG_DETAIL: {
    PAGE: {
      code: '6230000505',
      description: '报表中心(集团)-库内业务查询-调拨明细查询(机构间)',
      ignore: false,
    },
  },
  // 库存统计查询
  STOCK_STATISTICS_QUERY: {
    PAGE: { code: '62300006', description: '报表中心(集团)-库存统计查询', ignore: false },
  },
  // 库存统计查询-库存余量表
  OFFICIAL_STOCK_BALANCE: {
    PAGE: {
      code: '6230000600',
      description: '报表中心(集团)-库存统计查询-库存余量表',
      ignore: false,
    },
  },
  // 库存统计查询-批次库存余量表
  OFFICIAL_BATCH_STOCK_REPORT: {
    PAGE: {
      code: '6230000601',
      description: '报表中心(集团)-库存统计查询-批次库存余量表',
      ignore: false,
    },
  },
  // 库存统计查询-批次查询
  OFFICIAL_BATCH_QUERY: {
    PAGE: {
      code: '6230000602',
      description: '报表中心(集团)-库存统计查询-批次查询',
      ignore: false,
    },
  },
  // 库存统计查询-物资类别进出表 报表1期
  SUPPLIES_CATEGORY_INOUT: {
    PAGE: {
      code: '6230000603',
      description: '报表中心(集团)-库存统计查询-物资类别进出表',
      ignore: false,
    },
  },
  // 库存统计查询-物资明细进出表 报表1期
  SUPPLIES_DETAIL_INOUT: {
    PAGE: {
      code: '6230000604',
      description: '报表中心(集团)-库存统计查询-物资明细进出表',
      ignore: false,
    },
  },
  // 库存统计查询-物资综合进出表 报表2期
  SUPPLIES_COMPREHENSIVE_INOUT: {
    PAGE: {
      code: '6230000605',
      description: '报表中心(集团)-库存统计查询-物资综合进出表',
      ignore: false,
    },
  },
  // 库存统计查询-物资综合进出表 分仓库 报表2期
  SUPPLIES_COMPREHENSIVE_INOUT_WAREHOUSE: {
    PAGE: {
      code: '6230000606',
      description: '报表中心(集团)-库存统计查询--物资综合进出表(分仓库)',
      ignore: false,
    },
  },
  // 综合查询
  GENERAL_QUERY: {
    PAGE: { code: '62300007', description: '报表中心(集团)-综合查询', ignore: false },
  },
  // 综合查询-进销存汇总表
  STOCK_INOUT_SUMMARY: {
    PAGE: {
      code: '6230000700',
      description: '报表中心(集团)-综合查询-进销存汇总表',
      ignore: false,
    },
  },
  // 综合查询-进销存明细报表 报表3期 暂定
  STOCK_INOUT_DETAIL: {
    PAGE: {
      code: '6230000701',
      description: '报表中心(集团)-综合查询-进销存明细报表',
      ignore: false,
    },
  },
  // 综合查询-物资明细账
  SUPPLIES_DETAIL_LEDGER: {
    PAGE: { code: '6230000702', description: '报表中心(集团)-综合查询-物资明细账', ignore: false },
  },
  // 供应商报表
  SUPPLIER_REPORT: {
    PAGE: {
      code: '62300008',
      description: '报表中心(集团)-报表中心(集团)-供应商报表',
      ignore: false,
    },
  },
  // 供应商报表-采购价格分析表
  BUY_PRICE: {
    PAGE: {
      code: '6230000800',
      description: '报表中心(集团)-供应商报表-采购价格分析表',
      ignore: false,
    },
  },
  // 供应商报表-供应商进货汇总 报表1期
  SUPPLIER_PURCHASE_SUMMARY: {
    PAGE: {
      code: '6230000801',
      description: '报表中心(集团)-供应商报表-供应商进货汇总',
      ignore: false,
    },
  },
  // 供应商报表-类别供应商汇总 报表1期
  CATEGORY_SUPPLIERS_SUMMARY: {
    PAGE: {
      code: '6230000802',
      description: '报表中心(集团)-供应商报表-类别供应商汇总',
      ignore: false,
    },
  },
  // 供应商报表-直配验货查询 报表2期
  DIRECT_CONSIGNMENT_DELIVERY_INSPECTION: {
    PAGE: {
      code: '6230000803',
      description: '报表中心(集团)-供应商报表-直配验货查询',
      ignore: false,
    },
  },
  // 供应商报表-供应商报货查询
  SUPPLER_REPORT_SEARCH: {
    PAGE: { code: '6230000805', description: '供应商报货查询' },
  },
  // 成本分析报表
  COST_ANALYSIS_REPORT: {
    PAGE: {
      code: '62300009',
      description: '报表中心(集团)-报表中心(集团)-成本分析报表',
      ignore: false,
    },
  },
  // 成本分析报表-出库毛利查询 报表2期
  OUTBOUND_GROSS_PROFIT_QUERY: {
    PAGE: {
      code: '6230000900',
      description: '报表中心(集团)-成本分析报表-出库毛利查询',
      ignore: false,
    },
  },
  // 成本分析报表-物资成本差异 报表2期
  MATERIAL_COST_DIFFERENCE: {
    PAGE: {
      code: '6230000901',
      description: '报表中心(集团)-成本分析报表-物资成本差异',
      ignore: false,
    },
  },
  // 成本分析报表-集团物资成本差异(分仓库) 报表2期
  MATERIAL_COST_DIFFERENCE_WAREHOUSE: {
    PAGE: {
      code: '6230000902',
      description: '报表中心(集团)-成本分析报表-集团物资成本差异(分仓库)',
      ignore: false,
    },
  },
  STOCK_STORE_RECEIVING: {
    PAGE: { code: '614034', description: '门店进销存管理-收货管理' },
  },
  STORE_RECEIVING_MANAGEMENT: {
    PAGE: { code: '61403400', description: '收货管理--收货单管理' },
    VIEW: { code: '61403401', description: '收货管理--收货单管理--查看' },
    CHECK: { code: '61403402', description: '收货管理--收货单管理--收货' },
  },
  STOCK_RECEIVING: {
    PAGE: { code: '615033', description: '物流管理-收货管理' },
  },
  RECEIVING_MANAGEMENT: {
    PAGE: { code: '61503300', description: '物流管理-收货管理--收货单管理' },
    VIEW: { code: '61503302', description: '物流管理-收货管理--收货单管理--查看' },
    CHECK: { code: '61503301', description: '物流管理-收货管理--收货单管理--收货' },
  },

  STOCK_GLOBAL_INOUT_SUMMARY: {
    PAGE: { code: '615014', description: '门店进销存管理进销存汇总表' },
  },
  EXPRESS_MAINTAIN: {
    PAGE: { code: '611017', description: '基本设置-物流公司维护', ignore: false },
    OPERATION: {
      code: '61101700',
      description: '基本设置-物流公司维护-新增/编辑/删除/保存',
      ignore: false,
    },
  },
  VEHICLE_MANAGEMENT: {
    PAGE: { code: '615037', description: '物流管理-车辆管理', ignore: false },
    OPERATION: {
      code: '61503700',
      description: '物流管理-车辆管理_新增/编辑/删除/保存',
      ignore: false,
    },
    VIEW: { code: '61503701', description: '物流管理-车辆管理_查看', ignore: false },
    ENABLE: { code: '61503702', description: '物流管理-车辆管理_启用/停用', ignore: false },
    DISABLE: { code: '61503702', description: '物流管理-车辆管理_启用/停用', ignore: false },
  },
  ROAD_MANAGEMENT: {
    PAGE: { code: '615038', description: '物流管理-线路管理', ignore: false },
    OPERATION: {
      code: '61503800',
      description: '物流管理-线路管理_新增/编辑/删除/保存',
      ignore: false,
    },
    VIEW: { code: '61503801', description: '物流管理-线路管理_查看', ignore: false },
    ENABLE: { code: '61503802', description: '物流管理-线路管理_启用/停用', ignore: false },
    DISABLE: { code: '61503802', description: '物流管理-线路管理_启用/停用', ignore: false },
  },
  ECODE_MANAGE_ACTIVATE: {
    PAGE: { code: '627001', description: '码启用' },
    VIEW: { code: '62700100', description: '码启用-查看' },
    EDIT: { code: '62700101', description: '码启用-保存' },
  },
  ECODE_MANAGE_RULE: {
    PAGE: { code: '627002', description: '码规则' },
    VIEW: { code: '62700200', description: '码规则-查看' },
    EDIT: { code: '62700201', description: '码规则-新增/编辑/启用/停用' },
  },
  ECODE_MANAGE_SIZE: {
    PAGE: { code: '627003', description: '码尺寸' },
    VIEW: { code: '62700300', description: '码尺寸-查看' },
    EDIT: { code: '62700301', description: '码尺寸-保存' },
  },
  ECODE_MANAGE_CREAT: {
    PAGE: { code: '627004', description: '码生成' },
    VIEW: { code: '62700400', description: '码生成-查看' },
    EDIT: {
      code: '62700401',
      description: '码生成-新增/批量打印/批量启用/批量停用/启用/停用/预览打印码',
    },
  },
  // 询报比
  // =====
  INQUIRY_SHEET: {
    TAB: { code: '611020', description: '供应商管理-寻源管理' },
    PAGE: { code: '61102000', description: '供应商管理-寻源管理-询价单' },
    VIEW: { code: '6110200000', description: '供应商管理-寻源管理-询价单-查看' },
    EDIT: { code: '6110200001', description: '供应商管理-寻源管理-询价单-编辑' },
    DELETE: { code: '6110200002', description: '供应商管理-寻源管理-询价单-删除' },
    RECALL: { code: '6110200003', description: '供应商管理-寻源管理-询价单-撤回' },
    ADUIT: { code: '6110200004', description: '供应商管理-寻源管理-询价单-审核' },
    INVALID: { code: '6110200005', description: '供应商管理-寻源管理-询价单-作废' },
    READUIT: { code: '6110200006', description: '供应商管理-寻源管理-询价单-反审核' },
    CRETEOFFER: { code: '6110200007', description: '供应商管理-寻源管理-询价单-生成报价单' },
    CRETEJUDAGE: { code: '6110200008', description: '供应商管理-寻源管理-询价单-生成比价单' },
  },
  PRICE_SHEET: {
    PAGE: { code: '61102001', description: '供应商管理-寻源管理-报价单' },
    VIEW: { code: '6110200100', description: '供应商管理-寻源管理-报价单-查看' },
    CREATE_PRICE_FORM: { code: '6110200101', description: '供应商管理-寻源管理-报价单-生成比价单' },
  },
  PRICE_COMPARE: {
    PAGE: { code: '61102002', description: '供应商管理-寻源管理-比价单' },
    VIEW: { code: '6110200200', description: '供应商管理-寻源管理-比价单-查看' },
    EDIT: { code: '6110200201', description: '供应商管理-寻源管理-比价单-编辑' },
    DEL: { code: '6110200202', description: '供应商管理-寻源管理-比价单-删除' },
    REVOKE: { code: '6110200203', description: '供应商管理-寻源管理-比价单-撤回' },
    AUDIT: { code: '6110200204', description: '供应商管理-寻源管理-比价单-审核' },
    CANCEL: { code: '6110200205', description: '供应商管理-寻源管理-比价单-作废' },
    UNAUDIT: { code: '6110200206', description: '供应商管理-寻源管理-比价单-反审核' },
    CREATE_QUOTATION: {
      code: '6110200207',
      description: '供应商管理-寻源管理-比价单-生成采购定价',
    },
    EXPORT: { code: '6110200208', description: '供应商管理-寻源管理-比价单-导出' },
  },

  // 产品成本核算
  ALLOT_STANDARD: {
    PAGE: { code: '628001', description: '分配标准' },
    ACTION: { code: '62800101', description: '分配标准_添加/编辑/启用/停用' },
    VIEW: { code: '62800102', description: '分配标准_查看' },
  },
  BY_PRODUCT_MAINTENANCE: {
    PAGE: { code: '628002', description: '副产品成本维护' },
    ACTION: { code: '62800201', description: '副产品成本维护_添加/编辑/删除' },
  },
  COST_ACCOUNT: {
    PAGE: { code: '628003', description: '成本计算' },
  },
  DIRECT_MATERIAL_COST_INQUIRY: {
    PAGE: { code: '628004', description: '产量归集查询' },
  },
  TOTAL_MATERIAL_COTT_QUERY: {
    PAGE: { code: '628005', description: '直接材料成本查询' },
  },
  OUTPUT_COLLECTION_QUERY: {
    PAGE: { code: '628006', description: '共耗材料成本查询' },
  },
  COST_SHEET_QUERY: {
    TABS: { code: '628007', description: '成本计算单查询' },
    COST_COUNT_SUM_PAGE: { code: '62800701', description: '成本计算汇总查询' },
    COST_COUNT_SUM_ACTION: { code: '6280070101', description: '成本计算汇总查询-查看/导出' },
    COSTING_DETAILS_PAGE: { code: '62800703', description: '成本计算明细查询' },
  },

  // 销售管理权限 add by bianlin at 2019.02.12
  // 客户分类
  CUSTOMER_CLASSIFICATION: {
    PAGE: { code: '6290001', description: '客户分类' },
    ACTION: { code: '629000101', description: '客户分类-添加/编辑/删除/启用/停用' },
  },
  // 客户档案
  CLIENT_FILE: {
    PAGE: { code: '6290002', description: '客户档案' },
    ACTION: { code: '629000201', description: '客户档案_添加/编辑/删除/启用/停用' },
  },
  // 销售关系
  SALE_RELATIONS: {
    PAGE: { code: '6290003', description: '销售关系' },
    ACTION: { code: '629000301', description: '销售关系_添加/编辑/删除/启用/停用' },
  },
  // 销售价格单管理
  SALES_PRICE_MANAGEMENT: {
    PAGE: { code: '6290004', description: '销售价格单管理' },
  },
  // 销售价格单
  SALES_PRICE: {
    PAGE: { code: '62900041', description: '销售价格单' },
    ACTION: { code: '6290004101', description: '销售价格单_添加/编辑/删除' },
    REVOKE: { code: '6290004102', description: '销售价格单_撤回' },
    AUDIT: { code: '6290004103', description: '销售价格单_审核' },
    VIEW: { code: '6290004104', description: '销售价格单_查看' },
    CANCEL: { code: '6290004105', description: '销售价格单_作废' },
    UNAUDIT: { code: '6290004106', description: '销售价格单_反审核' },
  },
  // 销售价格单查询
  SALE_PRICE_CHECK: {
    PAGE: { code: '62900042', description: '销售价格单查询' },
  },
  // 销售订单
  SALES_ORIDER: {
    PAGE: { code: '6290005', description: '销售订单管理' },
    ADD: { code: '629000501', description: '销售订单管理_添加' },
    EDIT: { code: '629000502', description: '销售订单管理_编辑' },
    DELETE: { code: '629000503', description: '销售订单管理_删除' },
    AUDIT: { code: '629000504', description: '销售订单管理_审核' },
    REVOKE: { code: '629000505', description: '销售订单管理_撤回' },
    CANCEL: { code: '629000506', description: '销售订单管理_作废' },
    UNAUDIT: { code: '629000507', description: '销售订单管理_反审核' },
    OUT: { code: '629000508', description: '销售订单管理_出库' },
    CLOSE: { code: '629000509', description: '销售订单管理_关闭' },
    UNCLOSE: { code: '629000510', description: '销售订单管理_反关闭' },
    VIEW: { code: '629000511', description: '销售订单管理_查看' },
  },
  // 销售出库单
  SALES_OUTBOUND: {
    PAGE: { code: '6290006', description: '销售出库单管理' },
    ADD: { code: '629000601', description: '销售出库单管理_添加' },
    EDIT: { code: '629000602', description: '销售出库单管理_编辑' },
    DELETE: { code: '629000603', description: '销售出库单管理_删除' },
    AUDIT: { code: '629000604', description: '销售出库单管理_审核' },
    REVOKE: { code: '629000605', description: '销售出库单管理_撤回' },
    INVALID: { code: '629000606', description: '销售出库单管理_作废' },
    REFUND: { code: '629000607', description: '销售出库单管理_退货' },
    VIEW: { code: '629000608', description: '销售出库单管理_查看' },
  },
  // 销售退货单管理
  SALES_RETURN_MANAGEMENT: {
    PAGE: { code: '6290007', description: '销售退货单管理' },
  },
  // 退货原因维护
  SALE_RETURN_REASON: {
    PAGE: { code: '62900072', description: '退货原因维护' },
    ACTION: { code: '6290007201', description: '退货原因维护_添加/编辑/删除/启用/停用' },
  },
  // 销售退货单
  SALES_RETURN: {
    PAGE: { code: '62900071', description: '销售退货单' },
    EDIT: { code: '6290007101', description: '销售退货单_编辑' },
    DELETE: { code: '6290007102', description: '销售退货单_删除' },
    AUDIT: { code: '6290007103', description: '销售退货单_审核' },
    REVOKE: { code: '6290007104', description: '销售退货单_撤回' },
    CANCEL: { code: '6290007105', description: '销售退货单_作废' },
    VIEW: { code: '6290007106', description: '销售退货单_查看' },
  },
  // 销售结算单
  SALES_STATEMENT: {
    PAGE: { code: '6290008', description: '销售结算单' },
    ADD: { code: '629000801', description: '销售结算单-添加' },
    EDIT: { code: '629000802', description: '销售结算单-编辑' },
    DELETE: { code: '629000803', description: '销售结算单-删除' },
    AUDIT: { code: '629000804', description: '销售结算单-审核' },
    REVOKE: { code: '629000805', description: '销售结算单-撤回' },
    INVALID: { code: '629000806', description: '销售结算单-作废' },
    REAUDIT: { code: '629000807', description: '销售结算单-反审核' },
    VIEW: { code: '629000808', description: '销售结算单-查看' },
  },
  // ---end---
};
