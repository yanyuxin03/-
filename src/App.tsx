// Final adjustments for GitHub Pages deployment (Repo: https://yanyuxin03.github.io/-/)
// Deployment Fix: v2.0.1
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useDragControls, useMotionValue } from 'motion/react';
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
  FileText,
  MousePointerClick
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

function ClickNoteCard({ note, isCreatorMode, onUpdate, onRemove }: { 
  note: any; 
  isCreatorMode: boolean; 
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragOccurred = useRef(false);
  const textMeasureRef = useRef<HTMLSpanElement>(null);
  const [frontWidth, setFrontWidth] = useState(280);

  // Measure text width for dynamic strip sizing
  useEffect(() => {
    if (textMeasureRef.current && !isFlipped) {
      const width = textMeasureRef.current.offsetWidth;
      // Add padding and min/max constraints
      const newWidth = Math.min(Math.max(width + 80, 180), 600);
      setFrontWidth(newWidth);
    }
  }, [note.front, isFlipped]);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (dragOccurred.current) {
      dragOccurred.current = false;
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div 
      layout
      drag={isCreatorMode}
      dragMomentum={false}
      onDragStart={() => {
        dragOccurred.current = false;
      }}
      onDrag={() => {
        dragOccurred.current = true;
      }}
      onDragEnd={(_e, info) => {
        onUpdate(note.id, { x: note.x + info.offset.x, y: note.y + info.offset.y });
        setTimeout(() => { dragOccurred.current = false; }, 100);
      }}
      initial={{ x: note.x, y: note.y }}
      animate={{ 
        x: note.x, 
        y: note.y,
        width: isFlipped ? 320 : frontWidth,
        height: isFlipped ? 240 : 56
      }}
      className="perspective-1000 relative group z-10"
      style={{ 
        transform: `rotate(${note.rotate}deg)`,
        margin: '20px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden measure element */}
      <span 
        ref={textMeasureRef} 
        className="absolute opacity-0 pointer-events-none font-muyao italic text-sm whitespace-nowrap"
        aria-hidden="true"
      >
        {note.front}
      </span>

      <motion.div
        layout
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80, damping: 15 }}
        className="w-full h-full preserve-3d cursor-pointer"
        onClick={() => {
          handleFlip();
        }}
      >
        {/* Front - Torn & Crumpled Paper Style */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#fdfaf2] shadow-[3px_3px_10px_rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden border-x border-black/5"
          style={{
            clipPath: 'polygon(1% 12%, 3% 2%, 8% 5%, 15% 1%, 22% 6%, 28% 3%, 35% 8%, 42% 4%, 50% 9%, 58% 5%, 65% 11%, 72% 7%, 80% 12%, 88% 8%, 95% 13%, 99% 5%, 100% 25%, 98% 45%, 100% 65%, 97% 85%, 99% 95%, 94% 98%, 88% 95%, 82% 100%, 75% 96%, 68% 99%, 60% 95%, 52% 98%, 45% 94%, 38% 97%, 30% 93%, 22% 96%, 15% 92%, 8% 95%, 2% 91%, 0% 80%, 1% 60%, 0% 40%, 2% 20%)'
          }}
        >
          {/* Layered Textures for Crumpled Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.5] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/crinkled-paper-thin.png')]"></div>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 via-transparent to-black/5"></div>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 w-full px-8 drop-shadow-sm flex items-center justify-center">
            {isCreatorMode ? (
              <input
                value={note.front}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                onChange={(e) => onUpdate(note.id, { front: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-center font-muyao italic text-sm focus:ring-0 text-text-main/80"
              />
            ) : (
              <p className="font-muyao italic text-sm leading-none text-text-main/80 select-none whitespace-nowrap overflow-hidden">
                {note.front}
              </p>
            )}
          </div>

          <div className="absolute top-2 left-10 w-4 h-px bg-black/10 -rotate-12"></div>
          <div className="absolute bottom-3 right-12 w-6 h-px bg-black/5 rotate-6"></div>

          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/5 opacity-20" style={{ clipPath: 'polygon(0 0, 100% 0, 0 50%, 100% 100%, 0 100%)' }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-black/5 opacity-20" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 50%, 0 100%, 100% 100%)' }}></div>
        </div>

        {/* Back - Paper Note Style */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#fafafa] shadow-xl p-6 overflow-hidden"
          style={{ 
            transform: 'rotateY(180deg)',
            clipPath: 'polygon(0% 2%, 100% 0%, 98% 98%, 2% 100%)'
          }}
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.2] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            {isCreatorMode ? (
              <textarea
                value={note.back}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onUpdate(note.id, { back: e.target.value })}
                className="w-full flex-grow bg-transparent border-none outline-none text-xs font-serif italic leading-relaxed text-text-main/70 resize-none focus:ring-0 custom-scrollbar"
                rows={8}
              />
            ) : (
              <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                <p className="text-xs font-serif italic leading-relaxed text-text-main/70 whitespace-pre-wrap select-none">
                  {note.back}
                </p>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 right-4 text-[7px] uppercase tracking-widest text-text-muted/20 font-bold rotate-6">
            Click Moment 
          </div>
        </div>
      </motion.div>

      {isCreatorMode && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(note.id);
            }}
            className="absolute -top-3 -right-3 w-8 h-8 bg-white shadow-xl rounded-full flex items-center justify-center text-red-500 border border-red-50 transition-all hover:scale-110 z-[60]"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="absolute -bottom-3 -right-3 w-8 h-8 bg-white shadow-xl rounded-full flex items-center justify-center text-primary border border-primary/10 transition-all hover:scale-110 z-[60]"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </>
      )}
    </motion.div>
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
  
  // Use MotionValues for high-performance responsive UI
  const motionRotate = useMotionValue(sticker.rotate);
  const motionScale = useMotionValue(sticker.scale || 1);
  const [localText, setLocalText] = useState(sticker.text || '');
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep internal state in sync with external updates, but only when not interacting
  useEffect(() => {
    if (!isRotating && !isScaling) {
      motionRotate.set(sticker.rotate);
      motionScale.set(sticker.scale || 1);
    }
  }, [sticker.rotate, sticker.scale, isRotating, isScaling, motionRotate, motionScale]);

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
    if (!dragSession.current.centerX) return { angle: 0, distance: 0 };
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

  const fonts = ['Inter', 'Lora', 'Muyao', 'Zhi Mang Xing', 'Xihuan'];

  const handleInteractionStart = (event: any, info: any) => {
    if (!contentRef.current || isEditing) return;
    
    // 获取内容区域在屏幕上的物理中心位置
    const rect = contentRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    dragSession.current = {
      centerX: cx,
      centerY: cy,
      startAngle: Math.atan2(info.point.y - cy, info.point.x - cx) * (180 / Math.PI),
      startDistance: Math.sqrt(Math.pow(info.point.x - cx, 2) + Math.pow(info.point.y - cy, 2)),
      startRotation: motionRotate.get(),
      startScale: motionScale.get()
    };
  };

  const handleRotateUpdate = (_event: any, info: any) => {
    if (!dragSession.current.centerX) return;
    const dx = info.point.x - dragSession.current.centerX;
    const dy = info.point.y - dragSession.current.centerY;
    const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    let delta = currentAngle - dragSession.current.startAngle;
    
    // 规范化角度防止 180 度跳变
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const sensitivity = 1.0; // 1:1 旋转最自然
    const nextRotate = dragSession.current.startRotation + (delta * sensitivity);
    motionRotate.set(nextRotate);
  };

  const handleScaleUpdate = (_event: any, info: any) => {
    if (!dragSession.current.centerX || dragSession.current.startDistance === 0) return;
    const dx = info.point.x - dragSession.current.centerX;
    const dy = info.point.y - dragSession.current.centerY;
    const currentDistance = Math.sqrt(dx * dx + dy * dy);
    
    const ratio = currentDistance / dragSession.current.startDistance;
    const sensitivity = 1.2; // 略微增加缩放灵敏度
    const nextScale = Math.max(0.1, Math.min(10, dragSession.current.startScale * Math.pow(ratio, sensitivity)));
    motionScale.set(nextScale);
  };

  const handleInteractionEnd = () => {
    setIsRotating(false);
    setIsScaling(false);
    onUpdate(sticker.id, { 
      rotate: motionRotate.get(), 
      scale: motionScale.get() 
    });
  };

  return (
    <motion.div
      ref={containerRef}
      drag={isCreatorMode && !isEditing && !isRotating && !isScaling}
      dragControls={controls}
      dragListener={false} 
      dragMomentum={false}
      onDragEnd={(_e, info) => {
        onUpdate(sticker.id, { x: sticker.x + info.offset.x, y: sticker.y + info.offset.y });
      }}
      initial={{ x: sticker.x, y: sticker.y }}
      animate={{ x: sticker.x, y: sticker.y }}
      style={{
        rotate: motionRotate,
        scale: motionScale,
        touchAction: 'none',
        transformOrigin: "center center"
      }}
      transition={(isRotating || isScaling) ? { type: "tween", duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ zIndex: 50 }}
      className={`absolute z-40 ${isCreatorMode ? '' : 'pointer-events-none'} group sticker-container select-none`}
    >
      <div 
        ref={contentRef} 
        className="relative"
        onPointerDown={(e) => {
          if (isCreatorMode && !isRotating && !isScaling && !isEditing) {
            const target = e.target as HTMLElement;
            // 确保不拦截操作按钮
            if (!target.closest('button') && target.tagName !== 'TEXTAREA') {
              controls.start(e);
            }
          }
        }}
      >
        {sticker.type === 'image' ? (
          <img 
            src={sticker.src} 
            alt="Sticker" 
            className="w-32 md:w-48 h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform pointer-events-none" 
          />
        ) : (
          <div 
            className={`${sticker.isBorderless ? '' : 'p-6 bg-white/5 backdrop-blur-md border-2 border-white/40 shadow-2xl rounded-2xl'} relative group/text hover:scale-[1.02] transition-transform pointer-events-none`}
            style={{ 
              fontFamily: sticker.fontFamily || 'sans-serif',
              fontSize: '2.5rem',
              color: sticker.color || '#2C3E50',
              textAlign: 'center'
            }}
          >
            {isEditing ? (
              <textarea
                ref={inputRef}
                value={localText}
                onPointerDown={(e) => e.stopPropagation()}
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
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  if (isCreatorMode) setIsEditing(true);
                }}
                className={`text-center whitespace-pre-wrap leading-tight pointer-events-auto ${isCreatorMode ? 'cursor-text' : ''}`}
              >
                {localText || '双击编辑文字'}
              </div>
            )}
          </div>
        )}
        
        {isCreatorMode && (
          <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/40 rounded-xl pointer-events-none transition-all duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRemove(sticker.id);
              }}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors pointer-events-auto border border-red-100 z-[60] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {sticker.type === 'text' && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-border z-[80]">
                {['Inter', 'Lora', 'Muyao', 'Zhi Mang Xing', 'Xihuan'].map(font => (
                  <button
                    key={font}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(sticker.id, { fontFamily: font });
                    }}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${sticker.fontFamily === font ? 'bg-primary text-white scale-105 shadow-md' : 'bg-white text-gray-600 hover:bg-primary/5'}`}
                    style={{ fontFamily: font }}
                  >
                    {font === 'Muyao' ? '沐瑶' : font === 'Zhi Mang Xing' ? '芒星' : font === 'Lora' ? '宋体' : font === 'Xihuan' ? '喜欢' : '黑体'}
                  </button>
                ))}
              </div>
            )}

            {/* Rotate Handle */}
            <motion.div
              className={`absolute -bottom-12 left-1/4 -translate-x-1/2 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center cursor-alias pointer-events-auto opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 border-2 border-primary/20 transition-all z-[70] ${isRotating ? 'bg-primary text-white scale-110' : 'text-primary'}`}
              onPointerDown={(e) => e.stopPropagation()}
              onPanStart={(e, info) => {
                setIsRotating(true);
                handleInteractionStart(e, info);
              }}
              onPan={handleRotateUpdate}
              onPanEnd={handleInteractionEnd}
            >
              <RotateCw className="w-5 h-5" />
            </motion.div>

            {/* Scale Handle */}
            <motion.div
              className={`absolute -bottom-12 left-3/4 -translate-x-1/2 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center cursor-nwse-resize pointer-events-auto opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 border-2 border-primary/20 transition-all z-[70] ${isScaling ? 'bg-primary text-white scale-110' : 'text-primary'}`}
              onPointerDown={(e) => e.stopPropagation()}
              onPanStart={(e, info) => {
                setIsScaling(true);
                handleInteractionStart(e, info);
              }}
              onPan={handleScaleUpdate}
              onPanEnd={handleInteractionEnd}
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

  // Image compression utility to prevent storage quota issues
  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Smaller limit for more images in local storage
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Using WebP format to preserve transparency while maintaining good compression
        resolve(canvas.toDataURL('image/webp', 0.6));
      };
      img.onerror = () => resolve(base64Str); // Fallback to original if error
    });
  };

  const [activeCategory, setActiveCategory] = useState('全部');
  const categories = ['全部', '文案作品', '视频作品', '新媒体作品'];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
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

  const MAX_CUSTOM_STICKERS = 150; // Increased logical limit

  // World Images State with persistence
  const [worldImages, setWorldImages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yanyuxin_world_images');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load world images:", e);
      return [];
    }
  });

  // Click Moment Notes State with persistence
  const [clickNotes, setClickNotes] = useState<{ id: string; front: string; back: string; rotate: number; x: number; y: number }[]>(() => {
    try {
      const saved = localStorage.getItem('yanyuxin_click_notes');
      if (saved) return JSON.parse(saved);
      
      // Default notes if empty
      return [
        { id: '1', front: '这是一句灵感迸发的短句', back: '这是一篇关于生活琐碎的感悟。在这里，文字可以是诗，也可以是信，或是写给未来的自己。', rotate: -2, x: 5, y: -5 },
        { id: '2', front: '在某个瞬间，我听到了世界的心跳', back: '那天午后，阳光穿过树叶的缝隙，我意识到每一个 Click Moment 都是时间的馈赠。', rotate: 3, x: -8, y: 10 },
        { id: '3', front: '文字重构真实', back: '新闻不仅仅是报道，更是一种对社会切面的深度抚摸。', rotate: -1, x: 12, y: -2 }
      ];
    } catch (e) {
      console.error("Failed to load click notes:", e);
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
      localStorage.setItem('yanyuxin_click_notes', JSON.stringify(clickNotes));
    } catch (e) {
      console.error("Failed to save click notes:", e);
    }
  }, [clickNotes]);

  useEffect(() => {
    try {
      localStorage.setItem('yanyuxin_custom_stickers', JSON.stringify(customStickers));
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        alert('本地贴纸箱存储已满，无法保存更多自定义贴纸。');
      }
      console.error("Failed to save custom stickers:", e);
    }
  }, [customStickers]);

  useEffect(() => {
    try {
      localStorage.setItem('yanyuxin_world_images', JSON.stringify(worldImages));
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        alert('本地相册存储已满，无法保存更多影像。');
      }
      console.error("Failed to save world images:", e);
    }
  }, [worldImages]);

  const handleWorldImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        try {
          const compressed = await compressImage(result);
          setWorldImages(prev => [...prev, compressed]);
        } catch (err) {
          console.error("Compression failed:", err);
          setWorldImages(prev => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeWorldImage = (idx: number) => {
    setWorldImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件！');
      return;
    }
    if (customStickers.length >= MAX_CUSTOM_STICKERS) {
      alert('贴纸库已达到建议上限（150张），请整理后再上传。');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        try {
          const compressed = await compressImage(result);
          setCustomStickers(prev => [compressed, ...prev]);
        } catch (err) {
          setCustomStickers(prev => [result, ...prev]);
        }
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

  const addClickNote = () => {
    const newNote = {
      id: Math.random().toString(36).substr(2, 9),
      front: '灵感瞬间...',
      back: '在这里写下完整的内容...',
      rotate: Math.random() * 8 - 4,
      x: Math.random() * 20 - 10, // Randomized offset X
      y: Math.random() * 20 - 10  // Randomized offset Y
    };
    setClickNotes([...clickNotes, newNote]);
  };

  const updateClickNote = (id: string, updates: any) => {
    setClickNotes(clickNotes.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const removeClickNote = (id: string) => {
    setClickNotes(clickNotes.filter(n => n.id !== id));
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
      aboutHeading: "核心能力",
      aboutQuote: "内容创作：熟悉公众号、B 站、小红书等新媒体平台内容逻辑，可独立完成选题策划、文案撰写、图文与短视频内容产出，具备从创意构思到宣发落地的全链路执行能力，擅长结合热点打造高传播内容，精准把握用户偏好。\n\n市场调研与活动执行：具备竞品分析、行业动态追踪与用户需求挖掘能力，可协同多方资源推进内容与方案落地，具备较强的策划力、逻辑力与协调能力。\n\n数据与用户运营：具备数据收集、用户反馈分析与复盘优化意识，能通过数据表现调整运营方向，熟悉基础数据挖掘与资料整合方法，注重以用户思维驱动运营策略优化，支撑业务落地与效果提升。\n\n实践背景：湖南大学新闻学本科背景，拥有媒体平台方运营实习、主流媒体记者实习、校园官方宣传与深度调研项目经验，具备扎实文案能力、用户洞察力与执行力，精准匹配市场营销、内容运营、内容企划类岗位核心需求。",
      expTitle: "Professional Journey",
      expSubtitle: "从媒体实习的敏锐观察到在校研究的深耕细作，在实践中重构真实叙事。",
      projectsTitle: "Archive of Narrative Projects",
      skillsHeading: "核心技能集",
      skillsList: DATA.skills.join(", "),
      awardsHeading: "所获奖项",
      awardsList: DATA.awards.join("\n"),
      footerTagline: `颜雨欣 © ${new Date().getFullYear()} · 故事还没写完`
    };

    try {
      const saved = localStorage.getItem('yanyuxin_page_content_v2');
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
    localStorage.setItem('yanyuxin_page_content_v2', JSON.stringify(pageContent));
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
            <a href="#life-slices" className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-muted hover:text-primary transition-colors">Life</a>
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
      <div className="fixed top-24 right-10 z-[50] export-ignore">
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
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 export-ignore">
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
        <div className={`fixed bottom-10 right-10 z-[300] flex flex-col items-end gap-4 export-ignore ${isExporting ? 'hidden' : ''}`}>
          <AnimatePresence>
            {showStickerBox && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="bg-white/95 backdrop-blur-xl border border-border p-6 rounded-3xl shadow-2xl w-80 mb-4 max-h-[75vh] flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3 shrink-0">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Creator Box / 创作者箱</h4>
                  <div className="flex gap-2">
                    <button 
                      onClick={clearStickers}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="清空贴纸"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setShowStickerBox(false)}
                      className="p-1.5 hover:bg-surface rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto custom-scrollbar pr-1 flex-1">
                  <div className="flex flex-col gap-2 mb-6">
                    <button 
                      onClick={() => addTextSticker(false)}
                      className="w-full py-2.5 bg-primary/5 hover:bg-primary/10 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-primary/10"
                    >
                      <Type className="w-3 h-3" /> Add Boxed Text
                    </button>
                    <button 
                      onClick={() => addTextSticker(true)}
                      className="w-full py-2.5 bg-white hover:bg-surface rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-border"
                    >
                      <Type className="w-3 h-3 text-primary" /> Add Borderless Text
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-[8px] font-black uppercase text-text-muted/40 mb-2 px-1">Assets / 素材</p>
                    <div className="grid grid-cols-4 gap-2.5 p-1">
                    {/* 你的图片素材列表 - 使用相对路径 */}
                    {[
                      'images/icons/profile1.png', 
                      'images/icons/profile2.png', 
                      'images/icons/profile3.png', 
                      'images/icons/profile4.png',
                      'images/icons/湖南大学校团委.png', 
                      'images/icons/湖南日报.png', 
                      'images/icons/芒果TV.png', 
                      'images/icons/长沙天符宫.png',
                      'images/鸭嘴钳.png',
                      'images/荆楚古邑.jpg',
                      'images/入画入梦.jpeg',
                      'images/校园系列.png',
                      'images/世界自闭症日.png',
                      'images/陈国恩学长.png',
                      'images/摘一颗春天的诗.png'
                    ].map((icon, idx) => (
                      <button 
                        key={`init-${idx}`}
                        onClick={() => addSticker(icon)}
                        className="aspect-square bg-surface rounded-xl p-2 hover:bg-primary/10 transition-all border border-border group active:scale-90"
                      >
                        <img src={icon} alt="Sticker" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                      </button>
                    ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[8px] font-black uppercase text-text-muted/40 mb-2 px-1">Custom / 自定义 ({customStickers.length})</p>
                    <div 
                      className="grid grid-cols-4 gap-2.5 p-1"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={onDrop}
                    >
                    {customStickers.map((src, idx) => (
                      <div key={`custom-${idx}`} className="relative aspect-square group">
                        <button 
                          onClick={() => addSticker(src)}
                          className="w-full h-full bg-primary/5 rounded-xl p-2 hover:bg-primary/10 transition-all border border-primary/20 overflow-hidden active:scale-90"
                        >
                          <img src={src} alt="Custom Sticker" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                        </button>
                        <button 
                          onClick={(e) => removeCustomSticker(e, idx)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                          title="从库中移除"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    <label className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group shrink-0">
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
                    </label>
                  </div>
                </div>
              </div>
                
              <div className="mt-6 pt-4 border-t border-border shrink-0">
                  <button 
                    onClick={saveAsImage}
                    className="w-full py-3.5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                  >
                    <Download className="w-4 h-4" /> Save Design / 保存设计
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setShowStickerBox(!showStickerBox)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 scale-100 hover:scale-110 z-[301] ${showStickerBox ? 'bg-primary text-white rotate-45' : 'bg-white text-primary hover:bg-primary/5'}`}
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
                href="resume.pdf" 
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isCreatorMode ? (
                <EditableText 
                  tag="div"
                  text={pageContent.aboutQuote}
                  onSave={(val) => updatePageContent('aboutQuote', val)}
                  isCreatorMode={true}
                  className="col-span-2 text-lg text-text-muted/80 leading-relaxed whitespace-pre-wrap text-justify border-l-4 border-primary/20 pl-6"
                />
              ) : (
                pageContent.aboutQuote.split('\n\n').map((block: string, idx: number) => {
                  const [title, ...rest] = block.split('：');
                  const content = rest.join('：');
                  return (
                    <div 
                      key={idx} 
                      className="p-6 rounded-xl border border-primary/10 bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                    >
                      <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                        {title}
                      </h4>
                      <p className="text-[13px] leading-relaxed text-text-muted/90 font-medium">
                        {content}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="bg-[#879EB3]/80 backdrop-blur-sm p-12 space-y-10 shadow-lg rotate-1 relative border-l-4 border-[#546e7a]">
            {/* Sticky Note Pin */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full border border-white/30" />
            
            <div className="space-y-6">
              <EditableText 
                tag="h3"
                text={pageContent.skillsHeading}
                onSave={(val) => updatePageContent('skillsHeading', val)}
                isCreatorMode={isCreatorMode}
                className="text-2xl font-serif italic text-white"
              />
              <div className="flex flex-wrap gap-3">
                {isCreatorMode ? (
                  <EditableText 
                    tag="div"
                    text={pageContent.skillsList}
                    onSave={(val) => updatePageContent('skillsList', val)}
                    isCreatorMode={true}
                    className="w-full text-white/90 text-sm italic"
                  />
                ) : (
                  pageContent.skillsList.split(',').map((skill: string, idx: number) => (
                    <span key={idx} className="px-5 py-2 bg-white/10 rounded-sm text-[11px] font-bold tracking-widest uppercase border border-white/20 text-white hover:bg-white hover:text-primary transition-all cursor-default shadow-sm">
                      {skill.trim()}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 space-y-6">
              <EditableText 
                tag="h3"
                text={pageContent.awardsHeading}
                onSave={(val) => updatePageContent('awardsHeading', val)}
                isCreatorMode={isCreatorMode}
                className="text-2xl font-serif italic text-white"
              />
              <div className="space-y-4">
                {isCreatorMode ? (
                  <EditableText 
                    tag="div"
                    text={pageContent.awardsList}
                    onSave={(val) => updatePageContent('awardsList', val)}
                    isCreatorMode={true}
                    className="w-full text-white/90 text-sm italic whitespace-pre-wrap"
                  />
                ) : (
                  pageContent.awardsList.split('\n').map((award: string, idx: number) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <Award className="w-5 h-5 text-white/60 shrink-0 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-medium text-white/80 leading-snug">{award}</p>
                    </div>
                  ))
                )}
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
            {/* Hint for sticker interaction */}
            {!isCreatorMode && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[10px] font-bold text-primary/40 tracking-[0.2em] uppercase flex items-center gap-2"
              >
                <MousePointerClick className="w-3 h-3" />
                点击贴纸可阅览详情
              </motion.p>
            )}
          </div>

          <div className="space-y-64">
            {/* Group 01: Campus Experience */}
            <div className="space-y-32">
              <div className="flex flex-col items-center mb-20 relative">
                <div className="relative flex items-center justify-center">
                  <span className="text-[140px] font-black text-primary/5 leading-none select-none">01</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black tracking-[0.4em] text-primary translate-y-4">在校经历</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.6em] text-text-muted/30 font-bold">Campus Trajectory</div>
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
              <div className="flex flex-col items-center mb-20 relative">
                <div className="relative flex items-center justify-center">
                  <span className="text-[140px] font-black text-primary/5 leading-none select-none">02</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black tracking-[0.4em] text-primary translate-y-4">实习经历</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.6em] text-text-muted/30 font-bold">Internship Trajectory</div>
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

        {/* Section Transition / 生活切片过渡 - Moved here */}
        <div id="life-slices" className="mt-40 space-y-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <p className="text-text-muted/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-serif italic border-x border-primary/10 px-8 py-2 text-center">
              “每个人都是一片繁茂的森林，有不同的人格切面，如果你还想了解生活中的我，就请继续往下看吧，下面是我的生活切片。”
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="w-12 h-px bg-primary/20" />
              <div className="w-2 h-2 rounded-full bg-primary/20" />
              <div className="w-12 h-px bg-primary/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative flex flex-col items-center"
          >
            <div className="absolute -top-12 text-[14vw] font-black text-primary/5 uppercase tracking-tighter leading-none select-none whitespace-nowrap">
              Vibrant Life
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-primary uppercase tracking-tight leading-none relative z-10 text-center">
              Slices of <br /> My Life
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-2 bg-primary mt-8"
            />
          </motion.div>
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

      {/* DIY Sticker Playground / 贴纸 DIY 区域 */}
      <section id="diy-playground" className="min-h-screen py-32 px-10 relative bg-surface flex flex-col items-center justify-center border-t border-border/50">
        <div className="pointer-events-none opacity-[0.4] absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        
        {isCreatorMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center z-0 pointer-events-none select-none"
          >
            <h3 className="text-8xl font-black text-black/5 uppercase tracking-tighter">DIY Playground</h3>
            <p className="text-black/10 font-bold uppercase tracking-widest mt-4 italic">Free creation space / 这里空空如也，留给你创作</p>
          </motion.div>
        )}
        
        {/* Helper dots to suggest context */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-[0.05]">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-black/20"></div>
          ))}
        </div>
      </section>

      {/* My World in My Eyes / 我眼中的世界 */}
      <section 
        className="py-32 relative overflow-hidden bg-surface/30 group/gallery-section"
      >
        <div className="max-w-7xl mx-auto mb-16 text-center px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary mb-4 select-none">
              <span className="inline-block hover:translate-y-[-5px] transition-transform duration-500">World in My Eyes</span>
            </h3>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-[11px] font-medium tracking-[0.3em] text-text-muted/60 font-serif italic max-w-lg mx-auto leading-loose animate-pulse">
              “当快门按下的那一瞬间，一种归属个人的、微小的美就产生了。”
            </p>
            
            {isCreatorMode && (
              <div className="mt-12 flex flex-col items-center gap-2">
                <label className="cursor-pointer bg-white border-2 border-dashed border-border px-8 py-4 rounded-2xl flex items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all shadow-sm group">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleWorldImageUpload} />
                  <Plus className="w-5 h-5 text-primary group-hover:rotate-90 transition-transform duration-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Import New Moments / 导入影像图库</span>
                  {/* Subtle indicator */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-text-muted/30 uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Gallery Admin Mode
                  </div>
                </label>
              </div>
            )}
          </motion.div>
        </div>

        {/* Filmstrip Container */}
        <div className="relative group/filmstrip w-full">
          {/* Paper Texture Overlay for the whole section */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-10"></div>
          
          {/* Filmstrip Header Holes */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a1a1a] z-20 flex justify-around items-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-5 h-4 bg-white/10 rounded-md shrink-0 shadow-inner"></div>
            ))}
          </div>

          {/* 胶片画廊核心容器 */}
          <div 
            className="py-12 bg-[#1a1a1a] relative overflow-hidden group/gallery w-full"
            onMouseEnter={() => setIsGalleryHovered(true)}
            onMouseLeave={() => setIsGalleryHovered(false)}
          >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            
            {worldImages.length > 0 ? (
              <div 
                className="flex w-max animate-infinite-scroll relative z-10"
                style={{ 
                  // 速度调整：系数 6.5 符合“慢节奏”要求，约每秒移动 60 像素
                  animationDuration: `${Math.max(20, worldImages.length * 6.5)}s`,
                  animationPlayState: isGalleryHovered ? 'paused' : 'running'
                }}
              >
                {/* 
                  SEAMLESS LOOP SOLUTION:
                  1. 使用 w-max 容器，内部水平排布两个完全相同的 [set]
                  2. 动画 translateX 从 0 到 -50% (恰好一个 set 的距离)
                  3. 每个 set 结尾使用 pr-8 与其内部的 gap-8 完美契合
                */}
                {[0, 1].map((setIdx) => (
                  <div key={setIdx} className="flex gap-8 pr-8 shrink-0">
                    {worldImages.map((img, idx) => (
                      <motion.div
                        key={`gallery-item-${setIdx}-${idx}`}
                        className="relative w-[380px] aspect-[16/10] shrink-0 overflow-hidden cursor-pointer group/img rounded-lg border-x-[12px] border-[#111] transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                        whileHover={{ scale: 1.05, zIndex: 30 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <img 
                          src={img} 
                          alt="Moment" 
                          className="w-full h-full object-cover grayscale-[0.2] group-hover/img:grayscale-0 transition-all duration-700" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover/img:bg-transparent transition-colors shadow-inner"></div>
                        
                        {isCreatorMode && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeWorldImage(idx);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow-xl z-40 border-2 border-white hover:bg-red-600 scale-90 hover:scale-100 transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full py-24 flex items-center justify-center border border-dashed border-white/10 rounded-3xl mx-10">
                <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">Empty Gallery / 暂无影像资料</p>
              </div>
            )}
          </div>

          {/* Filmstrip Footer Holes */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#1a1a1a] z-20 flex justify-around items-center overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-5 h-4 bg-white/10 rounded-md shrink-0 shadow-inner"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Click Moment Section / 随笔文字纸条板块 (Merged) */}
      <section id="click-moment" className="py-24 pb-40 px-6 relative overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto">
          {/* Transition Header Content */}
          <div className="text-center px-10 mb-20 group/click-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary mb-4 select-none">
                <span className="inline-block hover:translate-y-[-5px] transition-transform duration-500">Click Moment</span>
              </h3>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
              <p className="text-[11px] font-medium tracking-[0.2em] text-text-muted/60 font-serif italic max-w-lg mx-auto leading-loose">
                “我把许多灵感迸发的微小瞬间称为 click moment，如果下面的某句话让你心中 ‘click’ 了一下，那就点开看看吧。”
              </p>
            </motion.div>
          </div>

          {isCreatorMode && (
             <div className="flex justify-center mb-24">
               <button 
                 onClick={addClickNote}
                 className="group relative px-8 py-3 bg-white border-2 border-dashed border-primary/20 rounded-2xl flex items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all"
               >
                 <Plus className="w-4 h-4 text-primary group-hover:rotate-90 transition-transform duration-500" />
                 <span className="text-xs font-black uppercase tracking-widest text-text-muted">Add New Note / 新增随笔纸条</span>
                 {/* Hidden indicator */}
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-text-muted/30 uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   Only visible in Creator Mode
                 </div>
               </button>
             </div>
          )}

          {/* Scattered Notes Container */}
          <div className="flex flex-wrap justify-center items-start gap-12 md:gap-20 min-h-[400px]">
            {clickNotes.map((note) => (
              <ClickNoteCard 
                key={note.id}
                note={note}
                isCreatorMode={isCreatorMode}
                onUpdate={updateClickNote}
                onRemove={removeClickNote}
              />
            ))}
          </div>

          {clickNotes.length === 0 && !isCreatorMode && (
            <div className="text-center py-20 text-text-muted/20 italic font-serif">
              这里暂时还没有 click 瞬间...
            </div>
          )}
        </div>

        {/* Decorative subtle background element */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
      </section>

      {/* Footer */}
      <footer className="h-40 flex items-center justify-center border-t border-border mt-20 relative px-12">
        <div className="decorative-line left-[50%] h-20 -top-10" />
        <div className="flex flex-col items-center gap-6">
           <div className="flex gap-12 text-[11px] font-bold uppercase tracking-[0.4em] text-text-muted/60">
              <a href="https://xhslink.com/m/956kSPnvFwB" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Xiaohongshu / 小红书</a>
              
              
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
