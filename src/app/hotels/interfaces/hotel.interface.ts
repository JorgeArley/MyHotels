export interface Hotel {
  id:            string;
  name:          string;
  address:       string;
  url_image?:    string;
  stars:         string;
  creation_date: string;
  good_things:   string[];
  bad_things:    string[];
}
