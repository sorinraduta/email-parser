import { FC, useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Thread } from "@/types";
import { decode } from "js-base64";
import { parseEmailHtml } from "@/utils/parse-email-html";

interface IThreadProps {
  thread: Thread;
}

const Thread: FC<IThreadProps> = (props) => {
  const { thread } = props;
  const [threadHtml, setThreadHtml] = useState<string>("");
  const [threadProps, setThreadProps] = useState<any>(null);

  useEffect(() => {
    const getThread = async () => {
      const res = await gapi.client.gmail.users.threads.get({
        userId: "me",
        id: thread.id,
      });

      const _threadHtml =
        res?.result?.messages?.[0]?.payload?.parts?.[1]?.body?.data;

      if (_threadHtml) {
        setThreadHtml(decode(_threadHtml));
      }
    };

    getThread();
  }, [thread]);

  useEffect(() => {
    const _threadProps = parseEmailHtml(threadHtml);
    setThreadProps(_threadProps);
    console.log(_threadProps);
  }, [threadHtml]);

  return (
    <AccordionItem key={thread.id} value={thread.id}>
      <AccordionTrigger>{thread.snippet.substring(0, 40)}</AccordionTrigger>
      {threadProps && (
        <AccordionContent>
          <div
            key={thread.id}
            className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
          >
            <div>Pick up: {threadProps.pickup}</div>
            <div>Delivery: {threadProps.delivery}</div>
            <br />
            <div>Weight: {threadProps.weight}</div>
            <div>Goods: {threadProps.goods}</div>
            <br />
            <div>Pick up (local time): {threadProps.pickupTime}</div>
            <div>Delivery (local time): {threadProps.deliveryTime}</div>
            <br />
            <div>Please include TOP and TT</div>
            <div>1 Truck, Curtainsider GPS mandatory with GPS tracking</div>
          </div>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

export default Thread;
