"use client";

import { useState, useEffect } from "react";

const PARTICLE_COUNT = 40;

type Particle = {
    size: number;
    blur: number;
    speed: number;
    delay: number;
    anim: string;
    top: number;
    left: number;
    id: number;
};

function generateParticles(): Particle[] {
    const anims = ["float", "floatReverse", "float2", "floatReverse2"];
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const size = Math.floor(Math.random() * 20) + 10;
        const blur = (i + 1) * 0.02;
        const speed = Math.floor(Math.random() * 20) + 20;
        const delay = Math.floor(Math.random() * 10) * 0.1;
        const anim = anims[Math.floor(Math.random() * anims.length)];
        const top = (Math.random() * 100) / (100 + size / 8);
        const left = (Math.random() * 100) / (100 + size / 10);
        particles.push({ size, blur, speed, delay, anim, top, left, id: i });
    }
    return particles;
}

export default function Particle404() {
    const [particles4, setParticles4] = useState<Particle[]>([]);
    const [particles0, setParticles0] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles4(generateParticles());
        setParticles0(generateParticles());
    }, []);

    if (particles4.length === 0 || particles0.length === 0) {
        // Можно вернуть null или заглушку, пока не сгенерировались частицы
        return null;
    }

    return (
        <div className="w-full h-[100vh]">
            <main className="bl w-full h-full" style={{overflow: "hidden"}}>
                {particles4.map(({ size, blur, speed, delay, anim, top, left, id }) => (
                    <span
                        key={"four-" + id}
                        className={`particle ${anim}`}
                        style={{
                            top: `${top * 100}%`,
                            left: `${left * 100}%`,
                            fontSize: `${size}px`,
                            filter: `blur(${blur}px)`,
                            animationDuration: `${speed}s`,
                            animationDelay: `${delay}s`,
                            animationTimingFunction: "cubic-bezier(0.39,0.575,0.28,0.995)",
                        }}
                    >
            4
          </span>
                ))}

                {particles0.map(({ size, blur, speed, delay, anim, top, left, id }) => (
                    <span
                        key={"zero-" + id}
                        className={`particle ${anim}`}
                        style={{
                            top: `${top * 100}%`,
                            left: `${left * 100}%`,
                            fontSize: `${size}px`,
                            filter: `blur(${blur}px)`,
                            animationDuration: `${speed}s`,
                            animationDelay: `${delay}s`,
                            animationTimingFunction: "cubic-bezier(0.39,0.575,0.28,0.995)",
                        }}
                    >
            0
          </span>
                ))}

                <article className="content">
                    <p>Ой</p>
                    <p>
                        Что - то пошло не так <strong>404</strong>
                    </p>
                    <p>
                        Данной страницы не существует
                    </p>
                    <p>
                        <button onClick={() => window.history.back()}>Вернутся</button>
                    </p>
                </article>
            </main>

            <style jsx>{`
                .bl {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    color: black;
                    font-family: Arial, sans-serif;
                    overflow: hidden;
                }

                .content {
                    overflow: hidden;
                    position: relative;
                    max-width: 90vw;
                    width: auto;
                    margin: 20px;
                    background: white;
                    padding: 60px 40px;
                    text-align: center;
                    box-shadow: -10px 10px 67px -12px rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    animation: apparition 0.8s 1.2s cubic-bezier(0.39, 0.575, 0.28, 0.995) forwards;
                }

                .content p {
                    font-size: 1.3rem;
                    margin-top: 0;
                    margin-bottom: 0.6rem;
                    letter-spacing: 0.1rem;
                    color: #595959;
                }

                .content p:last-child {
                    margin-bottom: 0;
                }

                .content button {
                    display: inline-block;
                    margin-top: 2rem;
                    padding: 0.5rem 1rem;
                    border: 3px solid #595959;
                    background: transparent;
                    font-size: 1rem;
                    color: #595959;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s ease-in-out;
                }

                .content button:hover {
                    background: #595959;
                    color: white;
                }

                .particle {
                    position: absolute;
                    pointer-events: none;
                    display: block;
                    animation-iteration-count: infinite;
                    animation-fill-mode: forwards;
                }

                @keyframes apparition {
                    from {
                        opacity: 0;
                        transform: translateY(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(180px);
                    }
                }

                @keyframes floatReverse {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-180px);
                    }
                }

                @keyframes float2 {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(28px);
                    }
                }

                @keyframes floatReverse2 {
                    0%,
                    100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-28px);
                    }
                }

                .float {
                    animation-name: float;
                }

                .floatReverse {
                    animation-name: floatReverse;
                }

                .float2 {
                    animation-name: float2;
                }

                .floatReverse2 {
                    animation-name: floatReverse2;
                }
            `}</style>
        </div>
    );
}
