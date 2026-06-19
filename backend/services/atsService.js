function calculateATS(resumeText, roleSkills) {
  const text = resumeText.toLowerCase();

  const matchedSkills = [];
  const missingSkills = [];

  roleSkills.forEach((skill) => {
    if (text.includes(skill.toLowerCase())) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const atsScore = Math.round(
    (matchedSkills.length / roleSkills.length) * 100
  );

  return {
    atsScore,
    matchedSkills,
    missingSkills,
  };
}

module.exports = calculateATS;