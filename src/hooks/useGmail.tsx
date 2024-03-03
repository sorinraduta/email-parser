import { useState, useEffect, useCallback } from "react";

interface IUseGmailOptions {
  CLIENT_ID: string;
  API_KEY: string;
  onSignIn?: () => void;
}

const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

const useGmail = (options: IUseGmailOptions) => {
  const { CLIENT_ID, API_KEY, onSignIn } = options;
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [isGapiInited, setGapiInited] = useState(false);
  const [isGsiInited, setGsiInited] = useState(false);
  const [isInited, setInited] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onGapiLoad = useCallback(() => {
    setGapiInited(true);
    gapi.load("client", initializeGapi);
    console.log("GAPI LOADED!");
  }, []);
  const initializeGapi = async () => {
    try {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
      console.log("GAPI INITED!");
    } catch (error) {
      console.log("GAPI INI FAILED: ", error);
    }
  };
  const onGsiLoad = useCallback(() => {
    setGsiInited(true);
    initializeGsi();
    console.log("GSI LOADED!");
  }, []);
  const initializeGsi = () => {
    try {
      const _tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: () => {}, // defined later
      });
      setTokenClient(_tokenClient);
      console.log("GSI INITED!");
    } catch (error) {
      console.log("GSI INIT FAILED: ", error);
    }
  };

  useEffect(() => {
    var gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.type = "text/javascript";
    gapiScript.onload = onGapiLoad;
    document.head.appendChild(gapiScript);

    var gsiScript = document.createElement("script");
    gsiScript.src = "https://accounts.google.com/gsi/client";
    gsiScript.type = "text/javascript";
    gsiScript.onload = onGsiLoad;
    document.head.appendChild(gsiScript);

    return () => {
      document.head.removeChild(gapiScript);
      document.head.removeChild(gsiScript);
    };
  }, [onGapiLoad, onGsiLoad]);

  useEffect(() => {
    if (!isGapiInited || !isGsiInited) {
      return;
    }

    setInited(true);
    console.log("GMAIL APIs LOADED!");
  }, [isGapiInited, isGsiInited]);

  const signIn = () => {
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      onSignIn?.();
      setIsSignedIn(true);
      console.log("Signed in successfully!");
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  };

  const signOut = () => {};

  return {
    isInited,
    signIn,
    signOut,
  };
};

export default useGmail;
