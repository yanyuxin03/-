import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useDragControls } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import html2canvas from 'html2canvas';
import { 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  ExternalLink, 
  Award, 
  Briefcase, 
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  BookOpen,
  Camera,
  Layers, 
  Sparkles,
  ArrowDown,
  Plus,
  X,
  RotateCw,
  Download,
  Trash2,
  Maximize2,
  ImagePlus,
  Upload,
  Unlock,
  Lock,
  Type,
  FileText
} from 'lucide-react';
import { DATA } from './constants';

const CORRECT_PASSWORD = "yanyuxin2026"; // Default password as per instructions (will be updated if user provides one)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

interface Project {
  id: number;
  title: string;
  category: string;
  image?: string;
  desc: string;
  content?: string;
  tags: string[];
  link: string;
  articles?: { title: string; link: string }[];
}

function ExperienceFlipCard({ exp, index, isReversed }: { exp: any; index: number; isReversed?: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-[650px] group relative">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front - Naked Layout */}
        <div 
          className={`absolute inset-0 backface-hidden flex items-center gap-12 md:gap-20 group/node ${isReversed ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
        >
          {/* Left/Right: Icon Block (Sticker Style) */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 md:w-64 md:h-64 flex items-center justify-center group-hover/node:scale-110 transition-transform duration-500">
              <img 
                src={exp.icon} 
                alt={exp.company} 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + exp.company;
                }}
              />
            </div>
            {/* Soft indicator */}
            <div className={`absolute -bottom-2 w-12 h-12 bg-primary/95 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-surface shadow-2xl z-10 ${isReversed ? '-left-2' : '-right-2'}`}>
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Center: Text Block */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="text-[12px] font-black tracking-[0.5em] text-primary/40 uppercase font-sans">
              {exp.time}
            </div>
            <h4 className="text-4xl md:text-6xl font-bold text-text-main tracking-tighter leading-tight group-hover/node:text-primary transition-colors whitespace-nowrap">
              {exp.company}
            </h4>
            <div className={`flex flex-col space-y-1 ${isReversed ? 'items-end' : 'items-start'}`}>
              <p className={`text-text-muted font-serif italic text-2xl md:text-4xl py-3 ${isReversed ? 'border-r-4 pr-10' : 'border-l-4 pl-10'} border-primary/20`}>
                {exp.role}
              </p>
            </div>
          </div>
        </div>

        {/* Back - Detailed Recap (Wide and Centered) */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#536d84] p-12 md:px-20 md:py-16 rounded-[4.5rem] text-white flex flex-col shadow-2xl border border-white/10"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-10">
            <div className={`space-y-2 ${isReversed ? 'text-right flex-1' : ''}`}>
              <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/50">RESUME DETAIL</h4>
              <p className="text-lg font-serif italic text-white/80">经历详实</p>
            </div>
            <div className={`text-white/20 transition-transform hover:rotate-90 duration-500 ${isReversed ? 'order-first mr-8' : 'ml-8'}`}>
              <Plus className="w-10 h-10 rotate-45" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-10 -mr-6 overscroll-contain">
            <div className="max-w-4xl mx-auto w-full py-6">
              <ul className="space-y-12">
                {exp.details.map((detail: string, i: number) => (
                  <li key={i} className={`text-xl md:text-2xl leading-relaxed text-white/95 font-serif italic relative ${isReversed ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                    <span className={`absolute top-4 w-10 h-[1.5px] bg-white/40 ${isReversed ? 'right-0' : 'left-0'}`} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-10 text-[11px] font-black tracking-[0.6em] text-white/30 flex items-center justify-center gap-4 py-4 border-t border-white/5">
            <ChevronLeft className="w-5 h-5" /> CLICK TO RETURN
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DraggableSticker({ 
  sticker, 
  onUpdate, 
  onRemove,
  isCreatorMode
}: { 
  sticker: { id: string; type?: 'image' | 'text'; src?: string; text?: string; x: number; y: number; rotate: number; scale: number; fontFamily?: string; color?: string; isBorderless?: boolean }; 
  onUpdate: (id: string, updates: Partial<{ x: number; y: number; rotate: number; scale: number; text?: string; fontFamily?: string; color?: string; isBorderless?: boolean }>) => void;
  onRemove: (id: string) => void;
  isCreatorMode: boolean;
}) {
  const [isRotating, setIsRotating] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localRotate, setLocalRotate] = useState(sticker.rotate);
  const [localScale, setLocalScale] = useState(sticker.scale || 1);
  const [localText, setLocalText] = useState(sticker.text || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Ref to store snapshot during interactions
  const dragSession = useRef({
    startAngle: 0,
    startRotation: 0,
    startDistance: 0,
    startScale: 0,
    centerX: 0,
    centerY: 0
  });

  const getAngleAndDistance = (px: number, py: number) => {
    const dx = px - dragSession.current.centerX;
    const dy = py - dragSession.current.centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return { angle, distance };
  };

  // Sync local text
  useEffect(() => {
    setLocalText(sticker.text || '');
  }, [sticker.text]);

  const fonts = ['sans-serif', 'serif', 'Muyao', 'Zhi Mang Xing'];

  const handleInteractionStart = (event: any, info: any) => {
    if (!containerRef.current || isEditing) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    const dx = info.point.x - cx;
    const dy = info.point.y - cy;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const distance = Math.sqrt(dx * dx + dy * dy);

    dragSession.current = {
      centerX: cx,
      centerY: cy,
      startAngle: angle,
      startRotation: sticker.rotate,
      startDistance: distance,
      startScale: sticker.scale || 1
    };
  };

  const handleRotateUpdate = (_event: any, info: any) => {
    const { angle } = getAngleAndDistance(info.point.x, info.point.y);
    const delta = angle - dragSession.current.startAngle;
    setLocalRotate(dragSession.current.startRotation + delta);
  };

  const handleScaleUpdate = (_event: any, info: any) => {
    const { distance } = getAngleAndDistance(info.point.x, info.point.y);
    const ratio = distance / dragSession.current.startDistance;
    const newScale = Math.max(0.1, dragSession.current.startScale * ratio);
    setLocalScale(newScale);
  };

  const handleInteractionEnd = () => {
    setIsRotating(false);
    setIsScaling(false);
    onUpdate(sticker.id, { rotate: localRotate, scale: localScale });
  };

  useEffect(() => {
    if (!isRotating) setLocalRotate(sticker.rotate);
  }, [sticker.rotate, isRotating]);

  useEffect(() => {
    if (!isScaling) setLocalScale(sticker.scale || 1);
  }, [sticker.scale, isScaling]);

  return (
    <motion.div
      ref={containerRef}
      drag={!isRotating && !isScaling && !isEditing && isCreatorMode}
      dragMomentum={false}
      dragControls={controls}
      onDragEnd={(_e, info) => {
        onUpdate(sticker.id, { x: sticker.x + info.offset.x, y: sticker.y + info.offset.y });
      }}
      initial={{ x: sticker.x, y: sticker.y, rotate: sticker.rotate, scale: 0 }}
      animate={{ 
        x: sticker.x, 
        y: sticker.y, 
        rotate: localRotate,
        scale: localScale 
      }}
      transition={(isRotating || isScaling) ? { type: "tween", duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ zIndex: 50 }}
      className={`absolute z-40 ${isCreatorMode ? 'cursor-move' : 'pointer-events-none'} group sticker-container select-none active:cursor-grabbing`}
      style={{ touchAction: 'none' }}
    >
      <div className="relative">
        {sticker.type === 'image' ? (
          <img 
            src={sticker.src} 
            alt="Sticker" 
            className="w-32 md:w-48 h-auto drop-shadow-2xl pointer-events-none" 
          />
        ) : (
          <div 
            className={`${sticker.isBorderless ? '' : 'p-6 bg-white/5 backdrop-blur-md border-2 border-white/40 shadow-2xl rounded-2xl'} relative group/text`}
            style={{ 
              fontFamily: sticker.fontFamily || 'sans-serif',
              fontSize: '2.5rem',
              color: sticker.color || '#2C3E50',
              minWidth: sticker.isBorderless ? 'auto' : '200px',
              textAlign: 'center'
            }}
          >
            {/* Decorative Tape for Text - Only for Boxed text */}
            {!sticker.isBorderless && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/20 backdrop-blur-sm border border-white/30 rotate-2 z-10" />
            )}
            
            {isEditing ? (
              <textarea
                ref={inputRef}
                value={localText}
                onChange={(e) => setLocalText(e.target.value)}
                onBlur={() => {
                  setIsEditing(false);
                  onUpdate(sticker.id, { text: localText });
                }}
                className="bg-transparent border-none outline-none resize-none w-full text-center focus:ring-0 custom-scrollbar"
                rows={1}
                autoFocus
              />
            ) : (
              <div 
                onDoubleClick={() => isCreatorMode && setIsEditing(true)}
                className={`text-center whitespace-pre-wrap leading-tight ${isCreatorMode ? 'cursor-text' : ''}`}
              >
                {localText || '双击编辑文字'}
              </div>
            )}
            
            {isCreatorMode && !isEditing && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-bold text-primary/40 uppercase tracking-widest opacity-0 group-hover/text:opacity-100 transition-opacity">
                Double Click to Edit
              </div>
            )}
          </div>
        )}
        
        {isCreatorMode && (
          <div className="sticker-ui absolute -inset-8 border-2 border-primary/0 group-hover:border-primary/20 rounded-3xl transition-all duration-300 pointer-events-none">
            <button 
              onClick={() => onRemove(sticker.id)}
              className="absolute -top-6 -right-6 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 border border-red-100"
            >
              <X className="w-6 h-6" />
            </button>

            {sticker.type === 'text' && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-border">
                {['Inter', 'Lora', 'Muyao', 'Zhi Mang Xing'].map(font => (
                  <button
                    key={font}
                    onClick={() => onUpdate(sticker.id, { fontFamily: font })}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${sticker.fontFamily === font ? 'bg-primary text-white scale-105 shadow-md' : 'bg-surface text-text-muted hover:bg-primary/5'}`}
                    style={{ fontFamily: font }}
                  >
                    {font === 'Muyao' ? '沐瑶' : font === 'Zhi Mang Xing' ? '芒星' : font === 'Lora' ? '宋体' : '黑体'}
                  </button>
                ))}
              </div>
            )}

            {/* Rotate Handle */}
            <motion.div
              className={`absolute -bottom-10 left-1/3 -translate-x-1/2 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center cursor-alias pointer-events-auto opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 border border-primary/5 transition-colors ${isRotating ? 'bg-primary text-white' : 'text-primary'}`}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0}
              onDragStart={(e, info) => {
                setIsRotating(true);
                handleInteractionStart(e, info);
              }}
              onDrag={handleRotateUpdate}
              onDragEnd={handleInteractionEnd}
            >
              <RotateCw className="w-5 h-5" />
            </motion.div>

            {/* Scale Handle */}
            <motion.div
              className={`absolute -bottom-10 left-2/3 -translate-x-1/2 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center cursor-nwse-resize pointer-events-auto opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 border border-primary/5 transition-colors ${isScaling ? 'bg-primary text-white' : 'text-primary'}`}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0}
              onDragStart={(e, info) => {
                setIsScaling(true);
                handleInteractionStart(e, info);
              }}
              onDrag={handleScaleUpdate}
              onDragEnd={handleInteractionEnd}
            >
              <Maximize2 className="w-5 h-5" />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Helper component for inline editing
const EditableText = ({ 
  text, 
  onSave, 
  className, 
  isCreatorMode,
  tag: Tag = 'div' 
}: { 
  text: string, 
  onSave: (val: string) => void, 
  className?: string,
  isCreatorMode: boolean,
  tag?: any
}) => {
  const [localVal, setLocalVal] = useState(text);
  
  useEffect(() => {
    setLocalVal(text);
  }, [text]);

  if (!isCreatorMode) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag 
      contentEditable
      suppressContentEditableWarning
      className={`${className} outline-none border-b border-dashed border-primary/40 focus:border-primary focus:bg-primary/5 transition-all cursor-text relative z-[60]`}
      onBlur={(e: any) => {
        const newVal = e.target.innerText;
        setLocalVal(newVal);
        onSave(newVal);
      }}
      onKeyDown={(e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          e.target.blur();
        }
      }}
    >
      {localVal || "点击编辑内容"}
    </Tag>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeCategory, setActiveCategory] = useState('全部');
  const categories = ['全部', '文案作品', '视频作品', '新媒体作品'];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Sticker Management State with persistence
  const [stickers, setStickers] = useState<{ id: string; type?: 'image' | 'text'; src?: string; text?: string; x: number; y: number; rotate: number; scale: number; fontFamily?: string; color?: string; isBorderless?: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem('yanyuxin_stickers');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load stickers:", e);
      return [];
    }
  });
  const [showStickerBox, setShowStickerBox] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Custom Sticker Library State
  const [customStickers, setCustomStickers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yanyuxin_custom_stickers');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load custom stickers:", e);
      return [];
    }
  });

  // Auto-save stickers whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('yanyuxin_stickers', JSON.stringify(stickers));
    } catch (e) {
      console.error("Failed to save stickers:", e);
    }
  }, [stickers]);

  useEffect(() => {
    try {
      localStorage.setItem('yanyuxin_custom_stickers', JSON.stringify(customStickers));
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        alert('本贴纸箱存储已满，无法保存更多自定义贴纸。请删除一些现有贴纸后再试。');
      }
      console.error("Failed to save custom stickers:", e);
    }
  }, [customStickers]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件！');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomStickers(prev => [result, ...prev]);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach(handleFileUpload);
  };

  const removeCustomSticker = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCustomStickers(prev => prev.filter((_, i) => i !== index));
  };

  // Save current view as an image
  const saveAsImage = async () => {
    setIsExporting(true);
    // Give it a tiny bit of time to hide UI
    setTimeout(async () => {
      try {
        const element = document.body;
        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#F1F4F7', 
          scale: 2, // Higher quality
          ignoreElements: (el) => {
            if (!el) return false;
            const isIgnoredClass = el.classList && (
              el.classList.contains('sticker-ui') || 
              el.classList.contains('export-ignore')
            );
            return !!isIgnoredClass || el.tagName === 'NAV';
          }
        });
        
        const link = document.createElement('a');
        link.download = `yanyuxin-portfolio-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error("Export failed:", error);
      } finally {
        setIsExporting(false);
      }
    }, 200);
  };

  // Add a new sticker to the page
  const addSticker = (src: string) => {
    const newSticker = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'image' as const,
      src: src,
      // Place relative to current scroll position
      x: window.innerWidth / 2 - 100 + (Math.random() * 40 - 20),
      y: window.scrollY + window.innerHeight / 2 - 100 + (Math.random() * 40 - 20),
      rotate: Math.random() * 20 - 10,
      scale: 1
    };
    setStickers([...stickers, newSticker]);
  };

  const addTextSticker = (isBorderless = false) => {
    const newSticker = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'text' as const,
      text: isBorderless ? '无边框文字' : '带框文字',
      fontFamily: 'Muyao',
      isBorderless,
      x: window.innerWidth / 2 - 100 + (Math.random() * 40 - 20),
      y: window.scrollY + window.innerHeight / 2 - 100 + (Math.random() * 40 - 20),
      rotate: Math.random() * 20 - 10,
      scale: 1
    };
    setStickers([...stickers, newSticker]);
  };

  const updateSticker = (id: string, updates: Partial<{ x: number; y: number; rotate: number; scale: number; text?: string; fontFamily?: string; color?: string; isBorderless?: boolean }>) => {
    setStickers(stickers.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const removeSticker = (id: string) => {
    setStickers(stickers.filter(s => s.id !== id));
  };

  const clearStickers = () => {
    if (confirm('确定要清空所有贴纸吗？')) {
      setStickers([]);
    }
  };

  const handleCreatorModeToggle = () => {
    if (isCreatorMode) {
      setIsCreatorMode(false);
      return;
    }
    setShowPasswordModal(true);
    setPasswordInput('');
    setPasswordError(false);
  };

  const verifyPassword = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      setIsCreatorMode(true);
      setShowPasswordModal(false);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1000);
    }
  };

  // Editable Content State (Page text)
  const [pageContent, setPageContent] = useState(() => {
    const defaults = {
      heroTitle: `Hi！我是${DATA.name}`,
      heroSubtitle: DATA.title,
      aboutHeading: "热爱探索边界, 透过镜头与文字 重构真实.",
      aboutQuote: "我是一名就读于湖南大学新闻学专业的创作者。在媒体变革的浪潮中，我更倾向于挖掘冰山下的真实。无论是深度调查报道，还是新媒体视角的交互实验，每一个项目都是我对世界的一次提问。",
      expTitle: "Professional Journey",
      expSubtitle: "从媒体实习的敏锐观察到在校研究的深耕细作，在实践中重构真实叙事。",
      projectsTitle: "Archive of Narrative Projects",
      footerTagline: `颜雨欣 © ${new Date().getFullYear()} · 故事还没写完`
    };

    try {
      const saved = localStorage.getItem('yanyuxin_page_content');
      if (saved) {
        return { ...defaults, ...JSON.parse(saved) };
      }
      return defaults;
    } catch (e) {
      return defaults;
    }
  });

  // Auto-save page content
  useEffect(() => {
    localStorage.setItem('yanyuxin_page_content', JSON.stringify(pageContent));
  }, [pageContent]);

  const updatePageContent = (key: string, value: string) => {
    setPageContent(prev => ({ ...prev, [key]: value }));
  };

  const filteredProjects = useMemo(() => 
    activeCategory === '全部' 
      ? (DATA.projects as Project[])
      : (DATA.projects as Project[]).filter(p => p.category === activeCategory)
  , [activeCategory]);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20 selection:text-primary relative">
      {/* SVG Filters for Chalky Texture */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="chalk-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </svg>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-10 py-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-sm shadow-sm pointer-events-auto">
          <a href="#about" className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted hover:text-primary transition-colors">About</a>
          <div className="text-2xl font-serif italic font-bold text-text-main tracking-tighter mix-blend-multiply">
            {DATA.name}
          </div>
          <div className="flex gap-8">
            <a href="#experience" className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted hover:text-primary transition-colors">Exps</a>
            <a href="#portfolio" className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted hover:text-primary transition-colors">Works</a>
          </div>
        </div>
      </nav>

      {/* Draggable Sticker System */}
      {stickers.map(sticker => (
        <DraggableSticker 
          key={sticker.id}
          sticker={sticker}
          onUpdate={updateSticker}
          onRemove={removeSticker}
          isCreatorMode={isCreatorMode}
        />
      ))}

      {/* Creator Mode Indicator & Login */}
      <div className="fixed top-24 right-10 z-[200] export-ignore">
        <button 
          onClick={handleCreatorModeToggle}
          className={`px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-xl transition-all duration-500 hover:scale-105 active:scale-95 ${isCreatorMode ? 'bg-primary text-white' : 'bg-white/80 text-text-muted backdrop-blur-sm'}`}
        >
          {isCreatorMode ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
          {isCreatorMode ? 'Creator Mode ON' : 'Login'}
        </button>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 export-ignore">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowPasswordModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full border-t-8 border-primary transition-transform ${passwordError ? 'animate-shake' : ''}`}
            >
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-surface rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
              
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-main">创作者身份认证</h3>
                  <p className="text-sm text-text-muted mt-2">请输入您的唯一密码以开启创作权限</p>
                </div>
                
                <div className="space-y-4">
                  <input 
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
                    placeholder="输入密码..."
                    autoFocus
                    className={`w-full px-6 py-4 bg-surface rounded-2xl border-2 transition-all outline-none text-center font-bold tracking-widest ${passwordError ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-primary/30'}`}
                  />
                  {passwordError && <p className="text-xs text-red-500 font-bold uppercase tracking-widest">密码校验失败</p>}
                  
                  <button 
                    onClick={verifyPassword}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                  >
                    Confirm / 确认进入
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticker Box Toggle - Only visible in Creator Mode */}
      {isCreatorMode && (
        <div className={`fixed bottom-10 right-10 z-[150] flex flex-col items-end gap-4 export-ignore ${isExporting ? 'hidden' : ''}`}>
          <AnimatePresence>
            {showStickerBox && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="bg-white/90 backdrop-blur-xl border border-border p-6 rounded-3xl shadow-2xl w-64 mb-4"
              >
                <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Creator Box / 创作者箱</h4>
                  <div className="flex gap-2">
                    <button 
                      onClick={clearStickers}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="清空贴纸"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <button 
                    onClick={() => addTextSticker(false)}
                    className="flex-1 py-2 bg-primary/5 hover:bg-primary/10 rounded-xl text-[9px] font-bold uppercase tracking-tighter flex items-center justify-center gap-2 transition-colors border border-primary/10"
                  >
                    <Type className="w-3 h-3" /> Add Boxed Text
                  </button>
                  <button 
                    onClick={() => addTextSticker(true)}
                    className="flex-1 py-2 bg-white hover:bg-surface rounded-xl text-[9px] font-bold uppercase tracking-tighter flex items-center justify-center gap-2 transition-colors border border-border"
                  >
                    <Type className="w-3 h-3 text-primary" /> Add Borderless Text
                  </button>
                </div>

                <div 
                  className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto custom-scrollbar p-2"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                >
                  {/* 你的图片素材列表 */}
                  {[
                    '/images/icons/profile1.png', 
                    '/images/icons/profile2.png', 
                    '/images/icons/profile3.png', 
                    '/images/icons/profile4.png',
                    '/images/icons/湖南大学校团委.png', 
                    '/images/icons/湖南日报.png', 
                    '/images/icons/芒果TV.png', 
                    '/images/icons/长沙天符宫.png'
                  ].map((icon, idx) => (
                    <button 
                      key={idx}
                      onClick={() => addSticker(icon)}
                      className="aspect-square bg-surface rounded-xl p-2 hover:bg-primary/5 transition-colors border border-border group"
                    >
                      <img src={icon} alt="Sticker" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </button>
                  ))}

                  {/* Custom Uploaded Stickers */}
                  {customStickers.map((src, idx) => (
                    <div key={`custom-${idx}`} className="relative aspect-square group">
                      <button 
                        onClick={() => addSticker(src)}
                        className="w-full h-full bg-primary/5 rounded-xl p-2 hover:bg-primary/10 transition-colors border border-primary/20 overflow-hidden"
                      >
                        <img src={src} alt="Custom Sticker" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                      </button>
                      <button 
                        onClick={(e) => removeCustomSticker(e, idx)}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform shadow-lg"
                        title="从库中移除"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Upload Placeholder */}
                  <label className="aspect-square bg-dashed rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-surface transition-colors gap-1 group">
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          Array.from(e.target.files).forEach(handleFileUpload);
                        }
                      }} 
                    />
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <ImagePlus className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-bold text-text-muted/60 uppercase">Drop or Click</span>
                  </label>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <button 
                    onClick={saveAsImage}
                    className="w-full py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg active:scale-95"
                  >
                    <Download className="w-4 h-4" /> Save Design / 保存设计
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setShowStickerBox(!showStickerBox)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 scale-100 hover:scale-110 ${showStickerBox ? 'bg-primary text-white rotate-45' : 'bg-white text-primary hover:bg-primary/5'}`}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        {/* Floating Red String Line - Stylized Drawing */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07] z-0" preserveAspectRatio="none">
          <path 
            d="M 50,0 C 100,200 600,400 400,800 S 800,1200 200,1600" 
            stroke="var(--color-primary)" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray="10 5"
          />
        </svg>

        {/* Decorative Collage - Red String (Original Stickers Removed) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* We now use the dynamic sticker system instead of hardcoded ones */}
        </div>

        {/* Central Content */}
        <div className="text-center z-20 space-y-12 max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            {/* Minimalist Handwritten Name Header */}
            <div className="relative w-full max-w-2xl h-24 md:h-32 flex items-center justify-center">
              <EditableText 
                tag="h1"
                text={pageContent.heroTitle}
                onSave={(val) => updatePageContent('heroTitle', val)}
                isCreatorMode={isCreatorMode}
                className="text-6xl md:text-8xl font-muyao text-text-main tracking-tight opacity-95"
              />
            </div>
            
            <div className="h-[1px] w-24 bg-text-main mx-6 mt-6 mb-4 opacity-10" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Clean Vertical Contact Info */}
            <div className="flex flex-col items-center gap-6 text-lg md:text-xl font-muyao text-text-main/70">
              <a href={`mailto:${DATA.contact.email}`} className="hover:text-primary transition-colors flex items-center">
                <span className="contact-emoji">📮</span> {DATA.contact.email}
              </a>
              <a href={`tel:${DATA.contact.phone}`} className="hover:text-primary transition-colors flex items-center">
                <span className="contact-emoji">☎️</span> {DATA.contact.phone}
              </a>
              <div className="flex items-center group/uni">
                <span className="contact-emoji group-hover/uni:scale-110 transition-transform">🎓</span> 
                <span>{DATA.university}</span>
              </div>
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center group/resume"
              >
                <span className="contact-emoji group-hover/resume:scale-110 transition-transform">📄</span> 
                <span className="underline decoration-primary/30 underline-offset-4 font-muyao uppercase">查看/下载简历 PDF</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Stylized Arrow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted/30 font-bold">Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-text-muted/30 animate-bounce" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-12 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="w-4 h-4" /> Personal Profile
            </div>
            <EditableText 
              tag="h2"
              text={pageContent.aboutHeading}
              onSave={(val) => updatePageContent('aboutHeading', val)}
              isCreatorMode={isCreatorMode}
              className="text-5xl leading-tight"
            />
            <EditableText 
              tag="p"
              text={pageContent.aboutQuote}
              onSave={(val) => updatePageContent('aboutQuote', val)}
              isCreatorMode={isCreatorMode}
              className="text-lg text-text-muted/80 leading-relaxed italic border-l-4 border-primary/20 pl-6"
            />
          </div>
          <div className="bg-[#FFF9C4]/80 backdrop-blur-sm p-12 space-y-10 shadow-lg rotate-1 relative border-l-4 border-[#FBC02D]">
            {/* Sticky Note Pin */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500/20 rounded-full border border-red-500/30" />
            
            <h3 className="text-2xl font-serif italic mb-6">核心技能集</h3>
            <div className="flex flex-wrap gap-3">
              {DATA.skills.map((skill, idx) => (
                <span key={idx} className="px-5 py-2 bg-white/50 rounded-sm text-[11px] font-bold tracking-widest uppercase border border-neutral-200 hover:bg-primary hover:text-white transition-all cursor-default shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
            <div className="pt-6">
              <h3 className="text-2xl font-serif italic mb-6">所获奖项</h3>
              <div className="space-y-4">
                {DATA.awards.map((award, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <Award className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-text-muted/80 leading-snug">{award}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Professional Journey (Internship & Campus) */}
      <section id="experience" className="py-48 bg-surface/30 border-y border-border relative overflow-hidden">
        {/* Continuous S-Curve Trajectory S-Line */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1] hidden md:block">
          <svg width="100%" height="100%" viewBox="0 0 1200 2400" preserveAspectRatio="none" className="overflow-visible">
             <path 
               d="M 600,0 C 600,100 850,200 850,450 S 350,700 350,950 S 850,1200 850,1450 S 350,1700 350,1950 S 600,2200 600,2400" 
               stroke="var(--color-primary)" 
               strokeWidth="2" 
               fill="none" 
               strokeDasharray="12 8" 
               className="animate-[dash_60s_linear_infinite]"
             />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col items-center text-center mb-44 space-y-6">
            <EditableText 
              tag="h2"
              text={pageContent.expTitle}
              onSave={(val) => updatePageContent('expTitle', val)}
              isCreatorMode={isCreatorMode}
              className="text-sm uppercase font-black tracking-[0.3em] text-primary"
            />
            <div className="w-12 h-px bg-primary" />
            <EditableText 
              tag="p"
              text={pageContent.expSubtitle}
              onSave={(val) => updatePageContent('expSubtitle', val)}
              isCreatorMode={isCreatorMode}
              className="max-w-xl text-text-muted font-serif italic text-xl leading-relaxed"
            />
          </div>

          <div className="space-y-64">
            {/* Group 01: Campus Experience */}
            <div className="space-y-32">
              <div className="flex flex-col items-center mb-24">
                <div className="bg-primary text-white px-6 py-2 rounded-full text-xs font-black tracking-widest shadow-xl shadow-primary/20 mb-4">一、在校经历</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-text-muted/30">CAMPUS TRAJECTORY</div>
              </div>
              
              <div className="flex flex-col gap-y-64">
                {DATA.experiences.campus.map((exp, idx) => {
                  const isRightSide = idx % 2 !== 0;
                  return (
                    <div 
                      key={idx} 
                      className={`flex ${isRightSide ? 'md:justify-end md:pr-[2%]' : 'md:justify-start md:pl-[2%]'} relative`}
                    >
                      <div className="w-full md:w-[92%]">
                        <ExperienceFlipCard exp={exp} index={idx} isReversed={isRightSide} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Group 02: Internship Experience */}
            <div className="space-y-32">
              <div className="flex flex-col items-center mb-24">
                <div className="bg-primary text-white px-6 py-2 rounded-full text-xs font-black tracking-widest shadow-xl shadow-primary/20 mb-4">二、实习经历</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-text-muted/30">INTERNSHIP TRAJECTORY</div>
              </div>
              
              <div className="flex flex-col gap-y-64">
                {DATA.experiences.internship.map((exp, idx) => {
                  const isRightSide = idx % 2 !== 0;
                  return (
                    <div 
                      key={idx} 
                      className={`flex ${isRightSide ? 'md:justify-end md:pr-[2%]' : 'md:justify-start md:pl-[2%]'} relative`}
                    >
                      <div className="w-full md:w-[92%]">
                        <ExperienceFlipCard exp={exp} index={idx + 2} isReversed={isRightSide} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-12 max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col items-center">
          <div className="w-16 h-1 w-full max-w-[200px] tape opacity-20 -rotate-3 mb-6" />
          <EditableText 
            tag="h2"
            text={pageContent.projectsTitle}
            onSave={(val) => updatePageContent('projectsTitle', val)}
            isCreatorMode={isCreatorMode}
            className="text-6xl leading-[1.1] mb-12 text-center"
          />
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-2 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 rounded-full border ${
                  activeCategory === cat 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                    : "bg-white/50 text-text-muted/60 border-neutral-200 hover:border-primary/30 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="w-24 h-[2px] bg-primary/20 mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[600px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer relative"
                style={{ rotate: idx % 2 === 0 ? -1 : 1.5 }}
                onClick={() => setSelectedProject(project)}
              >
              {/* Polaroid-style Card */}
              <div className="bg-white p-4 pb-12 shadow-xl border border-neutral-200 transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-2xl">
                <div className="aspect-[16/10] bg-neutral-100 overflow-hidden relative mb-6">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[#FBFBFA]" />
                      <div className="relative z-10 w-full h-full flex items-center justify-center p-12 transition-transform duration-700">
                        <div className="w-64 h-64 bg-primary/5 rounded-full blur-3xl absolute" />
                        {project.category === "文案作品" ? <BookOpen className="w-24 h-24 text-primary/20 stroke-[1]" /> : 
                         project.category === "视频作品" ? <Camera className="w-24 h-24 text-primary/20 stroke-[1]" /> : 
                         <Layers className="w-24 h-24 text-primary/20 stroke-[1]" />}
                      </div>
                    </>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-10 text-white text-center">
                    <div className="space-y-6">
                      <p className="text-xs font-bold uppercase tracking-[0.2em]">{project.category}</p>
                      <h4 className="text-2xl font-serif italic mb-4">详情查阅</h4>
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                         {project.tags.map((tag, tidx) => (
                           <span key={tidx} className="text-[10px] bg-white/10 px-3 py-1 rounded-full border border-white/20">#{tag}</span>
                         ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className="px-6 py-2 bg-white text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-all flex items-center gap-2"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> 详情
                        </button>
                        {project.link !== "#" && (
                          <a 
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-2 bg-transparent border border-white text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> 访问
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Handwritten-style Title */}
                <h3 className="text-3xl italic font-serif mb-2 group-hover:text-primary transition-colors pr-8">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted/70 leading-relaxed line-clamp-2 italic font-serif">
                  {project.desc}
                </p>
                
                {/* Decorative Staple or Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-neutral-400/30 rounded-sm z-20" />
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center sm:p-4 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-surface/95 backdrop-blur-xl pointer-events-auto"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-5xl h-full sm:h-[90vh] bg-white shadow-2xl overflow-hidden flex flex-col pointer-events-auto border border-border sm:rounded-2xl"
            >
              {/* Sticky Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md border border-border hover:bg-neutral-100 rounded-full transition-all shadow-lg text-text-main"
                aria-label="关闭"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="p-8 md:p-12 pb-6 border-b border-border bg-white">
                <div className="max-w-3xl mx-auto w-full">
                  <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-6">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight text-text-main leading-tight">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-neutral-50/30">
                <div className="max-w-3xl mx-auto w-full">
                  {selectedProject.image && (
                    <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden bg-neutral-100 border-b border-border">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80';
                          (e.target as HTMLImageElement).className = 'w-full h-full object-cover opacity-50 grayscale';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="p-8 md:p-12 lg:p-16 bg-white shadow-sm">
                    {/* Primary Content Block */}
                    {selectedProject.content ? (
                      <div className="markdown-body prose prose-neutral max-w-none prose-headings:font-serif prose-p:text-lg prose-p:leading-relaxed mb-12">
                        <ReactMarkdown>{selectedProject.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-2xl text-text-muted leading-relaxed font-serif italic border-l-4 border-primary/20 pl-8 py-2 mb-12">
                        {selectedProject.desc}
                      </p>
                    )}

                    {/* Metadata & Resources Section */}
                    <div className="space-y-12 pt-12 border-t border-border/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase font-black tracking-widest text-text-muted/40">项目标签</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs bg-neutral-50 border border-border px-4 py-2 rounded-full text-text-muted hover:border-primary/30 transition-colors">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                        {selectedProject.link !== "#" && (
                          <div className="space-y-4">
                            <h4 className="text-sm uppercase font-black tracking-widest text-text-muted/40">作品链接</h4>
                            <a 
                              href={selectedProject.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-serif italic group transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                            >
                              立即查看全文 <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                          </div>
                        )}
                      </div>

                      {selectedProject.articles ? (
                        <div className="mt-12 space-y-6 animate-in fade-in duration-700">
                           <div className="flex items-center gap-4">
                              <div className="h-px flex-1 bg-border" />
                              <h4 className="text-sm uppercase font-black tracking-[0.2em] text-text-muted/60">收录推文合集</h4>
                              <div className="h-px flex-1 bg-border" />
                           </div>
                           <div className="grid grid-cols-1 gap-2">
                             {selectedProject.articles.map((article, idx) => (
                               <a 
                                 key={idx}
                                 href={article.link}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="group flex items-center justify-between p-5 bg-neutral-50 hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl transition-all"
                               >
                                 <div className="flex items-center gap-4">
                                   <span className="w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center text-[10px] font-bold text-text-muted group-hover:text-primary transition-colors">
                                     {String(idx + 1).padStart(2, '0')}
                                   </span>
                                   <span className="text-base font-medium text-text-main group-hover:text-primary transition-colors">
                                     {article.title}
                                   </span>
                                 </div>
                                 <div className="flex items-center gap-2 text-text-muted/30 group-hover:text-primary transition-all">
                                   <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
                                 </div>
                               </a>
                             ))}
                           </div>
                        </div>
                      ) : selectedProject.link === "#" && !selectedProject.content && (
                        <div className="mt-12 p-10 bg-neutral-50 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4">
                           <Layers className="text-text-muted/20 w-10 h-10" />
                           <p className="text-text-muted/60 text-sm italic font-serif">该作品暂无外部链接或收录详情</p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>

      {/* Footer */}
      <footer className="h-40 flex items-center justify-center border-t border-border mt-20 relative px-12">
        <div className="decorative-line left-[50%] h-20 -top-10" />
        <div className="flex flex-col items-center gap-6">
           <div className="flex gap-12 text-[11px] font-bold uppercase tracking-[0.4em] text-text-muted/60">
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Bilibili</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
           </div>
           <EditableText 
              tag="p"
              text={pageContent.footerTagline}
              onSave={(val) => updatePageContent('footerTagline', val)}
              isCreatorMode={isCreatorMode}
              className="text-[11px] font-medium text-text-muted/40 italic"
           />
        </div>
      </footer>
    </div>
  );
}
