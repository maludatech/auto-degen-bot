import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
    return (
      <nav className="flex flex-row justify-between p-1 h-fit border-b-2 border-gray-200 opacity-95 fixed top-0 z-10 w-full bg-white items-center">
        <div className="flex flex-row items-center gap-1 flex-wrap">
            <FontAwesomeIcon icon={faRobot} className="h-8 w-8 sm:h-12 sm:w-10 text-slate-500"/>
            <h1 className="font-bold text-lg sm:text-2xl black_gradient"> Automated AI Bot</h1>
        </div>
        <div>
          <button className="p-1 sm:p-2 rounded-lg text-black dark:text-white border-2 border-purple-300  bg-purple-500 hover:bg-purple-600">Connect Wallet</button>
        </div>
      </nav>
    );
  };
  