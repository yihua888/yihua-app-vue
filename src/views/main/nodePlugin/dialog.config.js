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
        field: 'pluginName',
        type: 'input',
        label: '插件名称',
        placeholder: '请输入插件名'
      },
      {
        field: 'info',
        type: 'input',
        label: '插件说明',
        placeholder: '请输入插件说明'
      },
      {
        field: 'codeUrl',
        type: 'input',
        label: '插件地址',
        placeholder: '请输入插件地址'
      }
    ]
  },
  tablesConfig: []
}
