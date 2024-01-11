// pages/settings.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initKeycloak } from '../keycloak-config';

const Settings = () => {
  const router = useRouter();
  const [isEngineer, setIsEngineer] = useState(false);

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
        } else {
          // Access roles directly from token claims
          const token = keycloak.tokenParsed;
          const roles = token?.realm_access?.roles;

          // Check if the user has the 'Engineer' role
          const hasEngineerRole = roles?.includes('Engineer');

          if (hasEngineerRole) {
            console.log('User is an engineer');
            // Set the state to true if the user is an engineer
            setIsEngineer(true);
          } else {
            console.log('User is not an engineer');
            // Handle logic for non-engineer users if needed
          }
        }
      } catch (error) {
        console.error('Keycloak initialization error:', error);
        // Handle the error appropriately
      }
    };

    initializeKeycloak();
  }, [router]);

  // Handle back button click
  const goBack = () => {
    router.push('/');
  };

  // Render the HTML based on the user's role
  return (
    <div>
      {isEngineer ? (
        <>
          <h1>Settings Page</h1>
          {/* Add more HTML content for settings page if needed */}
          <button onClick={goBack}>Back to Home</button>
        </>
      ) : (
        <><h1>User not authenticated</h1><button onClick={goBack}>Back to Home</button></>
      )}
    </div>
  );
};

export default Settings;
