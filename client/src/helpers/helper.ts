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

export function convertDate(dateValue: Date) {
  const arrMonth = [
    'January',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]
  const newDate = new Date(dateValue as any)

  const month: String = arrMonth[newDate.getMonth()]
  const years = newDate.getFullYear().toString()
  const date = newDate.getDate().toString()

  if (!dateValue) {
    return { date: null, month: null, years: null }
  }
  return { date, month, years }
}

export function convertCurrency(currency: number) {
  return new Intl.NumberFormat('ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(currency)
}

export function calcProgress(currentAmount: number, target: number) {
  const progress = Math.ceil((currentAmount / target) * 100)
  return progress
}

export function gotoTop() {
  window.scrollTo(0, 0)
}
