const state = {
  positions: [
    {
      slug: "profession_ux_designer",
      title: "UX designer",
      country: "Italia",
      city: "Torino",
      area: "UI/UX",
      seniority: "Junior",
    },
    {
      slug: "profession_data_engineer",
      title: "Data engineer",
      country: "Italia",
      city: "Milano",
      area: "Database",
      seniority: "Senior",
    },
    {
      slug: "profession_java_developer",
      title: "Java Developer",
      country: "Italia",
      city: "Milano",
      area: "Development",
      seniority: "Middle",
    },
    {
      slug: "profession_devops",
      title: "DevOps Engineer",
      country: "Italia",
      city: "Torino",
      area: "DevOps",
      seniority: "Senior",
    },
    {
      slug: "profession_qa",
      title: "Application Tester",
      country: "Italia",
      city: "Torino",
      area: "QA",
      seniority: "Middle",
    },
    {
      slug: "profession_data_engineer_1",
      title: "Data engineer",
      country: "Italia",
      city: "Milano",
      area: "Database",
      seniority: "Junior",
    },
    {
      slug: "profession_mobile_dev",
      title: "Mobile Developer",
      country: "Italia",
      city: "Milano",
      area: "Development",
      seniority: "Middle",
    },
    {
      slug: "profession_mobile_dev",
      title: "Mobile Developer",
      country: "Italia",
      city: "Milano",
      area: "Development",
      seniority: "Middle",
    },
  ],
};

const getters = {
  getAllPositions: (state) => state.positions,

  getPositionBySlug: (state) => (slug) =>
    state.positions.find((p) => p.slug === slug),
};

const actions = {};

const mutations = {
  setPosition(state, payload) {
    state.position = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
