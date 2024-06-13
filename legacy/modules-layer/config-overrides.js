const path = require("path");
const { override, babelInclude } = require("customize-cra");
const { alias } = require("react-app-rewire-alias");

module.exports = function (config, env) {
    return Object.assign(
        config,
        override(
            babelInclude([path.resolve("src"), path.resolve("modules/game-hud")]),
            alias({
                /* Fix several clones of React (https://reactjs.org/warnings/invalid-hook-call-warning.html) */
                react: "node_modules/react",
            })
        )(config, env)
    );
};
