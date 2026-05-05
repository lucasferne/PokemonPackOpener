import TCGdex from '@tcgdex/sdk';

const tcgdex = new TCGdex('en'); 

export const fetchAllSets = async () => {
  try {
    const sets = await tcgdex.fetchSets();
    return sets.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Erro ao buscar coleções:", error);
    return [];
  }
};

export const fetchBoosterPack = async (setId, count = 6) => {
  try {
    const setDetails = await tcgdex.fetchSet(setId);
    
    if (!setDetails || !setDetails.cards) {
      throw new Error("Coleção sem cartas disponíveis.");
    }

    const shuffled = [...setDetails.cards].sort(() => Math.random() - 0.5);
    const selectedResumes = shuffled.slice(0, count);

    const fullCardDetails = await Promise.all(
      selectedResumes.map(card => tcgdex.fetchCard(card.id))
    );

    return fullCardDetails;
  } catch (error) {
    console.error("Erro ao buscar cartas:", error);
    throw error;
  }
};