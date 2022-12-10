import { getRoles } from '@/service/role'

const config = {
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
      },
      {
        field: 'roleId',
        type: 'select',
        label: '身份',
        placeholder: '请选择身份',
        options: []
      },
      {
        field: 'avatar',
        type: 'image',
        label: '头像'
      }
    ]
  },
  tablesConfig: []
}

getRoles().then(res => {
  config.formConfig.formItems[1].options = res.data.map(item => ({
    title: item.roleName,
    value: item.id
  }))
})

export default config
