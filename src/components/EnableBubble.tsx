import React, { useState, useEffect } from 'react';
import { 
  Accessibility,
  ZoomIn, 
  ZoomOut, 
  Contrast, 
  MousePointer, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Sun,
  Moon,
  Type,
  Link,
  Pause,
  Play,
  X,
  ChevronDown,
  ChevronUp,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/useLanguage';

const AccessibilityWidget = () => {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Load settings from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('accessibility-settings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    }
    return {
      fontSize: 16,
      contrast: 'normal',
      darkMode: false,
      highlightLinks: false,
      bigCursor: false,
      pauseAnimations: false,
      screenReader: false,
      textToSpeech: false,
      textToSpeechVoice: 'default',
      textToSpeechRate: 1.0,
      textToSpeechPitch: 1.0,
      textToSpeechVolume: 1.0,
      textToSpeechLanguage: language === 'he' ? 'he-IL' : 'en-US', // Default to English or Hebrew based on language context
      textToSpeechEnabled: false,
    };
  });

  // Apply settings to document
  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    
    // Font size - apply only to specific elements or when class is added
    root.style.setProperty('--accessibility-font-size', `${settings.fontSize}px`);
    
    // Apply font size class only when needed
    if (settings.fontSize !== 16) {
      body.classList.add('accessibility-font-resize');
    } else {
      body.classList.remove('accessibility-font-resize');
    }
    
    // Dark mode
    if (settings.darkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    
    // High contrast
    if (settings.contrast === 'high') {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    
    // Highlight links
    if (settings.highlightLinks) {
      body.classList.add('highlight-links');
    } else {
      body.classList.remove('highlight-links');
    }
    
    // Big cursor
    if (settings.bigCursor) {
      body.classList.add('big-cursor');
    } else {
      body.classList.remove('big-cursor');
    }
    
    // Pause animations
    if (settings.pauseAnimations) {
      body.classList.add('pause-animations');
    } else {
      body.classList.remove('pause-animations');
    }

    // Add custom CSS
    const styleId = 'accessibility-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      existingStyle = document.createElement('style');
      existingStyle.id = styleId;
      document.head.appendChild(existingStyle);
    }
    
    existingStyle.textContent = `
      .dark-mode {
        position: relative;
        flex: 1;
        filter: invert(1) hue-rotate(180deg);
        background: #000 !important;
      }
      .dark-mode img, .dark-mode video, .dark-mode iframe, .dark-mode svg {
        filter: hue-rotate(180deg);
      }
      .high-contrast {
        filter: contrast(200%) brightness(100%);
      }
      .highlight-links a {
        background: yellow !important;
        color: black !important;
        text-decoration: underline !important;
        border: 2px solid red !important;
      }
      .big-cursor * {
        cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMkwyIDI4TDEwIDIwTDE4IDI4TDI4IDJIMloiIGZpbGw9ImJsYWNrIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc>'), auto !important;
      }
      .pause-animations * {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
      }
    `;
    
  }, [settings]);

  const handleSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Save to localStorage
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 16,
      contrast: 'normal',
      darkMode: false,
      highlightLinks: false,
      bigCursor: false,
      pauseAnimations: false,
      screenReader: false,
    };
    setSettings(defaultSettings);
    
    // Save reset settings to localStorage
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(defaultSettings));
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
  };

  // הגדלת/הקטנת פונט - טווח 12 עד 42
  const increaseFontSize = () => {
    if (settings.fontSize < 42) {
      handleSetting('fontSize', settings.fontSize + 2);
    }
  };
  const decreaseFontSize = () => {
    if (settings.fontSize > 12) {
      handleSetting('fontSize', settings.fontSize - 2);
    }
  };

  // CSS דינמי לפונט
  const isFontResizeActive = typeof document !== 'undefined' && document.body.classList.contains('accessibility-font-resize');
  useEffect(() => {
    const styleId = 'accessibility-fontsize-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    if (isFontResizeActive) {
      styleTag.textContent = `
        body.accessibility-font-resize, body.accessibility-font-resize *:not(svg):not(style):not(script) {
          font-size: ${settings.fontSize}px !important;
        }
      `;
    } else {
      styleTag.textContent = '';
    }
  }, [settings.fontSize, isFontResizeActive]);

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => {
    // RTL: כדור בצד ימין כשהסוויץ' כבוי, בצד שמאל כשהוא דולק
    const isRtl = language === 'he';
    return (
      <button
        onClick={onChange}
        disabled={disabled}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
          isRtl ? 'ml-2' : ''
        }`}
        aria-pressed={enabled}
        style={{ direction: isRtl ? 'rtl' : 'ltr' }}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300`
            + (isRtl
                ? (enabled ? ' left-0.5' : ' right-0.5')
                : (enabled ? ' right-0.5' : ' left-0.5')
              )
          }
        />
      </button>
    );
  };

  return (
    <>
      {/* Accessibility Bubble */}
      <div className="fixed bottom-6 left-6 z-50 accessibility-widget-portal" style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 9999,
        filter: settings.darkMode ? 'invert(1) hue-rotate(180deg)' : 'none'
      }}>
        <div className="relative">
          {/* Expanded menu */}
          {isExpanded && (
            <div className="absolute bottom-16 left-0 mb-2 animate-fade-in-up">
              <div 
                className="bg-white border-2 border-gray-300 rounded-lg shadow-xl w-80 card-elegant"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {/* Header */}
                <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Accessibility size={20} />
                    <span className="font-semibold">{t('accessibility.title')}</span>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 hover:bg-blue-700 rounded"
                    aria-label={t('accessibility.close')}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {/* Font Size Controls */}
                  <div className="border-b pb-3">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Type size={16} />
                      {t('accessibility.font_size')}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={decreaseFontSize}
                        disabled={settings.fontSize <= 12}
                        size="sm"
                        variant="outline"
                        className="p-2"
                        aria-label={t('accessibility.font_decrease')}
                      >
                        <ZoomOut size={16} />
                      </Button>
                      <span className="text-sm font-mono">{settings.fontSize}px</span>
                      <Button
                        onClick={increaseFontSize}
                        disabled={settings.fontSize >= 42}
                        size="sm"
                        variant="outline"
                        className="p-2"
                        aria-label={t('accessibility.font_increase')}
                      >
                        <ZoomIn size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Visual Settings */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Eye size={16} />
                      {t('accessibility.visual_settings')}
                    </h3>
                    
                    {/* Dark Mode */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {settings.darkMode ? <Moon size={16} /> : <Sun size={16} />}
                        <span className="text-sm">{t('accessibility.dark_mode')}</span>
                      </div>
                      <ToggleSwitch
                        enabled={settings.darkMode}
                        onChange={() => handleSetting('darkMode', !settings.darkMode)}
                      />
                    </div>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Contrast size={16} />
                        <span className="text-sm">{t('accessibility.high_contrast')}</span>
                      </div>
                      <ToggleSwitch
                        enabled={settings.contrast === 'high'}
                        onChange={() => handleSetting('contrast', settings.contrast === 'high' ? 'normal' : 'high')}
                      />
                    </div>

                    {/* Highlight Links */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link size={16} />
                        <span className="text-sm">{t('accessibility.highlight_links')}</span>
                      </div>
                      <ToggleSwitch
                        enabled={settings.highlightLinks}
                        onChange={() => handleSetting('highlightLinks', !settings.highlightLinks)}
                      />
                    </div>
                  </div>

                  {/* Navigation & Interaction */}
                  <div className="space-y-3 border-t pt-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <MousePointer size={16} />
                      {t('accessibility.navigation')}
                    </h3>

                    {/* Big Cursor */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t('accessibility.big_cursor')}</span>
                      <ToggleSwitch
                        enabled={settings.bigCursor}
                        onChange={() => handleSetting('bigCursor', !settings.bigCursor)}
                      />
                    </div>

                    {/* Pause Animations */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {settings.pauseAnimations ? <Pause size={16} /> : <Play size={16} />}
                        <span className="text-sm">{t('accessibility.pause_animations')}</span>
                      </div>
                      <ToggleSwitch
                        enabled={settings.pauseAnimations}
                        onChange={() => handleSetting('pauseAnimations', !settings.pauseAnimations)}
                      />
                    </div>

                    {/* Screen Reader */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {settings.screenReader ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        <span className="text-sm">{t('accessibility.screen_reader')}</span>
                      </div>
                      <ToggleSwitch
                        enabled={settings.screenReader}
                        onChange={() => handleSetting('screenReader', !settings.screenReader)}
                      />
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="border-t pt-3">
                    <Button
                      onClick={resetSettings}
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                      aria-label={t('accessibility.reset_desc')}
                    >
                      <RotateCcw size={16} />
                      {t('accessibility.reset')}
                    </Button>
                  </div>

                  {/* Footer */}
                  <div className="text-xs text-gray-500 text-center border-t pt-2">
                    {t('accessibility.powered_by')}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Main bubble button */}
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center animate-pulse"
            aria-label={isExpanded ? t('accessibility.close') : t('accessibility.open')}
          >
            {isExpanded ? (
              <X size={24} />
            ) : (
              <Accessibility size={24} />
            )}
          </Button>
        </div>
      </div>
      
      {/* Overlay to close expanded menu */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default AccessibilityWidget;