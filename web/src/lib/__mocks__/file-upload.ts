import { client as fsClient } from 'filestack-react'

export type TransformOptions = fsClient.TransformOptions
export type UploadOptions = fsClient.UploadOptions
export type StoreUploadOptions = fsClient.StoreUploadOptions

export async function upload(
  files: fsClient.InputFile,
  uploadOptions?: UploadOptions,
  storeOptions?: StoreUploadOptions
) {
  return await Promise.resolve(
    JSON.stringify(files) +
      JSON.stringify(uploadOptions) +
      JSON.stringify(storeOptions)
  )
}

export function transform(url: string, _: TransformOptions) {
  return url
}

export async function remove(_: string) {
  return await Promise.resolve()
}

export async function getImageSize(_: string): Promise<{
  width: number
  height: number
}> {
  return Promise.resolve({ width: 50, height: 50 })
}
