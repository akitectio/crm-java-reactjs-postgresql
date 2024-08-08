import React from 'react';
import { useDispatch } from 'react-redux';
// import { authActions } from 'app/redux/auth/authSlice';
// import { LayoutSplashScreen } from '_metronic/layout/core';
import keycloak from '@app/keycloak/Keycloak';
import { Loading } from '@app/components/Loading';
import { onLogOut, setCurrentUser } from '@app/store/reducers/auth';

const InitAuth = ({ children } :any) => {
  const dispatch = useDispatch();
  const [keycloakInitialized, setKeycloakInitialized] = React.useState(false);

  React.useEffect(() => {
    console.log("vao key cloak");
    keycloak.init({ onLoad: 'login-required',checkLoginIframe: false}).then(authenticated => {
      if (authenticated) {
        console.log("keycloak",keycloak);
        const user :any = keycloak.tokenParsed;
        dispatch(setCurrentUser(user));
        // dispatch(authActions.login({ token: keycloak.token, user }));
      } else {
        dispatch(onLogOut());
      }
      setKeycloakInitialized(true);
    }).catch(() => {
      dispatch(onLogOut());
      setKeycloakInitialized(true);
    });
  }, [dispatch]);

  if (!keycloakInitialized) {
    return <Loading />;
  }

  return children;
};

export default InitAuth;