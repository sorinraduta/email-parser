import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import GmailLogo from "@/components/SVGs/gmail-logo";
import useGmail from "@/hooks/useGmail";
import Labels from "@/components/core/Labels";
import Threads from "@/components/core/Threads";
import Container from "@/components/core/Container";
import { Label } from "@/types";

const inter = Inter({ subsets: ["latin"] });

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID || "";
const GMAIL_API_KEY = process.env.GMAIL_API_KEY || "";

export default function Home() {
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [labels, setLabels] = useState<Label[]>([]);
  const [threads, setThreads] = useState<any[]>([]);

  const onSignIn = async () => {
    await getLabels();
  };

  const getLabels = async () => {
    try {
      const res: any = await gapi.client.gmail.users.labels.list({
        userId: "me",
      });
      const _labels = res.result.labels;
      setLabels(_labels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedLabel?.id) {
      return;
    }

    getThreads(selectedLabel?.id);
  }, [selectedLabel]);

  const getThreads = async (labelId: string) => {
    try {
      const res: any = await gapi.client.gmail.users.threads.list({
        userId: "me",
        labelIds: [labelId],
      });
      const _threads = res.result.threads;
      setThreads(_threads);
    } catch (error) {
      console.log(error);
    }
  };

  const { isInited, signIn, signOut } = useGmail({
    CLIENT_ID: GMAIL_CLIENT_ID,
    API_KEY: GMAIL_API_KEY,
    onSignIn,
  });

  const onLabelClick = async (label: Label) => {
    setSelectedLabel(label);
  };

  return (
    <main className={`${inter.className}`}>
      <Container spacingBottom>
        {isInited && (
          <Button onClick={signIn}>
            <GmailLogo height="24" width="24" className="mr-2" />
            Login with Gmail
          </Button>
        )}
      </Container>
      {labels && labels.length > 0 && (
        <Container spacingBottom>
          <Labels
            selectedLabel={selectedLabel}
            labels={labels}
            onLabelClick={onLabelClick}
          />
        </Container>
      )}
      {threads && threads.length > 0 && (
        <Container spacingBottom>
          <Threads threads={threads} />
        </Container>
      )}
    </main>
  );
}
