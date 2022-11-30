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
        field: 'cpn_name',
        type: 'input',
        label: '组件代码',
        placeholder: '请输入组件代码'
      },
      {
        field: 'label',
        type: 'input',
        label: '组件名',
        placeholder: '请输入组件名'
      }
    ]
  },
  tableCol: [
    {
      prop: 'cpn_name', label: '组件代码', minWidth: '100'
    },
    {
      prop: 'label', label: '组件名', minWidth: '100'
    },
    {
      prop: 'info', label: '说明', minWidth: '400'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler',   align: 'center'
    }
  ],
  tableConfig:{
    
  }
}
