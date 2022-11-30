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
                field: 'name',
                type: 'input',
                label: '组件代码',
                placeholder: '请输入组件代码'
            },
            {
                field: 'label',
                type: 'input',
                label: '组件名',
                placeholder: '请输入组件名'
            },
            {
                field: 'blog',
                type: 'input',
                label: '博客地址',
                placeholder: '请输入博客地址'
            },
            {
                field: 'cpnUrl',
                type: 'input',
                label: '组件展示地址',
                placeholder: '请输入组件展示地址'
            },
            {
                field: 'info',
                type: 'textarea',
                label: '组件介绍',
                placeholder: '请输入组件介绍'
            }
        ]
    },
    tablesConfig:[
        {
            type:"autoincrement",
            tableName:"attr",
            info:"组件属性",
            tableCol:[
                {
                    prop: 'name', label: '属性名', minWidth: '100'
                },
                {
                    prop: 'info', label: '介绍', minWidth: '100'
                },
                {
                    prop: 'type', label: '类型', minWidth: '100'
                },
                {
                    prop: 'required', label: '是否必填', minWidth: '100' , type:'switch' , aligin:"center"
                },
                {
                    prop: 'defaultValue', label: '默认值', minWidth: '100'
                }
            ],
            tableConfig:{
                showFooter:false
            },
            tableData:[]
        },
        {
            type:"autoincrement",
            tableName:"codes",
            info:"组件代码",
            tableCol:[
                {
                    prop: 'fileName', label: '文件名', minWidth: '100'
                },
                {
                    prop: 'url', label: '文件地址', minWidth: '100'
                }
            ],
            tableConfig:{
                showFooter:false
            },
            tableData:[]
        },
        {
            type:"autoincrement",
            tableName:"methods",
            info:"组件方法",
            tableCol:[
                {
                    prop: 'name', label: '方法名', minWidth: '100'
                },
                {
                    prop: 'info', label: '方法介绍', minWidth: '100'
                }
            ],
            tableConfig:{
                showFooter:false
            },
            tableData:[]
        },
        {
            type:"autoincrement",
            tableName:"slots",
            info:"插槽",
            tableCol:[
                {
                    prop: 'name', label: '插槽名', minWidth: '100'
                },
                {
                    prop: 'info', label: '插槽介绍', minWidth: '100'
                },
                {
                    prop: 'arguments_info', label: '参数介绍', minWidth: '100'
                }
            ],
            tableConfig:{
                showFooter:false
            },
            tableData:[]
        }
    ]
}
