import React, { MouseEvent, useState } from 'react';
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

const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact = false }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
            <span className="rounded-sm border border-white/10 px-4 py-2 text-sm font-semibold text-slate-400">
              尚未部署
            </span>
          )}
          {project.repoName && (
            <span className="rounded-sm border border-white/10 px-4 py-2 text-sm text-slate-300">
              {project.repoName}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
