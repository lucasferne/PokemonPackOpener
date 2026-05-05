import { useState, useEffect } from "react";
import { fetchBoosterPack, fetchAllSets } from "./api/tcgdex"; // Funções de busca na API externa
import CardButton from "./components/CardButton";
import { AnimatePresence, motion } from "framer-motion"; // Para animações de entrada/saída e transições
import "./App.css";

function App() {
  // --- ESTADOS (STATES) ---
  const [deck, setDeck] = useState([]); // Cartas que ainda estão no "pacote" (pilha)
  const [revealedCards, setRevealedCards] = useState([]); // Cartas já reveladas que vão para o grid
  const [loading, setLoading] = useState(false); // Estado de carregamento da API
  const [isRevealed, setIsRevealed] = useState(false); // Controla se a carta do topo está virada ou não
  const [availableSets, setAvailableSets] = useState([]); // Lista de expansões (coleções) de Pokémon
  const [selectedSet, setSelectedSet] = useState(""); // Coleção selecionada no <select>
  const [selectedCard, setSelectedCard] = useState(null); // Carta selecionada para exibir no modal (zoom)

  // --- EFEITOS (EFFECTS) ---
  // Carrega todas as coleções disponíveis ao montar o componente
  useEffect(() => {
    const loadSets = async () => {
      const sets = await fetchAllSets();
      setAvailableSets(sets);
      if (sets.length > 0) setSelectedSet("sv01"); // Define uma coleção padrão (Scarlet & Violet 1)
    };
    loadSets();
  }, []);

  // --- FUNÇÕES DE AÇÃO ---
  
  // Reseta os estados e busca um novo pacote de cartas
  const openPack = async () => {
    if (loading) return;
    setLoading(true);
    setRevealedCards([]); // Limpa o grid anterior
    setDeck([]); // Limpa o deck anterior
    setIsRevealed(false);
    
    try {
      // Busca 6 cartas aleatórias da coleção selecionada
      const newPack = await fetchBoosterPack(selectedSet, 6);
      setDeck(newPack);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Gerencia o clique na carta do topo (Lógica de virar e descartar)
  const handleDeckAction = () => {
    if (deck.length === 0) return;

    if (!isRevealed) {
      // Se estiver fechada, apenas vira a carta
      setIsRevealed(true);
    } else {
      // Se já estiver aberta, move a carta do deck para o grid de reveladas
      const [firstCard, ...rest] = deck; // Remove a primeira carta
      setRevealedCards((prev) => [...prev, firstCard]); // Adiciona ao grid
      setDeck(rest); // Atualiza o deck com as cartas restantes
      setIsRevealed(false); // Reseta para a próxima carta vir fechada
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-title">TCG PACK OPENER</h1>

      {/* ÁREA DE CONTROLES: Seleção de coleção e botão de abrir */}
      <div className="controls-area">
        <select
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          {availableSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
        <button className="open-btn" onClick={openPack} disabled={loading}>
          {loading ? "CARREGANDO..." : "ABRIR PACOTE"}
        </button>
      </div>

      {/* ÁREA DO DECK: Onde as cartas ficam empilhadas */}
      <div className="deck-wrapper">
        <div className="deck-area">
          {/* Renderiza sombras para criar efeito visual de "pilha" de cartas */}
          {deck.length > 1 &&
            deck.slice(1, 6).map((_, index) => (
              <div
                key={`shadow-${index}`}
                className="deck-card-shadow"
                style={{
                  transform: `translate(${(index + 1) * 2}px, ${(index + 1) * 2}px)`,
                  zIndex: 5 - index,
                }}
              />
            ))}

          {/* AnimatePresence permite animar elementos que saem do DOM */}
          <AnimatePresence>
            {deck.length > 0 && (
              <motion.div
                key={deck[0].id}
                layoutId={deck[0].id} // Mantém a identidade visual na transição para o grid
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.4, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="top-card-container"
              >
                <CardButton
                  pokemon={deck[0]}
                  isRevealed={isRevealed}
                  onAction={handleDeckAction}
                  isInGrid={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* GRID DE CARTAS REVELADAS: Onde as cartas aparecem após o flip */}
      <div className="grid-container">
        <div className="grid-reveal">
          <AnimatePresence>
            {revealedCards.map((pokemon, i) => (
              <motion.div
                key={`${pokemon.id}-${i}`}
                layoutId={pokemon.id} // Faz a carta "voar" do deck para cá se tiver o mesmo ID
                className="grid-item"
              >
                <CardButton
                  pokemon={pokemon}
                  isInGrid={true}
                  onAction={() => setSelectedCard(pokemon)} // Abre o modal no clique
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL DE ZOOM: Exibe a imagem em tamanho grande ao clicar em uma carta do grid */}
      <AnimatePresence>
        {selectedCard && (
          <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
            <div className="modal-content">
              <img
                src={`${selectedCard.image}/high.webp`}
                alt={selectedCard.name}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;