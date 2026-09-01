import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import * as Tabs from "@radix-ui/react-tabs";
import { Check, Copy, Cpu, MessageCircle, Radio, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const COMMAND = "ndx grokbox";

const NDX_TABS = [
  {
    id: "powershell",
    label: "PowerShell",
    command:
      "irm https://github.com/devlooped/ndx/releases/latest/download/install.ps1 | iex",
  },
  {
    id: "wsl",
    label: "WSL",
    command:
      "curl -fsSL https://github.com/devlooped/ndx/releases/latest/download/install.sh | sh",
  },
] as const;

const features = [
  {
    icon: Radio,
    title: "Always on",
    body: "A local listener that stays up and advertises grokbox.local on your network.",
  },
  {
    icon: Cpu,
    title: "Any hardware",
    body: "Linux, macOS, and Windows. A Pi, a NAS, or the laptop already on your desk. No .NET.",
  },
  {
    icon: Users,
    title: "Multi-user",
    body: "Each person gets their own alias, Grok account, and channels. One box for the household.",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "One command",
    body: "ndx grokbox downloads it, runs it, and keeps it current. No install step. No .NET.",
  },
  {
    n: "02",
    title: "Open grokbox.local",
    body: "Any device on the LAN can reach it. No cloud dashboard. No extra ports to remember.",
  },
  {
    n: "03",
    title: "Add people. Pair a chat.",
    body: "Create aliases, link Grok accounts, and pair WhatsApp so everyone can talk to it.",
  },
] as const;

function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-bg text-fg">
      <div className="hero-glow" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src="/logo.svg"
            alt=""
            width={28}
            height={28}
            className="brand-mark size-7"
          />
          <span className="font-brand text-lg font-semibold tracking-tight">
            grokbox
          </span>
        </a>
        <a
          href="#run"
          className="inline-flex h-11 items-center rounded-md bg-fg px-4 text-sm font-medium text-bg transition-colors duration-150 ease-out hover:bg-accent active:scale-[0.96]"
        >
          Run
        </a>
      </header>

      <section
        id="top"
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-16"
      >
        <img
          src="/logo.svg"
          alt=""
          width={88}
          height={88}
          className="hero-item brand-mark size-16 sm:size-20"
        />
        <h1 className="hero-item brand-wordmark mt-6 font-brand text-display font-semibold">
          grokbox
        </h1>
        <p className="hero-item mt-4 flex items-center gap-3 font-sans text-label font-medium uppercase text-muted">
          <span className="hidden h-px w-12 bg-border sm:block" aria-hidden />
          Always on. Any hardware. Multi-user.
          <span className="hidden h-px w-12 bg-border sm:block" aria-hidden />
        </p>
        <p className="hero-item mt-6 max-w-md text-pretty text-body text-muted">
          Your own Grok, running on your network. Pair WhatsApp so everyone in
          the house can talk to it.
        </p>
        <div id="run" className="hero-item mt-10 w-full max-w-md scroll-mt-8">
          <CopyCommand command={COMMAND} />
          <p className="mt-3 text-sm text-subtle">
            One evergreen command. Downloads, runs, and stays up to date. No
            .NET. Then open{" "}
            <span className="font-mono text-fg">grokbox.local</span>.
          </p>
        </div>
      </section>

      <section
        id="ndx"
        className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-8 px-5 pb-20 sm:px-8"
      >
        <NdxInstallPanel />
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-5xl gap-3 px-5 pb-20 sm:grid-cols-3 sm:px-8">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl bg-surface px-6 py-6 shadow-frame"
          >
            <feature.icon
              className="size-5 text-muted"
              strokeWidth={1.75}
              aria-hidden
            />
            <h2 className="mt-4 font-brand text-title font-medium tracking-tight">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm leading-normal text-muted">
              {feature.body}
            </p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        <p className="font-sans text-label font-medium uppercase text-subtle">
          How it works
        </p>
        <ol className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {steps.map((step) => (
            <li key={step.n}>
              <p className="font-mono text-sm text-subtle">{step.n}</p>
              <h2 className="mt-2 font-brand text-title font-medium tracking-tight">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-normal text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8">
        <div className="rounded-xl bg-surface px-6 py-8 shadow-frame sm:px-8">
          <div className="flex items-start gap-3">
            <MessageCircle
              className="mt-0.5 size-5 shrink-0 text-muted"
              strokeWidth={1.75}
              aria-hidden
            />
            <div>
              <h2 className="font-brand text-title font-medium tracking-tight">
                Channels
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-normal text-muted">
                WhatsApp is live. Slack, Discord, and Telegram are next. Talk to
                Grok from the apps you already use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>A Devlooped project.</p>
          <p>MIT · OSMF</p>
        </div>
      </footer>
    </main>
  );
}

function NdxInstallPanel() {
  const [tab, setTab] = useState<(typeof NDX_TABS)[number]["id"]>(
    "powershell",
  );

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-sans text-label font-medium uppercase text-subtle">
        Don't have ndx?
      </p>
      <p className="mt-2 text-sm leading-normal text-muted">
        The native runner. No .NET. Get it once — then{" "}
        <code className="font-mono text-fg">{COMMAND}</code> is the only
        command you need. Same script on macOS and Linux as WSL.
      </p>

      <Tabs.Root
        value={tab}
        onValueChange={(value) =>
          setTab(value as (typeof NDX_TABS)[number]["id"])
        }
        className="mt-6"
      >
        <Tabs.List
          aria-label="ndx install shell"
          className="mx-auto flex w-fit rounded-full bg-surface p-1 shadow-frame"
        >
          {NDX_TABS.map((item) => (
            <Tabs.Trigger
              key={item.id}
              value={item.id}
              className={cn(
                "inline-flex h-11 min-w-28 items-center justify-center rounded-full px-5 text-sm font-medium",
                "text-muted transition-[color,background-color] duration-150 ease-out",
                "hover:text-fg",
                "data-[state=active]:bg-elevated data-[state=active]:text-fg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40",
              )}
            >
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {NDX_TABS.map((item) => (
          <Tabs.Content
            key={item.id}
            value={item.id}
            className="mt-4 outline-none"
          >
            <CopyCommand command={item.command} glow />
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <p className="mt-3 text-sm text-subtle">
        Copy and paste into terminal to try
      </p>
    </div>
  );
}

function CopyCommand({
  command,
  glow = false,
}: {
  command: string;
  glow?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${command}`}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 text-left",
        "transition-[box-shadow,transform] duration-150 ease-out",
        "active:scale-[0.96]",
        glow
          ? "min-h-14 command-glow"
          : "min-h-12 shadow-frame hover:shadow-frame-hover",
      )}
    >
      <code
        className={cn(
          "min-w-0 flex-1 font-mono text-sm leading-snug text-fg",
          glow ? "overflow-x-auto whitespace-nowrap" : "break-all",
        )}
      >
        {command}
      </code>
      <span className="relative flex size-8 shrink-0 items-center justify-center text-muted after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2">
        <Check
          className={cn(
            "absolute size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
            copied
              ? "scale-100 opacity-100 blur-none"
              : "scale-[0.25] opacity-0 blur-[4px]",
          )}
          strokeWidth={2}
          aria-hidden
        />
        <Copy
          className={cn(
            "size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
            copied
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-none",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </button>
  );
}
