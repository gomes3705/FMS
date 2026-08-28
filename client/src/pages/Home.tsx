/* Design: Arquivo Mineral — editorial modernism, charcoal/ivory base, clay-orange actions, asymmetric workspace, Space Grotesk + IBM Plex Sans. */
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Archive,
  ArrowDownToLine,
  ArrowUpRight,
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  CloudUpload,
  Command,
  Copy,
  FileArchive,
  FileAudio,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  FolderKanban,
  FolderPlus,
  Hash,
  LayoutDashboard,
  Library,
  ListFilter,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Tag,
  Trash2,
  WandSparkles,
  X,
} from "lucide-react";

type FileItem = {
  id: number;
  name: string;
  ext: string;
  size: string;
  modified: string;
  collection: string;
  color: string;
  icon: "text" | "image" | "sheet" | "video" | "audio" | "code" | "archive";
  tags: string[];
  status: "Organizado" | "Revisar" | "Novo";
};

const initialFiles: FileItem[] = [
  { id: 1, name: "planejamento-q4.pdf", ext: "PDF", size: "2,4 MB", modified: "Hoje, 09:42", collection: "Trabalho", color: "coral", icon: "text", tags: ["planejamento", "2026"], status: "Organizado" },
  { id: 2, name: "referencias-visuais.zip", ext: "ZIP", size: "48,1 MB", modified: "Hoje, 08:17", collection: "Projetos pessoais", color: "olive", icon: "archive", tags: ["design", "referências"], status: "Novo" },
  { id: 3, name: "relatorio-financeiro.xlsx", ext: "XLSX", size: "856 KB", modified: "Ontem, 17:30", collection: "Finanças", color: "blue", icon: "sheet", tags: ["controle", "mensal"], status: "Organizado" },
  { id: 4, name: "ensaio-fotografico-02.jpg", ext: "JPG", size: "6,8 MB", modified: "Ontem, 14:05", collection: "Arquivo pessoal", color: "violet", icon: "image", tags: ["fotografia", "memórias"], status: "Organizado" },
  { id: 5, name: "briefing-podcast.docx", ext: "DOCX", size: "240 KB", modified: "12 jun, 11:20", collection: "Projetos pessoais", color: "coral", icon: "text", tags: ["conteúdo", "áudio"], status: "Revisar" },
  { id: 6, name: "backup-site-v3.tar.gz", ext: "TAR", size: "1,2 GB", modified: "11 jun, 22:48", collection: "Arquivo técnico", color: "slate", icon: "code", tags: ["backup", "web"], status: "Organizado" },
];

const navItems = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Biblioteca", icon: Library },
  { label: "Coleções", icon: FolderKanban },
  { label: "Regras", icon: WandSparkles },
  { label: "Atividade", icon: Clock3 },
];

const collectionData = [
  { name: "Trabalho", count: 128, detail: "12 itens recentes", tone: "sand" },
  { name: "Projetos pessoais", count: 74, detail: "8 itens recentes", tone: "coral" },
  { name: "Arquivo pessoal", count: 52, detail: "3 itens recentes", tone: "sage" },
  { name: "Finanças", count: 31, detail: "5 itens recentes", tone: "blue" },
];

function FileIcon({ kind }: { kind: FileItem["icon"] }) {
  const props = { size: 18, strokeWidth: 1.8 };
  if (kind === "image") return <FileImage {...props} />;
  if (kind === "sheet") return <FileSpreadsheet {...props} />;
  if (kind === "video") return <FileVideo {...props} />;
  if (kind === "audio") return <FileAudio {...props} />;
  if (kind === "code") return <FileCode2 {...props} />;
  if (kind === "archive") return <FileArchive {...props} />;
  return <FileText {...props} />;
}

function AppMark() {
  return <div className="app-mark" aria-label="Organizador"><span /><span /></div>;
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Visão geral");
  const [files, setFiles] = useState(initialFiles);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos os tipos");
  const [showNew, setShowNew] = useState(false);
  const [newCollection, setNewCollection] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = useMemo(() => files.filter((file) => {
    const matchesQuery = `${file.name} ${file.collection} ${file.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "Todos os tipos" || file.ext === filter;
    return matchesQuery && matchesFilter;
  }), [files, query, filter]);

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    if (!selected.length) return;
    const imported = selected.map((file, index): FileItem => ({
      id: Date.now() + index,
      name: file.name,
      ext: file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      modified: "Agora",
      collection: "A revisar",
      color: "coral",
      icon: file.type.startsWith("image/") ? "image" : file.type.includes("sheet") ? "sheet" : file.type.includes("zip") ? "archive" : "text",
      tags: ["importado"],
      status: "Novo",
    }));
    setFiles((current) => [...imported, ...current]);
    toast.success(`${selected.length} ${selected.length === 1 ? "arquivo importado" : "arquivos importados"}.`);
    event.target.value = "";
  }

  function createCollection() {
    if (!newCollection.trim()) return;
    toast.success(`Coleção “${newCollection.trim()}” criada.`);
    setNewCollection("");
    setShowNew(false);
  }

  function removeFile(id: number) {
    setFiles((current) => current.filter((file) => file.id !== id));
    toast("Arquivo removido da visualização.", { action: { label: "Desfazer", onClick: () => setFiles(initialFiles) } });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup"><AppMark /><div><strong>organizador</strong><span>arquivo pessoal</span></div></div>
        <div className="workspace-switcher"><div className="workspace-avatar">G</div><div><span>Espaço de trabalho</span><strong>Meu arquivo</strong></div><ChevronDown size={15} /></div>
        <nav className="primary-nav" aria-label="Navegação principal">
          <p className="nav-kicker">Navegar</p>
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={activeNav === label ? "nav-item active" : "nav-item"} onClick={() => setActiveNav(label)}><Icon size={18} /><span>{label}</span>{label === "Atividade" && <b>3</b>}</button>)}
        </nav>
        <div className="sidebar-collections"><div className="nav-kicker-row"><p className="nav-kicker">Coleções fixadas</p><button onClick={() => setShowNew(true)} aria-label="Criar coleção"><Plus size={15} /></button></div>{collectionData.slice(0, 4).map((collection) => <button className="mini-collection" key={collection.name} onClick={() => { setActiveNav("Biblioteca"); setQuery(collection.name); }}><span className={`collection-dot ${collection.tone}`} />{collection.name}<small>{collection.count}</small></button>)}</div>
        <div className="sidebar-bottom"><button className="nav-item"><Settings2 size={18} /><span>Preferências</span></button><div className="storage-card"><div className="storage-top"><span>Espaço local</span><strong>62%</strong></div><div className="storage-track"><span /></div><p>31,2 GB de 50 GB usados</p></div><div className="profile"><div className="profile-avatar">G</div><div><strong>Gabriel</strong><span>Plano pessoal</span></div><MoreHorizontal size={17} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Meu arquivo</span><span>/</span><strong>{activeNav}</strong></div><div className="top-actions"><button className="command-search" onClick={() => inputRef.current?.focus()}><Search size={16} /><span>Buscar no arquivo...</span><kbd><Command size={12} /> K</kbd></button><button className="icon-button" aria-label="Notificações"><Bell size={18} /><i /></button><button className="top-avatar">G</button></div></header>
        <div className="coordinate-line"><span>COORD. 04—26</span><span>ATUALIZADO AGORA</span></div>

        <section className="hero-intro"><div><p className="eyebrow"><span className="eyebrow-mark" /> Seu espaço, do seu jeito</p><h1>Encontre espaço<br /><em>para o que importa.</em></h1><p className="hero-copy">Um lugar flexível para reunir, organizar e retomar seus arquivos — sem importar de onde eles vieram.</p><div className="hero-actions"><button className="button-primary" onClick={() => inputRef.current?.click()}><CloudUpload size={17} /> Adicionar arquivos <span>↗</span></button><button className="button-quiet" onClick={() => setShowNew(true)}><FolderPlus size={17} /> Criar coleção</button></div></div><div className="hero-art"><img src="/manus-storage/organizador-hero_b2abbc97.png" alt="Pastas e etiquetas sobre uma mesa de arquivo" /><div className="art-stamp">ORGANIZE<br /><strong>SEM<br />LIMITES</strong></div></div></section>

        <section className="stats-row"><div className="stat-card featured"><span className="stat-label">Arquivos no espaço</span><strong>285</strong><span className="stat-meta"><ArrowUpRight size={14} /> 18 adicionados este mês</span></div><div className="stat-card"><span className="stat-label">Coleções ativas</span><strong>08</strong><span className="stat-meta muted"><FolderKanban size={14} /> 4 fixadas na barra</span></div><div className="stat-card"><span className="stat-label">Precisam de atenção</span><strong>12</strong><span className="stat-meta warning"><Sparkles size={14} /> Sugestões de organização</span></div><div className="stat-card stat-quote"><span className="quote-mark">“</span><p>Organização é transformar procura em encontro.</p><span>— nota do seu arquivo</span></div></section>

        <section className="workspace-section"><div className="section-heading"><div><p className="eyebrow">Biblioteca viva</p><h2>Arquivos recentes</h2></div><button className="text-link" onClick={() => setActiveNav("Biblioteca")}>Ver biblioteca completa <ArrowUpRight size={15} /></button></div><div className="library-toolbar"><div className="search-field"><Search size={17} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nome, etiqueta ou coleção" /><kbd>/</kbd></div><div className="filter-wrap"><ListFilter size={16} /><select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filtrar por tipo"><option>Todos os tipos</option><option>PDF</option><option>DOCX</option><option>XLSX</option><option>JPG</option><option>ZIP</option><option>TAR</option></select></div><button className="view-toggle active"><Library size={16} /></button><button className="view-toggle"><ListFilter size={16} /></button></div><div className="file-table"><div className="file-table-head"><span>Arquivo</span><span>Coleção</span><span>Última alteração</span><span>Status</span><span /></div>{filteredFiles.slice(0, 6).map((file) => <div className="file-row" key={file.id}><div className="file-name"><span className={`file-icon ${file.color}`}><FileIcon kind={file.icon} /></span><div><strong>{file.name}</strong><span>{file.ext} · {file.size}</span></div></div><div className="file-collection"><span className={`collection-dot ${file.color}`} />{file.collection}</div><div className="file-date">{file.modified}</div><div><span className={`status-pill ${file.status === "Novo" ? "new" : file.status === "Revisar" ? "review" : "done"}`}>{file.status === "Organizado" && <Check size={12} />}{file.status}</span></div><button className="row-action" onClick={() => removeFile(file.id)} aria-label={`Remover ${file.name}`}><MoreHorizontal size={18} /></button></div>)}{filteredFiles.length === 0 && <div className="empty-state"><Archive size={24} /><strong>Nenhum arquivo encontrado</strong><span>Tente outra busca ou importe um novo arquivo.</span></div>}</div></section>

        <section className="lower-grid"><div className="collections-panel"><div className="section-heading compact"><div><p className="eyebrow">Pontos de partida</p><h2>Suas coleções</h2></div><button className="circle-button" onClick={() => setShowNew(true)} aria-label="Nova coleção"><Plus size={17} /></button></div><div className="collection-grid">{collectionData.map((collection) => <button className="collection-card" key={collection.name} onClick={() => { setQuery(collection.name); setActiveNav("Biblioteca"); }}><div className={`collection-illustration ${collection.tone}`}><span /><span /><span /></div><div className="collection-info"><strong>{collection.name}</strong><span>{collection.detail}</span></div><b>{collection.count}</b></button>)}</div></div><div className="attention-panel"><div className="section-heading compact"><div><p className="eyebrow">Próxima ação</p><h2>Para revisar</h2></div><span className="attention-count">03</span></div><div className="attention-card"><div className="attention-icon"><WandSparkles size={18} /></div><div><strong>Você tem arquivos sem coleção</strong><p>3 itens importados aguardam uma decisão.</p><button onClick={() => { setQuery("importado"); setActiveNav("Biblioteca"); }}>Revisar agora <ArrowUpRight size={14} /></button></div></div><div className="rule-suggestion"><div className="rule-icon"><Tag size={16} /></div><div><strong>Crie uma regra inteligente</strong><p>“Arquivos com backup” → Arquivo técnico</p></div><button onClick={() => setActiveNav("Regras")}><ArrowUpRight size={15} /></button></div></div></section>
      </main>

      <input ref={inputRef} type="file" multiple hidden onChange={handleImport} />
      {showNew && <div className="modal-backdrop" onClick={() => setShowNew(false)}><div className="new-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowNew(false)}><X size={18} /></button><div className="modal-icon"><FolderPlus size={21} /></div><p className="eyebrow">Nova estrutura</p><h2>Crie uma coleção</h2><p className="modal-copy">Dê um nome que faça sentido para o seu fluxo. Você poderá mover arquivos para cá quando quiser.</p><label>Nome da coleção<input autoFocus value={newCollection} onChange={(event) => setNewCollection(event.target.value)} onKeyDown={(event) => event.key === "Enter" && createCollection()} placeholder="Ex.: Inspirações, Documentos, Viagens..." /></label><div className="modal-actions"><button className="button-quiet" onClick={() => setShowNew(false)}>Cancelar</button><button className="button-primary" onClick={createCollection}>Criar coleção <ArrowUpRight size={16} /></button></div></div></div>}
    </div>
  );
}
