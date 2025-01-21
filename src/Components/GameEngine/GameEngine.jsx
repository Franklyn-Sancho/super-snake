import React, { useState, useEffect, useRef, useCallback } from 'react';

const GameEngine = ({ children, mode }) => {
    const directionRef = useRef('RIGHT');
    const gameBoardRef = useRef(null);
    const snakeRef = useRef([[5, 5], [5, 6], [5, 7]]);
    const foodRef = useRef(null);

    const getGridSize = useCallback(() => {
        if (gameBoardRef.current) {
            const rect = gameBoardRef.current.getBoundingClientRect();
            const cellSize = 20;
            return {
                width: Math.floor(rect.width / cellSize),
                height: Math.floor(rect.height / cellSize)
            };
        }
        return { width: 20, height: 20 };
    }, []);
    
    const generateFoodPosition = useCallback((grid, snake) => {
        const possiblePositions = [];
        const foodPosition = { current: null };
        
        for (let i = 0; i < grid.height; i++) {
            for (let j = 0; j < grid.width; j++) {
                if (!snake.some(segment => segment[0] === i && segment[1] === j)) {
                    possiblePositions.push([i, j]);
                }
            }
        }
        
        foodPosition.current = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        return foodPosition.current;
    }, []);
    
    const generateFood = useCallback((snake) => {
        const grid = getGridSize();
        return generateFoodPosition(grid, snake);
    }, [getGridSize, generateFoodPosition]);

    const initialSnake = [[5, 5], [5, 6], [5, 7]];
    const [snake, setSnake] = useState(snakeRef.current);
    const [food, setFood] = useState(() => generateFood(initialSnake));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [snakeSpeed, setSnakeSpeed] = useState(150);
    const [shake, setShake] = useState(false);
    const [snakeEffect, setSnakeEffect] = useState(false);
    const [foodEffect, setFoodEffect] = useState(false);
    const [gridSize, setGridSize] = useState(getGridSize());
    const [invincible, setInvincible] = useState(false);
    const [effectType, setEffectType] = useState(null);

    useEffect(() => {
        foodRef.current = food;
    }, [food]);

    const resetGame = useCallback(() => {
        const currentGridSize = getGridSize();
        const centerY = Math.floor(currentGridSize.height / 2);
        const centerX = Math.floor(currentGridSize.width / 4);
    
        const initialSnake = [
            [centerY, centerX],
            [centerY, centerX + 1],
            [centerY, centerX + 2]
        ];
    
        setSnake(initialSnake);
        snakeRef.current = initialSnake;
        setFood(generateFood(initialSnake));
        setGameOver(false);
        setScore(0);
        setSnakeSpeed(150);
        setSnakeEffect(false);
        setEffectType(null);
        setInvincible(false);
        setShake(false);
    }, [generateFood, getGridSize]);
    

    const moveSnake = useCallback(() => {
        const currentGridSize = getGridSize();
        const currentSnake = [...snakeRef.current];
        const head = currentSnake[currentSnake.length - 1];
        let newHead;
    
        switch (directionRef.current) {
            case 'UP':
                newHead = [head[0] - 1, head[1]];
                break;
            case 'DOWN':
                newHead = [head[0] + 1, head[1]];
                break;
            case 'LEFT':
                newHead = [head[0], head[1] - 1];
                break;
            case 'RIGHT':
                newHead = [head[0], head[1] + 1];
                break;
            default:
                newHead = [head[0], head[1] + 1];
                break;
        }
    
        const ate = newHead[0] === foodRef.current[0] && newHead[1] === foodRef.current[1];
    
        currentSnake.push(newHead);
    
        if (ate) {
            setSnakeEffect(true);
            setFoodEffect(true);
            const newFood = generateFood(currentSnake);
            setFood(newFood);
            setScore(prevScore => prevScore + 10);
            setSnakeSpeed(prevSpeed => Math.max(prevSpeed * 0.95, 50));
    
            setTimeout(() => setFoodEffect(false), 300);
            setTimeout(() => setSnakeEffect(false), 500);
        } else {
            currentSnake.shift();
        }
    
        const collidedWithWall =
            newHead[0] < 0 ||
            newHead[1] < 0 ||
            newHead[0] >= currentGridSize.height ||
            newHead[1] >= currentGridSize.width;
    
        const collidedWithSelf = currentSnake
            .slice(0, -1)
            .some(segment => segment[0] === newHead[0] && segment[1] === newHead[1]);
    
        if (!invincible && (collidedWithWall || collidedWithSelf)) {
            setGameOver(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
    
        snakeRef.current = currentSnake;
        setSnake(currentSnake);
    }, [getGridSize, invincible, generateFood]);
    



    const handleSpecialItemEffect = (item) => {
        switch (item.type) {
            case 'boost':
                setSnakeSpeed(80);
                setSnakeEffect(true);
                setEffectType('boost');
                setTimeout(() => {
                    setSnakeSpeed(150);
                    setSnakeEffect(false);
                    setEffectType(null);
                }, 5000);
                break;
            case 'slow':
                setSnakeSpeed(200);
                setSnakeEffect(true);
                setEffectType('slow');
                setTimeout(() => {
                    setSnakeSpeed(150);
                    setSnakeEffect(false);
                    setEffectType(null);
                }, 5000);
                break;
            case 'invincibility':
                setInvincible(true);
                setSnakeEffect(true);
                setEffectType('invincibility');
                setTimeout(() => {
                    setInvincible(false);
                    setSnakeEffect(false);
                    setEffectType(null);
                }, 3000);
                break;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const newSize = getGridSize();
            setGridSize(newSize);


            const adjustedSnake = snakeRef.current.map(segment => [
                Math.min(segment[0], newSize.height - 1),
                Math.min(segment[1], newSize.width - 1)
            ]);

            setSnake(adjustedSnake);
            snakeRef.current = adjustedSnake;


            if (foodRef.current) {
                const newFood = [
                    Math.min(foodRef.current[0], newSize.height - 1),
                    Math.min(foodRef.current[1], newSize.width - 1)
                ];
                setFood(newFood);
                foodRef.current = newFood;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [getGridSize]);


    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(moveSnake, snakeSpeed);
        return () => clearInterval(interval);
    }, [snakeSpeed, gameOver, moveSnake]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver && e.key === 'Enter') {
                resetGame();
                return;
            }

            e.preventDefault();
            const newDirection = (() => {
                switch (e.key) {
                    case 'ArrowUp':
                        return directionRef.current !== 'DOWN' ? 'UP' : directionRef.current;
                    case 'ArrowDown':
                        return directionRef.current !== 'UP' ? 'DOWN' : directionRef.current;
                    case 'ArrowLeft':
                        return directionRef.current !== 'RIGHT' ? 'LEFT' : directionRef.current;
                    case 'ArrowRight':
                        return directionRef.current !== 'LEFT' ? 'RIGHT' : directionRef.current;
                    default:
                        return directionRef.current;
                }
            })();
            directionRef.current = newDirection;
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [gameOver, resetGame]);


    const gameProps = {
        snake,
        food,
        score,
        gameOver,
        shake,
        snakeEffect,
        foodEffect,
        effectType,
        gridSize,
        gameBoardRef,
        resetGame,
        handleSpecialItemEffect,
        setGameOver,
        setScore,
    };

    return React.Children.map(children, child =>
        React.cloneElement(child, { gameProps, mode })
    );
};

export default GameEngine;