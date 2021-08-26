export type Registration = {
	id: number,
	title: string,
	dateSubmitted: string,
	status: string
};

export type UserProfile = {
	firstName: string;
	lastName: string;
	emailAddress: string;
};

export type GuidelineType = {
	id: number;
	title: string;
	expectedPublicationDate: string;
	status: string;
	guidanceType: string;
};