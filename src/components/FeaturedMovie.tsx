"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FeaturedMovieProps {
  videoId: string;
  title?: string;
  description?: string;
}

export default function FeaturedMovie({ videoId, title, description }: FeaturedMovieProps) {
  const t = useTranslations("featuredMovie");
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
  const posterUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const titleText = title ?? t("title");
  const descText = description ?? t("description");
  const watchText = t("watchOnYouTube");

  return (
    <section className="border border-slate-200/70 bg-[#c5d9ed] py-12 px-6 shadow-xl shadow-slate-200/60">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-[#226799] sm:text-4xl">{titleText}</h2>
          </div>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition bg-[#2973A8] hover:bg-[#68ACDB]"
          >
            {watchText}
          </a>
        </div>

        <p className="text-slate-700 leading-7">{descText}</p>

        <div className="rounded-[24px] border border-slate-200/80 bg-white overflow-hidden shadow-lg shadow-slate-200/60">
          {isPlaying ? (
            <div className="relative aspect-video bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={embedUrl}
                title={titleText}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group relative block w-full overflow-hidden bg-slate-100 transition hover:scale-[1.01]"
            >
              <img
                src={posterUrl}
                alt={`YouTube thumbnail for ${titleText}`}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/20 transition duration-300 group-hover:bg-slate-900/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-xl transition duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 fill-slate-950">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
