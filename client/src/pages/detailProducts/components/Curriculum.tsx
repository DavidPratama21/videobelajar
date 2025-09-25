import { useState } from "react";
import { ChevronUp, CirclePlay, Clock } from "lucide-react";
import Curriculums from "../Curriculum.json";

const Curriculum = () => {
  // const [isOpen, setIsOpen] = useState<number>(0);
  const [openStates, setOpenStates] = useState<boolean[]>(
    Curriculums.map((_, i) => i === 0)
  );

  const toggleOpen = (i: number) => {
    // setIsOpen(isOpen === i ? -1 : i);
    setOpenStates((prev) => prev.map((open, j) => (j === i ? !open : open)));
  };

  return (
    //? Bikin menjadi responsif
    <div className="grid gap-5 sm:gap-6 p-5 sm:p-6 bg-other-primary rounded-[10px] border border-other-border">
      <p className="text-lg sm:text-[20px] text-dark-primary font-semibold leading-[120%]">
        Kamu akan mempelajari
      </p>
      <div className="grid gap-6">
        {Curriculums.map((c, i) => (
          <div key={i} onClick={() => toggleOpen(i)} className="grid gap-3">
            <div className="flex justify-between items-center gap-6">
              <p className="font-semibold text-lg text-primary leading-[120%]">
                {c.title}
              </p>
              <ChevronUp
                size={24}
                className={`text-dark-secondary transition-all ${
                  openStates[i] ? "rotate-180 " : "rotate-0"
                }`}
              />
            </div>
            {openStates[i] &&
              c.materials.map((m, j) => (
                <div
                  key={j}
                  className="flex justify-between rounded-[10px] border p-4 bg-other-primary border-other-border"
                >
                  <p className="font-medium text-sm sm:text-base text-dark-primary leading-[140%] tracking-[0.2px]">
                    {m.name}
                  </p>
                  <div className="flex gap-4 text-dark-secondary leading-[140%] tracking-[0.2px]">
                    <div className="flex gap-2">
                      <CirclePlay />
                      <p>Video</p>
                    </div>
                    <div className="flex gap-2">
                      <Clock />
                      <p>{m.duration} Menit</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;
