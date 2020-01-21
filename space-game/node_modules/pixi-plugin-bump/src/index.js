var Bump = {
  Bump: require("./Bump"),
};

//dump everything into extras

Object.assign(PIXI.extras, Bump);

module.exports = Bump;
