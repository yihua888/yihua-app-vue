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
        field: 'username',
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名'
      }
    ]
  },
  tableCol: [
    {
      prop: 'username', label: '用户名', minWidth: '100'
    },
    {
      prop: 'role', label: '用户身份', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler',   align: 'center'
    }
  ],
  tableConfig: {}
}
