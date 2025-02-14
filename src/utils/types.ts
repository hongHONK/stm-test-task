export type User = {
  name: {
    first: string;
    last: string;
  };
  location: {
    state: string;
    city: string;
  };
  email: string;
  phone: string;
  registered: {
    date: string;
  };
  picture: {
    thumbnail: string;
    medium: string;
  };
  login: {
    uuid: string;
  };
};
