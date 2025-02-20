import {useEffect, useRef, useState} from "react";
import {Card, CardContent, Typography} from "@mui/material";

interface DraggableCardProps {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    style?: React.CSSProperties;
}

export default function DraggableArea() {
    const [isDragging, setIsDragging] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Handle mouse/touch start
    // TODO: check why are variables not used
    const handleStart = (_clientX: number, _clientY: number) => {
        setIsDragging(true);
    };

    // Handle mouse/touch move
    const handleMove = (clientX: number, clientY: number) => {
        if (isDragging && cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const offsetX = clientX - rect.width / 2;
            const offsetY = clientY - rect.height / 2;

            // Optional: Add rotation based on drag distance
            const rotate = (offsetX / rect.width) * 20; // Adjust rotation sensitivity
            cardRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`;
        }
    };

    // Handle mouse/touch end
    const handleEnd = () => {
        setIsDragging(false);
        if (cardRef.current) {
            // Snap the card off the screen if dragged far enough
            const rect = cardRef.current.getBoundingClientRect();
            if (Math.abs(rect.left) > rect.width / 2 || Math.abs(rect.right) > window.innerWidth + rect.width / 2) {
                cardRef.current.style.transition = 'transform 0.5s ease';
                cardRef.current.style.transform = `translate(${rect.left > 0 ? 
                    window.innerWidth : -window.innerWidth}px, ${rect.top}px) rotate(${rect.left > 0 ? 30 : -30}deg)`;
                setTimeout(() => {
                    if (cardRef.current) {
                        cardRef.current.style.display = 'none';
                    }
                }, 500);
            } else {
                // Return to original position
                cardRef.current.style.transition = 'transform 0.3s ease';
                cardRef.current.style.transform = 'translate(0, 0) rotate(0deg)';
            }
        }
    };

    // Add event listeners for mouse and touch events
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
        const handleMouseUp = () => handleEnd();
        const handleTouchEnd = () => handleEnd();

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging]);

    return (
        <Card
            ref={cardRef}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
            style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                position: 'absolute',
                transition: isDragging ? 'none' : 'transform 5s ease',
            }}
        >
            <CardContent>
                <Typography variant="h5">Swipe Me!</Typography>
            </CardContent>
        </Card>
    );
}