import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  Compass,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';
import { CEFRLevel, GrammarCategory, UserProgress } from '../types';

export interface NetworkNode {
  id: string;
  label: string;
  type: 'grammar' | 'vocabulary' | 'idiom';
  level: CEFRLevel;
  category: GrammarCategory;
  x: number; // Coordinate out of 850
  y: number; // Coordinate out of 450
  description: string;
  connections: string[];
}

const NETWORK_NODES: NetworkNode[] = [
  // A1 Nodes
  {
    id: 'to_be',
    label: 'To Be (am, is, are)',
    type: 'grammar',
    level: 'A1',
    category: 'Levels',
    x: 90,
    y: 110,
    description: 'Learn the core verb used to introduce yourself, state your age, and describe your surroundings.',
    connections: ['greetings', 'present_simple']
  },
  {
    id: 'greetings',
    label: 'Greetings & Small Talk',
    type: 'vocabulary',
    level: 'A1',
    category: 'Levels', // vocabulary isn't grammar but we can map category appropriately
    x: 90,
    y: 290,
    description: 'Essential everyday phrases for starting casual conversations, polite check-ins, and standard introductions.',
    connections: ['to_be', 'present_simple']
  },
  {
    id: 'present_simple',
    label: 'Present Simple',
    type: 'grammar',
    level: 'A1',
    category: 'Levels',
    x: 210,
    y: 190,
    description: 'Master talking about your daily habits, permanent situations, facts, and generalized routines.',
    connections: ['to_be', 'greetings', 'daily_routines']
  },

  // A2 Nodes
  {
    id: 'daily_routines',
    label: 'Housework & Daily Routines',
    type: 'vocabulary',
    level: 'A2',
    category: 'Levels',
    x: 230,
    y: 330,
    description: 'Enrich your daily conversation with descriptive vocabulary for household chores and standard activities.',
    connections: ['present_simple', 'past_simple']
  },
  {
    id: 'past_simple',
    label: 'Simple Past',
    type: 'grammar',
    level: 'A2',
    category: 'Levels',
    x: 350,
    y: 250,
    description: 'Express actions, events, and narratives that occurred and concluded at a definite point in the past.',
    connections: ['daily_routines', 'past_continuous', 'narrative_tenses']
  },
  {
    id: 'asking_directions',
    label: 'Asking for Directions',
    type: 'vocabulary',
    level: 'A2',
    category: 'Levels',
    x: 180,
    y: 50,
    description: 'Navigate unfamiliar neighborhoods with confidence by mastering critical spatial questions and answers.',
    connections: ['modal_requests']
  },
  {
    id: 'modal_requests',
    label: 'Modal Verbs for Requests',
    type: 'grammar',
    level: 'A2',
    category: 'Levels',
    x: 290,
    y: 90,
    description: 'Polish your interpersonal etiquette using polite forms like "could," "would," and "may" for requests.',
    connections: ['asking_directions', 'dining_out']
  },
  {
    id: 'dining_out',
    label: 'Restaurant & Dining Out',
    type: 'vocabulary',
    level: 'A2',
    category: 'Levels',
    x: 390,
    y: 120,
    description: 'Interact with restaurant staff, order dishes, express dietary needs, and handle culinary transactions.',
    connections: ['modal_requests', 'present_perfect']
  },

  // B1 Nodes
  {
    id: 'past_continuous',
    label: 'Past Continuous',
    type: 'grammar',
    level: 'B1',
    category: 'Levels',
    x: 330,
    y: 370,
    description: 'Describe ongoing background scenarios and interrupted actions in past timelines.',
    connections: ['past_simple', 'present_perfect']
  },
  {
    id: 'present_perfect',
    label: 'Present Perfect',
    type: 'grammar',
    level: 'B1',
    category: 'Levels',
    x: 480,
    y: 220,
    description: 'Connect historical events or personal achievements with their direct, current relevance in the present.',
    connections: ['dining_out', 'past_continuous', 'academic_trends', 'second_conditional']
  },

  // B2 Nodes
  {
    id: 'second_conditional',
    label: 'Second Conditional',
    type: 'grammar',
    level: 'B2',
    category: 'Levels',
    x: 450,
    y: 340,
    description: 'Formulate hypotheses and imagine outcomes for unreal, hypothetical, or highly improbable scenarios.',
    connections: ['present_perfect', 'wish_if_only', 'meetings_negotiations']
  },
  {
    id: 'wish_if_only',
    label: 'Wish & If Only',
    type: 'grammar',
    level: 'B2',
    category: 'Levels',
    x: 320,
    y: 190,
    description: 'Acknowledge present and past regrets, and voice strong aspirations for situations to be completely different.',
    connections: ['second_conditional', 'third_conditional']
  },
  {
    id: 'meetings_negotiations',
    label: 'Meetings & Negotiations',
    type: 'vocabulary',
    level: 'B2',
    category: 'Levels',
    x: 510,
    y: 60,
    description: 'Gain executive-level authority in workplace settings with essential collocations for commercial diplomacy.',
    connections: ['second_conditional', 'formal_emails']
  },
  {
    id: 'formal_emails',
    label: 'Formal Emails & Requests',
    type: 'vocabulary',
    level: 'B2',
    category: 'Levels',
    x: 610,
    y: 100,
    description: 'Compose elegant, professional, and clear textual requests for cross-functional business communication.',
    connections: ['meetings_negotiations', 'subjunctive']
  },
  {
    id: 'third_conditional',
    label: 'Third Conditional',
    type: 'grammar',
    level: 'B2',
    category: 'Levels',
    x: 430,
    y: 410,
    description: 'Analyze historical regret by theorizing alternate outcomes for events that have already concluded.',
    connections: ['wish_if_only', 'mixed_conditionals']
  },

  // C1 Nodes
  {
    id: 'mixed_conditionals',
    label: 'Mixed Conditionals',
    type: 'grammar',
    level: 'C1',
    category: 'Levels',
    x: 560,
    y: 380,
    description: 'Seamlessly blend distinct time frames to illustrate how past actions impact current or future parameters.',
    connections: ['third_conditional', 'inversion']
  },
  {
    id: 'academic_trends',
    label: 'Describing Data & Trends',
    type: 'vocabulary',
    level: 'C1',
    category: 'Levels',
    x: 590,
    y: 280,
    description: 'Leverage precise adjectives, verbs, and nouns to detail fluctuations and patterns in scientific charts.',
    connections: ['present_perfect', 'inversion']
  },
  {
    id: 'inversion',
    label: 'Inversion for Emphasis',
    type: 'grammar',
    level: 'C1',
    category: 'Levels',
    x: 690,
    y: 330,
    description: 'Restructure clauses by moving negative or limiting adverbs to the front for majestic, formal emphasis.',
    connections: ['mixed_conditionals', 'academic_trends', 'subjunctive']
  },
  {
    id: 'subjunctive',
    label: 'Subjunctive Mood',
    type: 'grammar',
    level: 'C1',
    category: 'Levels',
    x: 730,
    y: 190,
    description: 'Express strong recommendations, urgent prerequisites, or hypothetical conditions with correct formal registers.',
    connections: ['inversion', 'formal_emails', 'precise_vocabulary']
  },

  // C2 Nodes
  {
    id: 'narrative_tenses',
    label: 'Advanced Narrative Techniques',
    type: 'grammar',
    level: 'C2',
    category: 'Levels',
    x: 680,
    y: 40,
    description: 'Weave masterful tales and academic stories with precise shifts in perspective, pacing, and aspect.',
    connections: ['past_simple', 'precise_vocabulary']
  },
  {
    id: 'precise_vocabulary',
    label: 'Precise Vocabulary',
    type: 'vocabulary',
    level: 'C2',
    category: 'Levels',
    x: 760,
    y: 100,
    description: 'Deploy rare, hyper-specific, and contextually rich vocabulary to convey exact emotional or physical nuance.',
    connections: ['subjunctive', 'narrative_tenses']
  }
];

interface TopicNetworkProps {
  progress: UserProgress;
  onJumpToLesson: (type: 'grammar' | 'vocabulary' | 'idiom', topic: string, category: GrammarCategory, level: CEFRLevel) => void;
}

export function TopicNetwork({ progress, onJumpToLesson }: TopicNetworkProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('present_simple');
  const [levelFilter, setLevelFilter] = useState<CEFRLevel | 'ALL'>('ALL');
  const [isExpanded, setIsExpanded] = useState(false);

  // Find currently selected node details
  const selectedNode = useMemo(() => {
    return NETWORK_NODES.find(n => n.id === selectedNodeId) || NETWORK_NODES[2]; // fallback to present_simple
  }, [selectedNodeId]);

  // Generate unique visual connection edges between nodes
  const edges = useMemo(() => {
    const list: { from: string; to: string; id: string }[] = [];
    NETWORK_NODES.forEach(node => {
      node.connections.forEach(targetId => {
        const target = NETWORK_NODES.find(n => n.id === targetId);
        if (target) {
          const [first, second] = [node.id, targetId].sort();
          const edgeId = `${first}-${second}`;
          if (!list.some(e => e.id === edgeId)) {
            list.push({ from: first, to: second, id: edgeId });
          }
        }
      });
    });
    return list;
  }, []);

  // Check if a node's lesson is completed by the user
  const isNodeCompleted = (node: NetworkNode) => {
    let cacheKey = '';
    if (node.type === 'grammar') {
      cacheKey = `lesson_${node.category}_${node.level || ''}_${node.label}`;
    } else if (node.type === 'vocabulary') {
      cacheKey = `vocab_${node.label}`;
    } else {
      cacheKey = `idiom_${node.label}`;
    }
    return progress.completedLessons.includes(cacheKey);
  };

  // Check if edge should be highlighted
  const isEdgeHighlighted = (fromId: string, toId: string) => {
    if (hoveredNode) {
      return (fromId === hoveredNode || toId === hoveredNode);
    }
    if (selectedNodeId) {
      return (fromId === selectedNodeId || toId === selectedNodeId);
    }
    return false;
  };

  // Node level colors mapping
  const getLevelBadgeStyles = (level: CEFRLevel) => {
    switch (level) {
      case 'A1':
      case 'A2':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'B1':
      case 'B2':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'C1':
      case 'C2':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getLevelNodeStyles = (level: CEFRLevel, isActive: boolean, isCompleted: boolean) => {
    if (isActive) {
      return 'ring-4 ring-indigo-600 border-indigo-600 shadow-lg scale-110';
    }
    if (isCompleted) {
      return 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm';
    }
    switch (level) {
      case 'A1':
      case 'A2':
        return 'border-emerald-200 bg-white hover:border-emerald-400 text-emerald-950 shadow-xs';
      case 'B1':
      case 'B2':
        return 'border-indigo-200 bg-white hover:border-indigo-400 text-indigo-950 shadow-xs';
      case 'C1':
      case 'C2':
        return 'border-purple-200 bg-white hover:border-purple-400 text-purple-950 shadow-xs';
      default:
        return 'border-gray-200 bg-white hover:border-gray-400 text-gray-900 shadow-xs';
    }
  };

  const getNodeIcon = (type: 'grammar' | 'vocabulary' | 'idiom') => {
    switch (type) {
      case 'grammar':
        return <BookOpen size={13} className="shrink-0" />;
      case 'vocabulary':
        return <Compass size={13} className="shrink-0" />;
      case 'idiom':
        return <Zap size={13} className="shrink-0" />;
    }
  };

  const renderGrid = (isFullscreen: boolean) => {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Interactive Mind Map Panel */}
        <div className="xl:col-span-8 space-y-4">
          <div className="block md:hidden text-center text-[10px] font-black text-indigo-600/70 uppercase tracking-widest bg-indigo-50/50 py-1.5 rounded-xl border border-indigo-100 animate-pulse">
            Swipe left/right to pan the full constellation map ↔
          </div>
          
          <div className="relative overflow-x-auto rounded-3xl border border-gray-100 bg-gray-50/30 select-none pb-4 md:pb-0 scrollbar-thin">
            <div 
              className="relative min-w-[850px] mx-auto overflow-hidden transition-all duration-300"
              style={{ height: isFullscreen ? '520px' : '450px' }}
            >
              {/* Background Tech Dotted Grid */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.35]">
                <defs>
                  <pattern id={`gridPattern-${isFullscreen ? 'fs' : 'inline'}`} width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#C7D2FE" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#gridPattern-${isFullscreen ? 'fs' : 'inline'})`} />
              </svg>

              {/* Connection Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <g>
                  {edges.map(edge => {
                    const fromNode = NETWORK_NODES.find(n => n.id === edge.from);
                    const toNode = NETWORK_NODES.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const highlight = isEdgeHighlighted(edge.from, edge.to);
                    const isMuted = (hoveredNode && hoveredNode !== edge.from && hoveredNode !== edge.to) ||
                                    (!hoveredNode && selectedNodeId && selectedNodeId !== edge.from && selectedNodeId !== edge.to);

                    // Check if filter excludes either node
                    const isFilteredOut = (levelFilter !== 'ALL' && fromNode.level !== levelFilter && toNode.level !== levelFilter);

                    return (
                      <line
                        key={edge.id}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={highlight ? '#6366F1' : '#E2E8F0'}
                        strokeWidth={highlight ? 2.5 : 1.2}
                        strokeDasharray={highlight ? '4 2' : undefined}
                        className="transition-all duration-300"
                        style={{
                          opacity: isFilteredOut ? 0.05 : isMuted ? 0.15 : highlight ? 0.9 : 0.45
                        }}
                      />
                    );
                  })}
                </g>
              </svg>

              {/* Render Nodes (HTML layered on top) */}
              {NETWORK_NODES.map(node => {
                const isActive = selectedNodeId === node.id;
                const isCompleted = isNodeCompleted(node);
                const isMuted = hoveredNode 
                  ? (hoveredNode !== node.id && !node.connections.includes(hoveredNode) && !NETWORK_NODES.find(n => n.id === hoveredNode)?.connections.includes(node.id))
                  : selectedNodeId
                    ? (selectedNodeId !== node.id && !node.connections.includes(selectedNodeId) && !NETWORK_NODES.find(n => n.id === selectedNodeId)?.connections.includes(node.id))
                    : false;

                const isFilteredOut = levelFilter !== 'ALL' && node.level !== levelFilter;

                return (
                  <motion.div
                    key={node.id}
                    className="absolute cursor-pointer select-none"
                    style={{
                      left: `${(node.x / 850) * 100}%`,
                      top: `${(node.y / 450) * 100}%`,
                      x: '-50%',
                      y: '-50%',
                      zIndex: isActive ? 40 : 10,
                      opacity: isFilteredOut ? 0.1 : isMuted ? 0.35 : 1,
                      pointerEvents: isFilteredOut ? 'none' : 'auto'
                    }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNodeId(node.id)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-[11px] font-bold transition-all duration-200 ${getLevelNodeStyles(node.level, isActive, isCompleted)}`}
                    >
                      {/* Left icon status */}
                      {isCompleted ? (
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0 fill-emerald-50" />
                      ) : (
                        <span className="opacity-70 shrink-0">{getNodeIcon(node.type)}</span>
                      )}

                      <span>{node.label}</span>

                      {/* Level badge */}
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 scale-95 origin-right">
                        {node.level}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Topic Details Sidebar */}
        <div className="xl:col-span-4 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-indigo-50/20 border border-indigo-100/50 rounded-[2.5rem] p-6 space-y-6 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -translate-y-12 translate-x-12 pointer-events-none opacity-60" />

              <div className="space-y-3.5 relative z-10">
                {/* Meta row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${getLevelBadgeStyles(selectedNode.level)}`}>
                    Level {selectedNode.level}
                  </span>
                  <span className="px-2.5 py-1 bg-white text-gray-500 border border-gray-100 rounded-full text-[9px] font-black uppercase tracking-wider">
                    {selectedNode.type}
                  </span>
                  {isNodeCompleted(selectedNode) && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={10} className="fill-emerald-50" /> Completed
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-xl font-black text-indigo-950 leading-tight">
                  {selectedNode.label}
                </h4>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Jump to Related Pathways */}
              <div className="space-y-3 pt-4 border-t border-indigo-100/30 relative z-10">
                <span className="text-[9px] font-black uppercase text-indigo-600/70 tracking-widest block">
                  Connected Lessons
                </span>
                <div className="flex flex-col gap-2">
                  {selectedNode.connections.map(connId => {
                    const connNode = NETWORK_NODES.find(n => n.id === connId);
                    if (!connNode) return null;
                    const completed = isNodeCompleted(connNode);

                    return (
                      <button
                        key={connId}
                        onClick={() => setSelectedNodeId(connId)}
                        className="w-full p-2.5 bg-white hover:bg-indigo-50/30 border border-gray-100 rounded-xl flex items-center justify-between text-left transition-all hover:border-indigo-100"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {completed ? (
                            <CheckCircle2 size={12} className="text-emerald-500 fill-emerald-50 shrink-0" />
                          ) : (
                            <span className="opacity-50 shrink-0">{getNodeIcon(connNode.type)}</span>
                          )}
                          <span className="text-xs font-bold text-gray-700 truncate">{connNode.label}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 shrink-0">
                          <span className="text-[8px] font-black bg-gray-100 px-1 py-0.5 rounded">
                            {connNode.level}
                          </span>
                          <ArrowRight size={10} className="text-indigo-500" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive jump button */}
              <button
                onClick={() => {
                  if (isExpanded) {
                    setIsExpanded(false);
                  }
                  onJumpToLesson(selectedNode.type, selectedNode.label, selectedNode.category, selectedNode.level);
                }}
                className="w-full py-4 bg-indigo-950 text-white hover:bg-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 group relative z-10"
              >
                Start Lesson
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full space-y-8 bg-white border border-gray-100 rounded-[3rem] p-6 md:p-10 shadow-xs relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150">
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2">
            <BrainCircuit size={22} className="text-indigo-600 shrink-0" />
            <h3 className="text-xl md:text-2xl font-black text-indigo-950 tracking-tight">Interactive Topic Network</h3>
          </div>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl">
            See the pathways connecting Grammar and Vocabulary. Hover to trace relationships, select a topic to read its syllabus, and leap directly to the lesson.
          </p>
        </div>

        {/* Filter Badges + Expand Control */}
        <div className="flex flex-wrap gap-1.5 items-center">
          {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                levelFilter === lvl
                  ? 'bg-indigo-950 text-white border-indigo-950'
                  : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100'
              }`}
            >
              {lvl}
            </button>
          ))}

          {/* Expand to Fullscreen trigger */}
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 ml-1 rounded-full border border-gray-200 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/40 transition-all bg-white shadow-xs flex items-center gap-1"
            title="Expand Map to Fullscreen"
          >
            <Maximize2 size={15} />
            <span className="text-[10px] font-black uppercase tracking-wider px-1 hidden sm:inline">Expand Map</span>
          </button>
        </div>
      </div>

      {renderGrid(false)}

      {/* Fullscreen Overlay Constellation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150 mb-8">
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <BrainCircuit size={22} className="text-indigo-600 shrink-0" />
                  <h3 className="text-xl md:text-2xl font-black text-indigo-950 tracking-tight">Interactive Topic Network</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl">
                  See the pathways connecting Grammar and Vocabulary. Hover to trace relationships, select a topic to read its syllabus, and leap directly to the lesson.
                </p>
              </div>

              {/* Filter Badges + Exit trigger */}
              <div className="flex flex-wrap gap-1.5 items-center">
                {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                      levelFilter === lvl
                        ? 'bg-indigo-950 text-white border-indigo-950'
                        : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}

                {/* Close Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 ml-1 rounded-full border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all bg-white shadow-xs flex items-center gap-1"
                  title="Close Fullscreen Map"
                >
                  <Minimize2 size={15} />
                  <span className="text-[10px] font-black uppercase tracking-wider px-1">Exit Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Render the full interactive grid with extra height */}
            <div className="flex-1 w-full max-w-7xl mx-auto">
              {renderGrid(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
