import { DateTime, DateTimeFormatOptions } from 'luxon'

export function formattedDate (dateString: string, options: DateTimeFormatOptions) {
	return DateTime.fromISO(dateString).setLocale('en-GB').toLocaleString(options)
}
