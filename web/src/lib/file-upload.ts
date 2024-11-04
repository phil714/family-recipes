import { client as fileStackClient } from 'filestack-react'

const client = fileStackClient.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

export async function upload(files: fileStackClient.InputFile) {
  return await client.upload(files)
}
