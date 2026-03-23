app.use(cors({
    origin: function (origin, callback) {
        if (!origin ||
            origin.includes('inquisitive-sunburst-1cff02.netlify.app') ||
            origin.includes('ashwinramesh27-gif.github.io') ||
            origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
