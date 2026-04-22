export interface IPopulatedGhostStory {
	class: string;
	storyId: number;
	name: string;
	summary: string;
	mediumToEnter: string;
	description: string;
	author: { codename: string } | null;
}
