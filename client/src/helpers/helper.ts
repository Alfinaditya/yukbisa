export async function encodedImage(image: Blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(image)
  })
}

function hasWhiteSpace(str: string) {
  return str.indexOf(' ') >= 0
}

export function createEndpoint(endPoint: string) {
  if (hasWhiteSpace(endPoint)) {
    const newEndPoint = endPoint.split(' ').join('-')
    return `${newEndPoint.toLowerCase()}`
  } else {
    return `${endPoint.toLowerCase()}`
  }
}
