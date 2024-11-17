import { client as fsClient } from 'filestack-react'

const client = fsClient.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

export async function upload(files: fsClient.InputFile) {
  return await client.upload(files)
}

// fsClient.EFitOptions

export function transform(url: string, options: fsClient.TransformOptions) {
  return client.transform(url, options)
}
