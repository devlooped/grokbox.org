import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Radio, c as Cpu, i as Shield, l as Copy, o as Moon, r as Sun, s as MessageCircle, t as Users, u as Check } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DHlLTp-H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var headerIconClass = cn("relative inline-flex size-8 items-center justify-center rounded-lg border border-border bg-transparent text-fg", "transition-[background-color,color] duration-150 ease-out", "hover:bg-surface hover:text-fg", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40", "disabled:pointer-events-none disabled:opacity-50", "active:scale-[0.96]", "after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2");
function applyTheme(theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	try {
		localStorage.setItem("theme", theme);
	} catch {}
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", theme === "light" ? "#ffffff" : "#000000");
}
function ThemeToggle() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [isDark, setIsDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": isDark,
		"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
		disabled: !mounted,
		onClick: () => {
			const next = isDark ? "light" : "dark";
			setIsDark(next === "dark");
			applyTheme(next);
		},
		className: headerIconClass,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative size-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
				className: cn("absolute inset-0 size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", isDark ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"),
				strokeWidth: 1.75,
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
				className: cn("absolute inset-0 size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", isDark ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"),
				strokeWidth: 1.75,
				"aria-hidden": true
			})]
		})
	});
}
var tagline = "Always on. Any hardware. Multi-user.";
function AdminSignIn() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		"aria-label": "Admin sign in",
		title: "Admin",
		className: headerIconClass,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
			className: "size-4",
			strokeWidth: 1.75,
			"aria-hidden": true
		})
	});
}
function BrandHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "brand-header relative overflow-hidden border-b border-border text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "brand-header-glow",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-4 right-4 z-10 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSignIn, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-xl flex-col items-center px-5 pt-6 pb-6 sm:pt-16 sm:pb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "brand-wordmark flex w-full min-w-0 justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "grokbox"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/wordmark.svg",
							alt: "",
							width: 321,
							height: 96,
							className: "hidden h-10 w-auto max-w-full dark:block sm:h-[4.75rem]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/wordmark-light.svg",
							alt: "",
							width: 321,
							height: 96,
							className: "h-10 w-auto max-w-full dark:hidden sm:h-[4.75rem]"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "brand-tagline mt-4 flex w-full max-w-lg items-center gap-3 text-center text-[0.58rem] font-medium tracking-[0.22em] text-muted uppercase sm:mt-6 sm:text-[0.62rem] sm:tracking-[0.28em]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-px flex-1 bg-border",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tagline }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-px flex-1 bg-border",
							"aria-hidden": true
						})
					]
				})]
			})
		]
	});
}
var COMMAND = "ndx grokbox";
var NDX_TABS = [{
	id: "powershell",
	label: "PowerShell",
	command: "irm https://github.com/devlooped/ndx/releases/latest/download/install.ps1 | iex"
}, {
	id: "wsl",
	label: "WSL",
	command: "curl -fsSL https://github.com/devlooped/ndx/releases/latest/download/install.sh | sh"
}];
var features = [
	{
		icon: Radio,
		title: "Always on",
		body: "A local listener that stays up and advertises grokbox.local on your network."
	},
	{
		icon: Cpu,
		title: "Any hardware",
		body: "Linux, macOS, and Windows. A Pi, a NAS, or the laptop already on your desk. No .NET."
	},
	{
		icon: Users,
		title: "Multi-user",
		body: "Each person gets their own alias, Grok account, and channels. One box for the household."
	}
];
var steps = [
	{
		n: "01",
		title: "One command",
		body: "ndx grokbox downloads it, runs it, and keeps it current. No install step. No .NET."
	},
	{
		n: "02",
		title: "Open grokbox.local",
		body: "Any device on the LAN can reach it. No cloud dashboard. No extra ports to remember."
	},
	{
		n: "03",
		title: "Add people. Pair a chat.",
		body: "Create aliases, link Grok accounts, and pair WhatsApp so everyone can talk to it."
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh overflow-x-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "run",
				className: "mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hero-item max-w-md text-pretty text-body text-muted",
					children: "Your own Grok, running on your network. Pair WhatsApp so everyone in the house can talk to it."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-item mt-10 w-full max-w-md scroll-mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyCommand, { command: COMMAND }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-subtle",
						children: [
							"One evergreen command. Downloads, runs, and stays up to date. No .NET. Then open",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-fg",
								children: "grokbox.local"
							}),
							"."
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "ndx",
				className: "mx-auto w-full max-w-5xl scroll-mt-8 px-5 pb-20 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NdxInstallPanel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto grid w-full max-w-5xl gap-3 px-5 pb-20 sm:grid-cols-3 sm:px-8",
				children: features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface px-6 py-6 shadow-frame",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.icon, {
							className: "size-5 text-muted",
							strokeWidth: 1.75,
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-brand text-title font-medium tracking-tight",
							children: feature.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-normal text-muted",
							children: feature.body
						})
					]
				}, feature.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-sans text-label font-medium uppercase text-subtle",
					children: "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 grid gap-8 sm:grid-cols-3 sm:gap-6",
					children: steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm text-subtle",
							children: step.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-brand text-title font-medium tracking-tight",
							children: step.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-normal text-muted",
							children: step.body
						})
					] }, step.n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl bg-surface px-6 py-8 shadow-frame sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "mt-0.5 size-5 shrink-0 text-muted",
							strokeWidth: 1.75,
							"aria-hidden": true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-brand text-title font-medium tracking-tight",
							children: "Channels"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm leading-normal text-muted",
							children: "WhatsApp is live. Slack, Discord, and Telegram are next. Talk to Grok from the apps you already use."
						})] })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A Devlooped project." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "MIT · OSMF" })]
				})
			})
		]
	});
}
function NdxInstallPanel() {
	const [tab, setTab] = (0, import_react.useState)("powershell");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-sans text-label font-medium uppercase text-subtle",
				children: "Don't have ndx?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-normal text-muted",
				children: [
					"The native runner. No .NET. Get it once — then",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "font-mono text-fg",
						children: COMMAND
					}),
					" is the only command you need. Same script on macOS and Linux as WSL."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, {
				value: tab,
				onValueChange: (value) => setTab(value),
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					"aria-label": "ndx install shell",
					className: "mx-auto flex w-fit rounded-full bg-surface p-1 shadow-frame",
					children: NDX_TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
						value: item.id,
						className: cn("inline-flex h-11 min-w-28 items-center justify-center rounded-full px-5 text-sm font-medium", "text-muted transition-[color,background-color] duration-150 ease-out", "hover:text-fg", "data-[state=active]:bg-elevated data-[state=active]:text-fg", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40"),
						children: item.label
					}, item.id))
				}), NDX_TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
					value: item.id,
					className: "mt-4 outline-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyCommand, {
						command: item.command,
						glow: true
					})
				}, item.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-subtle",
				children: "Copy and paste into terminal to try"
			})
		]
	});
}
function CopyCommand({ command, glow = false }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: copy,
		"aria-label": copied ? "Copied" : `Copy ${command}`,
		className: cn("flex w-full items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3 text-left", "transition-[box-shadow,transform] duration-150 ease-out", "active:scale-[0.96]", glow ? "min-h-14 command-glow" : "min-h-12 shadow-frame hover:shadow-frame-hover"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: cn("min-w-0 flex-1 font-mono text-sm leading-snug text-fg", glow ? "overflow-x-auto whitespace-nowrap" : "break-all"),
			children: command
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative flex size-8 shrink-0 items-center justify-center text-muted after:absolute after:top-1/2 after:left-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: cn("absolute size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", copied ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"),
				strokeWidth: 2,
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				className: cn("size-4 transition-[opacity,filter,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)]", copied ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"),
				strokeWidth: 2,
				"aria-hidden": true
			})]
		})]
	});
}
//#endregion
export { Home as component };
