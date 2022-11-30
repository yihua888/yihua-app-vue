import { getFile } from '@/service/file.js'


export const getFileByUrlArr = (urlArr) => new Promise(async (resolve,reject)=>{
    const codeArr = []
    if (typeof urlArr === 'string') {
        const res = await getFile(`/staticFile?url=${urlArr}`)
        codeArr.push({
            filename: '',
            codeStr: res.data,
            showCode:true
        }) 
        resolve(codeArr)
    }else if (Array.isArray(urlArr)) {
        for(let i = 0; i < urlArr.length ; i++){
            const item = urlArr[i]
            const res = await getFile(`/staticFile?url=${item.url}`)
            codeArr.push({
                filename: item.fileName,
                codeStr: res.data ,
                showCode:true
            })
        }
        resolve(codeArr)
    }

})



