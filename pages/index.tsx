// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initKeycloak } from '../keycloak-config';

const Index = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        // Initialize Keycloak
        const keycloak = initKeycloak();

        if (!keycloak) {
          console.error('Keycloak object is null');
          return;
        }

        await keycloak.init({ onLoad: 'check-sso' });

        if (!keycloak.authenticated) {
          // If not authenticated, redirect to Keycloak login
          keycloak.login({ redirectUri: window.location.origin + router.pathname });
        }
        else{
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Keycloak initialization error:', error);
        // Handle the error appropriately
      }
    };

    initializeKeycloak();
  }, [router]);

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const navigateToPentest = () => {
    router.push('/pentest');
  };

  return (
    <div>
      <h1>Home Page</h1>
      {isAuth && (
        <>
          <button onClick={navigateToSettings}>Settings</button>
          {' | '}
          <button onClick={navigateToPentest}>Pentest</button>
        </>
      )}
    </div>
  );
};

export default Index;


// // pages/index.tsx
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { initKeycloak } from '../keycloak-config';

// const Index = () => {
//   const router = useRouter();
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     const initializeKeycloak = async () => {
//       try {
//         const keycloak = initKeycloak();

//         if (!keycloak) {
//           console.error('Keycloak object is null');
//           return;
//         }

//         await keycloak.init({ onLoad: 'check-sso' });

//         if (!keycloak.authenticated) {
//           // Instead of directly logging in, make a request to the server-side component for authentication
//           await fetch('http://localhost:3001/login', {
//             method: 'GET',
//             credentials: 'include', // Include credentials for cookies
//           });

//           // After the server-side authentication, check if Keycloak is now authenticated
//           if (keycloak.authenticated) {
//             setIsAuth(true);
//           }
//         } else {
//           setIsAuth(true);
//         }
//       } catch (error) {
//         console.error('Keycloak initialization error:', error);
//         // Handle the error appropriately
//       }
//     };

//     initializeKeycloak();
//   }, []);

//   const navigateToSettings = () => {
//     router.push('/settings');
//   };

//   const navigateToPentest = () => {
//     router.push('/pentest');
//   };

//   return (
//     <div>
//       <h1>Home Page</h1>
//       {isAuth && (
//         <>
//           <button onClick={navigateToSettings}>Settings</button>
//           {' | '}
//           <button onClick={navigateToPentest}>Pentest</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Index;

