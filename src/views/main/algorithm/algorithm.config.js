export default {
  formConfig: {
    labelWidth: '120px',
    itemStyle: {
      padding: '10px 40px'
    },
    colLayout: {
      span: 6
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
        type: 'input',
        label: '类型代码',
        placeholder: '请输入类型代码'
      }
    ]
  },
  tableCol: [
    {
      prop: 'algorithmName', label: 'code', minWidth: '100'
    },
    {
      prop: 'label', label: '名称', minWidth: '100'
    },
    {
      prop: 'type', label: '类型代码', minWidth: '100'
    },
    {
      prop: 'algorithmType', label: '类型名称', minWidth: '100'
    },
    {
      label: '操作', minWidth: '100',  slotName: 'handler',  align: 'center'
    }
  ],
  tableConfig:{}
}
