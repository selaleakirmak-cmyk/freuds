"use client";

import { useState } from "react";
import Image from "next/image";

type CardArtworkProps = {
  src?: string;
  alt: string;
  variant?: "large" | "thumb" | "inline";
  title?: string;
  summary?: string;
  label?: string;
};

function PlaceholderSymbol({ variant }: { variant: "large" | "thumb" | "inline" }) {
  const outer = variant === "large" ? "h-24 w-24" : variant === "thumb" ? "h-14 w-14" : "h-24 w-24";
  const inner = variant === "large" ? "h-12 w-12" : variant === "thumb" ? "h-7 w-7" : "h-10 w-10";
  const line = variant === "thumb" ? "h-10" : "h-16";

  return (
    <div className={`relative flex ${outer} items-center justify-center rounded-full border border-black/10`}>
      <div className={`absolute ${inner} rounded-full border border-black/10`} />
      <div className={`${line} w-px bg-black/20`} />
    </div>
  );
}

function PlaceholderSurface({ variant, title, summary, label }: { variant: "large" | "thumb" | "inline"; title?: string; summary?: string; label?: string }) {
  if (variant === "thumb") {
    return (
      <div className="mb-4 aspect-[2/3] overflow-hidden rounded-[18px] border border-black/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%),linear-gradient(180deg,#ece5d8,#e4dccd)] p-4">
        <div className="flex h-full items-center justify-center rounded-[12px] border border-black/8">
          <PlaceholderSymbol variant="thumb" />
        </div>
      </div>
    );
  }

  if (variant === "large") {
    return (
      <div className="mb-8 aspect-[2/3] overflow-hidden rounded-[24px] border border-black/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%),linear-gradient(180deg,#ece5d8,#e4dccd)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
        <div className="flex h-full items-center justify-center rounded-[18px] border border-black/8">
          <PlaceholderSymbol variant="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col p-4 md:p-5">
      <div className="flex-1 rounded-[12px] border border-black/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),rgba(255,255,255,0)_55%),linear-gradient(180deg,#ece5d8,#e4dccd)]">
        <div className="flex h-full items-center justify-center">
          <PlaceholderSymbol variant="inline" />
        </div>
      </div>
      {(title || summary || label) ? (
        <div className="mt-4">
          {label ? <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9B8B6E]">{label}</p> : null}
          {title ? <h3 className="font-serif text-[22px] leading-[1.05] text-[#161310]">{title}</h3> : null}
          {summary ? <p className="mt-2 line-clamp-3 text-[13px] leading-[1.45] text-black/55">{summary}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export default function CardArtwork({ src, alt, variant = "inline", title, summary, label }: CardArtworkProps) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;

  if (!showImage) {
    return <PlaceholderSurface variant={variant} title={title} summary={summary} label={label} />;
  }

  if (variant === "thumb") {
    return (
      <div className="mb-4 aspect-[2/3] overflow-hidden rounded-[18px] border border-black/8 bg-[#ECE5D8]">
        <div className="relative h-full w-full">
          <Image src={src!} alt={alt} fill sizes="(max-width: 768px) 40vw, 240px" className="object-cover" onError={() => setHasError(true)} />
        </div>
      </div>
    );
  }

  if (variant === "large") {
    return (
      <div className="mb-8 aspect-[2/3] overflow-hidden rounded-[24px] border border-black/8 bg-[#ECE5D8] shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
        <div className="relative h-full w-full">
          <Image src={src!} alt={alt} fill sizes="(max-width: 1024px) 60vw, 520px" className="object-cover" onError={() => setHasError(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-4 flex-1 overflow-hidden rounded-[12px] border border-black/8 bg-[#ECE5D8]">
      <Image src={src!} alt={alt} fill sizes="(max-width: 768px) 150px, 190px" className="object-cover" onError={() => setHasError(true)} />
    </div>
  );
}
