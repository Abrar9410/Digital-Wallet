import { ChevronDownIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const items = [
  {
    id: "1",
    title: "General",
    collapsibles: [
      {
        title: "What is Digital Wallet?",
        content:
          "Digital Wallet is a secure and convenient app for managing your money, making payments, and tracking transactions.",
      },
      {
        title: "Is the wallet free to use?",
        content:
          "Yes! Creating an account and using basic features like sending, receiving, and checking balance is completely free.",
      },
      {
        title: "Which platforms are supported?",
        content:
          "The wallet is accessible through any modern web browser on desktop and mobile devices.",
      },
    ],
  },
  {
    id: "2",
    title: "Security & Privacy",
    collapsibles: [
      {
        title: "How secure is my money?",
        content:
          "Your wallet is protected with encryption, authentication, and fraud detection systems to keep your funds safe.",
      },
      {
        title: "What happens if I forget my password?",
        content:
          "You must contact us through the App's 'Contact' page if you've forgotten your password. Better NOT to forget.",
      },
      {
        title: "Do you share my data with third parties?",
        content:
          "No. Your personal and financial data is never shared with unauthorized third parties.",
      },
    ],
  },
  {
    id: "3",
    title: "Payments & Transactions",
    collapsibles: [
      {
        title: "Can I send money to anyone?",
        content:
          "Yes, you can transfer funds to any registered user instantly and securely.",
      },
      {
        title: "Are there transaction fees?",
        content:
          "Most transactions are free. However, minimal fees may apply for certain premium services or external transfers.",
      },
      {
        title: "How long does it take to process a payment?",
        content:
          "Payments between wallet users are instant. Bank withdrawals may take 1–3 business days depending on the bank.",
      },
    ],
  },
  {
    id: "4",
    title: "Account Management",
    collapsibles: [
      {
        title: "How do I update my profile information?",
        content:
          "You can update your name, email, and other details anytime from the Profile page in your Dashboard.",
      },
      {
        title: "Can I delete my account?",
        content:
          "Yes, you can request account deletion by sending us an email from the Contact page. Please withdraw your balance before closing your account.",
      },
    ],
  },
]

export default function FAQAccordion() {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="w-full -space-y-px"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
          >
            <AccordionTrigger className="rounded-md px-4 py-3 text-[15px] leading-6 outline-none hover:underline focus-visible:ring-0 cursor-pointer">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="p-0">
              {item.collapsibles.map((collapsible, index) => (
                <CollapsibleDemo
                  key={index}
                  title={collapsible.title}
                  content={collapsible.content}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function CollapsibleDemo({
  title,
  content
}: {
  title: string
  content: string
}) {
  return (
    <Collapsible className="bg-accent border-t px-4 py-3">
      <CollapsibleTrigger className="flex gap-2 text-[15px] leading-6 font-semibold [&[data-state=open]>svg]:rotate-180 cursor-pointer">
        <ChevronDownIcon
          size={16}
          className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
          aria-hidden="true"
        />
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className="text-muted-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down mt-1 overflow-hidden ps-6 text-sm transition-all">
        {content}
      </CollapsibleContent>
    </Collapsible>
  )
}
