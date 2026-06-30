import { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { soundscapeTracks } from '../data/mockData';

export default function SoundscapePlayer() {
  const { state, setAudio, toggleAudioExpanded } = useApp();
  const { audio } = state;
  const audioRef = useRef(null);

  const activeTrack = soundscapeTracks.find(t => t.id === audio.activeTrackId) || soundscapeTracks[0];

  // Keep audio element in sync with state
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = audio.volume;
    if (audio.isPlaying) {
      el.play().catch(() => setAudio({ isPlaying: false }));
    } else {
      el.pause();
    }
  }, [audio.isPlaying, audio.volume, audio.activeTrackId]);

  const handleTrackSelect = (trackId) => {
    setAudio({ activeTrackId: trackId, isPlaying: true });
  };

  return (
    <>
      {/* Hidden HTML5 audio element */}
      <audio ref={audioRef} loop />

      {/* ── Floating Widget ─────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Expanded Panel */}
        {audio.isExpanded && (
          <div className="glass border border-white/10 rounded-2xl p-5 w-72 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-sm text-white">Ambient Soundscapes</h4>
                <p className="text-xs text-white/40 mt-0.5">Experience the valley</p>
              </div>
              {/* Play / Pause */}
              <button
                onClick={() => setAudio({ isPlaying: !audio.isPlaying })}
                className="w-9 h-9 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 hover:bg-cyan-400/20 transition-all"
              >
                {audio.isPlaying ? '⏸' : '▶'}
              </button>
            </div>

            {/* Equalizer visualizer */}
            <div className={`flex items-end gap-0.5 h-5 mb-4 ${audio.isPlaying ? 'eq-playing' : ''}`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="eq-bar w-1 bg-cyan-400 rounded-sm" style={{ height: '4px', animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white/40 text-xs">🔉</span>
              <input
                type="range" min="0" max="1" step="0.05"
                value={audio.volume}
                onChange={e => setAudio({ volume: parseFloat(e.target.value) })}
                className="flex-1 accent-cyan-400 h-1 rounded-full cursor-pointer"
              />
              <span className="text-white/40 text-xs">🔊</span>
            </div>

            {/* Track list */}
            <div className="space-y-2">
              {soundscapeTracks.map(track => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                    audio.activeTrackId === track.id
                      ? 'bg-cyan-400/8 border-cyan-400/30 text-cyan-300'
                      : 'border-white/5 text-white/60 hover:border-white/15 hover:text-white'
                  }`}
                >
                  <span className="text-base">{track.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{track.title}</p>
                    <p className="text-[10px] text-white/40 truncate">{track.desc}</p>
                  </div>
                  {audio.activeTrackId === track.id && audio.isPlaying && (
                    <span className="text-cyan-400 text-xs">▶</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toggle Bubble */}
        <button
          onClick={toggleAudioExpanded}
          className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-xl shadow-xl hover:border-cyan-400/30 transition-all relative"
        >
          🎵
          {/* Mute indicator dot */}
          {!audio.isPlaying && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          )}
          {audio.isPlaying && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
}
