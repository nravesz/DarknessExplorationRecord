export interface IRecord {
  id: string;
  ghostStory: {
    id: string;
    name: string;
    class: string;
  };
  user: string;
  notes?: string;
  encounteredAt: string;
}
