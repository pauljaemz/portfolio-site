import React, { useEffect, useRef, useState } from 'react';

export default function GravitySandbox({ isGravityActive, setIsGravityActive }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const assetParticlesRef = useRef([]);
  const targetElementsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const lastScrollY = useRef(window.scrollY);
  const animationFrameId = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const startTimeRef = useRef(0);
  const isFrozenRef = useRef(false);

  // Track cursor position globally
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Window resize observer
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll events: updates scroll position and redraws static frame immediately when frozen
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      lastScrollY.current = currentScrollY;

      // If simulation is frozen, redraw the static frame on scroll to prevent sticking
      if (isFrozenRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawStaticFrame(ctx, canvas);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger physics setup on activation or deactivation
  useEffect(() => {
    if (isGravityActive) {
      startTimeRef.current = Date.now();
      isFrozenRef.current = false;
      setIsActive(true);
      initParticles();
    } else if (isActive) {
      // Unfreeze when deactivating so return snap snaps back!
      isFrozenRef.current = false;
    }
  }, [isGravityActive]);

  const initParticles = () => {
    const newParticles = [];
    const targets = [];
    const scrollY = window.scrollY;

    // Setup canvas viewport size
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Helper to find all text nodes recursively
    const findTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim().length > 0) {
          const parent = node.parentNode;
          if (parent) {
            // Exclude footers, navigation, custom cursor elements, SVGs, and scripts
            if (
              parent.closest('footer') || 
              parent.closest('.exclude-physics') || 
              parent.closest('.custom-cursor') ||
              parent.closest('svg')
            ) {
              return;
            }
            
            const tag = parent.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CANVAS') {
              return;
            }
            
            targets.push({ textNode: node, parent });
          }
        }
      } else {
        const el = node;
        if (el.nodeType === Node.ELEMENT_NODE) {
          if (
            el.closest('footer') || 
            el.closest('.exclude-physics') || 
            el.closest('.custom-cursor') ||
            el.closest('svg') ||
            el.tagName === 'SCRIPT' || 
            el.tagName === 'STYLE' || 
            el.tagName === 'CANVAS'
          ) {
            return;
          }
        }
        for (let i = 0; i < node.childNodes.length; i++) {
          findTextNodes(node.childNodes[i]);
        }
      }
    };

    findTextNodes(document.body);

    // Segment text nodes into characters and convert all Y alignments to absolute document coordinates
    targets.forEach(({ textNode, parent }) => {
      const originalText = textNode.textContent;
      
      // Store original visibility, opacity, and transition states to restore cleanly
      if (!parent.dataset.physicsOrigVis) {
        parent.dataset.physicsOrigVis = parent.style.visibility || 'visible';
      }
      if (!parent.dataset.physicsOrigOpacity) {
        parent.dataset.physicsOrigOpacity = parent.style.opacity || '';
      }
      if (!parent.dataset.physicsOrigTransition) {
        parent.dataset.physicsOrigTransition = parent.style.transition || '';
      }
      
      const fragment = document.createDocumentFragment();
      const spanNodes = [];
      
      originalText.split('').forEach(char => {
        if (char === ' ' || char === '\n') {
          const txt = document.createTextNode(char);
          fragment.appendChild(txt);
          spanNodes.push(txt);
        } else {
          const span = document.createElement('span');
          span.className = 'temp-char';
          span.textContent = char;
          fragment.appendChild(span);
          spanNodes.push(span);
        }
      });
      
      // Replace textNode content with character spans temporarily
      const nextSibling = textNode.nextSibling;
      parent.insertBefore(fragment, textNode);
      parent.removeChild(textNode);
      
      const computedStyle = window.getComputedStyle(parent);
      
      spanNodes.forEach(spanNode => {
        if (spanNode.nodeType === Node.ELEMENT_NODE) {
          const spanRect = spanNode.getBoundingClientRect();
          if (spanRect.width === 0) return;
          
          const viewportY = spanRect.top + spanRect.height * 0.8;
          let docStartY = viewportY + scrollY; // Absolute document space Y position
          
          // Broadened Y-threshold so massive headings are captured relative to visual coordinates.
          if (viewportY < -400 || viewportY > window.innerHeight + 400) {
            docStartY = scrollY - 50 - Math.random() * 350;
          }
          
          newParticles.push({
            char: spanNode.textContent,
            x: spanRect.left, 
            y: docStartY, 
            ox: spanRect.left,
            oy: spanRect.top + spanRect.height * 0.8 + scrollY, // Absolute document space baseline origin Y
            vx: (Math.random() - 0.5) * 5,
            vy: -Math.random() * 8 - 2, // Upward initial launch velocity
            fontSize: computedStyle.fontSize,
            fontFamily: computedStyle.fontFamily,
            fontWeight: computedStyle.fontWeight,
            color: computedStyle.color,
            parent: parent,
            textNode: textNode
          });
        }
      });
      
      // Restore original text node structure immediately
      spanNodes.forEach(spanNode => {
        parent.removeChild(spanNode);
      });
      if (nextSibling) {
        parent.insertBefore(textNode, nextSibling);
      } else {
        parent.appendChild(textNode);
      }
      
      // Hide the original HTML elements safely preserving their bounding layouts with premium fade transitions
      parent.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      parent.style.opacity = '0';
      parent.style.visibility = 'hidden';
    });

    targetElementsRef.current = targets;
    particlesRef.current = newParticles;

    // --- DOM DESIGN ASSETS PARSING ---
    const assetElements = Array.from(document.querySelectorAll('.design-asset'));
    const newAssets = [];
    
    assetElements.forEach(el => {
      // Store original CSS transforms & visibilities if not already cached
      if (!el.dataset.origTransform) {
        el.dataset.origTransform = el.style.transform || '';
      }
      if (!el.dataset.origVisibility) {
        el.dataset.origVisibility = el.style.visibility || 'visible';
      }

      const origTransform = el.dataset.origTransform;

      // 1. Temporarily clear transform to measure natural UN-TRANSFORMED document layout coordinates
      el.style.transform = 'none';
      const rect = el.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) {
        // Restore transform if we're ignoring this element
        el.style.transform = origTransform;
        return;
      }
      
      const unTransformedLeft = rect.left;
      const unTransformedTop = rect.top;

      // 2. Restore transform to measure its actual CURRENT visual position in the screen viewport
      el.style.transform = origTransform;
      const visualRect = el.getBoundingClientRect();

      let finalStartX = visualRect.left;
      let finalStartY = visualRect.top + scrollY; // Absolute document space Y position

      // If the asset is currently off-screen vertically, rain it down from a scattered cloud above the viewport
      if (visualRect.top < -400 || visualRect.top > window.innerHeight + 400) {
        finalStartY = scrollY - 150 - Math.random() * 300;

        // If it is also off-screen horizontally (e.g. B747 has flown to -120vw at the bottom),
        // we pull it back horizontally so it falls inside the visible viewport bounds!
        if (visualRect.left < -50 || visualRect.left > window.innerWidth + 50) {
          finalStartX = 50 + Math.random() * (window.innerWidth - Math.min(rect.width, 320));
        } else {
          finalStartX = visualRect.left;
        }
      }
      
      newAssets.push({
        el: el,
        x: finalStartX,
        y: finalStartY,
        ox: unTransformedLeft, // Keep original layout offset X for mathematically correct relative translation
        oy: unTransformedTop + scrollY, // Keep original layout absolute Y for relative translation
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 6 - 2,
        angle: 0,
        va: (Math.random() - 0.5) * 0.1,
        width: rect.width,
        height: rect.height,
        mass: 6,
        isSleeping: false
      });
      
      // Apply clean baseline absolute fixed translation space
      el.style.transform = 'translate3d(0px, 0px, 0px) rotate(0rad)';
    });
    
    assetParticlesRef.current = newAssets;
    lastScrollY.current = scrollY;
  };

  const drawStaticFrame = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scrollY = window.scrollY;
    
    // Draw all text characters flat on the absolute bottom of the document (footer area)
    const floorY = document.documentElement.scrollHeight - 30;
    particlesRef.current.forEach(p => {
      p.y = floorY;
      const drawY = p.y - scrollY;
      ctx.font = `${p.fontWeight} ${p.fontSize} ${p.fontFamily}`;
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, p.x, drawY);
    });
    
    // Position all design assets flat on the bottom of the document
    assetParticlesRef.current.forEach(p => {
      p.y = floorY - p.height * 0.5;
      p.angle = 0;
      const tx = p.x - p.ox;
      const ty = p.y - p.oy;
      p.el.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotate(0rad)`;
    });
  };

  // Main physics tick updater
  const updatePhysics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const scrollY = window.scrollY;
    
    lastScrollY.current = scrollY;

    // Draw subtle holographic cursor shield centered at cursor
    if (isGravityActive && mx !== -1000) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(mx, my, 10, mx, my, 140);
      gradient.addColorStop(0, 'rgba(0, 255, 204, 0.08)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 204, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 255, 204, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(mx, my, 140, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mx, my, 140, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Dynamic Floor: bottom of the absolute document (the footer area)
    const floorY = document.documentElement.scrollHeight - 30;
    let allReturned = true;

    // Convert mouse coordinate Y to document coordinates for physics calculation
    const myDoc = my + scrollY;

    // TYPOGRAPHY PHYSICS UPDATE
    particlesRef.current.forEach((p) => {
      if (isGravityActive) {
        const isResting = p.y === floorY && p.vy === 0;
        let repelled = false;

        // Cursor magnetic repulsion (in absolute document space)
        if (mx !== -1000) {
          const dx = p.x - mx;
          const dy = p.y - myDoc;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 140;

          if (dist < repelRadius && dist > 0) {
            const force = ((repelRadius - dist) / repelRadius) * 4.0;
            const angle = Math.atan2(dy, dx);
            
            p.vx += Math.cos(angle) * force + (Math.random() - 0.5) * 0.5;
            p.vy += Math.sin(angle) * force - 0.5; 
            
            repelled = true;
          }
        }

        // Apply physical movement only when not at stable rest
        if (!isResting || repelled) {
          p.vy += 0.35;
          p.vx *= 0.98;
          p.vy *= 0.98;

          p.x += p.vx;
          p.y += p.vy;

          // Floor boundary bounce & sleep settling in document space
          if (p.y > floorY) {
            p.y = floorY;
            
            if (Math.abs(p.vy) < 1.2) {
              p.vy = 0; // Lock to sleep state
              p.vx *= 0.82; // Settle slide friction
            } else {
              p.vy = -p.vy * 0.32; // Dampened bounce
              p.vx += (Math.random() - 0.5) * 1.5;
            }
          }

          // Left/Right viewport boundaries
          if (p.x < 10) {
            p.x = 10;
            p.vx = -p.vx * 0.5;
          } else if (p.x > canvas.width - 20) {
            p.x = canvas.width - 20;
            p.vx = -p.vx * 0.5;
          }
        }

        allReturned = false;
      } else {
        // snaps back elastically using Hookean spring snapping physics
        const dx = p.ox - p.x;
        const dy = p.oy - p.y;
        
        const springK = 0.08;
        const dampingFactor = 0.82;
        
        p.vx = (p.vx + dx * springK) * dampingFactor;
        p.vy = (p.vy + dy * springK) * dampingFactor;
        
        p.x += p.vx;
        p.y += p.vy;

        const distToOrigin = Math.sqrt(dx * dx + dy * dy);
        if (distToOrigin > 0.8) {
          allReturned = false;
        } else {
          p.x = p.ox;
          p.y = p.oy;
        }
      }

      // Convert current absolute Y back to viewport coordinate space for rendering
      const drawY = p.y - scrollY;
      ctx.font = `${p.fontWeight} ${p.fontSize} ${p.fontFamily}`;
      ctx.fillStyle = p.color;
      ctx.fillText(p.char, p.x, drawY);
    });

    // DOM DESIGN ASSETS PHYSICS UPDATE
    assetParticlesRef.current.forEach((p) => {
      if (isGravityActive) {
        const assetFloorY = floorY - p.height * 0.5;
        const isResting = p.y === assetFloorY && p.vy === 0;
        let repelled = false;

        if (mx !== -1000) {
          const dx = (p.x + p.width / 2) - mx;
          const dy = (p.y + p.height / 2) - myDoc;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 180;

          if (dist < repelRadius && dist > 0) {
            const force = ((repelRadius - dist) / repelRadius) * 5.0;
            const angle = Math.atan2(dy, dx);
            
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force - 0.4;
            p.va += (Math.random() - 0.5) * 0.05;
            
            repelled = true;
          }
        }

        if (!isResting || repelled) {
          p.vy += 0.45;
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.va *= 0.96;

          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.va;

          if (p.y > assetFloorY) {
            p.y = assetFloorY;
            
            if (Math.abs(p.vy) < 1.5) {
              p.vy = 0;
              p.vx *= 0.8;
              p.va = 0;
              p.angle = 0;
            } else {
              p.vy = -p.vy * 0.28;
              p.vx += (Math.random() - 0.5) * 1.5;
              p.va = (Math.random() - 0.5) * 0.2;
            }
          }

          if (p.x < 10) {
            p.x = 10;
            p.vx = -p.vx * 0.4;
          } else if (p.x > canvas.width - p.width - 10) {
            p.x = canvas.width - p.width - 10;
            p.vx = -p.vx * 0.4;
          }
        }

        const tx = p.x - p.ox;
        const ty = p.y - p.oy;
        p.el.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotate(${p.angle}rad)`;
        allReturned = false;

      } else {
        // snaps back elastically
        const dx = p.ox - p.x;
        const dy = p.oy - p.y;
        const dAngle = -p.angle;
        
        const springK = 0.08;
        const dampingFactor = 0.82;
        
        p.vx = (p.vx + dx * springK) * dampingFactor;
        p.vy = (p.vy + dy * springK) * dampingFactor;
        p.va = (p.va + dAngle * springK) * dampingFactor;
        
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.va;

        const tx = p.x - p.ox;
        const ty = p.y - p.oy;
        p.el.style.transform = `translate3d(${tx}px, ${ty}px, 0px) rotate(${p.angle}rad)`;

        const distToOrigin = Math.sqrt(dx * dx + dy * dy);
        if (distToOrigin < 0.8 && Math.abs(p.angle) < 0.01) {
          p.x = p.ox;
          p.y = p.oy;
          p.angle = 0;
          p.el.style.transform = p.el.dataset.origTransform;
        } else {
          allReturned = false;
        }
      }
    });

    // Clean up simulation when deactivation snaps are completed
    if (!isGravityActive && allReturned) {
      targetElementsRef.current.forEach(({ parent }) => {
        parent.style.visibility = parent.dataset.physicsOrigVis === 'visible' ? '' : parent.dataset.physicsOrigVis;
        // Trigger a force reflow to make the transition work
        void parent.offsetHeight;
        parent.style.opacity = parent.dataset.physicsOrigOpacity === '' ? '1' : parent.dataset.physicsOrigOpacity;
        
        // Restore original stylesheet properties after transition finishes to keep DOM clean
        setTimeout(() => {
          if (parent && parent.style) {
            parent.style.transition = parent.dataset.physicsOrigTransition || '';
            parent.style.opacity = parent.dataset.physicsOrigOpacity || '';
          }
        }, 600);
      });
      assetParticlesRef.current.forEach(({ el }) => {
        el.style.transform = el.dataset.origTransform;
      });
      particlesRef.current = [];
      assetParticlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsActive(false);
    }
  };

  // Dedicated single-tick animation thread observer
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Settle and freeze simulation to 0% CPU after 20 seconds of inactivity
      if (isGravityActive && elapsed > 20000) {
        isFrozenRef.current = true;
      }

      if (isFrozenRef.current) {
        drawStaticFrame(ctx, canvas);
        return;
      }

      updatePhysics();
      
      if (isActive) {
        animationFrameId.current = requestAnimationFrame(tick);
      }
    };

    animationFrameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isActive, isGravityActive]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-[9999] ${isActive ? 'block' : 'hidden'}`}
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
