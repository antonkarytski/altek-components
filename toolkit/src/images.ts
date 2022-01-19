import { Image } from 'react-native'

export function getImageSize(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({ width, height })
      },
      (error) => {
        reject(error)
      }
    )
  })
}
