"use client";
import React from "react";
import { Particles } from "react-tsparticles";

const ParticlesComponent = () => {
  return (
    <Particles
      id="particles-canvas"
      options={{
        // tsParticles configuration options
        particles: {
          number: {
            value: 80,
          },
          size: {
            value: 3,
          },
        },
      }}
    />
  );
};

export default ParticlesComponent;
