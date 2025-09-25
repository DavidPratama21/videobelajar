type TabsProps = {
  TabsList?: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Tabs = ({ TabsList, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex overflow-x-scroll no-scrollbar transition-all duration-300 ease-in-out">
      {TabsList.map((tab, id) => (
        <button
          className="grid transition-all duration-300 ease-in-out"
          key={id}
          onClick={() => setActiveTab(tab)}
        >
          <span
            className={`py-3 pr-9 font-medium text-start text-sm sm:text-base leading-[140%] tracking-[0.2px] transition-all duration-300 ease-in-out 
              ${activeTab === tab ? "text-tertiary" : "text-dark-secondary"}
              `}
          >
            {tab}
          </span>
          <span
            className={`h-1.5 w-1/2 rounded-[10px] transition-all duration-300 ease-in-out
              ${
                activeTab === tab
                  ? "bg-tertiary opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }
              `}
          ></span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
