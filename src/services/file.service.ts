import { sendRequest } from '@/utils/api'

function uploadFile(body: FormData) {
  return sendRequest<{ filePath: string }>({
    endpoint: '/Files',
    method: 'POST',
    body
  })
}

function fetchFile(filePath: string) {
  // Use proxy API route for external URLs (filePath)
  const proxyUrl = `/api/proxy-file?url=${encodeURIComponent(filePath)}`

  return fetch(proxyUrl)
}

const filesService = {
  uploadFile,
  fetchFile
}

export default filesService