import { client as fsClient } from 'filestack-react'

const client = fsClient.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

export type TransformOptions = fsClient.TransformOptions
export type UploadOptions = fsClient.UploadOptions
export type StoreUploadOptions = fsClient.StoreUploadOptions

export async function upload(
  files: fsClient.InputFile,
  uploadOptions?: UploadOptions,
  storeOptions?: StoreUploadOptions
) {
  return await client.upload(files, uploadOptions, storeOptions)
}

export function transform(url: string, options: TransformOptions) {
  return client.transform(url, options)
}

export async function remove(url: string) {
  return await client.remove(url)
}

export async function getImageSize(url: string): Promise<{
  width: number
  height: number
}> {
  const imageSizeUrl = transform(url, { imagesize: true })
  const fetchResult = await fetch(imageSizeUrl)
  return await fetchResult.json()
}
