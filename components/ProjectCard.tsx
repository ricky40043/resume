import React, { MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../types';
import { soundManager } from '../utils/audio';

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const statusStyles: Record<Project['status'], string> = {
  Live: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  Demo: "border-sky-400/40 bg-sky-400/10 text-sky-200",
  Local: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  Planning: "border-zinc-400/40 bg-zinc-400/10 text-zinc-200",
};

const statusLabels: Record<Project['status'], string> = {
  Live: "已上線",
  Demo: "展示中",
  Local: "本機作品",
  Planning: "規劃中",
};

// 將各種素材連結轉成可嵌入格式：MP4 用 <video>、圖片用 <img>、YouTube / Google Drive 用 iframe。
const getEmbed = (raw: string): { type: 'video' | 'image' | 'iframe'; src: string } => {
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(raw)) {
    return { type: 'video', src: raw };
  }
  if (/\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(raw)) {
    return { type: 'image', src: raw };
  }
  const yt = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  if (yt) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0` };
  }
  // Google Drive 或其他（影片 / 簡報 / PDF）：確保是 /preview 嵌入網址
  const src = raw.replace(/\/view(\?[^#]*)?(#.*)?$/, '/preview');
  return { type: 'iframe', src };
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact = false }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showVideo, setShowVideo] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!showVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowVideo(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [showVideo]);

  const media = project.videoUrl ? getEmbed(project.videoUrl) : null;

  return (
    <article
      onMouseEnter={() => soundManager.playHover()}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/70 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 ${compact ? 'p-6' : 'p-7'}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(520px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(251, 191, 36, 0.13), transparent 42%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300">
                {project.section}
              </span>
              <span className={`rounded-sm border px-2.5 py-1 text-xs font-semibold ${statusStyles[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            </div>
            <h3 className="text-2xl font-bold leading-tight text-white">{project.title}</h3>
            <p className="mt-2 text-sm font-medium text-amber-300">{project.category}</p>
          </div>
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 font-mono text-sm text-amber-300 sm:flex">
            {String(project.id).padStart(2, '0')}
          </div>
        </div>

        <p className="mb-5 text-sm leading-7 text-slate-300">{project.description}</p>

        <div className="mb-5 grid gap-2">
          {project.highlights.slice(0, compact ? 2 : 3).map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-sm bg-white/5 px-2.5 py-1 text-xs text-slate-300 ring-1 ring-white/10">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          {project.videoUrl && (
            <button
              type="button"
              onClick={() => {
                soundManager.playHover();
                setShowVideo(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-sm border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-200 transition-colors hover:bg-amber-400 hover:text-slate-950"
            >
              {project.mediaLabel || '▶ Demo 影片'}
            </button>
          )}
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300"
            >
              開啟網站
            </a>
          ) : (
            !project.videoUrl && (
              <span className="rounded-sm border border-white/10 px-4 py-2 text-sm font-semibold text-slate-400">
                尚未部署
              </span>
            )
          )}
          {project.repoName && (
            <span className="rounded-sm border border-white/10 px-4 py-2 text-sm text-slate-300">
              {project.repoName}
            </span>
          )}
        </div>
      </div>

      {showVideo && media && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-amber-200">{project.title} · Demo</span>
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                className="rounded-sm border border-white/20 px-3 py-1 text-sm text-slate-200 transition-colors hover:bg-white/10"
              >
                關閉 ✕
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl">
              {media.type === 'video' ? (
                <video
                  src={media.src}
                  controls
                  autoPlay
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full"
                />
              ) : media.type === 'image' ? (
                <img
                  src={media.src}
                  alt={`${project.title} 架構圖`}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-full w-full object-contain"
                />
              ) : (
                <iframe
                  src={media.src}
                  title={`${project.title} demo`}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </article>
  );
};

export default ProjectCard;
