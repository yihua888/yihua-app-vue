import { getPermissionList } from '@/service/promission'

const arrayToTree = arr => {
  const obj = {}
  let root = null
  arr.forEach(item => {
    if (!obj[item.id]) {
      obj[item.id] = item
      obj[item.id].children = []
    }

    if (obj[item.pId]) {
      obj[item.pId].children.push(item)
    }

    if (!item.pId) {
      root = item
    }
  })
  return [root]
}

const tableCol = [
  { prop: 'permissionName', label: 'name', minWidth: '100' },
  { prop: 'permissionCode', label: 'code', minWidth: '100' },
  { prop: 'path', label: 'path', minWidth: '100' },
  { prop: 'icon', label: 'icon', minWidth: '100' },
  { prop: 'cpnURL', label: 'cpnURL', minWidth: '100' },
  { prop: 'type', label: '类型', minWidth: '100', slotName: 'type' },
  { label: '操作', minWidth: '100', slotName: 'handler' }
]

const dialogConfig = {
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
        field: 'permissionName',
        type: 'input',
        label: 'name',
        placeholder: '请输入name'
      },
      {
        field: 'permissionCode',
        type: 'input',
        label: 'code',
        placeholder: '请输入code'
      },
      {
        field: 'path',
        type: 'input',
        label: 'path',
        placeholder: '请输入path'
      },
      {
        field: 'icon',
        type: 'input',
        label: 'icon',
        placeholder: '请输入icon'
      },
      {
        field: 'cpnURL',
        type: 'input',
        label: 'cpnURL',
        placeholder: '请输入cpnURL'
      },
      {
        field: 'type',
        type: 'select',
        label: 'type',
        placeholder: '请选择type',
        options: [
          { value: 1, title: '一级路由（展示路由）' },
          { value: 2, title: '二级路由（非菜单路由）' },
          { value: -1, title: '非路由页面' },
          { value: 0, title: '按钮' }
        ]
      },
      {
        field: 'pId',
        type: 'cascader',
        label: '父级节点',
        placeholder: '请选择父级节点',
        options: [],
        props: {
          checkStrictly: true
        },
        otherOptions: {
          clearable: true,
          showAllLevels: false
        }
      }
    ]
  },
  tablesConfig: []
}

getPermissionList().then(res => {
  dialogConfig.formConfig.formItems[6].options = arrayToTree(res.data.map(item => ({
    label: item.permissionName,
    value: item.id,
    id: item.id,
    pId: item.pId,
    disabled: item.type == 0
  })))
})

export { tableCol, dialogConfig }
