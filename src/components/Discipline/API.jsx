

const findAllAffiliates = (disciplineId) => {
  return fetch(`https://back-proyecto.vercel.app/affiliate?disciplineId=${disciplineId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(result => result.json())
    .then(result => {
      if (result.state) {

        const filteredAffiliates = result.data.filter(affiliate => affiliate.discipline === disciplineId);
        return filteredAffiliates;
      }
      throw new Error('No se pudieron cargar los afiliados');
    });
};





const findDisciplineById = (disciplineId) => {
  return fetch(`https://back-proyecto.vercel.app/discipline/${disciplineId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(result => result.json())
    .then(result => {
      if (result.state) {
        return result.data;
      }
      throw new Error('No se pudo encontrar la disciplina');
    });
};

const findAllDisciplines = () => {
  return fetch("https://back-proyecto.vercel.app/discipline", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(result => result.json())
    .then(result => {
      if (result.state) {
        return result.data.map(discipline => ({
          ...discipline,
          id: discipline._id
        }));
      }
      throw new Error("No se pudo cargar las disciplinas");
    });
};

export { findAllAffiliates, findDisciplineById, findAllDisciplines };
