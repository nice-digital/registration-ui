export type Registration = {
	id: number,
	title: string,
	projectID: string,
	productTypeName: string,
	dateSubmitted: string,
	status: string,
	nextPhase?: string
};

export type UserProfile = {
	firstName: string;
	lastName: string;
	emailAddress: string;
};

// export type GuidelineType = {
// 	id: number;
// 	title: string;
// 	expectedPublicationDate: string;
// 	status: string;
// 	guidanceType: string;
// };

export type ProjectType = {
	Reference: string; //eg "GID-TA10480"
	Title: string; //eg "Lenalidomide with R-CHOP for untreated activated diffuse large B-cell lymphoma [ID1611]"
	PublishedDate: string; //eg "2021-05-19T00:00:00" or null
	LastModifiedDate: string; //eg "2019-09-19T16:10:08.2970371" or null
	Status: string; //eg "Suspended"
	ProjectGroup: string; //eg "Guidance"
	ProjectType: string; //eg "TA"
	ProductTypeName: string; //eg "Technology appraisal guidance"
};

export type BackendProjectType = {
	id: string;
	title: string;
	productTypeName: string;
}