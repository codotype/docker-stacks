// POST /api/generate
export default async (req, res) => {
    res.statusCode = 200;
    res.json({
        type: "S3_DOWNLOAD",
        url: "https://google.com",
    });
};
