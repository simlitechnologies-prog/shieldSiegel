"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-black/5">
      {items.map((faq) => (
        <Accordion.Item key={faq.id} value={faq.id} className="py-2">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left">
              <span className="font-display text-base font-medium text-[var(--color-navy)]">
                {faq.question}
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-[var(--color-gold)] transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden text-sm leading-relaxed text-[var(--color-slate)] data-[state=open]:animate-[accordionDown_0.25s_ease-out] data-[state=closed]:animate-[accordionUp_0.2s_ease-in]">
            <p className="pb-4">{faq.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
