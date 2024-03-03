import { FC, useEffect } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import GmailLogo from "@/components/SVGs/gmail-logo";
import { Button } from "@/components/ui/button";
import useAuthtStore from "@/store/auth";
import useGmail from "@/hooks/useGmail";
import Container from "@/components/core/Container";
import { useRouter } from "next/router";

const GMAIL_CLIENT_ID = process.env.NEXT_PUBLIC_GMAIL_CLIENT_ID || "";
const GMAIL_API_KEY = process.env.NEXT_PUBLIC_GMAIL_API_KEY || "";

const Login: FC = () => {
  const { push } = useRouter();
  const { isLoggedIn, logIn } = useAuthtStore();

  const { isInited, signIn } = useGmail({
    CLIENT_ID: GMAIL_CLIENT_ID,
    API_KEY: GMAIL_API_KEY,
    onSignIn: logIn,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    push("/");
  }, [isLoggedIn, push]);

  return (
    <div className="h-screen flex justify-center items-center -mt-[30px]">
      <Container>
        <Card className="mx-auto flex justify-center flex-col items-center max-w-md">
          <CardHeader className="space-y-1 mb-8">
            <GmailLogo height="100" width="100" className="mx-auto" />
            <CardTitle className="text-2xl font-bold text-center">
              Login with Google
            </CardTitle>
            <CardDescription className="text-center">
              You will be redirected to Google to complete the sign-in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isInited && (
                <Button onClick={signIn}>
                  <GmailLogo height="24" width="24" className="mr-2" />
                  Login with Gmail
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
