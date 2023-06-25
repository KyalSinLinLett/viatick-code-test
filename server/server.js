const app = require("./app");
const PORT = process.env.PORT || 3000;

const start = (PORT) => {
    try {
        app.listen(PORT, () => {
            console.log(`file server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start(PORT);
