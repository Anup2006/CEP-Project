export const calculateTraitScores = (answers) => {
  const scores = {};

  answers.forEach(answer => {
    answer.traits.forEach(trait => {
      scores[trait] = (scores[trait] || 0) + 1;
    });
  });

  return scores;
};

export const matchCareers = (careers, traitScores) => {
  return careers
    .map(career => {
      const score = career.traits.reduce(
        (sum, trait) => sum + (traitScores[trait] || 0),
        0
      );

      return {
            careerId: career._id,
            title: career.title,
            score
        };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
