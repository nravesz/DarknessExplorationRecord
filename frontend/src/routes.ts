export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  GHOST_STORIES: "/ghost-stories",
  CREATE_GHOST_STORY: "/ghost-stories/new",
  GHOST_STORY: "/ghost-stories/:id",
  USER: "/user",
  SETTINGS: "/settings",
  GHOST_STORY_TABS: {
    OVERVIEW: "overview",
    DESCRIPTION: "description",
    MANUAL: "manual",
    RECORDS: "records",
  },
};

export const ghostStoryPath = (id: string) => `/ghost-stories/${id}`;
