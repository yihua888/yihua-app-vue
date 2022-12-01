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
        field: 'utilName',
        type: 'input',
        label: '工具名称',
        placeholder: '请输入工具名称'
      },
      {
        field: 'utilCode',
        type: 'input',
        label: '工具展示地址',
        placeholder: '请输入工具展示地址'
      }
    ]
  },
  tablesConfig: [
    {
      type: 'autoincrement',
      tableName: 'codes',
      info: '工具代码',
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
