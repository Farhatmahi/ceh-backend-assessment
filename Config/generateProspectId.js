const generateProspectId = () => {
  const prospectId = "CEH" + Math.floor(Math.random() * 100000);
  return prospectId;
};

module.exports = generateProspectId;
