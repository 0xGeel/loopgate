import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const CTABanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      <div className="rounded-lg lg:border border-white/10 shadow-xl overflow-hidden grid gap-4 lg:grid-cols-2 w-full lg:mt-40 mb-20 lg:mb-32 relative">
        <svg
          viewBox="0 0 1024 1024"
          className="text-sky-500 absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] hidden lg:block -translate-y-1/2 blur-3xl lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="currentColor"
            fillOpacity="1"
          />
        </svg>

        <div className="lg:p-20 space-y-6">
          <h2 className="font-display lg:text-2xl font-medium leading-normal">
            LoopGate is <span className="text-sky-500">in development</span>.
            Stay tuned for updates.
          </h2>
          <p className="leading-loose text-white/70 font-light text-sm lg:text-base">
            We have a vision of making Token-Gating with Loopring L2 NFTs for
            non-techies a reality. This takes time. We&apos;ll keep you in the
            loop on how this goes.
          </p>
          <div className="flex space-x-2 lg:space-x-4 items-center text-sm">
            <a
              href="https://twitter.com/0xgeel"
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-sky-500 hover:text-slate-900 duration-150 rounded-md px-3 py-2 text-slate-900"
            >
              <span className="hidden lg:block">Follow for updates</span>
              <span className="lg:hidden">Updates</span>
            </a>
            <a
              href="https://0xgeel.gitbook.io/loopgate-documentation/"
              target="_blank"
              rel="noreferrer"
              className="flex space-x-1.5 items-center hover:text-sky-500 duration-150"
            >
              <span className="">
                Host your own <span className="hidden lg:inline">LoopGate</span>
              </span>
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="bg-white/5 mt-10 border-t border-l border-white/10 rounded-tl-md shadow-3xl hidden lg:block relative overflow-hidden">
          <Image
            src="/images/admin-panel-teaser.jpg"
            alt="LoopGate's Admin UI"
            fill={true}
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
