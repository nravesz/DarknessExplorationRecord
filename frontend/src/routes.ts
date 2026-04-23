export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  GHOST_STORIES: "/ghost-stories",
  CREATE_GHOST_STORY: "/ghost-stories/new",
  GHOST_STORY: "/ghost-stories/:id",
  EDIT_GHOST_STORY: "/ghost-stories/:id/edit",
  USER: "/user",
  SETTINGS: "/settings",
  GHOST_STORY_TABS: {
    OVERVIEW: "overview",
    DESCRIPTION: "description",
    MANUAL: "manual",
    RECORDS: "records",
  },
  PROFILE_TABS: {
    GHOST_STORIES: "ghost-stories",
    RECORDS: "records",
  },
};

export const ghostStoryPath = (id: string) => `/ghost-stories/${id}`;
export const editGhostStoryPath = (id: string) => `/ghost-stories/${id}/edit`;
