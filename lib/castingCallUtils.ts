import { CastingCall } from '@/types';

export const formatDate = (dateString: string): string => {
	if (!dateString) return '';
	try {
		const d = new Date(dateString);
		if (isNaN(d.getTime())) return dateString;
		const dd = d.getDate().toString().padStart(2, '0');
		const mm = (d.getMonth() + 1).toString().padStart(2, '0');
		const yy = d.getFullYear().toString().slice(-2);
		return `${dd}/${mm}/${yy}`;
	} catch {
		return dateString;
	}
};

export const getLocationLabel = (
	location?: CastingCall['location'],
): string => {
	if (!location) return 'Location';
	const parts = [location.city, location.state].filter(Boolean);
	if (location.remote) parts.push('Remote');
	return parts.join(', ') || 'Location';
};

export const PROJECT_TYPE_LABELS: Record<string, string> = {
	feature_film: 'Feature Film',
	short_film: 'Short Film',
	commercial: 'Commercial',
	music_video: 'Music Video',
	television: 'Television',
	theater: 'Theater',
	web_series: 'Web Series',
	voice_over: 'Voice Over',
	other: 'Other',
};
