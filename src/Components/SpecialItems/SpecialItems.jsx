import React, { useEffect, useState, useCallback } from "react";
import './SpecialItems.css'

const SpecialItems = ({ snake, onCollectItem, gridSize }) => {
    const [items, setItems] = useState([]);

    const handleCollection = useCallback((item) => {
        console.log('Item collected:', item); // Debug log
        onCollectItem(item);
        setItems(prevItems => prevItems.filter(i => i.id !== item.id));
    }, [onCollectItem]);

    const generateSpecialItems = useCallback(() => {
        const types = ['boost', 'slow', 'invincibility'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomPosition = [
            Math.floor(Math.random() * gridSize.height),
            Math.floor(Math.random() * gridSize.width)
        ];
        return { type: randomType, position: randomPosition, id: Date.now() };
    }, [gridSize]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newItem = generateSpecialItems();
            setItems((prevItems) => [...prevItems.slice(-2), newItem]); // Keep max 3 items

            setTimeout(() => {
                setItems((prevItems) => prevItems.filter(item => item.id !== newItem.id));
            }, 5000) // Items disappear after 5 seconds
        }, 7000); // New item every 7 seconds

        return () => clearInterval(interval);
    }, [generateSpecialItems]);

    useEffect(() => {
        const checkCollision = () => {
            const head = snake[snake.length - 1]; // Get snake head
            items.forEach(item => {
                if (head[0] === item.position[0] && head[1] === item.position[1]) {
                    handleCollection(item);
                }
            });
        };

        checkCollision();
    }, [snake, items, handleCollection]);

    return (
        <>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`special-item ${item.type}`}
                    style={{
                        top: `${(item.position[0] * 100) / gridSize.height}%`,
                        left: `${(item.position[1] * 100) / gridSize.width}%`,
                    }}
                />
            ))}
        </>
    );
}

export default SpecialItems;