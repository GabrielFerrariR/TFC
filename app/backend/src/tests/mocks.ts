export const validAdmin = {id: 1, username:' Admin', role: 'admin', email:'admin@admin.com', password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };
export const validUser =  {id:2, username: 'User', role:'user', email: 'user@user.com', password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'};

export const invalidUser = {
  email: 'invaliduser@user.com', password: '$2a$08$Y8Abasdasdsadlg/CvVr/gLxYj5UAZVO'
}
export let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY2MDkzMjUzOH0.TCutSMhYPKMMJuO6vmkWDYcRf4N9ERdCk0QY3NAmg9U";

export const teamsArray = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  }
]