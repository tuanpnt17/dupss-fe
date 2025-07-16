export const formatTime = (dateTime: string | Date): string => {
  if (!dateTime) return ''

  try {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime

    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Error formatting time:', error)

    return dateTime.toString()
  }
}

export const formatDate = (dateTime: string | Date): string => {
  if (!dateTime) return ''

  try {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime

    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } catch (error) {
    console.error('Error formatting date string:', error)

    return dateTime.toString()
  }
}

export const formatDateTime = (dateTime: string | Date): string => {
  if (!dateTime) return ''

  try {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime

    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Error formatting date time:', error)

    return dateTime.toString()
  }
}

export const formatDateTimeToUtc = (dateTime: string | Date): string => {
  if (!dateTime) return ''

  try {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime

    return date.toUTCString()
  } catch (error) {
    console.error('Error formatting date time:', error)

    return dateTime.toString()
  }
}

export function formatDateHyper(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function birthDateFormat(date: Date | string): string {
  if (!date) return ''

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const year = dateObj.getFullYear()

    return `${month}/${day}/${year}`
  } catch (error) {
    console.error('Error formatting birth date:', error)

    return date.toString()
  }
}

export const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}
