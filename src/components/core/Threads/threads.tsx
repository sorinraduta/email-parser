import Info from "@/components/SVGs/info";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Accordion } from "@/components/ui/accordion";
import Thread from "@/components/core/Thread";
import { Thread as ThreadType } from "@/types";

import { FC } from "react";

interface IThreadsProps {
  threads: ThreadType[];
}

const Threads: FC<IThreadsProps> = (props) => {
  const { threads } = props;

  return (
    <div className="w-full">
      <TooltipProvider>
        <Tooltip>
          <div className="flex items-center mt-10 scroll-m-20 border-b pb-2  mb-2  tracking-tight transition-colors first:mt-0">
            <div className="text-3xl font-semibold mr-2">Threads</div>
            <TooltipTrigger>
              <Info height={"20"} width={"20"} />
            </TooltipTrigger>
          </div>
          <TooltipContent>
            <p>Click on the thread</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Accordion type="single" collapsible className="w-full">
        {threads.map((thread) => {
          return <Thread key={thread.id} thread={thread} />;
        })}
      </Accordion>
    </div>
  );
};

export default Threads;
