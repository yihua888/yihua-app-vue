export default {
  formConfig: {
    labelWidth: '120px',
    itemStyle: {
      padding: '10px 40px'
    },
    colLayout: {
      span: 12
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
  tableCol: [
    {
      prop: 'utilName', label: '工具名称', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler',   align: 'center'
    }
  ],
  tableConfig: {}
}
