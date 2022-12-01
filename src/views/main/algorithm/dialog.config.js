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
        field: 'label',
        type: 'input',
        label: '算法名称',
        placeholder: '请输入算法名称'
      },
      {
        field: 'name',
        type: 'input',
        label: '算法代码',
        placeholder: '请输入算法代码'
      },
      {
        field: 'info',
        type: 'input',
        label: '算法介绍',
        placeholder: '请输入算法介绍'
      },
      {
        field: 'typeId',
        type: 'select',
        label: '算法类型',
        placeholder: '请选择算法类型',
        options: []
      }
    ]
  },
  tablesConfig: [
    {
      type: 'autoincrement',
      tableName: 'codes',
      info: '算法代码文件',
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
