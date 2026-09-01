import { ThemeToggle } from "@/components/theme-toggle";

const tagline = "Always on. Any hardware. Multi-user.";

export function BrandHeader() {
  return (
    <header className="brand-header relative overflow-hidden border-b border-border text-fg">
      <div className="brand-header-glow" aria-hidden />
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-5 pt-6 pb-6 sm:pt-16 sm:pb-12">
        <h1 className="brand-wordmark flex w-full min-w-0 justify-center">
          <span className="sr-only">grokbox</span>
          <img
            src="/wordmark.svg"
            alt=""
            width={321}
            height={96}
            className="hidden h-10 w-auto max-w-full dark:block sm:h-[4.75rem]"
          />
          <img
            src="/wordmark-light.svg"
            alt=""
            width={321}
            height={96}
            className="h-10 w-auto max-w-full dark:hidden sm:h-[4.75rem]"
          />
        </h1>
        <p className="brand-tagline mt-4 flex w-full max-w-lg items-center gap-3 text-center text-[0.58rem] font-medium tracking-[0.22em] text-muted uppercase sm:mt-6 sm:text-[0.62rem] sm:tracking-[0.28em]">
          <span className="h-px flex-1 bg-border" aria-hidden />
          <span>{tagline}</span>
          <span className="h-px flex-1 bg-border" aria-hidden />
        </p>
      </div>
    </header>
  );
}
