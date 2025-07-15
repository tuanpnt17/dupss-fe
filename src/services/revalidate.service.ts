/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendRequest } from '@/utils/api'

const revalidateService = {
  async revalidate(tags: string[]) {
    await sendRequest<any>({
      endpoint: '/api/revalidate',
      isServerSideRoute: true,
      method: 'POST',
      queryParams: {
        tag: tags.join(',')
      }
    })
  }
}

export default revalidateService