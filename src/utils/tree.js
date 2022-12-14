export const arrayToTree = arr => {
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
