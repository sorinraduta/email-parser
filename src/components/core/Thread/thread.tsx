import { FC, useEffect, useState } from "react";
import { Thread } from "@/types";
import { decode } from "js-base64";
import { parseEmailHtml } from "@/utils/parse-email-html";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/format-date";
import Clipboard from "@/components/SVGs/clipboard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IThreadProps {
  thread: Thread;
}

const Thread: FC<IThreadProps> = (props) => {
  const { thread } = props;
  const [threadFullDetails, setThreadFullDetails] = useState<any>(null);
  const [threadHtml, setThreadHtml] = useState<string>("");
  const [threadSummary, setThreadSummary] = useState<any>(null);
  const [isSummaryCopied, setSummaryCopied] = useState<boolean>(false);

  useEffect(() => {
    const getThread = async () => {
      const res = await gapi.client.gmail.users.threads.get({
        userId: "me",
        id: thread.id,
      });

      const _threadFullDetails = res?.result;

      if (!_threadFullDetails) {
        return;
      }

      setThreadFullDetails(_threadFullDetails);

      const _threadHtml =
        _threadFullDetails?.messages?.[0]?.payload?.parts?.[1]?.body?.data;

      if (_threadHtml) {
        setThreadHtml(decode(_threadHtml));
      }
    };

    getThread();
  }, [thread]);

  useEffect(() => {
    const _threadSummary = parseEmailHtml(threadHtml);
    setThreadSummary(_threadSummary);
  }, [threadHtml]);

  const onClipboardClick = (threadSummary: any) => {
    navigator.clipboard.writeText(
      `Pick up: ${threadSummary?.pickup}\nDelivery: ${threadSummary?.delivery}\n\nWeight: ${threadSummary?.weight}\nGoods: ${threadSummary?.goods}\n\nPick up (local time): ${threadSummary?.pickupTime}\nDelivery (local time): ${threadSummary?.deliveryTime}\n\n\nPlease include TOP and TT\n1 Truck, Curtainsider GPS mandatory with GPS tracking`
    );
    setSummaryCopied(true);
    setTimeout(() => {
      setSummaryCopied(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Card
          key={thread.id}
          className="border-t-0 rounded-none cursor-pointer"
        >
          <CardContent className="py-4 pl-6 pr-8">
            <div className="flex items-center gap-4 text-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap mr-2">
                {formatDate(threadFullDetails?.messages?.[0]?.internalDate)}
              </div>
              <div className="font-semibold truncate">
                {
                  threadFullDetails?.messages?.[0]?.payload?.headers?.find(
                    ({ name }: any) => name === "Subject"
                  ).value
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6">
            {
              threadFullDetails?.messages?.[0]?.payload?.headers?.find(
                ({ name }: any) => name === "Subject"
              ).value
            }
          </DialogTitle>
          <DialogDescription className="text-xs ml-2 flex">
            <div className="flex justify-between items-end w-full">
              <div>
                <div>Pick up: {threadSummary?.pickup}</div>
                <div>Delivery: {threadSummary?.delivery}</div>
                <br />
                <div>Weight: {threadSummary?.weight}</div>
                <div>Goods: {threadSummary?.goods}</div>
                <br />
                <div>Pick up (local time): {threadSummary?.pickupTime}</div>
                <div>Delivery (local time): {threadSummary?.deliveryTime}</div>
                <br />
                <br />
                <div>Please include TOP and TT</div>
                <div>1 Truck, Curtainsider GPS mandatory with GPS tracking</div>
              </div>
              <TooltipProvider>
                <Tooltip open={isSummaryCopied}>
                  <TooltipTrigger>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => onClipboardClick(threadSummary)}
                    >
                      <Clipboard />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copied to clipboard</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mb-4" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Thread;
