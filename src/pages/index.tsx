import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Labels from "@/components/core/Labels";
import Threads from "@/components/core/Threads";
import Container from "@/components/core/Container";
import { Label, Thread } from "@/types";
import useAuthtStore from "@/store/auth";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [labels, setLabels] = useState<Label[] | null>(null);
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const { push } = useRouter();

  const { isLoggedIn } = useAuthtStore();

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }

    push("/login");
  }, [isLoggedIn, push]);

  useEffect(() => {
    if (labels) {
      return;
    }

    getLabels();
  }, [labels]);

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

  const onLabelClick = async (label: Label) => {
    setSelectedLabel(label);
  };

  return (
    <main className={`${inter.className}`}>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-8 mb-10 text-center">
        Email parser
      </h1>
      {labels && (
        <Container spacingBottom>
          <Labels
            selectedLabel={selectedLabel}
            labels={labels}
            onLabelClick={onLabelClick}
          />
        </Container>
      )}
      {threads && (
        <Container spacingBottom>
          <Threads threads={threads} />
        </Container>
      )}
    </main>
  );
};

export default Home;
