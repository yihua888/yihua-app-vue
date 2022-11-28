import { useRouter } from 'vue-router'
import { getCache } from '@/utils/cache'
import { useUserStore  } from '@/store/user'

export const isOpration = (flag) => {
  const userStore = useUserStore()
  let opration = userStore.operation
  if (!opration || !opration.length) {
    opration = getCache('opration')
    userStore.changeOperation(opration)
  }
  return opration?.includes(flag)
}
