import React from 'react';
import { motion } from 'framer-motion'; // Biblioteca para animações fluidas
import './CardButton.css'; // Importação dos estilos CSS que comentamos anteriormente
import versoCarta from '/card-back.png'; // Caminho da imagem padrão para o verso da carta

const CardButton = ({ pokemon, isRevealed, onAction, isInGrid }) => {
  const cardBackImage = versoCarta;

  // --- LÓGICA DE RENDERIZAÇÃO PARA O GRID ESTÁTICO ---
  // Se a prop 'isInGrid' for verdadeira, renderiza uma versão simplificada sem animação 3D
  if (isInGrid) {
    return (
      <div className="card-static-grid" onClick={onAction}>
        <img 
          src={`${pokemon.image}/high.webp`} 
          alt={pokemon.name} 
          className="card-img-fixed" 
        />
      </div>
    );
  }

  // --- LÓGICA DE RENDERIZAÇÃO PARA O CARD INTERATIVO (FLIP) ---
  return (
    <div className="card-click-zone" onClick={onAction}>
      {/* 
        motion.div: Container animado pelo Framer Motion.
        O 'rotateY' alterna entre 0 (frente) e 180 (verso) baseado no estado 'isRevealed'.
      */}
      <motion.div 
        className="card-inner"
        initial={false} // Evita animação ao carregar o componente pela primeira vez
        animate={{ rotateY: isRevealed ? 0 : 180 }} // Controla a rotação 3D
        transition={{ duration: 0.5, ease: "easeInOut" }} // Define suavidade e tempo da animação
      >
        {/* Face da Frente: Exibe a imagem do Pokémon */}
        <div className="card-face card-front">
          <img src={`${pokemon.image}/high.webp`} alt={pokemon.name} />
        </div>

        {/* Face do Verso: Exibe a imagem padrão de carta fechada */}
        <div className="card-face card-back">
          <img src={cardBackImage} alt="Back" />
        </div>
      </motion.div>
    </div>
  );
};

export default CardButton;