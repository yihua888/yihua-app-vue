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
        field: 'algorithmName',
        type: 'input',
        label: '名称',
        placeholder: '名称'
      },
      {
        field: 'algorithmType',
        type: 'select',
        label: '算法类型',
        placeholder: '请选择算法类型',
        options: []
      }
    ]
  },
  tableCol: [
    {
      prop: 'name', label: 'code', minWidth: '100'
    },
    {
      prop: 'label', label: '名称', minWidth: '100'
    },
    {
      prop: 'type', label: '类型', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler',  align: 'center'
    }
  ],
  tableConfig: {}
}
