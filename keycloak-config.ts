//keycloak-config.ts
import Keycloak, { KeycloakProfile } from 'keycloak-js';

export const initKeycloak = () => {
  if (!process.browser) {
    // Skip Keycloak initialization on the server side
    return null;
  }

  const keycloakConfig = {
    url: 'http://localhost:8080', // Keycloak server URL without trailing slash
    realm: 'myrealm', // Replace with your realm
    clientId: 'my-app', // Replace with your client ID
   // clientSecret: 'LK2lW0h8UMpvHv0I7U09r2GYiOfV2uBk', // Replace with your client secret
    credentials: {
      secret: '4DgsqRnIX9t9Z9cyhWf3PlOR5vdj7TUy',
    },
  };

  return new Keycloak(keycloakConfig);
};

export const loadUserProfile = async (
  keycloak: Keycloak.KeycloakInstance
): Promise<KeycloakProfile | null> => {
  try {
    if (keycloak.authenticated) {
      // Load user profile
      const userProfile = await keycloak.loadUserProfile();
      return userProfile;
    } else {
      console.warn('User not authenticated');
      return null;
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
    return null;
  }
};
