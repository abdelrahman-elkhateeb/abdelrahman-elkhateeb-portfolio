import { cn } from "@/lib/utils"
import type { IllustrationKind } from "../../types"
import { Action, Bar, Check, FilterChips, Label, Pill, Sidebar, Surface, TableRow } from "./parts"

/* Each screen is a simplified drawing of the real product UI in the site palette,
   not a screenshot. Copy inside a drawing is illustrative. */

function MawasemStore() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[2.6cqw] px-[3.4cqw] py-[2.6cqw]">
      <div className="flex items-center justify-between gap-[2cqw]">
        <div className="flex items-baseline gap-[1.4cqw]">
          <div className="text-[length:2.2cqw] font-semibold tracking-[0.2em]">MAWASEM</div>
          <div lang="ar" className="text-[length:2cqw] text-accent-light">مواسم</div>
        </div>
        <div className="flex gap-[3cqw] text-[length:1.8cqw] text-muted-foreground">
          <div className="text-accent-light">Seasons</div>
          <div>Collections</div>
          <div>Brands</div>
        </div>
        <div className="flex gap-[1.2cqw]">
          <div className="size-[3.2cqw] rounded-full border border-foreground/20" />
          <div className="size-[3.2cqw] rounded-full border border-foreground/20 bg-primary/25" />
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-start justify-center gap-[1.4cqw] rounded-[1.2cqw] bg-field px-[4.4cqw]">
        <Label className="text-[length:1.5cqw] text-accent-light">Summer season</Label>
        <div className="text-[length:4.2cqw] leading-[1.05] font-medium tracking-[-0.02em]">Shop the season</div>
        <Action className="bg-accent-light px-[2.2cqw] py-[1cqw] text-[length:1.7cqw]">Shop now</Action>
      </div>
      <div className="grid grid-cols-4 gap-[1.8cqw]">
        {["w-3/4", "w-3/5", "w-4/5", "w-2/3"].map((width, i) => (
          <div key={i} className="flex flex-col gap-[0.9cqw]">
            <Surface className={cn("h-[9cqw]", i % 2 === 1 && "bg-field/40")} />
            <Bar className={width} />
            <Bar className="w-2/5 bg-primary/45" />
          </div>
        ))}
      </div>
    </div>
  )
}

const ORDER_ROWS = [
  { id: "#1042", season: "Ramadan", status: "Preparing", accent: true, width: "w-3/5" },
  { id: "#1041", season: "Eid", status: "Delivered", accent: false, width: "w-2/5" },
  { id: "#1040", season: "Summer", status: "Out for delivery", accent: true, width: "w-2/3" },
  { id: "#1039", season: "Ramadan", status: "Delivered", accent: false, width: "w-1/2" },
]

function MawasemDashboard() {
  return (
    <div className="flex min-w-0 flex-1">
      <Sidebar brand="MAWASEM" brandClassName="tracking-[0.2em]" active="Orders"
        items={["Products", "Orders", "Customers", "Seasons", "Inventory", "Employees"]} />
      <div className="flex min-w-0 flex-1 flex-col gap-[2.2cqw] px-[3cqw] py-[2.6cqw]">
        <div className="flex items-center justify-between gap-[2cqw]">
          <div className="text-[length:2.8cqw] font-medium">Orders</div>
          <div className="h-[3.6cqw] w-[22cqw] rounded-[0.9cqw] border border-foreground/14" />
        </div>
        <FilterChips items={["All", "Preparing", "Delivered"]} />
        <div className="flex flex-col">
          <Label className="grid grid-cols-[10cqw_minmax(0,1fr)_13cqw_15cqw] gap-[1.6cqw] pb-[1cqw] text-[length:1.3cqw]">
            <div>Order</div><div>Customer</div><div>Season</div><div>Status</div>
          </Label>
          {ORDER_ROWS.map(row => (
            <TableRow key={row.id} className="grid-cols-[10cqw_minmax(0,1fr)_13cqw_15cqw]">
              <div className="font-mono text-muted-foreground">{row.id}</div>
              <Bar className={row.width} />
              <div className="text-muted-foreground">{row.season}</div>
              <Pill tone={row.accent ? "accent" : "neutral"} className="text-[length:1.4cqw]">{row.status}</Pill>
            </TableRow>
          ))}
        </div>
      </div>
    </div>
  )
}

const JOB_COLUMNS = [
  { title: "Open", jobs: [["AC not cooling", "w-3/5"], ["Fridge leaking", "w-2/5"]] },
  { title: "On site", jobs: [["Washer won’t drain", "w-1/2"], ["Freezer icing up", "w-2/5"]] },
  { title: "Awaiting approval", jobs: [["AC noisy fan", "w-1/2"]] },
]

function ChillworkJobs() {
  return (
    <div className="flex min-w-0 flex-1">
      <Sidebar brand="ChillWork" brandClassName="text-[length:2cqw]" active="Jobs"
        items={["Jobs", "Schedule", "Technicians", "Customers", "Parts", "Invoices"]} />
      <div className="flex min-w-0 flex-1 flex-col gap-[2.2cqw] px-[3cqw] py-[2.6cqw]">
        <div className="flex items-center justify-between">
          <div className="text-[length:2.8cqw] font-medium">Today’s jobs</div>
          <Action>New job</Action>
        </div>
        <div className="grid grid-cols-3 gap-[1.6cqw]">
          {JOB_COLUMNS.map(column => (
            <div key={column.title} className="flex flex-col gap-[1cqw]">
              <Label className="text-[length:1.3cqw]">{column.title}</Label>
              {column.jobs.map(([job, width], i) => (
                <Surface key={job} className={cn("flex flex-col gap-[0.9cqw] p-[1.4cqw]", column.title === "On site" && i === 0 && "border-primary/40")}>
                  <div className="text-[length:1.7cqw]">{job}</div>
                  <Bar className={cn("h-[1cqw] bg-foreground/12", width)} />
                </Surface>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[1.2cqw] rounded-[1cqw] border border-primary/35 bg-primary/8 px-[2cqw] py-[1.6cqw]">
          <Label className="text-[length:1.3cqw] text-accent-light">AI triage · likely causes</Label>
          <div className="flex flex-wrap gap-[1cqw]">
            {["Low refrigerant", "Blocked condenser coil", "Faulty start capacitor"].map(cause => (
              <Pill key={cause} tone="outline" className="text-foreground">{cause}</Pill>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChillworkTriage() {
  return (
    <div className="grid min-w-0 flex-1 grid-cols-2 gap-[2.4cqw] p-[3.4cqw]">
      <Surface className="flex flex-col gap-[1.6cqw] rounded-[1.2cqw] p-[2.6cqw]">
        <Label>Customer request</Label>
        <div className="text-[length:2.6cqw] font-medium">Living room AC</div>
        <div className="text-[length:2cqw] leading-[1.5] text-hero-subline">“It turns on, but the air isn’t cold any more and something clicks outside.”</div>
        <div className="mt-auto text-[length:1.5cqw] text-ink-tertiary">Kept exactly as the customer wrote it</div>
      </Surface>
      <div className="flex flex-col gap-[1.4cqw] rounded-[1.2cqw] border border-primary/35 bg-primary/8 p-[2.6cqw]">
        <Label className="text-accent-light">AI triage · staff only</Label>
        <div className="text-[length:1.7cqw] text-muted-foreground">Likely causes</div>
        {["Low refrigerant", "Blocked condenser coil", "Faulty start capacitor"].map((cause, i) => (
          <div key={cause} className="flex gap-[1.4cqw] text-[length:1.9cqw]">
            <span className="font-mono text-primary">0{i + 1}</span>{cause}
          </div>
        ))}
        <div className="mt-[0.6cqw] text-[length:1.7cqw] text-muted-foreground">Ask on site</div>
        <Bar className="w-[85%]" />
        <Bar className="w-3/5" />
      </div>
    </div>
  )
}

function ChillworkSchedule() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[2.2cqw] px-[4cqw] py-[3.4cqw]">
      <div className="text-[length:2.8cqw] font-medium">Schedule a visit</div>
      <div className="flex flex-col gap-[0.9cqw]">
        <Label>Technician</Label>
        <div className="flex h-[5cqw] items-center justify-between rounded-[1cqw] border border-foreground/18 px-[1.8cqw] text-[length:1.9cqw]">
          Technician A
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-[2.2cqw] text-muted-foreground"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      <div className="flex flex-col gap-[0.9cqw]">
        <Label>Time</Label>
        <div className="grid grid-cols-4 gap-[1.4cqw] text-center font-mono text-[length:1.9cqw]">
          {["09:00", "11:00", "13:00", "15:00"].map(time => (
            <div key={time} className={cn("rounded-[1cqw] border py-[1.3cqw]", time === "11:00" ? "border-accent-light bg-primary/12 text-accent-light line-through" : "border-foreground/18")}>
              {time}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-[1.4cqw] rounded-[1cqw] border border-accent-light/35 bg-primary/12 px-[2cqw] py-[1.6cqw] text-[length:1.8cqw] text-accent-light">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-[2.4cqw] flex-none"><circle cx="12" cy="12" r="10" /><path d="M4.9 4.9 19.1 19.1" /></svg>
        This technician already has a visit at 11:00. Pick another time.
      </div>
      <Action className="self-end px-[2cqw] py-[1cqw] text-[length:1.7cqw] opacity-40">Confirm visit</Action>
    </div>
  )
}

function ChillworkParts() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[2cqw] px-[4cqw] py-[3.4cqw]">
      <div className="flex items-center justify-between">
        <div className="text-[length:2.8cqw] font-medium">AC not cooling</div>
        <Pill>On site</Pill>
      </div>
      <Label>Proposed parts</Label>
      <div className="flex flex-col border-b border-foreground/8">
        {[["Start capacitor", true], ["Refrigerant top-up", true], ["Fan motor", false]].map(([part, approved]) => (
          <div key={String(part)} className="flex items-center justify-between border-t border-foreground/8 py-[1.8cqw] text-[length:2cqw]">
            {part}
            <Pill tone={approved ? "accent" : "outline"}>{approved ? "Approved" : "Pending"}</Pill>
          </div>
        ))}
      </div>
      <Action className="mt-auto self-end px-[2cqw] py-[1cqw] text-[length:1.7cqw]">Send to customer</Action>
    </div>
  )
}

function ChillworkInvoice() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[1.6cqw] px-[4cqw] py-[3.4cqw]">
      <div className="flex items-baseline justify-between">
        <div className="text-[length:2.8cqw] font-medium">Invoice</div>
        <div className="font-mono text-[length:1.6cqw] text-ink-tertiary">#INV-2041</div>
      </div>
      <div className="flex items-center justify-between border-t border-foreground/8 pt-[1.4cqw]">
        <div className="text-[length:2cqw] font-medium">Living room AC</div>
        <Pill>Repaired</Pill>
      </div>
      <div className="flex items-center justify-between text-[length:1.8cqw] text-muted-foreground">Start capacitor<Bar className="w-[8cqw] bg-foreground/16" /></div>
      <div className="flex items-center justify-between text-[length:1.8cqw] text-muted-foreground">Labor fee<Bar className="w-[6cqw] bg-foreground/16" /></div>
      <div className="flex items-center justify-between border-t border-foreground/8 pt-[1.4cqw]">
        <div className="text-[length:2cqw] font-medium">Bedroom AC</div>
        <Pill tone="outline">Not repaired</Pill>
      </div>
      <div className="flex items-center justify-between text-[length:1.8cqw] text-accent-light">No fix, no fee<span className="font-mono">0</span></div>
      <div className="mt-auto flex items-center justify-between border-t border-foreground/20 pt-[1.6cqw]">
        <div className="text-[length:2.2cqw] font-semibold">Total</div>
        <Bar className="h-[1.6cqw] w-[12cqw] bg-primary" />
      </div>
    </div>
  )
}

function Lumina() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-[6cqw] flex-none items-center gap-[3cqw] border-b border-foreground/8 px-[3cqw] text-[length:1.7cqw] text-muted-foreground">
        <div className="mr-auto text-[length:2cqw] font-semibold text-foreground">Lumina</div>
        <div>Admin</div>
        <div>Instructor</div>
        <div className="border-b-2 border-primary pb-[0.4cqw] text-accent-light">Student</div>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-[36cqw] flex-none flex-col gap-[1.4cqw] border-r border-foreground/8 p-[3cqw]">
          <Label>Exercise 04</Label>
          <div className="text-[length:2.6cqw] leading-[1.15] font-medium">Keep the even numbers</div>
          <Bar className="w-[95%] bg-foreground/12" />
          <Bar className="w-[85%] bg-foreground/12" />
          <Bar className="w-[70%] bg-foreground/12" />
          <Action className="mt-auto self-start">Run tests</Action>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[0.6cqw] bg-background p-[3cqw] font-mono text-[length:1.9cqw] whitespace-pre">
          <div><span className="text-foreground/30">1  </span><span className="text-primary">const</span> evens = nums.<span className="text-accent-light">filter</span>(</div>
          <div><span className="text-foreground/30">2  </span>  (n) =&gt; n % <span className="text-accent-light">2</span> === <span className="text-accent-light">0</span></div>
          <div><span className="text-foreground/30">3  </span>);</div>
          <div><span className="text-foreground/30">4  </span></div>
          <div><span className="text-foreground/30">5  </span><span className="text-primary">export default</span> evens;</div>
          <div className="mt-auto flex items-center gap-[1cqw] border-t border-foreground/8 pt-[1.6cqw] text-[length:1.6cqw] whitespace-normal text-accent-light">
            <Check />3 of 3 tests passed
          </div>
        </div>
      </div>
    </div>
  )
}

const TRACKING_STEPS = [
  { step: "Pending", state: "done" },
  { step: "Preparing", state: "done" },
  { step: "Out for delivery", state: "current" },
  { step: "Delivered", state: "todo" },
] as const

function Foodie() {
  return (
    <div className="flex min-w-0 flex-1 gap-[2.4cqw] p-[3cqw]">
      <Surface className="flex w-[38cqw] flex-none flex-col gap-[2cqw] rounded-[1.2cqw] p-[2.4cqw]">
        <div className="flex items-center justify-between">
          <div className="text-[length:2.2cqw] font-medium">Order tracking</div>
          <Pill className="text-[length:1.4cqw]">● Live</Pill>
        </div>
        {TRACKING_STEPS.map(({ step, state }) => (
          <div key={step} className="flex items-center gap-[1.4cqw] text-[length:1.8cqw]">
            <div className={cn("size-[2.4cqw] flex-none rounded-full",
              state === "done" && "bg-primary",
              state === "current" && "border-[0.6cqw] border-accent-light",
              state === "todo" && "border border-foreground/25")} />
            <div className={cn(state === "current" ? "font-medium text-accent-light" : state === "todo" ? "text-ink-tertiary" : "text-muted-foreground")}>{step}</div>
          </div>
        ))}
      </Surface>
      <div className="flex min-w-0 flex-1 flex-col gap-[2cqw]">
        <div className="flex items-center justify-between">
          <div className="text-[length:2.2cqw] font-medium">Today</div>
          <div className="flex overflow-hidden rounded-[0.8cqw] border border-foreground/16 text-[length:1.5cqw]">
            <div className="bg-primary/20 px-[1.2cqw] py-[0.5cqw] text-accent-light">EN</div>
            <div lang="ar" className="px-[1.2cqw] py-[0.5cqw] text-muted-foreground">ع</div>
          </div>
        </div>
        <div className="flex gap-[1.6cqw]">
          <Surface className="h-[7cqw] flex-1" />
          <Surface className="h-[7cqw] flex-1" />
        </div>
        <Label className="text-[length:1.3cqw]">7-day activity</Label>
        <div className="grid min-h-0 flex-1 grid-cols-7 items-end gap-[1.2cqw]">
          {["h-[40%]", "h-[55%]", "h-[48%]", "h-[70%]", "h-[62%]", "h-[90%]", "h-[76%]"].map((height, i) => (
            <div key={i} className={cn("rounded-t-[0.6cqw]", height, i === 6 ? "bg-accent-light" : "bg-primary/40")} />
          ))}
        </div>
      </div>
    </div>
  )
}

const HOURS = [["12:00", "31°"], ["13:00", "31°"], ["14:00", "30°"], ["15:00", "29°"], ["16:00", "28°"], ["17:00", "26°"], ["18:00", "25°"], ["19:00", "24°"]]

function Weather() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[2.6cqw] px-[3.4cqw] py-[3cqw]">
      <div className="flex gap-[1.6cqw]">
        <div className="flex h-[4.4cqw] flex-1 items-center gap-[1.2cqw] rounded-[1cqw] border border-foreground/16 px-[1.6cqw] text-[length:1.7cqw] text-ink-tertiary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-[2cqw]"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          Search a city…
        </div>
        <div className="flex overflow-hidden rounded-[1cqw] border border-foreground/16 text-[length:1.6cqw]">
          <div className="flex items-center bg-primary/20 px-[1.6cqw] text-accent-light">°C</div>
          <div className="flex items-center px-[1.6cqw] text-muted-foreground">°F</div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-between gap-[3cqw]">
        <div className="flex flex-col gap-[0.6cqw]">
          <div className="text-[length:2.2cqw] text-muted-foreground">Cairo</div>
          <div className="text-[length:11cqw] leading-none font-medium tracking-[-0.05em]">31°</div>
          <div className="text-[length:1.8cqw] text-muted-foreground">Clear sky</div>
        </div>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="size-[18cqw] text-accent-light">
          <circle cx="50" cy="50" r="20" className="fill-primary/25" />
          <path d="M50 10v10M50 80v10M10 50h10M80 50h10M22 22l7 7M71 71l7 7M78 22l-7 7M29 71l-7 7" />
        </svg>
      </div>
      <div className="grid grid-cols-8 gap-[1cqw] border-t border-foreground/8 pt-[2cqw] text-center">
        {HOURS.map(([hour, temp], i) => (
          <div key={hour} className="flex flex-col gap-[0.8cqw]">
            <div className={cn("font-mono text-[length:1.4cqw]", i === 0 ? "text-primary" : "text-ink-tertiary")}>{hour}</div>
            <div className="text-[length:1.8cqw]">{temp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const WEEK = [
  { day: "SUN", blocks: [["h-[12cqw] bg-primary/22", "CS 401", "Lecture"], ["h-[8cqw] border border-foreground/8 bg-card", "", ""]] },
  { day: "MON", blocks: [["h-[6cqw]", "", ""], ["h-[14cqw] bg-field", "Lab 3", "C7 · 201"]] },
  { day: "TUE", blocks: [["h-[9cqw] bg-primary/22", "Math 302", ""], ["h-[9cqw] border border-foreground/8 bg-card", "", ""]] },
  { day: "WED", blocks: [["h-[3cqw]", "", ""], ["h-[10cqw] border border-dashed border-accent-light/50 text-accent-light", "TA hours", ""]] },
  { day: "THU", blocks: [["h-[12cqw] bg-primary/22", "CS 401", "Tutorial"]] },
]

function StudentGuide() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[2.2cqw] px-[3.4cqw] py-[3cqw]">
      <div className="flex items-center justify-between gap-[2cqw]">
        <div className="text-[length:2.8cqw] font-medium">This week</div>
        <FilterChips items={["Schedule", "Rooms", "TA hours", "GPA"]} />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-5 gap-[1.2cqw]">
        {WEEK.map(({ day, blocks }) => (
          <div key={day} className="flex flex-col gap-[1cqw]">
            <Label className="text-[length:1.3cqw]">{day}</Label>
            {blocks.map(([style, title, detail], i) => (
              <div key={i} className={cn("rounded-[0.9cqw] p-[1cqw] text-[length:1.5cqw]", style)}>
                {title}
                {detail && <div className="text-muted-foreground">{detail}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const BOOKINGS = [
  { cabin: "001", width: "w-3/5", stay: "3 nights", status: "Checked in", tone: "accent" },
  { cabin: "002", width: "w-1/2", stay: "5 nights", status: "Check in", tone: "action" },
  { cabin: "003", width: "w-2/3", stay: "2 nights", status: "Checked out", tone: "neutral" },
  { cabin: "004", width: "w-2/5", stay: "1 night", status: "Unconfirmed", tone: "neutral" },
] as const

function WildOasis() {
  return (
    <div className="flex min-w-0 flex-1">
      <Sidebar brand="The Wild Oasis" active="Bookings" items={["Home", "Bookings", "Cabins", "Users", "Settings"]} />
      <div className="flex min-w-0 flex-1 flex-col gap-[2.2cqw] px-[3cqw] py-[2.6cqw]">
        <div className="text-[length:2.8cqw] font-medium">Bookings</div>
        <FilterChips items={["All", "Checked in", "Unconfirmed"]} />
        <div className="flex flex-col">
          {BOOKINGS.map(row => (
            <TableRow key={row.cabin} className="grid-cols-[8cqw_minmax(0,1fr)_11cqw_15cqw] py-[1.4cqw]">
              <div className="font-mono text-muted-foreground">{row.cabin}</div>
              <Bar className={row.width} />
              <div className="text-muted-foreground">{row.stay}</div>
              {row.tone === "action"
                ? <Action className="justify-self-start px-[1.2cqw] py-[0.4cqw] text-[length:1.4cqw]">{row.status}</Action>
                : <Pill tone={row.tone} className="text-[length:1.4cqw]">{row.status}</Pill>}
            </TableRow>
          ))}
        </div>
      </div>
    </div>
  )
}

export const screens: Record<IllustrationKind, { url: string; Screen: () => React.JSX.Element }> = {
  "mawasem-store": { url: "www.mawasem.org", Screen: MawasemStore },
  "mawasem-dashboard": { url: "mawasem · admin (internal)", Screen: MawasemDashboard },
  "chillwork": { url: "chillwork-dashboard.vercel.app", Screen: ChillworkJobs },
  "chillwork-triage": { url: "chillwork-frontend.vercel.app/requests/new", Screen: ChillworkTriage },
  "chillwork-schedule": { url: "chillwork-dashboard.vercel.app/schedule", Screen: ChillworkSchedule },
  "chillwork-parts": { url: "chillwork-dashboard.vercel.app/jobs", Screen: ChillworkParts },
  "chillwork-invoice": { url: "chillwork-frontend.vercel.app/invoice", Screen: ChillworkInvoice },
  "lumina": { url: "lumina · student / exercises", Screen: Lumina },
  "foodie": { url: "food-ordering-app-pearl-alpha.vercel.app/admin", Screen: Foodie },
  "weather": { url: "weather-now-phi-ecru.vercel.app", Screen: Weather },
  "student-guide": { url: "student-guide · schedule", Screen: StudentGuide },
  "wild-oasis": { url: "the-wild-oasis-dashboard-peach.vercel.app/bookings", Screen: WildOasis },
}
