import type { LucideIcon } from 'lucide-react-native';
import {
    Briefcase,
    CalendarDays,
    FileText,
    LayoutDashboard,
    MessageSquare,
    Plus,
    Search,
    UserPen,
    Users,
    Video
} from 'lucide-react-native';
import type { UserRole } from '../types';

export interface TabConfig {
	name: string;
	title: string;
	Icon: LucideIcon;
}

const TALENT_TABS: TabConfig[] = [
	{ name: 'dashboard', title: 'Dashboard', Icon: LayoutDashboard },
	{ name: 'profile', title: 'Profile', Icon: UserPen },
	{ name: 'search', title: 'Search', Icon: Search },
	{ name: 'submit', title: 'Submit', Icon: FileText },
	{ name: 'messages', title: 'Messages', Icon: MessageSquare },
	{ name: 'virtual-assistant', title: 'Virtual Assistant', Icon: Video },
];

const CASTING_DIRECTOR_TABS: TabConfig[] = [
	{ name: 'dashboard', title: 'Dashboard', Icon: LayoutDashboard },
	{ name: 'my-projects', title: 'My Projects', Icon: FileText },
	{ name: 'create-casting-call', title: 'Create Casting Call', Icon: Plus },
	{ name: 'submissions', title: 'Submissions', Icon: Users },
	{ name: 'messages', title: 'Messages', Icon: MessageSquare },
];

const INDUSTRY_PROFESSIONAL_TABS: TabConfig[] = [
	{ name: 'dashboard', title: 'Dashboard', Icon: LayoutDashboard },
	{ name: 'profile', title: 'Profile', Icon: UserPen },
	{ name: 'services', title: 'Services', Icon: Briefcase },
	{ name: 'browse-talents', title: 'Browse Talents', Icon: Search },
	{ name: 'booking', title: 'Booking', Icon: CalendarDays },
	{ name: 'messages', title: 'Chat', Icon: MessageSquare },
];

const ADMIN_TABS: TabConfig[] = [
	{ name: 'dashboard', title: 'Dashboard', Icon: LayoutDashboard },
	{ name: 'search', title: 'Search', Icon: Search },
	{ name: 'messages', title: 'Messages', Icon: MessageSquare },
	{ name: 'profile', title: 'Profile', Icon: UserPen },
];

export const ROLE_TABS: Record<UserRole, TabConfig[]> = {
	talent: TALENT_TABS,
	casting_director: CASTING_DIRECTOR_TABS,
	industry_professional: INDUSTRY_PROFESSIONAL_TABS,
	admin: ADMIN_TABS,
};
