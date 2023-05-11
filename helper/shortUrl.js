async function createShortUrl(longUrl) {
    const encodedURL = Buffer.from(longUrl).toString('base64');
    const shortURL = 'http://example.com/' + encodedURL;
    return shortURL;
}

module.exports = { createShortUrl }