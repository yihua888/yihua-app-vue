export default {
  formConfig: {
    labelWidth: '120px',
    itemStyle: {
      padding: '10px 40px'
    },
    colLayout: {
      span: 24
    },
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '案例名称',
        placeholder: '请输入案例名称'
      },
      {
        field: 'typeId',
        type: 'input',
        label: '案例类型',
        placeholder: '请输入例类型'
      },
      {
        field: 'caseCode',
        type: 'input',
        label: '案例展示地址',
        placeholder: '请输入组件案例地址'
      }
    ]
  },
  tablesConfig: [
    {
      type: 'autoincrement',
      tableName: 'codes',
      info: '案例代码',
      tableCol: [
        {
          prop: 'filename', label: '文件名', minWidth: '100'
        },
        {
          prop: 'url', label: 'url', minWidth: '100'
        }
      ],
      tableConfig: {
        showFooter: false
      },
      tableData: []
    }
  ]
}
