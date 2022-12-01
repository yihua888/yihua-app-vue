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
        field: 'info',
        type: 'input',
        label: 'sql说明',
        placeholder: '请输入sql说明'
      },
      {
        field: 'codeUrl',
        type: 'input',
        label: '案例类型',
        placeholder: '请输入sql地址'
      }
    ]
  },
  tablesConfig: []
}
