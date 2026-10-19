
import { useEffect, useState } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setIsHovering(
        Boolean(event.target.closest('button, a'))
      );
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'is-hovering' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      aria-hidden="true"
    >
     ✦
    </div>
  );
}

export default CustomCursor;
