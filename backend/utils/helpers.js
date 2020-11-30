exports.sessionizeUser = (user) => {
  return { userId: user.id, user: user.name, role: user.role };
};
