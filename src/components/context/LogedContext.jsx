// import React from 'react';

// export default function LogedContext() {
//   const accessToken = localStorage.getItem('accessToken');
//   const accesTokenSecret = JSON.parse(accessToken);

//   fetch('https://api.realworld.io/api/users/login', {
//     headers: {
//       Authorization: `Bearer ${accesTokenSecret.user.token}`,
//     },
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       throw new Error(`here is some trouble: ${error}`);
//     });

//   return (
//     <div>dsad</div>
//   );
// }
